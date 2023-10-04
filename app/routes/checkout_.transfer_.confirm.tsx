import { Box, Card, Text } from '@chakra-ui/react';
import React from 'react';

export default function TransferConfirm() {
  return (
    <>
      <Box
        mt={5}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        marginInline={['10%', '15%', '20%', '25%']}
      >
        <Box gap={2} display={'flex'} alignItems={'center'}>
          <Text fontWeight={'bold'} color={'#3b5355'} fontSize={'40px'}>
            Cave
          </Text>
        </Box>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Konfirmasi Pembayaran
        </Text>
        <Card mt={'20px'} boxShadow={'dark-lg'}>
          <Box paddingInline={'30px'} paddingBlock={'40px'}>
            <Text>
              Terima kasih Bro telah melakukan konfirmasi pembayaran, Order anda
              akan segera kami proses.
            </Text>
          </Box>
        </Card>
      </Box>
    </>
  );
}
