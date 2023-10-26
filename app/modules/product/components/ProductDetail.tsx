import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import type { FileWithPath } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import CloseCircle from '~/assets/icon-pack/button-icons/close-circle.svg';
import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import crypto from 'crypto';
import type { loader } from '~/routes/product_.add';
import { useLoaderData } from '@remix-run/react';
import useAddProduct from '../hooks/useAddProduct';

export function ProductDetail() {
  const [, setSelectedImage] = useState<string | null>(null);

  const data = useLoaderData<typeof loader>();

  const [photos, setPhotos] = useState([
    { label: 'Foto Utama', name: 'mainPhoto', image: null },
    { label: 'Foto 2', name: 'photo2', image: null },
    { label: 'Foto 3', name: 'photo3', image: null },
    { label: 'Foto 4', name: 'photo4', image: null },
    { label: 'Foto 5', name: 'photo5', image: null },
  ]);

  const handleImageUpload = async (
    acceptedFiles: FileWithPath[],
    index: number
  ) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    const photo = photos[index];

    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', data.ENV.CLOUDINARY_UPLOAD_PRESET);

    try {
      const response: AxiosResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.ENV.CLOUDINARY_CLOUD_NAME}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update the uploaded image URL
      const updatedPhotos = [...photos];
      updatedPhotos[index] = { ...photo, image: response.data.secure_url };
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleRemove = (index: number) => {
    const photo = photos[index];
    const imageUrl = photo.image;

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);

      // Delete image from Cloudinary
      deleteImageFromCloudinary(imageUrl);

      // Reset the photo
      const updatedPhotos = [...photos];
      updatedPhotos[index] = { ...photo, image: null };
      setPhotos(updatedPhotos);
    }
  };

  const deleteImageFromCloudinary = async (imageUrl: string) => {
    try {
      // Extract public_id from the Cloudinary image URL
      const publicId = imageUrl
        .split('/')
        .pop()
        ?.replace(/\.[^/.]+$/, '') as string;
      const timestamp = new Date().getTime();
      const apiKey = '524875873527981';
      const apiSecret = 'vdySQK--pQjVIz6l6vUcENdHowQ';
      const signature = generateSHA1(generateSignature(publicId, apiSecret));

      // Send a DELETE request to Cloudinary
      await axios.post(
        `https://api.cloudinary.com/v1_1/${data.ENV.CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }
      );

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

  const { description, maxCharacters, handleChange } = useAddProduct();

  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Detail Produk</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Deskripsi</FormLabel>
            <Textarea
              maxH={400}
              minH={200}
              placeholder="Masukkan deskripsi lengkap produk kamu"
              name="description"
              maxLength={3000}
              minLength={1}
              value={description}
              onChange={handleChange}
            />
            <FormHelperText textAlign={'right'}>
              {description.length}/{maxCharacters}
            </FormHelperText>
          </FormControl>

          <Flex gap={2} align="end" overflowX="auto" pb={2}>
            {photos.map((photo, index) => (
              <FormControl isRequired key={index}>
                <FormLabel>{photo.label}</FormLabel>
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    handleImageUpload(acceptedFiles, index)
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {photo.image ? (
                          <Flex
                            direction="column"
                            justify="center"
                            align="center"
                            gap={2}
                            border="1px"
                            borderRadius="md"
                            borderColor="gray.400"
                            w="10em"
                            h="10em"
                            position="relative"
                          >
                            <Button
                              onClick={() => handleRemove(index)}
                              size="xs"
                              position="absolute"
                              top={-2}
                              right={-2}
                              variant="unstyled"
                              borderRadius="full"
                            >
                              <Image src={CloseCircle} />
                            </Button>
                            <Box
                              position="absolute"
                              top={1}
                              left={1}
                              bgColor="#E8C600"
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              <Text fontSize="xs" fontWeight="semibold">
                                {photo.label}
                              </Text>
                            </Box>
                            <Image
                              src={photo.image}
                              borderRadius="md"
                              aspectRatio="1 / 1"
                              objectFit="cover"
                            />
                          </Flex>
                        ) : (
                          <Flex
                            direction="column"
                            justify="center"
                            align="center"
                            gap={2}
                            border="1px"
                            p={10}
                            borderRadius="md"
                            borderColor="gray.400"
                            borderStyle="dashed"
                            w="10em"
                            h="10em"
                          >
                            <Image src={GalleryAdd} />
                            <Text
                              textAlign="center"
                              textColor="gray.400"
                              fontSize="sm"
                            >
                              {photo.label}
                            </Text>
                          </Flex>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
                <input
                  type="text"
                  name={photo.name}
                  value={photo.image || ''}
                  hidden
                  readOnly
                />
              </FormControl>
            ))}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
