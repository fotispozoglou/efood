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