import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { Document } from '~/libs/chakra/Document';
import theme from './utils/theme';
import styles from './assets/style/index.css';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
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
