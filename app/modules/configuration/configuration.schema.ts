import { z } from 'zod';

export const createMessageSchema = z.object({
  name: z.string().min(5),
  storeId: z.string(),
  content: z.string().min(5),
});

export const updateMessageSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
});
