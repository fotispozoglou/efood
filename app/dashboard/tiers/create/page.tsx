import { createTier } from "@/actions/dashboard/tiers";
import TierForm from "@/components/dashboard/menu/tiers/tier-form";
import prisma from '@/prisma/prisma';

export default async function CreateTier() {

  const ingredients = await prisma?.ingredient.findMany({});

  return (
    <div className="flex flex-col w-full">
      <TierForm 
        loadingText="creating" 
        action={ createTier } 
        ingredients={ ingredients }
      />
    </div>
  );

};