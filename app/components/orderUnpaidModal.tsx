import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  // Step,
  // StepDescription,
  // StepIndicator,
  // StepSeparator,
  // StepStatus,
  // StepTitle,
  // Stepper,
  Text,
} from '@chakra-ui/react';
import { Link, useLoaderData } from '@remix-run/react';
// import { BsCircleFill } from 'react-icons/bs';
import type { loader } from '~/routes/order';
import { createWhatsAppTemplateMessageUnpaid } from '~/utils/templateOrder';

interface SendProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: string;
  itemName: string;
  itemPhone: string;
}
export default function OrderUnpaidModal(props: SendProps) {
  const { getTemplateMessages } = useLoaderData<typeof loader>();

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay bg={'whiteAlpha.100'} />
        <ModalContent>
          <ModalHeader>Send Message ke {props.itemName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowToggle>
              {getTemplateMessages.map((itemtemp) => (
                <AccordionItem key={itemtemp.id}>
                  <Text>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {itemtemp.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={4}>
                    {itemtemp.content}
                    <Button colorScheme={'whatsapp'} float={'right'}>
                      <Link
                        to={createWhatsAppTemplateMessageUnpaid(
                          props.itemPhone ?? '',
                          itemtemp.content
                        )}
                        target="_blank"
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
    </>
  );
}
