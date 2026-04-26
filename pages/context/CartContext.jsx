'use client';

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItemsCount(
            cart.reduce((total, item) => total + item.quantity, 0)
        );
        setCartTotal(
            cart.reduce(
                (total, item) => total + parseFloat(item.price) * item.quantity,
                0
            )
        );
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const uniqueId = `${product.id}-${
                product.subcategory.id || product.subcategory.color
            }`;

            const existingProductIndex = prevCart.findIndex(
                (item) => item.uniqueId === uniqueId
            );

            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1,
                };
                return updatedCart;
            } else {
                return [
                    ...prevCart,
                    {
                        ...product,
                        uniqueId,
                        quantity: 1,
                    },
                ];
            }
        });
    };

    const removeFromCart = (uniqueId) => {
        setCart((prevCart) => {
            return prevCart.filter((item) => item.uniqueId !== uniqueId);
        });
    };

    const updateQuantity = (uniqueId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(uniqueId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.uniqueId === uniqueId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                open,
                setOpen,
                cart,
                cartItemsCount,
                cartTotal,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
