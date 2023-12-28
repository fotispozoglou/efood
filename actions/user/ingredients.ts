"use server";

import prisma from '@/prisma/prisma';

export const getIngredients = async (  ) => {

  const ingredients = await prisma.ingredient.findMany({});

  return { ingredients };

};