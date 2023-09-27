import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().min(1).email(),
  phone: z.string(),
  password: z.string(),
  storeId: z.string().optional(),
  roleId: z.string(),
});
