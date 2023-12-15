import IngredientsTable from "@/components/dashboard/menu/ingredients/ingredients-table";
import prisma from '@/prisma/prisma';

export default async function DashboardIngredients() {

  const ingredients = await prisma.ingredient.findMany({});

  return (
    <div className="flex flex-col w-full">
      <IngredientsTable ingredients={ ingredients } />
    </div>
  );

};