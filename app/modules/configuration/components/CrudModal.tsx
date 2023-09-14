import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Image,
  ModalFooter,
  HStack,
  Box,
} from '@chakra-ui/react';
import Edit from '../../../assets/icon-pack/edit.svg';
import Trash from '../../../assets/icon-pack/trash.svg';
import CloseCircle from '../../../assets/icon-pack/close-circle.svg';
import type { ITemplateMessage } from '~/interfaces/TemplateMessage';
import { Form } from '@remix-run/react';
import React from 'react';
// import { useState } from 'react';
// import Tiptap from '../hooks/Tiptap'
import Newapp from '../hooks/Newtiptap';

export function DeleteButton(props: ITemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.id;
  console.log(id);

  return (
    <Box>
      <Button
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
        onClick={onOpen}
      >
        <Image w={'15px'} src={Trash} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={'xl'}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pl={6} pr={6}>
          <Form method="post">
            <Flex
              pt={4}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={3}
            >
              <Text fontSize={'xl'} fontWeight={'medium'}>
                Hapus Template Pesan
              </Text>
              <Button
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
                onClick={onClose}
                variant={'link'}
              >
                <Image w={'30px'} src={CloseCircle} />
              </Button>
            </Flex>
            <HStack spacing="3px">
              <Text>Apakah kamu yakin untuk menghapus</Text>
              <Text display={'flex'}>
                <Text as={'b'}>{props.name}</Text>?
              </Text>
            </HStack>
            {/* <Text>
            <Highlight
              query="Pesan Konfirmasi Pesanan"
              styles={{ fontWeight: 'bold' }}
            >Apakah kamu yakin untuk menghapus Pesan Konfirmasi Pesanan?</Highlight>
          </Text> */}
            <Text>
              Sebab, kamu tidak akan dapat mengembalikan template pesan yang
            </Text>
            <Text>sudah dihapus.</Text>
            <Input hidden name="id" value={props.id} />
            <Flex justifyContent={'flex-end'} pb={4} mt={5}>
              <Button
                variant={'outline'}
                borderRadius={'full'}
                mr={2}
                onClick={onClose}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                value="delete"
                name="action"
                colorScheme="blue"
                color={'whiteAlpha.900'}
                borderRadius={'full'}
                onClick={onClose}
              >
                Ya, Hapus
              </Button>
            </Flex>
          </Form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export function UpdateButton(props: ITemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.id;
  console.log(id);

  const [title, setTitle] = React.useState(props.name);
  const handleInputChange = (event) => setTitle(event.target.value);
  const [value, setValue] = React.useState(props.content);
  const handleChange = (event) => setValue(event.target.value);

  // const App = () => {
  //   return (
  //     <div className='App'>
  //       <Tiptap />
  //     </div>
  //   )
  // }
  // const [state, newState] = useState('cobaa')
  // let error = <strong>{state}</strong>
  // const [myState, setMyState] = React.useState(props.content)
  // const custom = <Text>Nama Customer</Text>
  // const styleCustom = custom as string
  // const custom = useState(() => Page1)
  // const baru = <Text>nama produk</Text>

  // function Page1() {
  //   return <p>Hello world!</p>
  // }

  // function Page2() {
  //   return <p>Hello world!</p>
  // }

  // const components = {
  //   'page1': Page1,
  //   'page2': Page2,
  // }

  // let [page, setPage] = useState('page1')

  // let [Page, setPage] = useState({Page: Page1})
  // function myComponent() {
  //   return(
  //     return <Text>Nama Customer</Text>
  //   )
  // }

  // const [additionalText, setAdditionalText] = useState('');

  // const handleAddComponent = () => {
  //   setAdditionalText('<Text>This is additional text.</Text>');
  // };
  // const text = [<strong>not</strong>]

  function updateState(value) {
    if (value === 'customer') {
      setValue((prevState) => prevState + '[Nama Customer]');
      // setValue((prevState) => prevState + additionalText )
      // setMyState((prevState) => prevState + "Nama Customer")
    } else if (value === 'produk') {
      setValue((prevState) => prevState + '[Nama Produk]');
    } else if (value === 'toko') {
      setValue((prevState) => prevState + '[Nama Toko]');
    }
  }

  // function renderStyledText(value) {
  //   const parts = value.split('customerbaru');
  //   return (
  //     <>
  //       {parts[0]}
  //       <Text as="span" color="red" fontWeight="bold">
  //         customerbaru
  //       </Text>
  //       {parts[1]}
  //     </>
  //   );
  // }

  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
      >
        <Image w={'15px'} src={Edit} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={'lg'}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pl={6} pr={6}>
          <Form method="post">
            <Flex
              pt={4}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={3}
            >
              <Text fontSize={'xl'} fontWeight={'medium'}>
                Ubah Template Pesan
              </Text>
              <Button
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
                onClick={onClose}
                variant={'link'}
              >
                <Image w={'30px'} src={CloseCircle} />
              </Button>
            </Flex>
            <Input hidden name="id" value={props.id} />
            <FormControl isRequired>
              <FormLabel fontWeight={'normal'}>Judul Pesan</FormLabel>
              <Input
                name="updatedName"
                onChange={handleInputChange}
                value={title}
              />
              {/* <Input name="updatedMessage" onChange={handleInputChange} value={title} /> */}
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel fontWeight={'normal'}>Detail Isi Pesan</FormLabel>
              {/* <Button onClick={handleAddComponent} fontWeight={'normal'} fontSize="md" size={'sm'} variant={'outline'} borderRadius={'full'} mr={1}>Nama Customer</Button> */}
              <Button
                onClick={() => updateState('customer')}
                fontWeight={'normal'}
                fontSize="md"
                size={'sm'}
                variant={'outline'}
                borderRadius={'full'}
                mr={1}
              >
                Nama Customer
              </Button>
              <Button
                onClick={() => updateState('produk')}
                fontWeight={'normal'}
                fontSize="md"
                size={'sm'}
                variant={'outline'}
                borderRadius={'full'}
                mr={1}
              >
                Nama Produk
              </Button>
              <Button
                onClick={() => updateState('toko')}
                fontWeight={'normal'}
                fontSize="md"
                size={'sm'}
                variant={'outline'}
                borderRadius={'full'}
                mr={1}
              >
                Nama Toko
              </Button>
              <Textarea
                my={2}
                height={'150px'}
                onChange={handleChange}
                value={value}
                name="updatedContent"
              />
              {/* <Textarea mt={2} height={'150px'} onChange={handleChange} value={error} name="updatedContent"/> */}
              {/* {renderStyledText(value)} */}
              {/* <Textarea mt={2} height={'150px'} onChange={handleChange} value={value} name="updatedMessage"/> */}
            </FormControl>
            <Newapp />
            <Flex justifyContent={'flex-end'} pb={4} mt={'37px'}>
              <Button
                variant="outline"
                width={'100px'}
                mr={2}
                borderRadius={'full'}
                onClick={onClose}
              >
                Batalkan
              </Button>
              <Button
                color={'whiteAlpha.900'}
                width={'100px'}
                borderRadius={'full'}
                colorScheme="blue"
                onClick={onClose}
                type="submit"
                value="update"
                name="action"
              >
                Simpan
              </Button>
              {/* <Button color={'whiteAlpha.900'} width={'100px'} borderRadius={'full'} colorScheme="blue" onClick={()=> console.log(value)} type="submit" value='update' name="action">Simpan</Button> */}
            </Flex>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function AddButon() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={'12px'}
        size="sm"
        bg={'#0086B4'}
        color={'white'}
        borderRadius={'full'}
      >
        Buat Template
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size={'lg'}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent px={5} py={4}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontSize={'18px'}
              fontStyle={'normal'}
              color={'text-dark'}
              fontWeight={'bold'}
            >
              Buat Template Pesan Baru
            </Text>
            <Button
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              onClick={onClose}
              variant={'link'}
            >
              <Image w={'30px'} src={CloseCircle} />
            </Button>
          </Box>
          <Box fontFamily={'Plus Jakarta Sans'} py={3}>
            <FormControl id="order-id" isRequired mb={5}>
              <FormLabel>Judul Pesan</FormLabel>
              <Input type="text" placeholder="Pesanan Konfirmasi Pengiriman" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Detail Isi Pesanan</FormLabel>
            </FormControl>

            <Box
              alignItems={'flex-start'}
              display={'flex'}
              maxW={'fit-content'}
              borderRadius={'50%'}
              gap={'3'}
            >
              <Button
                borderRadius={'var(--rounded-full, 9999px)'}
                bg={'white'}
                border={'1px solid var(--gray-300, #D5D5D5)'}
                color={'var(--text-dark, #1D1D1D)'}
                height={'30px'}
              >
                <Text color={'gray.500'} fontSize={'14px'}>
                  Nama Pembeli
                </Text>
              </Button>
              <Button
                borderRadius={'50px'}
                bg={'white'}
                border={'1px solid var(--gray-300, #D5D5D5)'}
                height={'30px'}
              >
                <Text fontSize={'14px'} color={'gray.500'}>
                  Nama Produk
                </Text>
              </Button>
              <Button
                borderRadius={'50px'}
                bg={'white'}
                border={'1px solid var(--gray-300, #D5D5D5)'}
                height={'30px'}
              >
                <Text fontSize={'14px'} color={'gray.500'}>
                  Nama Toko
                </Text>
              </Button>
            </Box>
            <Box mt={'10px'}>
              <Textarea
                height={'150px'}
                color={'gray.500'}
                placeholder="Tuliskan Pesanmu"
              ></Textarea>
            </Box>
          </Box>

          <ModalFooter gap={'3'}>
            <Button
              height={'40px'}
              width={'103px'}
              variant="ghost"
              onClick={onClose}
              gap={'var(--1, 4px)'}
              borderRadius={'50px'}
              border={'1px solid var(--gray-300, #D5D5D5)'}
            >
              Batalkan
            </Button>
            <Button
              onClick={onClose}
              height={'40px'}
              width={'103px'}
              colorScheme="blue"
              borderRadius={'50px'}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
