import z from 'zod';
import { HasUUID } from './helpers';

export const BaseIngredientSchema = z.object({
  name: z.string().min(1, 'please enter a name for the ingredient'),
  price: 
    z.string()
    .refine(price => Number(price) >= 0, { message: 'price should be equal or greater than 0' }),
});

export const CreateIngredientSchema = BaseIngredientSchema.extend({
  // categoryID: z.string().min(1, 'category is required'),
  // tiersIDS: z.string().optional()
});

export const UpdateIngredientSchema = BaseIngredientSchema.extend({
  // categoryID: z.string().min(1, 'category is required'),
  // tiersIDS: z.string().optional()
}).merge( HasUUID );

export type CreateIngredientSchemaType = z.infer< typeof CreateIngredientSchema >;
export type UpdateIngredientSchemaType = z.infer< typeof UpdateIngredientSchema >;