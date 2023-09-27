import { db } from '~/libs/prisma/db.server';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export let loader: LoaderFunction = async () => {
  const users = await db.user.findMany();
  return json({ users });
};
