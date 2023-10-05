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
import { Form, Link } from '@remix-run/react';
import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import Copy from '~/assets/icon-pack/copy.svg';
import Edit from '~/assets/icon-pack/edit.svg';
import Link2 from '~/assets/icon-pack/link-2.svg';
import More from '~/assets/icon-pack/more.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import type { IProduct } from '~/interfaces/product/product';

export default function ProductModal(props: IProduct) {
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
        <Link
          target="_blank"
          to={`/${props.store?.name.replace(/ /g, '-').toLowerCase()}/${
            props.slug
          }`}
        >
          <Button
            borderRadius={'50px'}
            size="sm"
            variant="outline"
            fontSize={'14px'}
          >
            <Image src={Link2} />
            Lihat Halaman
          </Button>
        </Link>
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
          <Form method="PATCH">
            <Box py={3}>
              <Text fontSize={'14px'}>
                Ubah harga untuk produk {props.name}
              </Text>
              <InputGroup mt={3} marginBottom={1}>
                <InputLeftAddon children="Rp" />
                <Input type="hidden" name="id" value={props.id} />
                <Input
                  type="number"
                  name="price"
                  placeholder="ubah harga"
                  w={'350px'}
                  autoFocus
                />
              </InputGroup>
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
                type="submit"
                onClick={onEditPriceClose}
              >
                Simpan
              </Button>
            </Box>
          </Form>
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
              Ubah Stok
            </Text>
            <Button onClick={onEditStockClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Form method="PATCH">
            <Box py={3}>
              <Text fontSize={'14px'}>Ubah stok untuk produk {props.name}</Text>
              <InputGroup mt={3} marginBottom={1}>
                <Input type="hidden" name="id" value={props.id} />
                <Input
                  type="number"
                  name="stock"
                  placeholder="ubah stok"
                  w={'400px'}
                  autoFocus
                />
              </InputGroup>
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
                type="submit"
                onClick={onEditStockClose}
              >
                Simpan
              </Button>
            </Box>
          </Form>
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
              Produk {props.name} {''}akan dihapus
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
            <Form method="DELETE">
              <input type="hidden" name="id" value={props.id} />
              <Button
                colorScheme="#0086B4"
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50px'}
                type="submit"
              >
                Ya, Hapus
              </Button>
            </Form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
