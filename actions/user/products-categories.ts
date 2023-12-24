"use server";

import prisma from '@/prisma/prisma';

export const getProductsCategories = async () => {

  const productCategories = await prisma.productCategory.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      products: true
    }
  });

  return { productCategories };

};