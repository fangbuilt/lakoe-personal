import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { Document } from '~/libs/chakra/Document';

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
