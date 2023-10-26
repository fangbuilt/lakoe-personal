import { z } from 'zod';

export const MootaOrderSchema = z.object({
  amount: z.number(),
});
