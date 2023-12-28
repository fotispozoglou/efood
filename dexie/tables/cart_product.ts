import { Prisma } from '@prisma/client';
import { localDatabase } from '../database';
import uuid from 'uuid';

export interface CartProduct {
  id : string;
  originalID : string;
  name : string;
  quantity : number;
  comments : string;
  ingredients : string[];
};

export const insertProduct = async ( 
  product : Prisma.ProductGetPayload<{}>, 
  comments : string, 
  quantity : number, 
  tiers : string[] 
) => {

  const id = uuid.v4();

  const addedProduct = await localDatabase.cartProducts.add({
    id,
    originalID: product.id,
    name: product.name,
    quantity,
    comments,
    ingredients: tiers
  });

  return {
    addedProduct
  };

};