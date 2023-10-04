import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Scroll({ children }: LayoutProps) {
  return (
    <>
      <Box
        style={{ overflowY: 'auto', maxHeight: '588px' }}
        sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      >
        {children}
      </Box>
    </>
  );
}
