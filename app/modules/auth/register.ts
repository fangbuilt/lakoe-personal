import type { RegistrationForm } from '~/interfaces/auth';
import { db } from '~/libs/prisma/db.server';
import bcrypt from 'bcryptjs';

export async function register({
  name,
  email,
  phone,
  password,
  storeId,
  roleId,
}: RegistrationForm) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      storeId,
      roleId,
    },
  });

  return { id: user.id, name, email, roleId };
}
