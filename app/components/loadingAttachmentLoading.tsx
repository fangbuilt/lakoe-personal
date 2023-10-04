import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ReactLoading from 'react-loading';

const LoadingAttachmentAdmin = ({ isLoading, type, color }: any) => (
  <Box
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    margin={'auto'}
    bgColor={'white'}
  >
    <ReactLoading
      type={'bubbles'}
      color={'blue.600'}
      height={100}
      width={100}
    />
    <Text fontSize={'12px'}>Please wait a second...</Text>
  </Box>
);

export default LoadingAttachmentAdmin;
