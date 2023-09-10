// this similar logic might useful to handle the multiple dropzone shenanigans because they can receive files together at the same time. but the variant buttons are not allowed to be active at the same time when there's already an active button

import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export function ProductVariant() {
  const [isActive, setIsActive] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const handleClick = (index: number) => {
    const newIsActive = [...isActive];
    newIsActive[index] = newIsActive[index] === null ? index : null;
    setIsActive(newIsActive);
  };
  const labels = [
    { label: 'Warna' },
    { label: 'Ukuran' },
    { label: 'Ukuran Kemasan' },
  ];

  return (
    <Card>
      <CardBody>
        <Stack spacing={10}>
          <Flex justify={'space-between'} align={'center'}>
            <Stack>
              <Heading size={'md'}>Varian Produk</Heading>
              <Text fontSize={'sm'}>
                Tambah varian agar pembeli dapat memilih produk yang sesuai,
                yuk!
              </Text>
            </Stack>
            <Button
              variant={'outline'}
              borderRadius={'full'}
              leftIcon={<Image src={TrashIcon} />}
              fontSize={'sm'}
            >
              Hapus Varian
            </Button>
          </Flex>
          <HStack>
            {labels.map((label, index) => (
              <Button
                key={index}
                variant={'outline'}
                borderRadius={'full'}
                bgColor={
                  isActive[index] === index ? 'lakoeCyanMuted' : 'initial'
                }
                borderColor={
                  isActive[index] === index ? 'lakoeCyan' : 'initial'
                }
                onClick={() => handleClick(index)}
              >
                {label.label}
              </Button>
            ))}
            <Button
              variant={'outline'}
              borderRadius={'full'}
              leftIcon={<Image src={AddIcon} />}
            >
              Buat Tipe Varian
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
