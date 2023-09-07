import { Box, Checkbox, Image, Switch, Text } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import ProductModal from './ProductModal';

export interface IProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  stock: string;
  sku: string;
  varians: string;
  isActive: boolean;
}

export default function ProductCard(props: IProduct) {
  return (
    <>
      <Box mt={3} p={3} borderWidth="2px" borderRadius={'10px'} key={props.id}>
        <Box display={'flex'} gap={3}>
          <Box display={'flex'} gap={3}>
            <Image
              src={props.image}
              w={'100px'}
              h={'100px'}
              borderRadius={'8px'}
              objectFit={'cover'}
            />
            <Box>
              <Text
                fontSize={'18px'}
                color={'#1D1D1D'}
                w={'375px'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
              >
                {props.title}
              </Text>
              <Box display={'flex'} alignItems={'center'} gap={2} mb={2}>
                <Text fontSize={'16px'}>Rp {props.price}</Text>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>Stok: {props.stock}</Text>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>SKU: {props.sku}</Text>
                </Box>
              </Box>
              <ProductModal />
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'flex-end'}
            flexDirection={'column'}
            py={1}
            gap={10}
          >
            <Checkbox size="lg"></Checkbox>
            <Switch size="md" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
