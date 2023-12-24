"use server";

import { DASHBOARD } from '@/config/config';
import { catchAsyncAction } from '@/lib/middlewares/catchAsyncAction';
import { CreateProductSchema, UpdateProductSchema } from '@/models/products';
import prisma from '@/prisma/prisma';
import { CreateProductFormState, FormStateStatus, UpdateProductFormState } from '@/types/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const wait = ( millis : number ) => new Promise(resolve => setTimeout(resolve, millis));

export async function handleCreateProduct( 
  previousState : CreateProductFormState, 
  productData : FormData 
  ) : Promise< CreateProductFormState > {

  const validatedProductFields = CreateProductSchema.safeParse({
    name: productData.get('name') as string,
    price: productData.get('price') as string,
    description: productData.get('description') as string,
    available: productData.get('available') as string,
    minQuantity: productData.get('min_quantity') as string,

    categoryID: productData.get('categoryID') as string,
    tiersIDS: productData.getAll('tiersIDS')
  });

  if ( !validatedProductFields.success ) {

    return {
      product: null,
      status: FormStateStatus.ERROR,
      message: "error creating product",
      errors: validatedProductFields.error.flatten()
    };

  };

  const { name, price, description, available, minQuantity, categoryID, tiersIDS = [] } = validatedProductFields.data;

  const createdProduct = await prisma.product.create({
    data: {
      name,
      price: Number( price ),
      description,
      available: available == 'true' ? true : false,
      minQuantity: Number( minQuantity ),
      category: {
        connect: {
          id: categoryID
        }
      },
      tiers: {
        create: tiersIDS.map(tid => ({ tierID: tid }))
      }
    }
  });

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS );

  return {
    product: createdProduct,
    status: FormStateStatus.SUCCESS,
    message: "created product",
    errors: null
  };
  
};

export async function handleUpdateProduct( 
  previousState : UpdateProductFormState, 
  productData : FormData 
  ) : Promise< UpdateProductFormState > {

  const validatedProductFields = UpdateProductSchema.safeParse({
    id: productData.get('id') as string,
    name: productData.get('name') as string,
    price: productData.get('price') as string,
    description: productData.get('description') as string,
    available: productData.get('available') as string,
    minQuantity: productData.get('min_quantity') as string,

    categoryID: productData.get('categoryID') as string,
    tiersIDS: productData.getAll('tiersIDS')
  });

  if ( !validatedProductFields.success ) {

    return {
      product: null,
      status: FormStateStatus.ERROR,
      message: "error updating product",
      errors: validatedProductFields.error.flatten()
    };

  };

  const { id, name, price, description, available, minQuantity, categoryID, tiersIDS = [] } = validatedProductFields.data;

  const updatedProduct = await prisma.product.update({
    where: {
      id
    },
    data: {
      name,
      price: Number( price ),
      description,
      available: available == 'true' ? true : false,
      minQuantity: Number( minQuantity ),
      category: {
        connect: {
          id: categoryID
        }
      },
    }
  });

  for ( const tierID of tiersIDS ) {

    await prisma.productTier.deleteMany({
      where: {
        productID: updatedProduct.id
      }
    });

    await prisma.productTier.createMany({
      data: {
        tierID: tierID,
        productID: updatedProduct.id
      }
    });

  }

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS );

  return {
    product: updatedProduct,
    status: FormStateStatus.SUCCESS,
    message: "updated product",
    errors: null
  };

};

export async function handleDeleteProduct( id : string ) {

  await wait( 1000 );

  await prisma.product.delete({
    where: {
      id
    }
  });

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS );

  redirect( DASHBOARD.ROUTES.PRODUCTS );

};

export const createProduct = catchAsyncAction( handleCreateProduct );
export const updateProduct = catchAsyncAction( handleUpdateProduct );
export const deleteProduct = catchAsyncAction( handleDeleteProduct );