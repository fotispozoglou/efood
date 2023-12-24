"use client";

import { Prisma } from "@prisma/client";
import ProductListItem from "../products/product-list-item";

export type ProductsCategoriesListProps = {
  title : string;
  products : Prisma.ProductGetPayload<{}>[];
  onProductClick : ( product : Prisma.ProductGetPayload<{}> ) => void;
};

export default function ProductsCategoriesList({ title, products, onProductClick } : ProductsCategoriesListProps) {

  return (
    <div className="flex flex-col">
      <span className="uppercase text-sm font-bold px-1">{ title }</span>
      <div className="flex flex-col">
      {
        products.map(product => (
            <ProductListItem 
              key={ product.id } 
              product={ product } 
              onProductClick={ onProductClick }
            />
          )
        )
      }
      </div>
    </div>
  );

};