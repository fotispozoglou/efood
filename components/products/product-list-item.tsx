import { Prisma } from "@prisma/client";

export type ProductListItemProps = {
  product : Prisma.ProductGetPayload<{}>;
  onProductClick : ( product : Prisma.ProductGetPayload<{}> ) => void;
};

export default function ProductListItem({ product, onProductClick } : ProductListItemProps) {
  
  return (
    <div 
      className="flex flex-row p-2 px-1 cursor-pointer"
      >
      <div className="flex flex-col flex-1" onClick={ onProductClick.bind(null, product) }>
        <span className="text-gray-700 w-full transition-colors hover:text-black">{ product.name }</span>
        <span>{ product.description }</span>
      </div>
      <div className="flex ml-auto">
        <p className="my-auto text-green-800 font-bold">$ <span className="font-bold !text-black">{ product.price.toFixed(2) }</span></p>
      </div>
    </div>
  );

};