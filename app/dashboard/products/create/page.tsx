import { handleCreateProduct } from "@/actions/dashboard/product";
import ProductForm from "@/components/dashboard/menu/products/product-form";

export default async function CreateProduct() {

  return (
    <div className="flex flex-col w-full">
      <ProductForm action={ handleCreateProduct } />
    </div>
  );

};