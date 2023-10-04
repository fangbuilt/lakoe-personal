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
  useDisclosure,
  Text,
  Input,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { whatsappConfiguration } from "~/utils/TemplateMessage";

interface modalWhatsapp {
  userName?: string;
  name: string;
  id: string;
  receiverPhone: string;
  content: string;
}

export default function WhatsappModal(props: modalWhatsapp) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // modal

  return (
    <>
      <Button
        bg={"transparent"}
        border={"1px solid #D5D5D5"}
        borderRadius={"full"}
        fontSize={"14px"}
        height={"32px"}
        onClick={onOpen}
        py={4}
      >
        Hubungi Pembeli
      </Button>

    <Modal onClose={onClose} isOpen={isOpen} isCentered>

        <ModalOverlay bg={"whiteAlpha.50"} />
        <ModalContent>
          <ModalHeader>Send Message To {props.userName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input name="id" value={props.id} hidden></Input>
            <Accordion allowToggle>
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {props.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  {props.content}
                  <Button colorScheme={"whatsapp"} float={"right"}>
                    <Link
                      to={whatsappConfiguration(
                        props.receiverPhone,
                        props.content
                      )}
                    >
                      Kirim
                    </Link>
                  </Button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
