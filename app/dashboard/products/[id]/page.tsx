import { deleteProduct, handleUpdateProduct, updateProduct } from '@/actions/dashboard/products';
import { ActionButton } from '@/components/buttons';
import ProductForm from '@/components/dashboard/menu/products/product-form';
import prisma from '@/prisma/prisma';

export type UpdateProductProps = {
  params : {
    id : string;
  }
};

export default async function UpdateProduct({ params } : UpdateProductProps) {

  const id = params.id;

  const product = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      tiers: {
        include: {
          tier: true
        }
      }
    }
  });

  const productsCategories = await prisma.productCategory.findMany({});
  const tiers = await prisma.tier.findMany({});

  return (
    <div className='flex flex-row w-full'>
      {
        product && (
          <div className='flex flex-col w-full'>
            <ProductForm 
              action={ updateProduct } 
              submitText="update" 
              loadingText="updating" 
              product={ product } 
              tiers={ tiers }
              productsCategories={ productsCategories } 
            />
            <ActionButton 
              action={ deleteProduct.bind(null, id) } 
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