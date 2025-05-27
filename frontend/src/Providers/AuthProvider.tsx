import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '../Types/UserDetails';

const AuthContext = createContext<any>(null)





export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // check if user has locally stored user data
    const [localUser, setLocalUser] = useState<User>(localStorage.getItem('user') ?
        JSON.parse(localStorage.getItem('user')!) : null)

    //check for cookies stored
   



    if (!localUser) {
        localStorage.setItem('user', JSON.stringify({}));
        setLocalUser({
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
        });
    }
    useEffect(() => {
        if (localUser) {
            // setLocalUser();
        }

    }, [localUser])

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context must be inside Auth Provided")
    }
    return context
}

export default useAuth

