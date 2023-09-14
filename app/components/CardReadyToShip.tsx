import { Box, Button, Card, Flex, Img, Text } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { GetDataProductReadyToShip } from '~/modules/order/order.service';

import ModalTracking from './orderTrackingModal';

export async function loader() {
  return await GetDataProductReadyToShip();
}

export default function ReadyToShipCard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const {fetchData} = getBiteshipTracking()

  const cardProduct = useLoaderData<typeof loader>();

  console.log('ini adalah isi cardProduct: ', cardProduct);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const product = cardProduct.cart.cartItems.map((cartItem) => {
  //   return { ...cartItem, cartItem };
  // });

  return (
    <>
      {/* CARD START HERE */}

      <Card mb={5} boxShadow={'xs'}>
        {cardProduct.map((data) => (
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
                    Siap Dikirim {data.status}
                  </Button>
                  <Box>
                    {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                    <Button
                      bg={'transparent'}
                      border={'1px solid #D5D5D5'}
                      borderRadius={'full'}
                      fontSize={'14px'}
                      onClick={openModal}
                    >
                      Tracking Pengiriman
                    </Button>
                    <ModalTracking isOpen={modalIsOpen} onClose={closeModal} />
                    {/*  */}
                  </Box>
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {data.invoiceNumber}
                </Text>
                <hr />

                {data.cart?.cartItems?.map((item) => (
                  <Flex justifyContent={'space-between'} key={item.id}>
                    <Box display={'flex'} w={'80%'}>
                      <Img
                        w={'52px'}
                        h={'52px'}
                        display={'inline'}
                        // src={props.imageProduct}
                        mt={3}
                      />
                      <Text
                        mt={4}
                        id="fm500"
                        fontSize={'16px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        fontWeight={'700'}
                      >
                        {item.product?.name}
                        <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                          {item.qty} Barang
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
                        Rp {item.qty * item.price}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Card>

      {/* END CARD */}
    </>
  );
}
