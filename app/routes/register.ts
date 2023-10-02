import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '~/libs/prisma/db.server';
import type { Request } from '@remix-run/node';

const registerSchema = z.object({
  name: z.string(),
  email: z.string().min(1).email(),
  phone: z.string(),
  password: z.string(),
});

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export async function loader({ request }: { request: Request }) {
  if (request.method === 'POST') {
    const formData = new URLSearchParams(await request.json());
    console.log('Received form data:', formData);

    try {
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const password = formData.get('password');
      const storeId = null;
      const roleId = '3';

      const parsedFormData: RegistrationForm = registerSchema.parse({
        name,
        email,
        phone,
        password,
      });

      const hashedPassword = await bcrypt.hash(parsedFormData.password, 10);
      await db.user.create({
        data: {
          name: parsedFormData.name,
          email: parsedFormData.email,
          phone: parsedFormData.phone,
          password: hashedPassword,
          storeId,
          roleId,
        },
      });

      return new Response(
        JSON.stringify({ message: 'Registration successful' }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
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
