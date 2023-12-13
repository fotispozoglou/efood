import { handleCreateIngredient } from "@/actions/dashboard/ingredients";
import { handleCreateProduct } from "@/actions/dashboard/products";
import IngredientForm from "@/components/dashboard/menu/ingredients/ingredient-form";
import ProductForm from "@/components/dashboard/menu/products/product-form";
import prisma from '@/prisma/prisma';

export default async function CreateProduct() {

  const tiers = await prisma.tier.findMany({});

  return (
    <div className="flex flex-col w-full">
      <IngredientForm 
        loadingText="creating" 
        tiers={ tiers } 
        action={ handleCreateIngredient } 
      />
    </div>
  );

};