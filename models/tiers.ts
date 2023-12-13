import z from 'zod';
import { HasUUID } from './helpers';

export const BaseTierSchema = z.object({
  name: z.string().min(1, 'please enter a name for the tier'),
  maximumSelections: 
    z.string()
    .refine(price => Number(price) >= 0, { message: 'maximum selections should be equal or greater than 0' }),
});

export const CreateTierSchema = BaseTierSchema.extend({
  // categoryID: z.string().min(1, 'category is required'),
  // tiersIDS: z.string().optional()
});

export const UpdateTierSchema = BaseTierSchema.extend({
  // categoryID: z.string().min(1, 'category is required'),
  // tiersIDS: z.string().optional()
}).merge( HasUUID );

export type CreateTierSchemaType = z.infer< typeof CreateTierSchema >;
export type UpdateTierSchemaType = z.infer< typeof UpdateTierSchema >;