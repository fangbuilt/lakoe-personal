import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

const data = [
  {
    id: '1',
    title: 'CREWNECK BASIC-BLACK | sweater polos hoodie polos crewneck - S',
    quantity: '2',
    price: '190.000',
    invoice: 'INV/20230809/MPL/00003432',
    status: 'Pesanan Baru',
    picture:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
];

const loader = () => {
  const biteShipAPI = process.env.BITESHIP_API as string;
  const mailerLiteAPI = process.env.MAILERLITE_API as string;

  return {
    biteShipAPI,
    mailerLiteAPI,
  };
};

export default function CardNewOrder(props: any) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loaderData = useLoaderData<typeof loader>();

  const sendEmailNotification = async () => {
    try {
      if (loaderData && loaderData.mailerLiteAPI) {
        const dataToSend = {
          to: 'admin@lakoe.com',
          cc: 'aderino@baxdigital.my.id',
          subject: 'Notifikasi Saldo Tidak Cukup',
          message: 'Saldo Anda tidak mencukupi untuk mengirim pesanan.',
        };

        const res = await fetch('https://api.mailersend.com/v1/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${loaderData.mailerLiteAPI}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (res.ok) {
          alert('Notifikasi ke Email berhasil dikirim');
        } else {
          alert('Gagal mengirim notifikasi ke Email');
        }
      } else {
        alert('Data loader belum tersedia');
      }
    } catch (error) {
      alert(error);
    }
  };

  const sendDataToBiteShipAPI = async () => {
    try {
      if (loaderData && loaderData.biteShipAPI) {
        const saldoCukup =
          selectedStatus === 'Pesanan Baru' && Number(data[0].price) >= 20000;

        if (saldoCukup) {
          const dataToSend = {
            status: selectedStatus,
          };

          const res = await fetch('https://api.biteship.com/v1/orders', {
            method: 'POST',
            headers: {
              Authorization: loaderData.biteShipAPI,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          if (res.ok) {
            alert('Data berhasil dikirim ke BiteShip API');
          } else {
            alert('Gagal mengirim data ke BiteShip API');
          }
        } else {
          sendEmailNotification();
        }
      } else {
        alert('Data loader BiteShip belum tersedia');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box>
        {data.map((card) => (
          <Card
            key={card.id}
            overflow="hidden"
            variant="outline"
            display="flex"
            justifyContent="space-between"
            margin="50px 5% 10px"
          >
            <Box display="flex" justifyContent="space-between" padding="15px">
              <Box>
                <Button
                  padding="4px 8px"
                  borderRadius="4px"
                  backgroundColor="#008F5D"
                  fontSize="14px"
                  fontWeight="400"
                  size="sm"
                  mb={2}
                  color="white"
                >
                  {card.status}
                </Button>
                <Text
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="16px"
                  color="#909090"
                >
                  {card.invoice}
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Button
                  borderRadius="15px"
                  padding="4px 12px"
                  border="1px solid #D5D5D5"
                  size="sm"
                  bg="transparent"
                  onClick={() => {
                    setSelectedStatus(card.status);
                    onOpen();
                  }}
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
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={sendDataToBiteShipAPI}
                      >
                        Selesai Packing
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
            <Divider w="100%" />
            <Box display="flex" justifyContent="space-between" padding="15px">
              <Box display="flex">
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Image
                    objectFit="cover"
                    width="52px"
                    height="52px"
                    src={card.picture}
                    alt="brown clothes"
                    borderRadius="8px"
                  />
                </Box>
                <Box>
                  <CardBody>
                    <Heading
                      size="md"
                      fontSize="16px"
                      lineHeight="20px"
                      fontWeight="700"
                    >
                      {card.title}
                    </Heading>
                    <Text
                      py="2"
                      fontSize="14px"
                      color="#909090"
                      lineHeight="16px"
                    >
                      {card.quantity} Barang
                    </Text>
                  </CardBody>
                </Box>
              </Box>
              <Box
                justifyContent="center"
                display="flex"
                flexDirection="column"
                flex="end"
              >
                <Text
                  fontSize="14px"
                  fontWeight="500"
                  color="#909090"
                  lineHeight="16px"
                >
                  Total Belanja
                </Text>
                <Text fontSize="14px" fontWeight="700">
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
