"use client";

import { getProductsWithIngredients } from "@/actions/user/products";
import { CartContext, addProduct, decreaseProductQuantity, increaseProductQuantity, updateProduct } from "@/context/cart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type CartProviderProps = {
  children : React.ReactNode;
};

export default function CartProvider({ children } : CartProviderProps) {

  const [ productID, setProductID ] = useState('');
  const [ open, setOpen ] = useState( false );

  const { data : selectedProduct } = useQuery({
    queryKey: ['products', productID],
    queryFn: async () => {

      const data = getProductsWithIngredients( productID );

      return data;

    }
  });

  return (
    <CartContext.Provider 
      value={{ 
        addProduct, 
        updateProduct, 
        increaseQuantity: increaseProductQuantity,
        decreaseQuantity: decreaseProductQuantity,
        setSelectedProductID: setProductID,
        setProductPreferencesOpen: setOpen,
        selectedProduct: selectedProduct ?? null,
        productPreferencesOpen: open
      }}>
      { children }
    </CartContext.Provider>
  );

};