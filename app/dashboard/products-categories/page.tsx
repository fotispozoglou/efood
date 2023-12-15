import ProductsCategoriesTable from "@/components/dashboard/menu/products-categories/products-categories-table";
import prisma from '@/prisma/prisma';

export default async function DashboardProductsCategories() {

  const productsCategories = await prisma.productCategory.findMany({});

  return (
    <div className="flex flex-col w-full">
      <ProductsCategoriesTable productsCategories={ productsCategories } />
    </div>
  );

};