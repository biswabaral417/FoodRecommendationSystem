import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '../Types/UserDetails'
import { getCookie } from '../utils/cookies/getLocalCookies'

const AuthContext = createContext<{
    localUser: User | null;
    setLocalUser: React.Dispatch<React.SetStateAction<User | null>>;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    refreshToken: string | null;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localUser, setLocalUser] = useState<User | null>(() => {
        const userFromStorage = localStorage.getItem('user');
        return userFromStorage ? JSON.parse(userFromStorage) : null;
    });

    const [accessToken, setAccessToken] = useState<string | null>(() => getCookie('accessToken'));
    const [refreshToken, setRefreshToken] = useState<string | null>(() => getCookie('refreshToken'));

    // Initialize user if none exists
    useEffect(() => {
        if (!localUser) {
            const defaultUser: User = {
                isAuthenticated: false,
                userDetails: {
                    name: '',
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

    // If tokens exist, mark user as authenticated
    useEffect(() => {
        if (accessToken && refreshToken && localUser && !localUser.isAuthenticated) {
            const updatedUser = {
                ...localUser,
                isAuthenticated: true
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setLocalUser(updatedUser);
        }
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{
            localUser,
            setLocalUser,
            accessToken,
            setAccessToken,
            refreshToken,
            setRefreshToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default useAuth
