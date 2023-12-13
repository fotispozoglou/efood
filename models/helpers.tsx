import z from 'zod';

export const HasUUID = z.object({
  id: z.string().uuid()
});