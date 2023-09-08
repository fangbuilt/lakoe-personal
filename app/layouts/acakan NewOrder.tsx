/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  Flex,
  Img,
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
import UseSearch from '../hooks/useSearchOrder';

import React, { useState } from 'react';

export default function NewOrder() {
  const { filteredOrders } = UseSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBalanceNotif = async () => {
    try {
      const mailerBaseUrl = 'https://connect.mailerlite.com';
      const mailerEndPoint = '/api/subscribers';
      const mailerApiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZTNhM2I0ZjQyM2I1ZjMzNGFmZjYwMTI1M2NiOWNiYjkzMmJlYmRhNjM2MjA4Mjc1NjY4Zjc2MzBiMDNlZTdmNzNlZTYwNzAzYmNkNTdmMWQiLCJpYXQiOjE2OTM5MzExMjUuNDQ3MDg5LCJuYmYiOjE2OTM5MzExMjUuNDQ3MDkyLCJleHAiOjQ4NDk2MDQ3MjUuNDQyOTIsInN1YiI6IjYxMTE1NyIsInNjb3BlcyI6W119.ulMjk2-7itYmldu0zKRZutb37X5Ys8GeUe8hHN9X0y_dJmaBjZFB9xzfupK-6oIgO9aFWkXhMfj623BKE64sK75rJo99WtCqvgOuuG4XS2xeqvKlXY_2e45dSmE8-N-IKthQoYNqX02hBu-7fMUjByQ5ViQjq2jl1to3f7nOg_zNmy8pbQoPdCemFGtbvwBtJ0ACbog-mLztu6vNDEto7WbMYfWXWpMmY_6s4qPmKR30EhX4UyzK9UQ2pkxGpXCNERra8Bm0EMsJc35vgW12nFtnZP3g4Puz_DI5tiDWjQ8b6VIWLCJUrpiWZ9MeemBABl5azOHOFmkf-WH0xtRE4NbW9QWQN3sEIqEMBkSrlFbUdj7U10R5U2l-w3NY8EavxR47fcwQL08ef6JySz45NwbbNdQ_ymhK05AnEXrd5deZBhmU2MUr-sqeSwtTdivD8g8W3uuq6lraArs5bE5UypPyk-reT4exdvAnSCxmtn7q0FYJlqz3mTDZNpudJL98EAhCY4tqntbg7KqDpirDLhzHVhqzASgpapFM5E1WMK1nBK2diQjZpR7F5qovvcvOIjCu4vKMIrCbvtFi6rF7bnJLRjr9BdRxrQmCrdyEN7xlV1pEeIgl1K0mfbdD-zhTrNHoAa7lCbtVYsH397BXawtUNLExcJnB5z8bFhCULic'; //Badriana

      const mailerData = {
        email: 'aderino@puja.com',
        fields: {
          company: 'ADD MORE BALANCE', //company berperan sebagai "title"
          preferences:
            "you need to add more balance to your platform system so that your sellers can keep sending packages to their customer without being delayed just because you're lack of money. do what you gotta do",
        },
      };
    } catch (error) {
      alert(error);
    }
  };

  const handleOrderCourier = async () => {
    try {
      const baseUrl = 'https://api.biteship.com';
      const endpoint = '/v1/orders';
      const apiKey =
        'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYml0ZXNoaXBMYWtvZSIsInVzZXJJZCI6IjY0ZjU4ZjdiZWJlNjI2M2RiOWY5MWYxMCIsImlhdCI6MTY5NDA3MjA0N30.t-4Rg4MSvhx6Uq9bKhVlo2DFPvb3L9jmObDCwFzSuuk'; //Rino - Puja

      const orderData = {
        shipper_contact_name: 'Amir',
        shipper_contact_phone: '081277882932',
        shipper_contact_email: 'biteship@test.com',
        shipper_organization: 'Biteship Org Test',
        origin_contact_name: 'Amir',
        origin_contact_phone: '081740781720',
        origin_address: 'Plaza Senayan, Jalan Asia Afrika...',
        origin_note: 'Deket pintu masuk STC',
        origin_coordinate: {
          latitude: -6.2253114,
          longitude: 106.7993735,
        },
        origin_postal_code: 12440,
        destination_contact_name: 'John Doe',
        destination_contact_phone: '08170032123',
        destination_contact_email: 'jon@test.com',
        destination_address: 'Lebak Bulus MRT...',
        destination_postal_code: 12950,
        destination_note: 'Near the gas station',
        destination_cash_proof_of_delivery: true,
        destination_coordinate: {
          latitude: -6.28927,
          longitude: 106.77492000000007,
        },
        courier_company: 'grab',
        courier_type: 'instant',
        courier_insurance: 500000,
        delivery_type: 'later',
        delivery_date: '2024-09-24',
        delivery_time: '12:00',
        order_note: 'Please be careful',
        metadata: {},
        items: [
          {
            id: '5db7ee67382e185bd6a14608',
            name: 'Black L',
            image: '',
            description: 'White Shirt',
            value: 165000,
            quantity: 1,
            height: 10,
            length: 10,
            weight: 200,
            width: 10,
          },
        ],
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      };

      const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
      const responseData = await response.json();

      console.log('Respon dari BiteShip:', responseData);
    } catch (error) {
      console.error('Kesalahan saat mengirim pesanan ke BiteShip:', error);
    }
  };

  const [modalText, setModalText] = useState('');

  return (
    <>
      <Card mb={5}>
        {filteredOrders.map((datas, index) => (
          <Box key={index}>
            <Box mt={5} borderTop={'1px'} borderColor={'gray.100'} py={'4'}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#008F5D'}
                    color={'white'}
                    fontWeight={'normal'}
                    colorScheme="gray.600"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    Pesanan Selesai
                  </Button>
                  <Button
                    bg={'transparent'}
                    border={'1px solid #D5D5D5'}
                    borderRadius={'full'}
                    fontSize={'14px'}
                    onClick={() => {
                      // Munculkan modal dan atur teks modal sesuai kebutuhan
                      setModalText(
                        'You can scroll the content behind the modal'
                      );
                      onOpen();
                    }}
                  >
                    Proses Pesanan
                  </Button>
                  {/* Modal */}
                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={() => {
                      setModalText('');
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Proses Pesanan</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                          {modalText}
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            // Tutup modal dan atur ulang teks modal
                            setModalText('');
                            onClose();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button variant="ghost" onClick={handleOrderCourier}>
                          Selesai di Packing
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {datas.invoice}
                </Text>
                <hr />
                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'}>
                    <Img
                      src={`${datas.imageProduct}`}
                      w={'62px'}
                      h={'62px'}
                      display={'inline'}
                    />
                    <Text mt={4} id="fm500" fontWeight={'bold'}>
                      {datas.titleProduct}
                      <Text color={'gray.400'} fontWeight={'normal'}>
                        1 Barang
                      </Text>
                    </Text>
                  </Box>
                  <Box me={5} mt={4}>
                    <Flex gap={1}>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Total
                      </Text>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Belanja
                      </Text>
                    </Flex>
                    <Text fontWeight={'bold'} fontSize={'14px'}>
                      Rp 200.000
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Card>
    </>
  );
}
