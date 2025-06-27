import React, { useContext, useState, type SetStateAction, } from 'react';



import RouteProvider from './RouteProvider';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';




const AppContext = React.createContext<{ modalWrapperVis: boolean, setModalWrapperVis: React.Dispatch<SetStateAction<boolean>> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalWrapperVis, setModalWrapperVis] = useState<boolean>(false)

    return (
        <AppContext.Provider value={{ modalWrapperVis, setModalWrapperVis }}>
            <AuthProvider>
                <RouteProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </RouteProvider>
            </AuthProvider>
        </AppContext.Provider>
    )

}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('Providers must be used within a AppProvider');
    }
    return context
}
export default useAppContext