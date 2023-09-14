import { Box, Button, Divider, Flex, Input, Text } from '@chakra-ui/react';

export default function RightSideAdminProcessing() {
  return (
    <>
      <Box
        padding={'10px'}
        fontSize={'13px'}
        my={'10px'}
        mx={'10px'}
        border={'1px solid grey'}
        borderRadius={'10px'}
      >
        <Box>
          <Text display={'flex'}>
            Nomor Penarikan: <Text fontWeight={700}>123ASD</Text>
          </Text>
          <Text>Dibuat 6 September 2023 pukul 15:45 </Text>
        </Box>

        <Flex justifyContent={'space-between'} mt={'15px'}>
          <Box>
            <Text fontWeight={700}>Adira Salahudi</Text>
            <Text fontSize={'12px'}>Dumbways Store</Text>
          </Box>
          <Box>
            <Text fontSize={'12px'}>Status: Processing</Text>
          </Box>
        </Flex>

        <Box mt={'20px'} fontSize={'12px'}>
          <Text fontWeight={700}>Informasi Bank</Text>
          <Flex>
            <Text width={'150px'}>Nama Bank</Text>
            <Text>: BNI</Text>
          </Flex>
          <Flex>
            <Text width={'150px'}>Nomor Rekening</Text>
            <Text>: 0460541966</Text>
          </Flex>
          <Flex>
            <Text width={'150px'}>Nama Pemilik</Text>
            <Text>: Adira Salahudi</Text>
          </Flex>
        </Box>

        <Box mt={'20px'} fontSize={'12px'}>
          <Text fontWeight={700}>Rincian</Text>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Text width={'150px'}>Jumlah Penarikan</Text>
              <Text>:</Text>
            </Flex>
            <Text> Rp. 1.000.000</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Text width={'150px'}>Biaya Admin</Text>
              <Text>:</Text>
            </Flex>
            <Text> Rp. 10.000</Text>
          </Flex>
          <Text fontSize={'10px'} color={'grey'}>
            *1% jumlah penarikan
          </Text>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Text width={'150px'}>Biaya Transfer</Text>
              <Text>:</Text>
            </Flex>
            <Text> Rp. 10.000</Text>
          </Flex>
          <Divider my={'5px'} py={'1px'} bg={'grey'} />
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Text width={'150px'}>Saldo yang diterima</Text>
              <Text>:</Text>
            </Flex>
            <Text> Rp. 980.000</Text>
          </Flex>
        </Box>

        <Box mt={'15px'}>
          <Text fontWeight={700}>Bukti Transfer</Text>
          <Box mt={'15px'}>
            <Input type="file" name="transferProof" id="transferProof" />
            {/* <TagLabel>Upload disini</TagLabel> */}
          </Box>

          <Button
            width={'100%'}
            textAlign={'center'}
            mt={'10px'}
            fontSize={'12px'}
            colorScheme="teal"
            padding={0}
          >
            Selesai
          </Button>
        </Box>
      </Box>
    </>
  );
}
