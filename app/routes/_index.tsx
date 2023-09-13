import { Button } from '@chakra-ui/react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Lakoe Boilerplate' },
    {
      name: 'description',
      content: 'Lakoe is number #1 online store in Indonesia',
    },
  ];
};

export async function loader() {
  return new Date().getDate();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Lakoe store!</h1>
      <h1>{data}</h1>
      <h1>{new Date().getDate()}</h1>
      <Link to={'/posts'}>
        <Button colorScheme="linkedin">Go to Lakoe Store!</Button>
      </Link>
    </div>
  );
}
