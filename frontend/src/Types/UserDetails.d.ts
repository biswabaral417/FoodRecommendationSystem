export  interface userDetails {
                name: string,
                email: string,
                phone: string,
                address: string,
            }
export interface currentSession {
                cart: Array<string>,
                wishlist: Array<string>,
            }   
export interface User{
                isAuthenticated: boolean,
                userDetails: userDetails,
                currentSession: currentSession, 
                isAdmin?: boolean,
}