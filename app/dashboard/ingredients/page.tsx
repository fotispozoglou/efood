import IngredientsTable from "@/components/dashboard/menu/ingredients/ingredients-table";
import ProductsTable from "@/components/dashboard/menu/products/products-table";
import prisma from '@/prisma/prisma';

export default async function DashboardProducts() {

  const ingredients = await prisma.ingredient.findMany({});

  return (
    <div className="flex flex-col w-full">
      <IngredientsTable ingredients={ ingredients } />
    </div>
  );

};