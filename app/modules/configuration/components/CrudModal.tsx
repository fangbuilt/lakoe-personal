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
  Image,
  ModalFooter,
  HStack,
  Box,
} from '@chakra-ui/react';
import Edit from '../../../assets/icon-pack/edit.svg';
import Trash from '../../../assets/icon-pack/trash.svg';
import CloseCircle from '../../../assets/icon-pack/close-circle.svg';
import type { ITemplateMessage } from '~/interfaces/TemplateMessage';
import { Form, useNavigation } from '@remix-run/react';
import type { FormEvent } from 'react';
import React, { useRef, useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import Tiptap, { styles } from '../hooks/Tiptap';

export function DeleteButton(props: ITemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Modal isOpen={isOpen} size={'xl'} onClose={onClose} isCentered>
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

  const [title, setTitle] = React.useState(props.name);
  const handleInputChange = (event: any) => setTitle(event.target.value);
  const [newContent, setNewcontent] = React.useState(props.content);

  console.log(title);

  function newfunc() {
    setNewcontent(props.content);
  }

  return (
    <>
      <Button
        onClick={() => {
          newfunc();
          onOpen();
        }}
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
      >
        <Image w={'15px'} src={Edit} />
      </Button>
      <Modal isOpen={isOpen} size={'lg'} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pl={6} pr={6}>
          <Form method="patch">
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
                defaultValue={props.name}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel fontWeight={'normal'}>Detail Isi Pesan</FormLabel>
              <Input
                hidden
                name="updatedContent"
                value={
                  newContent === props.content ? props.content : newContent
                }
              />
              <Tiptap content={props.content} setContent={setNewcontent} />
            </FormControl>
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
            </Flex>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function CreateButton(data: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('');

  const editorRef = useRef(null);
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const [allertMessage, setallertMessage] = useState('');
  const [isFormValidation, setIsFormValidation] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
  });

  let isAdding = state === 'submitting';
  useEffect(() => {
    if (isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  const extensions = [StarterKit];
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  function clearEditor() {
    if (editor) {
      editor.commands.clearContent();
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMessage = () => {
    const { name } = formData;

    if (name.length < 4) {
      setIsFormValidation(false);
      setallertMessage('Nama harus memiliki setidaknya 5 karakter');
    } else {
      setallertMessage('');
      setIsFormValidation(true);
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

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
      <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
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
          <Form
            method="post"
            encType="multipart/form-data"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Box>
              <Input type="hidden" value={data.storeId} name="storeId" />
            </Box>
            <Box fontFamily={'Plus Jakarta Sans'} py={3}>
              <FormControl isRequired mb={5}>
                <FormLabel>Judul Pesan</FormLabel>
                <Text color={'red'}>{allertMessage}</Text>
                <Input
                  name="name"
                  type="text"
                  value={formData.name}
                  placeholder=" Pesanan Konfirmasi Pengiriman"
                  onChange={(event) => {
                    handleChange(event);
                    handleMessage();
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Detail Isi Pesanan</FormLabel>
              </FormControl>
              <Input hidden name="content" value={value} />
              <Box>
                <Button
                  name="storeId"
                  fontWeight={'normal'}
                  fontSize="md"
                  size={'sm'}
                  variant={'outline'}
                  borderRadius={'full'}
                  mr={1}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertContent('[<strong>Nama Pembeli</strong>]')
                      .run()
                  }
                >
                  Nama Pembeli
                </Button>
                <Button
                  name="storeId"
                  fontWeight={'normal'}
                  fontSize="md"
                  size={'sm'}
                  variant={'outline'}
                  borderRadius={'full'}
                  mr={1}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertContent('[<strong>Nama Produk</strong>]')
                      .run()
                  }
                >
                  Nama Produk
                </Button>
                <Button
                  name="storeId"
                  fontWeight={'normal'}
                  fontSize="md"
                  size={'sm'}
                  variant={'outline'}
                  borderRadius={'full'}
                  mr={1}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertContent('[<strong>Nama Toko</strong>]')
                      .run()
                  }
                >
                  Nama Toko
                </Button>

                <Box mt={2} className={styles.container()}>
                  <EditorContent editor={editor} ref={editorRef} />
                </Box>
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
                type="submit"
                onClick={() => {
                  clearEditor();
                  onClose();
                }}
                height={'40px'}
                width={'103px'}
                colorScheme="blue"
                borderRadius={'50px'}
                value="create"
                name="action"
                isDisabled={!isFormValidation}
              >
                Simpan
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
