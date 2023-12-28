"use client";

import { Prisma } from "@prisma/client";
import ProductsCategoriesList from "../products-categories/products-categories-list";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsCategories } from "@/actions/user/products-categories";
import Modal from "../layout/modal";
import ProductPreferences from "../products/product-preferences";
import { getProduct, getProductsWithIngredients } from "@/actions/user/products";
import { CartContext } from "@/context/cart";
import { useProductsPreferences } from "@/hooks/useProductPreferences";

export type HomeProductsListProps = {
  productsCategories : Prisma.ProductCategoryGetPayload<{ include: { products: true } }>[];
};

export default function HomeProductsList() {

  const {
    selectedProduct,
    productPreferencesOpen,
    setProductPreferencesOpen,
    setSelectedProductID,
    addProduct
  } = useContext( CartContext );

  const { data } = useQuery({ 
    queryKey: ['products-categories'], 
    queryFn: getProductsCategories 
  });

  return (
    <div className="flex flex-col gap-5">
      <Modal title={ selectedProduct?.name } open={ productPreferencesOpen } onClose={() => { setProductPreferencesOpen(false); }}>
        <ProductPreferences 
          productAndTiers={ selectedProduct ?? null } 
          onSubmit={(p) => {

            if ( !selectedProduct ) return;

            addProduct( 
              selectedProduct, 
              p.comments ?? '', 
              p.quantity ?? 1, 
              p.ingredients ?? []
            );

          }} 
        />
      </Modal>
      {
        data?.productCategories.map(
          ({ id, name, products }) => (
            <ProductsCategoriesList 
              key={ id } 
              title={ name } 
              products={ products } 
              onProductClick={( product ) => { 
                
                setSelectedProductID( product.id ); 
              
                setProductPreferencesOpen( true );
              
              }}
            />
          )
        )
      }
    </div>
  );

};