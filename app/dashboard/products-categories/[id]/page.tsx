import { deleteProductCategory, handleUpdateProductCategory } from '@/actions/dashboard/products-categories';
import { ActionButton } from '@/components/buttons';
import ProductCategoryForm from '@/components/dashboard/menu/products-categories/product-category-form';
import { DASHBOARD } from '@/config/config';
import prisma from '@/prisma/prisma';
import Link from 'next/link';

export type UpdateProductCategoryProps = {
  params : {
    id : string;
  }
};

export default async function UpdateProductCategory({ params } : UpdateProductCategoryProps) {

  const id = params.id;

  const productCategory = await prisma.productCategory.findUnique({
    where: {
      id
    }
  });

  return (
    <div className='flex w-full'>
      { 
        !productCategory && (
          <div className='flex flex-col w-full'>
            <span className='text-gray-700 font-bold text-xl text-center w-full pt-6'>Product Category Not Found</span>
            <Link 
              href={ DASHBOARD.ROUTES.PRODUCTS_CATEGORIES } 
              className='bg-gray-100 w-max p-1 px-4 rounded-md uppercase font-bold mx-auto mt-5 transition-colors hover:bg-gray-200'
            >go back</Link>
          </div>
        )
      }
      { 
        productCategory && (
          <div className='flex flex-col w-full'>
            <ProductCategoryForm action={ handleUpdateProductCategory } productCategory={ productCategory } submitText="update" />
            <ActionButton 
              action={ deleteProductCategory.bind(null, id) } 
              className="uppercase mt-4 bg-red-700 p-2 px-6 hover:bg-red-800 font-bold text-sm text-white rounded-md transition-colors"
              loadingText='deleting'
              >
              DELETE
            </ActionButton>
          </div>
        )
      }
    </div>
  );

};