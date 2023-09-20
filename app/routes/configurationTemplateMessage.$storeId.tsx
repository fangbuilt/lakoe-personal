import { Container, Text } from '@chakra-ui/react';
import { type ActionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '../libs/prisma/db.server';
import TemplateMessage from '~/components/TemplateMessage/TemplateMessage';

export async function loader({ params }: ActionArgs) {
  const { storeId } = params;
  const getData = await db.store.findUnique({
    where: {
      id: storeId,
    },
  });
  return getData;
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const storeId = formData.get('storeId') as string;
    const content = formData.get('content') as string;

    const data = {
      name,
      storeId,
      content,
    };

    return await db.messageTemplate.create({
      data: {
        name: data.name,
        storeId: data.storeId,
        content: data.content,
      },
    });
  }

  return null;
}

export default function ConfigurationTemplateMessage() {
  const item = useLoaderData<typeof loader>();
  return (
    <>
      <Container>
        <Text>ID: {item?.id}</Text>
        <TemplateMessage storeId={item?.id} />
      </Container>
    </>
  );
}
