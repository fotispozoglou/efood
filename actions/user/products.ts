"use server";

import prisma from '@/prisma/prisma';

export const getProduct = async ( id : string ) => {

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

  return { product };

};

export type GetProductsWithIngredientsResult = {
  id : string;
  name : string;
  price : number;
  available : boolean;
  description : string | null;
  minQuantity : number;
  tiers : {
    id : string;
    name : string;
    maximumSelections : number;
    options : {
      id : string;
      name : string;
      price : number;
    }[];
  }[];
};

export const getProductsWithIngredients = async ( id : string ) 
  : Promise< GetProductsWithIngredientsResult | null > => {

  const product = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      tiers: true
    }
  });

  if ( !product ) return null;

  const tiers = await prisma.tier.findMany({
    where: {
      products: {
        some: {
          productID: id
        }
      }
    },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    available: product.available,
    minQuantity: product.minQuantity,
    tiers: tiers.map( tier => {

      return {
        id: tier.id,
        name: tier.name,
        maximumSelections: tier.maximumSelections,
        options: tier.ingredients.map(({ ingredient }) => ({
          id: ingredient.id,
          name: ingredient.name,
          price: ingredient.price,
        }))
      };

    })
  };

};