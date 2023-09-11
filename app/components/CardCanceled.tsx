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
import { Link } from '@remix-run/react';
import type { IMessageTemplates, IOrderList } from '~/interfaces/order';
import {
  createWhatsAppTemplateMessageLink1,
  phoneNumber,
} from './TemplateMessage';
import dummyMessage from '../tests/utils/templateMessage.json';

export default function CardCenceled(props: IOrderList) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card mb={5} boxShadow={'xs'}>
        <Box>
          <Box mt={5}>
            <Box>
              <Flex justifyContent={'space-between'} px={2}>
                <Button
                  bg={'#EA3829'}
                  color={'white'}
                  fontWeight={'bold'}
                  colorScheme="red.500"
                  size={'sm'}
                  pointerEvents={'none'}
                >
                  Dibatalkan
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
                    <ModalHeader>Send Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Accordion allowToggle>
                        {dummyMessage.map((item: IMessageTemplates, index) => (
                          <AccordionItem key={index}>
                            <Text>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                  Pesan {item.id}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </Text>
                            <AccordionPanel pb={4}>
                              {item.message}
                              <Button colorScheme={'whatsapp'} float={'right'}>
                                <Link
                                  to={createWhatsAppTemplateMessageLink1(
                                    phoneNumber,
                                    item.message
                                  )}
                                >
                                  Kirim
                                </Link>
                              </Button>
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
              <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                {props.invoice}
              </Text>
              <hr />
              <Flex justifyContent={'space-between'}>
                <Box display={'flex'} w={'80%'}>
                  <Img
                    w={'52px'}
                    h={'52px'}
                    display={'inline'}
                    src={props.imageProduct}
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
                    {props.title}
                    <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                      1 Barang
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
                    Rp {props.totalAmount}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
