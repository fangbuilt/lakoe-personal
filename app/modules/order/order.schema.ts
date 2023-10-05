import { z } from 'zod';

export const MootaOrderSchema = z.object({
  amount: z.number(),
});

export const confirmationApiSchema = z.object({
  invoiceId: z.string(),
  bank: z.string(),
  createdAt: z.string(),
  amount: z.number(),
  attachment: z.string(),
});
