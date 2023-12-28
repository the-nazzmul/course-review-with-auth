import { z } from 'zod';

const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number().min(1).max(5),
    review: z.string().trim(),
  }),
});

export const ReviewValidations = {
  reviewValidationSchema,
};
