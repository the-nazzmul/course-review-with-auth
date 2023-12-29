import { z } from 'zod';
import { userRole } from './user.constants';

const userValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
  }),
});

const passwordChangeValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  }),
});
export const userValidations = {
  userValidationSchema,
  passwordChangeValidationSchema,
};
