import { getProductsCategories } from '@/actions/user/products-categories';
import HomeProductsList from '@/components/home/products-list';
import prisma from '@/prisma/prisma';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'; 

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products-categories'],
    queryFn: getProductsCategories,
  })

  return (
    <main className="p-4 flex flex-col gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeProductsList />
      </HydrationBoundary>
    </main>
  );

};