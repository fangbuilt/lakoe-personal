import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { LeftNavigationAdmin } from '~/components/LeftNavigationAdmin';

interface LayoutProps {
  children: ReactNode;
}

export function ImplementGrid({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      minHeight={'100vh'}
      width={'100%'}
      display={'flex'}
    >
      <Box width={'20%'} background={'teal'}>
        <LeftNavigationAdmin />
      </Box>

      <Box width={'55%'} margin={'auto'} justifyContent={'center'}>
        {children}{' '}
      </Box>

      <Box width={'25%'} bg={'orange.300'}></Box>
    </Box>
  );
}
