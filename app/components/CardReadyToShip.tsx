import { Box, Button, Card, Flex, Img, Text } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { loader } from '~/routes/order';
import ModalTracking from './orderTrackingModal';

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

export default function CardReadyToShip() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [, setSelectedCardId] = useState<string>('');

  const cardProduct = useLoaderData<typeof loader>();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {/* CARD START HERE */}

      {cardProduct.dataProductReadyToShip.map((data) => (
        <Card mb={5} boxShadow={'xs'} key={data.id}>
          <Box key={data.id}>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#147AF3'}
                    color={'white'}
                    fontWeight={'bold'}
                    colorScheme="gray.600"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    {data.status === 'READY_TO_SHIP' ? 'Siap Dikirim' : ''}
                  </Button>
                  <Box>
                    {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                    <Button
                      bg={'transparent'}
                      border={'1px solid #D5D5D5'}
                      borderRadius={'full'}
                      fontSize={'14px'}
                      onClick={() => {
                        setSelectedCardId(data.id);
                        openModal();
                      }}
                    >
                      Tracking Pengiriman
                    </Button>
                    <ModalTracking
                      isOpen={modalIsOpen}
                      onClose={closeModal}
                      selectedCardId={'rCFV2hRPtZp7E7VLoRvge7b2'}
                    />
                    {/*  */}
                  </Box>
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {data.invoiceNumber}
                </Text>
                <hr />

                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'} gap={3} w={'80%'}>
                    {data.cart?.cartItems.map((item, index) => (
                      <Img
                        key={index}
                        w={'52px'}
                        h={'52px'}
                        display={'inline'}
                        borderRadius={'md'}
                        src={item.product?.attachments[0]?.url}
                        mt={3}
                      />
                    ))}
                    <Text
                      mt={4}
                      id="fm500"
                      fontSize={'16px'}
                      textOverflow={'ellipsis'}
                      overflow={'hidden'}
                      whiteSpace={'nowrap'}
                      fontWeight={'700'}
                    >
                      {data.cart?.cartItems.map((item) => item.product?.name)}
                      <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                        {data.cart?.cartItems.map((item) => item.qty)} Barang
                      </Text>
                    </Text>
                  </Box>
                  <Box mt={4} w={'15%'}>
                    <Flex gap={1}>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Total
                      </Text>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Belanja
                      </Text>
                    </Flex>
                    <Text fontWeight={'bold'} fontSize={'14px'}>
                      {formatCurrency(data.price)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}

      {/* END CARD */}
    </>
  );
}
