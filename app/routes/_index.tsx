import { Button } from '@chakra-ui/react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export function loader() {
  return new Date().getDate();
}
export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Lakoe Boilerplate' },
    {
      name: 'description',
      content: 'Lakoe is number #1 online store in Indonesia',
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Lakoe store!</h1>
      <Link to={'/posts'}>
        <Button colorScheme="linkedin">Go to Lakoe Store!</Button>
      </Link>
    </div>
  );
}
