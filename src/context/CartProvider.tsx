import React, { createContext, useContext, useState, FC } from 'react';
import { DetallePedido } from '../types/DetallePedido';


type CartContextType = {
  cartItems: DetallePedido[];
  updateCartItems: (newCartItems: DetallePedido[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<DetallePedido[]>([]);

  const updateCartItems = (newCartItems: DetallePedido[]) => {
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
