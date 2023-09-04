import {
  Card,
  Image,
  CardBody,
  Text,
  Heading,
  Button,
  Box,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const data = [
  {
    id: '1',
    title: ' CREWNECK BASIC-BLACK | sweeter polos hodie polos crewneck - S',
    quantity: '2',
    price: '190.000',
    invoice: 'INV/20230809/MPL/00003432',
    status: 'Pesanan Baru',
    picture:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
];
export default function CardProducts(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log();
  return (
    <>
      <Box>
        {data.map((card) => (
          <Card
            key={card.id}
            overflow="hidden"
            variant="outline"
            display={'flex'}
            justifyContent={'space-between'}
            margin={'50px 5% 10px'}
          >
            {/* atas */}
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              padding={'15px'}
            >
              <Box>
                <Button
                  padding={'4px 8px'}
                  borderRadius={'4px'}
                  backgroundColor={'#008F5D'}
                  fontSize={'14px'}
                  fontWeight={'400'}
                  size={'sm'}
                  mb={2}
                  color={'white'}
                >
                  {card.status}
                </Button>

                <Text
                  fontSize={'14px'}
                  fontWeight={'500'}
                  lineHeight={'16px'}
                  color={'#909090'}
                >
                  {card.invoice}
                </Text>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'column'}
              >
                <Button
                  borderRadius={'15px'}
                  padding={'4px 12px'}
                  border={'1px solid #D5D5D5'}
                  size={'sm'}
                  bg={'transparent'}
                  onClick={onOpen}
                >
                  Proses Pesanan
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Proses Pesanan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>Pilih proses selanjutnya :</Text>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Selesai Packing
                      </Button>
                      <Button variant="ghost">Siap dikirim</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>

            <Divider w={'100%'} />

            {/* bawah */}
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              padding={'15px'}
            >
              <Box display={'flex'}>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'column'}
                >
                  <Image
                    objectFit="cover"
                    width={'52px'}
                    height={'52px'}
                    src=" {card.picture}"
                    alt="brown clothes"
                    borderRadius={'8px'}
                  />
                </Box>

                <Box>
                  <CardBody>
                    <Heading
                      size="md"
                      fontSize={'16px'}
                      lineHeight={'20px'}
                      fontWeight={'700'}
                    >
                      {card.title}
                    </Heading>
                    <Text
                      py="2"
                      fontSize={'14px'}
                      color={'#909090'}
                      lineHeight={'16px'}
                    >
                      {card.quantity} Barang
                    </Text>
                  </CardBody>
                </Box>
              </Box>
              <Box
                justifyContent={'center'}
                display={'flex'}
                flexDirection={'column'}
                flex={'end'}
              >
                <Text
                  fontSize={'14px'}
                  fontWeight={'500'}
                  color={'#909090'}
                  lineHeight={'16px'}
                >
                  Total Belanja
                </Text>
                <Text fontSize={'14px'} fontWeight={'700'}>
                  {card.price}
                </Text>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}
