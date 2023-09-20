import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Text,
} from '@chakra-ui/react';
import Pinpoint from './Maps';

import CloseCircle from '~/assets/icon-pack/close-circle.svg';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalMaps({ isOpen, onClose }: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
      {/* <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>hi</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent> */}

      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text>Tentukan titik pinpoint lokasi kamu</Text>
          <Button
            onClick={onClose}
            p={'0px'}
            colorScheme="none"
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Image w={'30px'} src={CloseCircle} />
          </Button>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Pinpoint Lokasi</span> <br />
            Tandai lokasi untuk mempermudah pemintaan pickup kurir
          </Text>
          <Pinpoint />
        </ModalBody>
        <ModalFooter>
          <Button
            borderRadius="20px"
            colorScheme="blue"
            onClick={() => alert('Tombol Khusus Modal 2')}
          >
            Pilih Lokasi & Lanjut Isi Alamat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
