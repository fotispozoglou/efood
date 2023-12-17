import { deleteTier, updateTier } from '@/actions/dashboard/tiers';
import { ActionButton } from '@/components/buttons';
import TierForm from '@/components/dashboard/menu/tiers/tier-form';
import prisma from '@/prisma/prisma';

export type UpdateTierProps = {
  params : {
    id : string;
  }
};

export default async function UpdateTier({ params } : UpdateTierProps) {

  const id = params.id;

  const tier = await prisma.tier.findUnique({
    where: {
      id
    },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  const ingredients = await prisma?.ingredient.findMany({});

  return (
    <div className='flex flex-row w-full'>
      {
        tier && (
          <div className='flex flex-col w-full'>
            <TierForm 
              action={ updateTier } 
              submitText="update" 
              loadingText="updating"
              tier={ tier }
              ingredients={ ingredients }
            />
            <ActionButton 
              action={ deleteTier.bind(null, id) } 
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