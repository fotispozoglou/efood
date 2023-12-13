import { DASHBOARD } from "@/config/config";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export type IngredientsTableItemProps = {
  data : Prisma.IngredientGetPayload<{}>;
};

export default function IngredientsTableItem({ data } : IngredientsTableItemProps) {

  return (
    <Link href={`${ DASHBOARD.ROUTES.INGREDIENTS }/${ data.id }`} className="w-full h-full p-2 transition-colors flex flex-row gap-2">
      <span>{data.name}</span>
    </Link>
  );

};