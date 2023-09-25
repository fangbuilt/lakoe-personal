import type { z } from 'zod';
import { db } from '~/libs/prisma/db.server';
import type { loginSchema, registerSchema } from './auth.schema';
import bcrypt from 'bcryptjs';

export async function login(data: z.infer<typeof loginSchema>) {}

export async function register(data: z.infer<typeof registerSchema>) {
  const { name, email, phone, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, email, phone, password: hashedPassword },
  });
  return { id: user.id, name, email, phone, password };
}
