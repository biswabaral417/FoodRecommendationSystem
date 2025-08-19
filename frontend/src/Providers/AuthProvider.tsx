import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '../Types/UserDetails'
import { verifyRefresh } from '../Api/auth/auth'
import { test_conn } from '../Api/testConnect';

const AuthContext = createContext<{
    localUser: User | null;
    setLocalUser: React.Dispatch<React.SetStateAction<User | null>>;

} | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localUser, setLocalUser] = useState<User | null>(() => {
        const userFromStorage = localStorage.getItem('user');
        return userFromStorage ? JSON.parse(userFromStorage) : null;
    });


    // Initialize localUser if not present
    useEffect(() => {
        if (!localUser) {
            const defaultUser: User = {
                isAuthenticated: false,
                userDetails: {
                    fname: '',
                    lname: '',
                    imageUrl: '',
                    email: '',
                    phone: '',
                    address: '',
                },
                currentSession: {
                    cart: [],
                    wishlist: [],
                }
            };
            localStorage.setItem('user', JSON.stringify(defaultUser));
            setLocalUser(defaultUser);
        }
    }, []);

    // Verify refresh token to maintain persistent login
    useEffect(() => {
        console.log('AuthProvider mounted, checking refresh token...');
        test_conn()
        const checkRefresh = async () => {
            try {
                console.log('Checking refresh token...');
                const response = await verifyRefresh();
                if (response.loggedIn && response.user) {
                    const updatedUser: User = {
                        currentSession: localUser?.currentSession || { cart: [], wishlist: [] },
                        userDetails: response.user,
                        isAuthenticated: response.loggedIn,
                    };

                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setLocalUser(updatedUser);
                }
            } catch (err) {
                console.error('Refresh token verification failed:', err);
            }

        };

        checkRefresh();
    }, []);

    return (
        <AuthContext.Provider value={{
            localUser,
            setLocalUser,

        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default useAuth;
