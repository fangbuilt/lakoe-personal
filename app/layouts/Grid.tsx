import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { LeftNavigation } from '~/components/LeftNavigation';

interface LayoutProps {
  children: ReactNode;
}

export function ImplementGrid({ children }: LayoutProps) {
  return (
    <Flex justify={'center'} minHeight={'100vh'} direction={'column'}>
      <Box
        width={'100%'}
        height={'7.5vh'}
        position={'fixed'}
        top={0}
        borderBottom={'1px'}
        borderBottomColor={'gray.200'}
        backgroundColor={'white'}
        zIndex={10}
      />
      <Flex justify={'center'} minHeight={'100vh'}>
        <Box
          width={'25%'}
          position={'fixed'}
          top={'7.5vh'}
          left={0}
          height={'100vh'}
          borderRight={'1px'}
          borderRightColor={'gray.200'}
        >
          <LeftNavigation />
        </Box>
        <Box width={'50%'} p={5} backgroundColor={'whitesmoke'}>
          {children}
        </Box>
        <Box
          width={'25%'}
          position={'fixed'}
          top={'7.5vh'}
          right={0}
          height={'100vh'}
          borderLeft={'1px'}
          borderLeftColor={'gray.200'}
        >
          {/* <Flex align={'center'} justify={'center'} px={5} h={'100vh'}>
            <Heading textAlign={'center'} mb={'7.5vh'}>
              Test Right Sidebar
            </Heading>
          </Flex> */}
        </Box>
      </Flex>
    </Flex>
  );
}
