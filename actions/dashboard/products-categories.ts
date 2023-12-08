"use server";

import { CreateProductCategorySchema } from "@/models/products-categories";
import prisma from '@/prisma/prisma';

export async function handleCreateProductCategory( previousState : any, productData : FormData ) {

  const validatedProductFields = CreateProductCategorySchema.safeParse({
    name: productData.get('name') as string,
  });

  if ( !validatedProductFields.success ) {

    return {  };

  };

  const { name } = validatedProductFields.data;

  const createdProductCategory = await prisma.productCategory.create({
    data: {
      name 
    }
  });

  console.log(createdProductCategory);

  return {};
  
};