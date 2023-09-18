import { Box, Card, Image, Text } from '@chakra-ui/react';
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
          <Image
            borderRadius={'full'}
            boxSize={'100px'}
            src="https://scontent.fcgk6-2.fna.fbcdn.net/v/t39.30808-6/218216962_1117994121937500_3381637943147376984_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFT_7yyPIn5Hs-bulZWO2RzumKs9VAwotC6Yqz1UDCi0NSeXr2kIVhzZkCN5V1aRwNsfIwkvIxuUFPLdK0rwAuv&_nc_ohc=VzZ_NpN6Gv0AX8Cq5xb&_nc_ht=scontent.fcgk6-2.fna&oh=00_AfBI_Q-jWgr22EcHjq6l2so-vhLoHDuYngxCfWyCAD3vtQ&oe=64FE548E"
            alt=""
          />
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
