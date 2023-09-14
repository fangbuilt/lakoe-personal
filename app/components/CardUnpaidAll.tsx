import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { Link, useLoaderData } from '@remix-run/react';
import type { IMessageTemplates } from '~/interfaces/order';
import dummyMessage from '../utils/templateMessage.json';
import type { loader } from '~/routes/order';

export default function UnpaidAllCard() {
  const { unpaidCardAll } = useLoaderData<typeof loader>();
  console.log('unpaidCardAllunpaidCardAllunpaidCardAll', unpaidCardAll);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatter = new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  function createWhatsAppTemplateMessageLink1(
    phone: string,
    template: string
  ): string {
    const whatsappBaseUrl = 'https://wa.me/';
    const encodedPhoneNumber = encodeURIComponent(phone);
    const encodedTemplate = encodeURIComponent(template);
    const whatsappLink = `${whatsappBaseUrl}${encodedPhoneNumber}?text=${encodedTemplate}`;
    return whatsappLink;
  }
  // export const phone = '+6285776410884';

  // console.log(formatter.format(2500)); /* $2,500.00 */
  return (
    <>
      {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

      {/* CARD START HERE */}
      {unpaidCardAll.map((item, index) => (
        // eslint-disable-next-line react/jsx-key
        <Card mb={5} boxShadow={'xs'}>
          <Box key={index}>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#E8C600'}
                    color={'#1D1D1D'}
                    fontWeight={'bold'}
                    colorScheme="red.500"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    {item.status}
                  </Button>

                  {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                  <Button
                    bg={'transparent'}
                    border={'1px solid #D5D5D5'}
                    borderRadius={'full'}
                    fontSize={'14px'}
                    onClick={onOpen}
                  >
                    Hubungi Pembeli
                  </Button>
                  <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>
                        Send Message ke {item.user?.name}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Accordion allowToggle>
                          {dummyMessage.map(
                            (itemtemp: IMessageTemplates, index) => (
                              <AccordionItem key={index}>
                                <Text>
                                  <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                      Pesan {itemtemp.id}
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </Text>
                                <AccordionPanel pb={4}>
                                  {itemtemp.message}
                                  <Button
                                    colorScheme={'whatsapp'}
                                    float={'right'}
                                  >
                                    <Link
                                      to={createWhatsAppTemplateMessageLink1(
                                        item.user?.phone ?? ' ',
                                        itemtemp.message
                                      )}
                                      target="_blank"
                                    >
                                      Kirim
                                    </Link>
                                  </Button>
                                </AccordionPanel>
                              </AccordionItem>
                            )
                          )}
                        </Accordion>
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
                  {/*  */}
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {item.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'} w={'80%'}>
                    <Img
                      w={'52px'}
                      h={'52px'}
                      display={'inline'}
                      src={`${item.cart?.cartItems.map((item) =>
                        item.product?.attachments.map((item) => item.url)
                      )}`}
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
                      {item.cart?.cartItems.map((item) => item.product?.name)}
                      <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                        {item.cart?.cartItems.map((item) => item.qty)} Barang
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
                      {formatter.format(item.price)}
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
