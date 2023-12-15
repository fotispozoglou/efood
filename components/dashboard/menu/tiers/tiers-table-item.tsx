import { DASHBOARD } from "@/config/config";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export type TiersTableItemProps = {
  data : Prisma.TierGetPayload<{}>;
};

export default function TiersTableItem({ data } : TiersTableItemProps) {

  return (
    <Link href={`${ DASHBOARD.ROUTES.TIERS }/${ data.id }`} className="w-full h-full p-2 transition-colors flex flex-row gap-2">
      <span>{data.name}</span>
    </Link>
  );

};