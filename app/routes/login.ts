import { z } from 'zod';
import bcrypt from 'bcryptjs';

import type { Request } from '@remix-run/node';
import jwt from 'jsonwebtoken';
import { db } from '~/libs/prisma/db.server';

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string(),
});

export async function loader({ request }: { request: Request }) {
  if (request.method === 'POST') {
    const formData = new URLSearchParams(await request.json());
    console.log('Received login data:', formData);

    try {
      const email = formData.get('email');
      const password = formData.get('password');

      const loginData = loginSchema.parse({
        email,
        password,
      });

      const user = await db.user.findUnique({
        where: {
          email: loginData.email,
        },
      });

      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 404,
        });
      }

      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password
      );

      if (!passwordMatch) {
        return new Response(JSON.stringify({ error: 'Incorrect password' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.roleId,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: '24h',
        }
      );

      return new Response(
        JSON.stringify({ message: 'Login successful', token }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      // Handle validation errors
      return new Response(JSON.stringify({ error: error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  }
}

export function action({ request }: { request: Request }) {
  return loader({ request });
}
