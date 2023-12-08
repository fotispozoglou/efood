"use server";

import { CreateProductSchema } from '@/models/products';
import z from 'zod';
import prisma from '@/prisma/prisma';

export async function handleCreateProduct( previousState : any, productData : FormData ) {

  console.log( Number(productData.get('price') as string) );

  const validatedProductFields = CreateProductSchema.safeParse({
    name: productData.get('name') as string,
    price: productData.get('price') as string,
    description: productData.get('description') as string,
    available: productData.get('available') as string,
    minQuantity: productData.get('min_quantity') as string,

    categoryID: productData.get('categoryID') as string
  });

  if ( !validatedProductFields.success ) {

    console.log( validatedProductFields.error );

    return {};

  };

  const { name, price, description, available, minQuantity, categoryID } = validatedProductFields.data;

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
      }
    }
  });

  return {};
  
};