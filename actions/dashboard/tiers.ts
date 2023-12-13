"use server";

import { DASHBOARD } from '@/config/config';
import { catchAsyncAction } from '@/lib/middlewares/catchAsyncAction';
import { CreateTierSchema, UpdateTierSchema } from '@/models/tiers';
import prisma from '@/prisma/prisma';
import { CreateTierFormState, FormStateStatus } from '@/types/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const wait = ( millis : number ) => new Promise(resolve => setTimeout(resolve, millis));

export async function handleCreateTier( 
  previousState : CreateTierFormState, 
  tierData : FormData 
  ) : Promise< CreateTierFormState > {

  const validatedTierFields = CreateTierSchema.safeParse({
    name: tierData.get('name') as string,
    maximumSelections: tierData.get('maximum_selections') as string,
  });

  if ( !validatedTierFields.success ) {

    return {
      tier: null,
      status: FormStateStatus.ERROR,
      message: "error creating tier",
      errors: validatedTierFields.error.flatten()
    };

  };

  const { name, maximumSelections } = validatedTierFields.data;

  const createdTier = await prisma.tier.create({
    data: {
      name,
      maximumSelections: Number( maximumSelections ),
    }
  });

  revalidatePath( DASHBOARD.ROUTES.TIERS );

  return {
    tier: createdTier,
    status: FormStateStatus.SUCCESS,
    message: "created tier",
    errors: null
  };
  
};

export async function handleUpdateTier( 
  previousState : CreateTierFormState, 
  tierData : FormData 
  ) : Promise< CreateTierFormState > {

  const validatedTierFields = UpdateTierSchema.safeParse({
    id: tierData.get('id') as string,
    name: tierData.get('name') as string,
    maximumSelections: tierData.get('maximum_selections') as string,
  });

  if ( !validatedTierFields.success ) {

    return {
      tier: null,
      status: FormStateStatus.ERROR,
      message: "error updating tier",
      errors: validatedTierFields.error.flatten()
    };

  };

  const { id, name, maximumSelections } = validatedTierFields.data;

  const updatedTier = await prisma.tier.update({
    where: {
      id
    },
    data: {
      name,
      maximumSelections: Number( maximumSelections ),
    }
  });

  revalidatePath( DASHBOARD.ROUTES.TIERS );

  return {
    tier: updatedTier,
    status: FormStateStatus.SUCCESS,
    message: "updated tier",
    errors: null
  };

};

export async function handleDeleteTier( id : string ) {

  await wait( 1000 );

  await prisma.tier.delete({
    where: {
      id
    }
  });

  revalidatePath( DASHBOARD.ROUTES.TIERS );

  redirect( DASHBOARD.ROUTES.TIERS );

};

export const createTier = catchAsyncAction( handleCreateTier );
export const updateTier = catchAsyncAction( handleUpdateTier );
export const deleteTier = catchAsyncAction( handleDeleteTier );