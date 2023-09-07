import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';

import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import Copy from '~/assets/icon-pack/copy.svg';
import Edit from '~/assets/icon-pack/edit.svg';
import More from '~/assets/icon-pack/more.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import Link2 from '~/assets/icon-pack/link-2.svg';

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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
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
          <Image src={Link2} />
          Lihat Halaman
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            borderRadius={'50px'}
            size="sm"
            variant="outline"
            gap={1}
          >
            <Image src={More} />
          </MenuButton>
          <MenuList>
            <MenuItem gap={2}>
              <Image src={Edit} />
              Edit Produk
            </MenuItem>
            <MenuItem gap={2}>
              <Image src={Copy} />
              Duplikat Produk
            </MenuItem>
            <MenuItem gap={2} onClick={onDeleteOpen}>
              <Image src={Trash} />
              Hapus Produk
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {/* Change Price */}
      <Modal isOpen={isEditPriceOpen} onClose={onEditPriceClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            <Text fontSize={'18px'} color={'#1D1D1D'}>
              Ubah Harga
            </Text>
            <Button onClick={onEditPriceClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Box py={3}>
            <Text fontSize={'14px'}>
              Ubah harga untuk produk KAOS BASIC COTTON KENARI - DUSTY ROSE [
              COTTON COMBED 30S ]
            </Text>
            <Form method="POST">
              <InputGroup mt={3} marginBottom={1}>
                <InputLeftAddon children="Rp" />
                <Input placeholder="ubah harga" w={'350px'} />
              </InputGroup>
            </Form>
          </Box>

          <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
            <Button
              onClick={onEditPriceClose}
              borderRadius={'50px'}
              variant={'outline'}
            >
              Batal
            </Button>
            <Button
              colorScheme="#0086B4"
              bgColor={'#0086B4'}
              color={'white'}
              borderRadius={'50px'}
            >
              Simpan
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      {/* Change Stock */}
      <Modal isOpen={isEditStockOpen} onClose={onEditStockClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            <Text fontSize={'18px'} color={'#1D1D1D'}>
              Ubah Harga
            </Text>
            <Button onClick={onEditStockClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Box py={3}>
            <Text fontSize={'14px'}>
              Ubah stok untuk produk KAOS BASIC COTTON KENARI - DUSTY ROSE [
              COTTON COMBED 30S ]
            </Text>
            <Form method="POST">
              <InputGroup mt={3} marginBottom={1}>
                {/* <InputLeftAddon children="Rp" /> */}
                <Input placeholder="ubah stok" w={'400px'} />
              </InputGroup>
            </Form>
          </Box>

          <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
            <Button
              onClick={onEditStockClose}
              borderRadius={'50px'}
              variant={'outline'}
            >
              Batal
            </Button>
            <Button
              colorScheme="#0086B4"
              bgColor={'#0086B4'}
              color={'white'}
              borderRadius={'50px'}
            >
              Simpan
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      {/* Delete */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            <Text fontSize={'18px'} color={'#1D1D1D'}>
              Hapus Produk?
            </Text>
            <Button onClick={onDeleteClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Box py={3}>
            <Text fontSize={'14px'}>
              Produk KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]
              akan dihapus
            </Text>
            <Text fontSize={'14px'} mt={3}>
              Produk yang dihapus tidak akan bisa dibatalkan. Pastikan produk
              yang kamu pilih itu sudah benar.
            </Text>
          </Box>

          <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={4}>
            <Button
              onClick={onDeleteClose}
              borderRadius={'50px'}
              variant={'outline'}
            >
              Batalkan
            </Button>
            <Button
              colorScheme="#0086B4"
              bgColor={'#0086B4'}
              color={'white'}
              borderRadius={'50px'}
            >
              Ya, Hapus
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
