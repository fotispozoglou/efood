import TiersTable from "@/components/dashboard/menu/tiers/tiers-table";
import prisma from '@/prisma/prisma';

export default async function DashboardTiers() {

  const tiers = await prisma.tier.findMany({});

  return (
    <div className="flex flex-col w-full">
      <TiersTable tiers={ tiers } />
    </div>
  );

};