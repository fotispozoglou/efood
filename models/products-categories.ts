import z from 'zod';
import { HasUUID } from './helpers';

export const BaseProductCategorySchema = z.object({
  name: z.string().min(1, 'please enter a name for the product'),
});

export const CreateProductCategorySchema = BaseProductCategorySchema.extend({
});

export const UpdateProductCategorySchema = BaseProductCategorySchema.extend({}).merge( HasUUID );

export type CreateProductCategorySchemaType = z.infer< typeof CreateProductCategorySchema >;
export type UpdateProductCategorySchemaType = z.infer< typeof UpdateProductCategorySchema >;