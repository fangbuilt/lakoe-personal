import type { LoginForm, RegistrationForm } from '~/interfaces/auth';
import { db } from '~/libs/prisma/db.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

export async function register({
  name,
  email,
  phone,
  password,
  storeId,
  roleId,
  isVerify,
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
      isVerify,
    },
  });

  return { id: user.id, name, email, roleId };
}

export async function login({ email, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    return null;
  }

  return { id: user.id, name: user.name, email, roleId: user.roleId };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'LAKOE_SESSION',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    return null;
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/auth/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function roles(userId: string) {
  const role = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return role;
}
