import ProductsTable from "@/components/dashboard/menu/products/products-table";
import prisma from '@/prisma/prisma';

export default async function DashboardProducts() {

  const products = await prisma.product.findMany({});

  return (
    <div className="flex flex-col w-full">
      <ProductsTable products={ products } />
    </div>
  );

};