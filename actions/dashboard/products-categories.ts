"use server";

import { DASHBOARD } from "@/config/config";
import { catchAsyncAction } from "@/lib/middlewares/catchAsyncAction";
import { CreateProductCategorySchema, UpdateProductCategorySchema } from "@/models/products-categories";
import prisma from '@/prisma/prisma';
import { CreateProductCategoryFormState, FormStateStatus } from "@/types/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const wait = ( millis : number ) => new Promise(resolve => setTimeout(resolve, millis));

export async function handleCreateProductCategory( 
    previousState : CreateProductCategoryFormState, 
    productData : FormData 
  ) 
  : Promise< CreateProductCategoryFormState > {

  await wait( 1200 );

  const validatedProductCategoryFields = CreateProductCategorySchema.safeParse({
    name: productData.get('name') as string,
  });

  if ( !validatedProductCategoryFields.success ) {

    return {  
      productCategory: null,
      status: FormStateStatus.ERROR,
      errors: validatedProductCategoryFields.error.flatten(),
      message: "error creating product category"
    };

  };

  const { name } = validatedProductCategoryFields.data;

  const createdProductCategory = await prisma.productCategory.create({
    data: {
      name 
    }
  });

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS_CATEGORIES );

  return {
    productCategory: createdProductCategory,
    status: FormStateStatus.SUCCESS,
    errors: null,
    message: "created product category"
  };
  
};

export async function handleUpdateProductCategory( 
  previousState : CreateProductCategoryFormState, 
  productData : FormData 
  ) : Promise< CreateProductCategoryFormState > {

  const validatedProductCategoryFields = UpdateProductCategorySchema.safeParse({
    id: productData.get('id') as string,
    name: productData.get('name') as string,
  });

  if ( !validatedProductCategoryFields.success ) {

    return {
      status: FormStateStatus.ERROR,
      errors: validatedProductCategoryFields.error.flatten(),
      message: "error updating product category"
    };

  };

  const { name, id } = validatedProductCategoryFields.data;

  const updatedProductCategory = await prisma.productCategory.update({
    where: {
      id
    },
    data: {
      name 
    }
  });

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS_CATEGORIES );

  return {
    status: FormStateStatus.SUCCESS,
    errors: null,
    message: "updated product category"
  };
  
};

export async function handleDeleteProductCategory( id : string ) {

  await wait( 1000 );

  await prisma.productCategory.delete({
    where: {
      id
    }
  });

  revalidatePath( DASHBOARD.ROUTES.PRODUCTS_CATEGORIES );

  redirect( DASHBOARD.ROUTES.PRODUCTS_CATEGORIES );

};

export const createProductCategory = catchAsyncAction( handleCreateProductCategory );
export const updateProductCategory = catchAsyncAction( handleUpdateProductCategory );
export const deleteProductCategory = catchAsyncAction( handleDeleteProductCategory );