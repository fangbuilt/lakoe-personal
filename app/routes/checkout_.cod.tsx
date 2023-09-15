import { Box, Card, Text } from '@chakra-ui/react';

export default function PayCod() {
  return (
    <Box>
      <Box marginInline={'20%'}>
        <Card boxShadow={'dark-lg'} m={5}>
          <Box
            p={9}
            gap={3}
            display={'flex'}
            flexDirection={'column'}
            textAlign={'center'}
          >
            <Text paddingInline={6} fontSize={'2xl'} fontWeight={'bold'}>
              Terima kasih sudah melakukan order Natural Hair Powder*
            </Text>
            <Text paddingInline={1}>
              Orderan anda kini kami proses, silahkan tunggu kedatangan kurir
              dalam 2-4 hari kedepan dan siapkan pembayaran senilai
            </Text>
            <Text fontSize={'2xl'} fontWeight={'bold'} color={'#51ae7d'}>
              Rp161.250
            </Text>
            <Text>untuk dibayarkan ke kurir langsung.</Text>
          </Box>
          <Box bg={'#6acbd4'} borderBottomRadius={'6px'} p={3}></Box>
        </Card>
      </Box>
      <Box
        textAlign={'center'}
        display={'flex'}
        flexDirection={'column'}
        m={'50px'}
        justifyContent={'center'}
      >
        <Box gap={3} justifyContent={'center'} display={'flex'}>
          <Text fontWeight={'bold'} fontStyle={'italic'}>
            Powered by
          </Text>
          <Text>Lakoe.id</Text>
        </Box>
        <Text>copyright @ 2023</Text>
      </Box>
    </Box>
  );
}
