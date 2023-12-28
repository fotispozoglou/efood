import { getIngredients } from '@/actions/user/ingredients';
import { getProductsCategories } from '@/actions/user/products-categories';
import HomeProductsList from '@/components/home/products-list';
import CartContextProvider from '@/context-providers/cart-provider';
import prisma from '@/prisma/prisma';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'; 

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products-categories'],
    queryFn: getProductsCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });

  return (
    <main className="p-4 flex flex-col gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartContextProvider>
          <HomeProductsList />
        </CartContextProvider>
      </HydrationBoundary>
    </main>
  );

};