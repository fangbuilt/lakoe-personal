import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import type { IProduct } from '~/interfaces/product/product';
import { updateIsActive } from '~/modules/product/product.service';

export default function ProductModalSelect(
  props: IProduct & { selectedProductCount: number }
) {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isDisableOpen,
    onOpen: onDisableOpen,
    onClose: onDisableClose,
  } = useDisclosure();

  const updateStatus = (productId: string) => {
    updateIsActive({ id: productId, isActive: false });
  };

  return (
    <>
      <ButtonGroup variant={'outline'}>
        <Button
          borderRadius={'full'}
          colorScheme={'#0086B4'}
          size={'xs'}
          onClick={onDeleteOpen}
        >
          <Image src={Trash} />
        </Button>
        <Button
          borderRadius={20}
          fontSize={'14px'}
          color={'dark'}
          colorScheme={'#0086B4'}
          size={'xs'}
          onClick={onDisableOpen}
        >
          Nonaktifkan Produk
        </Button>
      </ButtonGroup>

      {/* Nonaktifkan */}
      <Modal isOpen={isDisableOpen} onClose={onDisableClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            <Text fontSize={'18px'} color={'#1D1D1D'}>
              Nonaktifkan {props.selectedProductCount} {''} Produk
            </Text>
            <Button onClick={onDisableClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Box py={3}>
            <Text fontSize={'14px'} mt={3}>
              Produk yang dinonaktifkan tidak akan dapat dilihat oleh calon
              pembeli. Pastikan tindakan kamu sudah benar.
            </Text>
          </Box>

          <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={4}>
            <Button
              onClick={onDisableClose}
              borderRadius={'50px'}
              variant={'outline'}
            >
              Batalkan
            </Button>
            <Form method="PATCH">
              <input type="hidden" name="id" value={props.id} />
              <Button
                colorScheme="#0086B4"
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50px'}
                type="submit"
                value={props.id.toString()}
                onClick={() => updateStatus(props.id)}
              >
                Ya, Nonaktifkan
              </Button>
            </Form>
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
              Hapus {props.selectedProductCount} {''} Produk
            </Text>
            <Button onClick={onDeleteClose} variant="link">
              <Image src={CloseCircle} />
            </Button>
          </Box>
          <Box py={3}>
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
