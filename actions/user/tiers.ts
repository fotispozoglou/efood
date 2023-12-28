"use server";

import prisma from '@/prisma/prisma';

export const getTiers = async (  ) => {

  const tiers = await prisma.tier.findMany({});

  return { tiers };

};