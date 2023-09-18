import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  TabPanel,
  Textarea,
  Text,
  Image,
  Alert,
  AlertTitle,
  Center,
} from '@chakra-ui/react';
import GalleryAdd from '~/assets/icon-pack/gallery-add.svg';
import GalleryEdit from '~/assets/icon-pack/gallery-edit.svg';
import TickCircle from '~/assets/icon-pack/tick-circle.svg';
import CloseCircleRed from '~/assets/icon-pack/close-circle-red.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import {
  createStoreInformation,
  updateStoreInformation,
} from '~/modules/configuration/configuration.service';
import { Form } from '@remix-run/react';

export function Informations() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [slogan, setSlogan] = useState<string>('');
  const [namaToko, setNamaToko] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [logoAttachment, setlogoAttachment] = useState<string>('');

  const [sloganFilled, setSloganFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [namaTokoFilled, setNamaTokoFilled] = useState(false);
  const [storeId] = useState<string | null>(null);

  const characterLimitSlogan = 48;
  const characterLimitNamaToko = 48;
  const characterLimitDescription = 200;

  useEffect(() => {
    if (storeId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/configuration/store_configuration/?id=${storeId}`
          );
          if (response.ok) {
            const data = await response.json();
            setNamaToko(data.name);
            setSlogan(data.slogan);
            setDescription(data.description);
            setDomain(data.domain);
            setlogoAttachment(data.logoAttachment);
            //data lainnya
          } else {
            console.error('Gagal mengambil data toko');
          }
        } catch (error) {
          console.error('Terjadi kesalhan saat mengambil data toko');
        }
      };
      fetchData();
    }
  }, [storeId]);

  const handleSloganChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSlogan(text);
    setSloganFilled(!!text);
  };

  const handleTokoFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setNamaToko(text);
    setNamaTokoFilled(!!text);
  };

  const handleDescriptionFilled = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    setDescription(text);
    setDescriptionFilled(!!text);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          setSelectedImage(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          setSelectedImage(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleSaveClick = async () => {
    if (sloganFilled && descriptionFilled && namaTokoFilled) {
      if (storeId) {
        // Ini adalah mode update, panggil fungsi update dengan storeId
        await updateStoreInformation(storeId, {
          name: namaToko,
          slogan,
          description,
          domain,
          logoAttachment,
        });
        setAlertMessage('Informasi toko berhasil diperbarui');
      } else {
        // Ini adalah mode create, panggil fungsi create
        await createStoreInformation({
          name: namaToko,
          slogan,
          description,
          domain,
          logoAttachment,
        });
        setAlertMessage('Informasi toko berhasil disimpan');
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } else {
      setAlertMessage('Semua data wajib diisi!');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      setSlogan('');
      setDescription('');
      setNamaToko('');
    }
  }, [showAlert]);

  return (
    <TabPanel>
      <Text fontWeight={'semibold'} fontSize={'16px'} mb={3}>
        Informasi Toko
      </Text>
      <Form method="post">
        <Input hidden name="actionType" value="create" />
        <FormControl>
          <Grid
            h="150px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem colSpan={1}>
              <FormLabel fontSize={'13px'} color={'blackAlpha.700'}>
                Slogan
              </FormLabel>
              <Input
                fontSize={'13px'}
                placeholder="Buat slogan untuk toko"
                py={-5}
                value={slogan}
                name="slogan"
                onChange={handleSloganChange}
                maxLength={characterLimitSlogan}
              />

              <Text
                display={'flex'}
                justifyContent={'end'}
                mt={1}
                fontSize={'13px'}
                color="blackAlpha.500"
              >
                {slogan.length}/{characterLimitSlogan}
              </Text>
            </GridItem>
            <GridItem rowSpan={2}>
              <FormLabel fontSize={'13px'} color={'blackAlpha.700'}>
                Deskripsi
              </FormLabel>

              <Textarea
                fontSize={'13px'}
                h={'145px'}
                resize={'none'}
                placeholder="Tuliskan deskripsi toko disini"
                value={description}
                name="description"
                onChange={handleDescriptionFilled}
                maxLength={characterLimitDescription}
              />

              <Text
                display={'flex'}
                justifyContent={'end'}
                mt={1}
                fontSize={'13px'}
                color="blackAlpha.500"
              >
                {description.length}/{characterLimitDescription}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <FormLabel fontSize={'13px'} color={'blackAlpha.700'}>
                Nama Toko
              </FormLabel>
              <Input
                fontSize={'13px'}
                placeholder="Buat Nama Toko"
                value={namaToko}
                name="name"
                onChange={handleTokoFilled}
                maxLength={characterLimitNamaToko}
              />

              <Text
                display={'flex'}
                justifyContent={'end'}
                mt={1}
                fontSize={'13px'}
                color="blackAlpha.500"
              >
                {namaToko.length}/{characterLimitNamaToko}
              </Text>
            </GridItem>
          </Grid>
        </FormControl>

        <Flex alignItems={'end'} justifyContent={'end'}>
          <Button
            type="submit"
            size={'sm'}
            px={5}
            mt={'70px'}
            mb={'3'}
            color={'white'}
            borderRadius={'full'}
            bg={'#0086B4'}
            onClick={handleSaveClick}
          >
            Simpan
          </Button>
        </Flex>
      </Form>
      {showAlert && (
        <Center>
          <Alert
            justifyContent={'space-between'}
            w={'30%'}
            color="white"
            status={
              sloganFilled && descriptionFilled && namaTokoFilled
                ? 'success'
                : 'error'
            }
            variant={'subtle'}
            borderRadius={'10px'}
            bg={'blackAlpha.800'}
            position={'fixed'}
            top={'5px'}
            py={0}
            px={3}
          >
            <Image
              sizes="10px"
              me={2}
              src={
                sloganFilled && descriptionFilled && namaTokoFilled
                  ? TickCircle
                  : CloseCircleRed
              }
            />
            <AlertTitle fontWeight={'normal'} fontSize={'13px'}>
              {alertMessage}
            </AlertTitle>
            <Button
              fontSize={'13px'}
              colorScheme="none"
              onClick={() => setShowAlert(false)}
            >
              Ok
            </Button>
          </Alert>
        </Center>
      )}
      <hr />
      <Text fontWeight={'semibold'} fontSize={'16px'} mt={3}>
        Logo Toko
      </Text>
      <Box
        w="100px"
        my={3}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <>
            <Box
              border="0.5px solid "
              borderColor={'blackAlpha.400'}
              borderWidth="2px"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              borderRadius="10px"
              p={1}
              w="130px"
              h="130px"
              position={'relative'}
            >
              <Image
                w="100%"
                h="100%"
                src={selectedImage} // belum dari data base
                objectFit={'cover'}
              />
              <Input
                hidden
                type="file"
                accept="image/*"
                // name="logoAttachment"
                onChange={handleImageChange}
              />
              <Button
                size={'xs'}
                boxShadow={'lg'}
                p={0}
                colorScheme="none"
                borderRadius={'full'}
                top={'98px'}
                left={'72px'}
                position={'absolute'}
                bg={'white'}
              >
                <Image m={0} boxSize={'15px'} src={GalleryEdit} />
              </Button>
              <Button
                onClick={handleDeleteImage}
                size={'xs'}
                boxShadow={'lg'}
                p={0}
                colorScheme="none"
                borderRadius={'full'}
                top={'98px'}
                left={'98px'}
                position={'absolute'}
                bg={'white'}
              >
                <Image m={0} boxSize={'15px'} src={Trash} />
              </Button>
            </Box>
          </>
        ) : (
          <>
            <FormLabel
              border="dashed"
              borderWidth="2px"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              borderRadius="10px"
              borderColor="blackAlpha.300"
              w="130px"
              h="130px"
            >
              <Image
                justifyContent="center"
                w="30px"
                h="30px"
                src={GalleryAdd}
              />

              <Input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Text fontSize={'13px'} color={'blackAlpha.700'}>
                Unggah photo
              </Text>
            </FormLabel>
          </>
        )}
      </Box>
      <Text fontSize={'13px'} w={'70%'}>
        Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
        Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
      </Text>
    </TabPanel>
  );
}
