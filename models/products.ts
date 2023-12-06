import z from 'zod';

export const BaseProductSchema = z.object({
  name: z.string().min(1, 'please enter a name for the product'),
  price: 
    z.string()
    .refine(price => Number(price) >= 0, { message: 'price should be equal or greater than 0' }),
  description: z.string().optional(),
  available: z.string().optional(),
  minQuantity: z.string().refine(min => Number(min) >= 1, { message: 'should be at least 1' })
});

export const CreateProductSchema = BaseProductSchema.extend({
  categoryID: z.string().min(1, 'category is required'),
  tiersIDS: z.string().optional()
});