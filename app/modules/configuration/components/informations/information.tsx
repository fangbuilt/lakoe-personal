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
  AlertIcon,
  Alert,
  AlertTitle,
  Center,
} from '@chakra-ui/react';
import GalleryAdd from '~/assets/icon-pack/gallery-add.svg';
import GalleryEdit from '~/assets/icon-pack/gallery-edit.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import React, { useState } from 'react';
import { Form } from '@remix-run/react';
import type { FileWithPath } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import crypto from 'crypto';
import Loading from '../loading';

const CLOUDINARY_UPLOAD_PRESET = 'eenwxkso';
const CLOUDINARY_CLOUD_NAME = 'djpxhz3vu';

export function Informations() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [slogan, setSlogan] = useState<string>('');
  const [namaToko, setNamaToko] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const characterLimitSlogan = 48;
  const characterLimitNamaToko = 48;
  const characterLimitDescription = 200;

  const handleSaveButtonClick = () => {
    console.log('URL gambar:', selectedImage);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSloganChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSlogan(text);
  };

  const handleTokoFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setNamaToko(text);
  };

  const handleDescriptionFilled = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    setDescription(text);
  };

  const handleDrop = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      setIsUploading(true);
      const response: AxiosResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded:', response.data.secure_url);
      setUploadedImage(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
      }, 5000);
    }
  };

  const handleRemove = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setUploadedImage(null);

      deleteImageFromCloudinary(uploadedImage);
      console.log('ini adalah', uploadedImage);
    }
  };

  const deleteImageFromCloudinary = async (imageUrl: string | null) => {
    try {
      // Extract public_id from the Cloudinary image URL
      const publicId = imageUrl
        ?.split('/')
        .pop()
        ?.replace(/\.[^/.]+$/, '') as string;
      console.log('publicoy', publicId);

      const timestamp = new Date().getTime();
      const apiKey = '398171867266613';
      const apiSecret = '4frGZZhXI0IgySCq2nWuYitfOyE';
      const signature = generateSHA1(generateSignature(publicId, apiSecret));
      console.log('ini 1');
      // Send a DELETE request to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }
      );

      console.log('ini response', response);

      console.log('Image deleted from Cloudinary');
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  };

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  return (
    <TabPanel>
      <Text fontWeight={'semibold'} fontSize={'16px'} mb={3}>
        Informasi Toko
      </Text>
      <Form method="post" encType="multipart/form-data">
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
            <Grid bg={'pink'}>
              <Input
                hidden
                name="logoAttachment"
                fontSize={'13px'}
                value={uploadedImage || ''}
              />
            </Grid>
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
            onClick={handleSaveButtonClick}
          >
            Simpan
          </Button>
        </Flex>
        {showAlert && (
          <Center>
            <Alert
              justifyContent={'space-between'}
              color="white"
              status="success"
              mt={4}
              variant={'subtle'}
              borderRadius={'10px'}
              bg={'blackAlpha.800'}
              position={'fixed'}
              top={'50px'}
              py={0}
              px={3}
              w={'25%'}
            >
              <AlertIcon fontSize={'13px'} color={'white'} />
              <AlertTitle fontWeight={'normal'} fontSize={'13px'}>
                Informasi toko berhasil disimpan.
              </AlertTitle>
              <Button
                fontSize={'13px'}
                colorScheme="none"
                onClick={() => setShowAlert(false)}
              >
                ok
              </Button>
            </Alert>
          </Center>
        )}
        <hr />
        <Text fontWeight={'semibold'} fontSize={'16px'} mt={3}>
          Logo Toko
        </Text>

        <Box my={3}>
          <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border="0.3px solid "
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
                <input {...getInputProps()} />
                {selectedImage ? (
                  <Box>
                    {uploadedImage ? (
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
                          src={uploadedImage}
                          alt="Uploaded Photo"
                          objectFit={'cover'}
                        />
                        <Button
                          position={'absolute'}
                          size={'xs'}
                          boxShadow={'lg'}
                          p={0}
                          colorScheme="none"
                          borderRadius={'full'}
                          bg={'white'}
                          top={'98px'}
                          left={'72px'}
                        >
                          <Image src={GalleryEdit} />
                        </Button>
                        <Button
                          position={'absolute'}
                          size={'xs'}
                          boxShadow={'lg'}
                          p={0}
                          colorScheme="none"
                          borderRadius={'full'}
                          bg={'white'}
                          top={'98px'}
                          left={'98px'}
                          onClick={() => handleRemove()}
                        >
                          <Image m={0} boxSize={'15px'} src={Trash} />
                        </Button>
                      </Box>
                    ) : (
                      isUploading && (
                        <Box>
                          <Loading />
                        </Box>
                      )
                    )}
                  </Box>
                ) : (
                  <>
                    <Image
                      justifyContent="center"
                      w="30px"
                      h="30px"
                      src={GalleryAdd}
                    />
                    <Text
                      placeholder="pointer"
                      fontSize={'13px'}
                      color={'blackAlpha.700'}
                    >
                      Unggah Photo
                    </Text>
                  </>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
      </Form>
      <Text fontSize={'13px'} w={'70%'}>
        Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
        Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
      </Text>
    </TabPanel>
  );
}

//jumat 29 2023
