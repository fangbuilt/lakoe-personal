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
import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
import CloseCircle from '~/assets/icon-pack/button-icons/close-circle.svg';
import Dropzone from 'react-dropzone';
import useAddProduct from '../hooks/useAddProduct';

export function ProductDetail() {
  const { preview, handleChange, cancelPreview } = useAddProduct();

  const photos = [
    { label: 'Foto Utama' },
    { label: 'Foto 2' },
    { label: 'Foto 3' },
    { label: 'Foto 4' },
    { label: 'Foto 5' },
  ];

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
              placeholder="Masukan deskripsi lengkap produk kamu"
              name="description"
              onChange={handleChange}
            />
            <FormHelperText textAlign={'right'}>0/3000</FormHelperText>
            {/* how to make the form helper text dynamic as we type? */}
          </FormControl>

          <Flex gap={2} align={'end'} overflowX={'auto'} pb={2}>
            {photos.map((photo, index) => (
              <FormControl isRequired key={index}>
                {photo.label === 'Foto Utama' && (
                  <FormLabel>Foto Produk</FormLabel>
                )}
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    const syntheticEvent: any = {
                      target: {
                        name: 'attachment_1',
                        value: acceptedFiles[0],
                        type: 'file',
                      },
                    };
                    handleChange(syntheticEvent);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input
                          {...getInputProps()}
                          onChange={handleChange}
                          name="image"
                          type="file"
                          accept="image/jpeg, image/png, image/gif"
                        />
                        {preview ? (
                          <Flex
                            direction={'column'}
                            justify={'center'}
                            align={'center'}
                            gap={2}
                            border={'1px'}
                            borderRadius={'md'}
                            borderColor={'gray.400'}
                            w={'10em'}
                            h={'10em'}
                            position={'relative'}
                          >
                            <Button
                              onClick={cancelPreview}
                              size={'xs'}
                              position={'absolute'}
                              top={-2}
                              right={-2}
                              variant={'unstyled'}
                              borderRadius={'full'}
                            >
                              <Image src={CloseCircle} />
                            </Button>
                            {photo.label === 'Foto Utama' && (
                              <Box
                                position={'absolute'}
                                top={1}
                                left={1}
                                bgColor={'#E8C600'}
                                px={2}
                                py={1}
                                borderRadius={'md'}
                              >
                                <Text fontSize={'xs'} fontWeight={'semibold'}>
                                  Foto Utama
                                </Text>
                              </Box>
                            )}
                            <Image
                              src={preview}
                              borderRadius={'md'}
                              aspectRatio={'1 / 1'}
                              objectFit={'cover'}
                            />
                          </Flex>
                        ) : (
                          <Flex
                            direction={'column'}
                            justify={'center'}
                            align={'center'}
                            gap={2}
                            border={'1px'}
                            p={10}
                            borderRadius={'md'}
                            borderColor={'gray.400'}
                            borderStyle={'dashed'}
                            w={'10em'}
                            h={'10em'}
                          >
                            <Image src={GalleryAdd} />
                            <Text
                              textAlign={'center'}
                              textColor={'gray.400'}
                              fontSize={'sm'}
                            >
                              {photo.label}
                            </Text>
                          </Flex>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </FormControl>
            ))}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
