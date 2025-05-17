import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types
export interface SushiItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type: string;
  ingredients: string[];
  tags: string[];
  ratings: number;
  reviewCount: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isPopular: boolean;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  addOns: {
    id: number;
    name: string;
    price: number;
  }[];
  spicyLevel: number;
  servingSize: string;
  selectedAddOns?: {
    id: number;
    name: string;
    price: number;
  }[];
}

interface CartItem extends SushiItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: SushiItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getItemCount: () => 0,
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: SushiItem) => {
    // Check if item with same ID and add-ons exists
    const existingItemIndex = cartItems.findIndex((cartItem) => {
      // If item has selected add-ons, we need to check if they match
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        // First check if IDs match
        if (cartItem.id !== item.id) return false;
        
        // Check if selected add-ons match
        if (!cartItem.selectedAddOns || 
            cartItem.selectedAddOns.length !== item.selectedAddOns.length) {
          return false;
        }
        
        // Check each add-on
        return cartItem.selectedAddOns.every(addon => 
          item.selectedAddOns?.some(itemAddon => itemAddon.id === addon.id)
        );
      }
      
      // If no add-ons, just check item ID and that the cart item also has no add-ons
      return cartItem.id === item.id && 
             (!cartItem.selectedAddOns || cartItem.selectedAddOns.length === 0);
    });
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext); 