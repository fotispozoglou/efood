import { createProductCategory, handleCreateProductCategory } from "@/actions/dashboard/products-categories";
import ProductCategoryForm from "@/components/dashboard/menu/products-categories/product-category-form";

export default async function CreateProductCategory() {

  return (
    <div className="flex flex-col w-full">
      <ProductCategoryForm action={ createProductCategory } loadingText="creating" />
    </div>
  );

};