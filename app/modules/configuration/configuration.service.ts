import { db } from '../../libs/prisma/db.server';

export async function getStore(storeId: string | undefined) {
  if (typeof storeId === 'string') {
    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });

    return store;
  }

  return null;
}
