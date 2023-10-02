// // routes/verify.tsx

import { Button, Input } from '@chakra-ui/react';
import type { ActionArgs, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLocation, useSearchParams } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';
import { createUserSession } from '~/modules/auth/auth.service';

function validateUrl(url: string) {
  const urls = ['/', '/checkout', '/dashboard'];
  if (urls.includes(url)) {
    return url;
  }
  return '/';
}

export let loader: LoaderFunction = async () => {
  return json({ message: 'User will be verified' });
};

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const actionType = String(form.get('actionType'));
  const token = String(form.get('token'));
  const redirectTo = validateUrl(
    (form.get('redirectTo') as string) || '/dashboard'
  );

  console.log(actionType);
  console.log(token);

  const verified = await db.verify.findFirst({
    where: {
      token: token,
    },
  });

  if (actionType === 'verifyEmail') {
    const user = await db.user.update({
      where: {
        id: verified?.userId,
      },
      data: {
        isVerify: true,
      },
    });

    const store = await db.store.create({
      data: {
        name: user.name,
        description: 'this is your store description',
        domain: `lakoe.store/${user.name}`,
      },
    });

    await db.user.update({
      where: {
        id: verified?.userId,
      },
      data: {
        storeId: store.id,
      },
    });

    return createUserSession(user.id, redirectTo);
  }
}

export default function VerifyEmail() {
  const Location = useLocation();
  const queryParams = new URLSearchParams(Location.search);
  const [SearchParams] = useSearchParams();

  const paramName = 'token';
  const paramValue = queryParams.get(paramName) as string;
  console.log(paramValue);
  return (
    <>
      <Form method="POST">
        <Input
          type="hidden"
          name="redirectTo"
          value={SearchParams.get('redirectTo') ?? undefined}
        />
        <Input name="actionType" defaultValue={'verifyEmail'} hidden />
        <Input name="token" defaultValue={paramValue} hidden />
        <Button type="submit">Verify</Button>
      </Form>
    </>
  );
}
