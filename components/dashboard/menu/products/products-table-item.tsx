import { DASHBOARD } from "@/config/config";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export type ProductTableItemProps = {
  data : Prisma.ProductGetPayload<{}>;
};

export default function ProductsTableItem({ data } : ProductTableItemProps) {

  return (
    <Link href={`${ DASHBOARD.ROUTES.PRODUCTS }/${ data.id }`} className="w-full h-full p-2 transition-colors flex flex-row gap-2">
      <span>{data.name}</span>
    </Link>
  );

};