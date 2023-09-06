import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { Document } from '~/libs/chakra/Document';
import theme from './utils/theme';
import type { LinksFunction } from '@remix-run/node';
import styles from './assets/css/index.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
