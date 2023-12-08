import { handleCreateProduct } from "@/actions/dashboard/products";
import ProductForm from "@/components/dashboard/menu/products/product-form";
import prisma from '@/prisma/prisma';

export default async function CreateProduct() {

  const productsCategories = await prisma.productCategory.findMany({});

  return (
    <div className="flex flex-col w-full">
      <ProductForm productsCategories={ productsCategories } action={ handleCreateProduct } />
    </div>
  );

};