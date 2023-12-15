import { deleteIngredient, updateIngredient } from '@/actions/dashboard/ingredients';
import { deleteProduct, handleUpdateProduct, updateProduct } from '@/actions/dashboard/products';
import { ActionButton } from '@/components/buttons';
import IngredientForm from '@/components/dashboard/menu/ingredients/ingredient-form';
import ProductForm from '@/components/dashboard/menu/products/product-form';
import prisma from '@/prisma/prisma';

export type UpdateIngredientProps = {
  params : {
    id : string;
  }
};

export default async function UpdateIngredient({ params } : UpdateIngredientProps) {

  const id = params.id;

  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id
    }
  });

  const tiers = await prisma.tier.findMany({});

  return (
    <div className='flex flex-row w-full'>
      {
        ingredient && (
          <div className='flex flex-col w-full'>
            <IngredientForm 
              action={ updateIngredient } 
              submitText="update" 
              loadingText="updating"
              tiers={ tiers } 
              ingredient={ ingredient }
            />
            <ActionButton 
              action={ deleteIngredient.bind(null, id) } 
              className="uppercase mt-4 bg-red-700 p-2 px-6 hover:bg-red-800 font-bold text-sm text-white rounded-md transition-colors"
              loadingText='deleting'
              >
              DELETE
            </ActionButton>
          </div>
        )
      }
    </div>
  );

};