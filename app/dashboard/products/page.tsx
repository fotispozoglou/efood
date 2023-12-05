import ProductsTable from "@/components/dashboard/menu/products/products-table";
import Table from "@/components/tables/table";
import { PRODUCTS } from "@/prisma/data/menu";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import prisma from '@/prisma/prisma';

export default async function DashboardProducts() {

  const products = await prisma.product.findMany({});

  return (
    <div className="flex flex-col w-full">
      <ProductsTable products={ products } />
    </div>
  );

};