import { useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';

export async function loader() {
  const payments = await db.payment.findMany();

  return payments;
}

export default function UseMapeUnpaid() {
  const data = useLoaderData<typeof loader>();

  console.log('useMapeUnpaid', data);

  return <></>;
}
