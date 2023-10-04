import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';

// Define your roles
export type UserRole = '1' | '2' | '3';

// Middleware function
export async function authorize(
  { request }: LoaderArgs,
  role: UserRole
): Promise<{}> {
  const userId = await getUserId(request);
  console.log('this  is user id', userId);
  if (!userId) {
    console.log('there is no token');
    throw redirect('/auth/login');
  }

  const user = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });
  console.log(user);

  if (!userId || user?.roleId !== role) {
    console.log('unauthorized');
    throw redirect('/auth/login');
  }

  return Promise.resolve({});
}
