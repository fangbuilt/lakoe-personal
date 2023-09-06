import { z } from 'zod';

export const createConfiguration = z.object({
  title: z.string().min(1),
  isDone: z.boolean().default(false),
});
