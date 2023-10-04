import { Box, Text, Image } from '@chakra-ui/react';
import BoxSearch2 from '~/assets/icon-pack/box-search2.svg';

export default function ProductEmpty() {
  return (
    <>
      <Box mt={3} p={3} borderWidth="2px" borderRadius={'10px'}>
        <Box
          display={'flex'}
          gap={4}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image src={BoxSearch2} width="60px" height="60px" />
          <Box>
            <Text fontSize={'16px'}>Semua produk telah aktif</Text>
            <Text fontSize={'12px'} color={'#909090'}>
              Kamu bisa buat produk baru dan menyimpannya
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
