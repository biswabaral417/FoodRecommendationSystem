
import React, { createContext, useContext, useState, } from 'react'
import { useLocalStorage } from '../utils/customhooks/useLocalStorage';

interface CartContextProps {
    cart: cartObj[],
    addCart: (id: number) => void
    subCart: (id: number) => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useLocalStorage<cartObj[]>("cart",[])
    const addCart = (id: number) => {
        setCart(prevCart => {

            const existing = prevCart.find(item => item.id === id)
            console.log(prevCart)
            if (!existing) return [...prevCart, { id: id, count: 1 }]
            return [...prevCart.filter(item => item.id !== id), { id: id, count: existing.count + 1 }]
        })
    }
    const subCart = (id: number) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === id)
            if (!existing) return prevCart
            if (existing.count === 1) {
                return prevCart.filter(item => item.id !== id)
            }
            return [...prevCart.filter(item => item.id !== id), { id, count: (existing.count - 1) }]
        })

    }

    return (
        <CartContext.Provider value={{ cart, addCart, subCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextProps => {
    const values = useContext(CartContext);
    if (!values) {
        throw new Error("useCart must be used within a <CartProvider>");
    }
    return values;
};
