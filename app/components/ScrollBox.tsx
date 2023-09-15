import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function ScrollBox({ children }: LayoutProps) {
  return (
    <>
      <Box
        style={{ overflowY: 'auto', maxHeight: '700px' }}
        sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      >
        {children}
      </Box>
    </>
  );
}
