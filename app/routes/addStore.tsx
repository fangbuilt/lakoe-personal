import { Button, FormLabel, Input } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  return { userId };
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const actiontype = String(form.get('actiontype'));
  const name = String(form.get('name'));
  const desc = String(form.get('desc'));
  const userId = String(form.get('userId'));

  if (actiontype === 'addStore') {
    const store = await db.store.create({
      data: {
        name: name,
        description: desc,
        domain: `lakoe.store/${name}`,
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        storeId: store.id,
      },
    });
  }

  return redirect('/dashboard');
}

export default function useAddStore() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Form method="POST">
        <Input name="actiontype" defaultValue={'addStore'} hidden />
        <Input name="userId" defaultValue={data.userId as string} hidden />
        <FormLabel>Store Name</FormLabel>
        <Input name="name" />
        <FormLabel>Store Description</FormLabel>
        <Input name="desc" />
        <Button type="submit">Create Store</Button>
      </Form>
    </>
  );
}
