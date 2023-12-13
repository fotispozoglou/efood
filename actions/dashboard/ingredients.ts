"use server";

import { DASHBOARD } from '@/config/config';
import { catchAsyncAction } from '@/lib/middlewares/catchAsyncAction';
import { CreateIngredientSchema, UpdateIngredientSchema } from '@/models/ingredients';
import prisma from '@/prisma/prisma';
import { CreateIngredientFormState, FormStateStatus } from '@/types/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const wait = ( millis : number ) => new Promise(resolve => setTimeout(resolve, millis));

export async function handleCreateIngredient( 
  previousState : CreateIngredientFormState, 
  ingredientData : FormData 
  ) : Promise< CreateIngredientFormState > {

  const validatedIngredientFields = CreateIngredientSchema.safeParse({
    name: ingredientData.get('name') as string,
    price: ingredientData.get('price') as string,
  });

  if ( !validatedIngredientFields.success ) {

    return {
      ingredient: null,
      status: FormStateStatus.ERROR,
      message: "error creating ingredient",
      errors: validatedIngredientFields.error.flatten()
    };

  };

  const { name, price } = validatedIngredientFields.data;

  const createdIngredient = await prisma.ingredient.create({
    data: {
      name,
      price: Number( price ),
    }
  });

  revalidatePath( DASHBOARD.ROUTES.INGREDIENTS );

  return {
    ingredient: createdIngredient,
    status: FormStateStatus.SUCCESS,
    message: "created ingredient",
    errors: null
  };
  
};

export async function handleUpdateIngredient( 
  previousState : CreateIngredientFormState, 
  ingredientData : FormData 
  ) : Promise< CreateIngredientFormState > {

  const validatedIngredientFields = UpdateIngredientSchema.safeParse({
    id: ingredientData.get('id') as string,
    name: ingredientData.get('name') as string,
    price: ingredientData.get('price') as string,
  });

  if ( !validatedIngredientFields.success ) {

    return {
      ingredient: null,
      status: FormStateStatus.ERROR,
      message: "error updating ingredient",
      errors: validatedIngredientFields.error.flatten()
    };

  };

  const { id, name, price } = validatedIngredientFields.data;

  const updatedIngredient = await prisma.ingredient.update({
    where: {
      id
    },
    data: {
      name,
      price: Number( price ),
    }
  });

  revalidatePath( DASHBOARD.ROUTES.INGREDIENTS );

  return {
    ingredient: updatedIngredient,
    status: FormStateStatus.SUCCESS,
    message: "updated ingredient",
    errors: null
  };

};

export async function handleDeleteIngredient( id : string ) {

  await wait( 1000 );

  await prisma.ingredient.delete({
    where: {
      id
    }
  });

  revalidatePath( DASHBOARD.ROUTES.INGREDIENTS );

  redirect( DASHBOARD.ROUTES.INGREDIENTS );

};

export const createIngredient = catchAsyncAction( handleCreateIngredient );
export const updateIngredient = catchAsyncAction( handleUpdateIngredient );
export const deleteIngredient = catchAsyncAction( handleDeleteIngredient );