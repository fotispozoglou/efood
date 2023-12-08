import z from 'zod';

export const BaseProductCategorySchema = z.object({
  name: z.string().min(1, 'please enter a name for the product'),
});

export const CreateProductCategorySchema = BaseProductCategorySchema.extend({
});