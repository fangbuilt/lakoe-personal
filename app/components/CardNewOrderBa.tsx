/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  Flex,
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
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import NewOrderHooks from '~/modules/webhook/hooks/NewOrderHooks';
import type { loader } from '~/routes/order';

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  modalText: string;
  onConfirm: () => void;
}
export function ModalComponent(props: ModalInterface) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Proses Pesanan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {props.modalText}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
          >
            Selesai di Packing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function CardNewOrderBa() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardProduct = useLoaderData<typeof loader>();
  const { setSelectedProps, afterpacking } = NewOrderHooks();

  const props = cardProduct.dataInvoice;

  const [modalText, setModalText] = useState('');
  return (
    <>
      {props.map((props) => (
        <Card mb={5} boxShadow={'xs'}>
          <Box>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#008F5D'}
                    color={'white'}
                    fontWeight={'bold'}
                    colorScheme="red.500"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    Pesanan Baru
                  </Button>

                  {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                  <Button
                    bg={'transparent'}
                    border={'1px solid #D5D5D5'}
                    borderRadius={'full'}
                    fontSize={'14px'}
                    onClick={() => {
                      setModalText('Apakah sudah di pack dan siap dikirim?');
                      setSelectedProps(props); //biarin error...
                      onOpen();
                    }}
                  >
                    Proses Pesanan
                  </Button>
                  {/*  */}
                  {/* Modal */}
                  <ModalComponent
                    isOpen={isOpen}
                    onClose={onClose}
                    modalText={modalText}
                    onConfirm={afterpacking}
                  />
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {props.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'} w={'80%'}>
                    <Image
                      w={'52px'}
                      h={'52px'}
                      display={'inline'}
                      src={`${props.cart?.cartItems.map((a) =>
                        a.product?.attachments.map((b) => b.url)
                      )}`}
                      mt={3}
                      mx={3}
                    />
                    <Link to={`/order/detail/${props.id}`}>
                      <Text
                        mt={4}
                        id="fm500"
                        fontSize={'16px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        fontWeight={'700'}
                      >
                        {props.cart?.cartItems.map((a) => a.product?.name)}
                      </Text>
                    </Link>
                    <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                      {props.cart?.cartItems.map((a) => a.qty)} Barang
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
                      {formatCurrency(props.price)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
}
