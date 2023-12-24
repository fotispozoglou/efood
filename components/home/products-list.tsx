"use client";

import { Prisma } from "@prisma/client";
import ProductsCategoriesList from "../products-categories/products-categories-list";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsCategories } from "@/actions/user/products-categories";
import Modal from "../layout/modal";
import ProductPreferences from "../products/product-preferences";
import { getProduct } from "@/actions/user/products";

export type HomeProductsListProps = {
  productsCategories : Prisma.ProductCategoryGetPayload<{ include: { products: true } }>[];
};

export default function HomeProductsList() {

  const [ productID, setProductID ] = useState< string >( '' );
  const [ open, setOpen ] = useState( false );

  const { data } = useQuery({ 
    queryKey: ['products-categories'], 
    queryFn: getProductsCategories 
  });

  const { data: productData } = useQuery({
    queryKey: ['products', productID],
    enabled: productID.length > 1,
    queryFn: async () => {

      const data = await getProduct( productID );
      
      return data;
    
    },
  });

  return (
    <div className="flex flex-col gap-5">
      {
        <Modal title={ productData?.product?.name } open={ open } onClose={() => { setOpen(false); }}>
          <ProductPreferences 
            product={ productData?.product ?? null } 
            onSubmit={(p) => {}} 
          />
        </Modal>
      }
      {
        data?.productCategories.map(
          ({ id, name, products }) => (
            <ProductsCategoriesList 
              key={ id } 
              title={ name } 
              products={ products } 
              onProductClick={( product ) => { 
                
                setProductID( product.id ); 
              
                setOpen( true );
              
              }}
            />
          )
        )
      }
    </div>
  );

};