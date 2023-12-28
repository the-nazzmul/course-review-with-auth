import { z } from 'zod';

export const categoriesValidationSchema = z.object({
  body: z.object({
    name: z.string().trim(),
  }),
});
