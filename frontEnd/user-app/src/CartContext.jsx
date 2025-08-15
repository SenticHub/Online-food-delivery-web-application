import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = async () => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        setCartCount(0);
        return;
      }
      
      const res = await fetch(`http://localhost:3000/cart/getCartByUser/${userId}`);
      const json = await res.json();
      setCartCount(json.data.cartItems.length);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  const updateCartCount = () => {
    getCartCount();
  };

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      getCartCount();
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};