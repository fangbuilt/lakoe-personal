import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

import { BsThreeDots } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdOutlineDelete } from 'react-icons/md';

export default function ProductModal() {
  const {
    isOpen: isEditPriceOpen,
    onOpen: onEditPriceOpen,
    onClose: onEditPriceClose,
  } = useDisclosure();
  const {
    isOpen: isEditStockOpen,
    onOpen: onEditStockOpen,
    onClose: onEditStockClose,
  } = useDisclosure();
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Button
          borderRadius={'50px'}
          size="sm"
          variant="outline"
          onClick={onEditPriceOpen}
          fontSize={'14px'}
        >
          Ubah Harga
        </Button>
        <Button
          borderRadius={'50px'}
          size="sm"
          variant="outline"
          onClick={onEditStockOpen}
          fontSize={'14px'}
        >
          Ubah Stok
        </Button>
        <Button
          borderRadius={'50px'}
          size="sm"
          variant="outline"
          fontSize={'14px'}
        >
          Lihat Halaman
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            // rightIcon={<ChevronDownIcon />}
            borderRadius={'50px'}
            size="sm"
            variant="outline"
            gap={1}
          >
            <BsThreeDots />
          </MenuButton>
          <MenuList>
            <MenuItem gap={1}>
              <FaRegEdit />
              Edit Produk
            </MenuItem>
            <MenuItem gap={1}>
              <HiOutlineDuplicate />
              Duplikat Produk
            </MenuItem>
            <MenuItem gap={1}>
              <MdOutlineDelete />
              Hapus Produk
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {/* Change Price */}
      <Modal isOpen={isEditPriceOpen} onClose={onEditPriceClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Ubah Harga</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'14px'}>
              Ubah harga untuk produk KAOS BASIC COTTON KENARI - DUSTY ROSE [
              COTTON COMBED 30S ]
            </Text>
            <InputGroup mt={2}>
              <InputLeftAddon children="Rp" />
              <Input placeholder="ubah harga" />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onEditPriceClose} borderRadius={'50px'}>
              Batal
            </Button>
            <Button colorScheme="blue" mr={3} borderRadius={'50px'}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Stock */}
      <Modal isOpen={isEditStockOpen} onClose={onEditStockClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'18px'}>Ubah Stok</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'14px'}>
              Ubah stok untuk produk KAOS BASIC COTTON KENARI - DUSTY ROSE [
              COTTON COMBED 30S ]
            </Text>
            <InputGroup mt={2}>
              <Input placeholder="ubah stok" />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onEditStockClose} borderRadius={'50px'}>
              Batal
            </Button>
            <Button colorScheme="blue" mr={3} borderRadius={'50px'}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
