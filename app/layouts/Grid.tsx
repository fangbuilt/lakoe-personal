import type { ReactNode } from 'react';
import { LeftNavigationAdmin } from '~/components/LeftNavigationAdmin';
import RightSideAdminDeclined from '~/components/RightSideAdminDeclined';
import RightSideAdminProcessing from '~/components/RightSideAdminProcessing';
import RightSideAdminRequest from '~/components/RightSideAdminRequest';
import RightSideAdminSuccess from '~/components/RightSideAdminSuccess';

import { Box } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

export function ImplementGrid({ children }: LayoutProps) {
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

      <Box width={'55%'} margin={'auto'} justifyContent={'center'}>
        {children}
      </Box>

      <Box width={'25%'}></Box>
    </Box>
  );
}

export function ImplementGridProcess({ children }: LayoutProps) {
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

      <Box width={'55%'} margin={'auto'} justifyContent={'center'}>
        {children}{' '}
      </Box>

      <Box width={'25%'}>
        <RightSideAdminProcessing />
      </Box>
    </Box>
  );
}

export function ImplementGridSuccess({ children }: LayoutProps) {
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
        width={'55%'}
        justifyContent={'center'}
        display={'flex'}
        mx={'auto'}
        my={'0'}
      >
        {children}{' '}
      </Box>

      <Box width={'25%'}>
        <RightSideAdminSuccess />
      </Box>
    </Box>
  );
}

export function ImplementGridRequest({ children }: LayoutProps) {
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
        width={'55%'}
        margin={'auto'}
        justifyContent={'center'}
        display={'flex'}
        alignContent={'none'}
      >
        {children}{' '}
      </Box>

      <Box width={'25%'}>
        <RightSideAdminRequest />
      </Box>
    </Box>
  );
}

export function ImplementGridDeclined({ children }: LayoutProps) {
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
        width={'55%'}
        margin={'auto'}
        justifyContent={'center'}
        display={'flex'}
        alignItems={'none'}
      >
        {children}{' '}
      </Box>

      <Box width={'25%'}>
        <RightSideAdminDeclined />
      </Box>
    </Box>
  );
}
