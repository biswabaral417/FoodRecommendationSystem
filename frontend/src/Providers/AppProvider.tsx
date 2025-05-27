import React, { useContext } from 'react';



import RouteProvider from './RouteProvider';




const AppContext = React.createContext<any | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <AppContext.Provider value={{}}>
            <RouteProvider>
                {children}
            </RouteProvider>
        </AppContext.Provider>
    )

}

const useAppProvider = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('Providers must be used within a AppProvider');
    }
    return context
}
export default useAppProvider