import { Container } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import TemplateMessage from '~/components/TemplateMessage/TemplateMessage';
import { db } from '~/libs/prisma/db.server';

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

    await db.messageTemplate.create({ data });
  }

  return null;
}
export default function ConfigurationTemplateMessage() {
  return (
    <>
      <Container>
        <TemplateMessage />
      </Container>
    </>
  );
}
