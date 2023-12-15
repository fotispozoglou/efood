import { createTier } from "@/actions/dashboard/tiers";
import TierForm from "@/components/dashboard/menu/tiers/tier-form";

export default async function CreateTier() {

  return (
    <div className="flex flex-col w-full">
      <TierForm 
        loadingText="creating" 
        action={ createTier } 
      />
    </div>
  );

};