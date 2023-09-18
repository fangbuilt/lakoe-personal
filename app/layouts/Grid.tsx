import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { LeftNavigationAdmin } from '~/components/AdminLeftNavigation';

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
          <LeftNavigationAdmin />
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

export function ImplementGridAll({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      // minHeight={"100vh"}
      width={'100%'}
      display={'flex'}
      w="100%"
      h="100%"
      bgGradient="linear(0deg, #D9AFD9 0%, #97D9E1 100%)"
    >
      <Box width={'20%'}>
        <LeftNavigationAdmin />
      </Box>

      <Box
        width={'80%'}
        margin={'auto'}
        justifyContent={'center'}
        display={'flex'}
        alignItems={'none'}
      >
        {children}{' '}
      </Box>
    </Box>
  );
}

export function ImplementGridAdminRequest({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      // minHeight={"100vh"}
      width={'100%'}
      display={'flex'}
      w="100%"
      h="100%"
      bgGradient="linear(0deg, #D9AFD9 0%, #97D9E1 100%)"
    >
      <Box width={'20%'}>
        <LeftNavigationAdmin />
      </Box>

      <Box
        width={'80%'}
        margin={'auto'}
        justifyContent={'center'}
        display={'flex'}
        alignContent={'none'}
      >
        {children}{' '}
      </Box>
    </Box>
  );
}

export function ImplementGridAdminProcess({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      // minHeight={"100vh"}
      width={'100%'}
      display={'flex'}
      w="100%"
      h="100%"
      bgGradient="linear(0deg, #D9AFD9 0%, #97D9E1 100%)"
    >
      <Box width={'20%'}>
        <LeftNavigationAdmin />
      </Box>

      <Box width={'80%'} margin={'auto'} justifyContent={'center'}>
        {children}{' '}
      </Box>
    </Box>
  );
}

export function ImplementGridAdminSuccess({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      // minHeight={"100vh"}
      width={'100%'}
      display={'flex'}
      w="100%"
      h="100%"
      bgGradient="linear(0deg, #D9AFD9 0%, #97D9E1 100%)"
    >
      <Box width={'20%'}>
        <LeftNavigationAdmin />
      </Box>

      <Box
        width={'80%'}
        justifyContent={'center'}
        display={'flex'}
        mx={'auto'}
        my={'0'}
      >
        {children}{' '}
      </Box>
    </Box>
  );
}

export function ImplementGridAdminDeclined({ children }: LayoutProps) {
  return (
    <Box
      justifyContent={'center'}
      // minHeight={"100vh"}
      width={'100%'}
      display={'flex'}
      w="100%"
      h="100%"
      bgGradient="linear(0deg, #D9AFD9 0%, #97D9E1 100%)"
    >
      <Box width={'20%'}>
        <LeftNavigationAdmin />
      </Box>

      <Box
        width={'80%'}
        margin={'auto'}
        justifyContent={'center'}
        display={'flex'}
        alignItems={'none'}
      >
        {children}{' '}
      </Box>
    </Box>
  );
}
