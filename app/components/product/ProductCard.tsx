import { Box, Checkbox, Image, Switch, Text } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import ProductModal from './ProductModal';

export default function ProductCard() {
  return (
    <>
      <Box mt={3} p={3} borderWidth="2px" borderRadius={'10px'}>
        <Box display={'flex'} gap={3}>
          <Box display={'flex'} gap={3}>
            <Image
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              w={'100px'}
              h={'100px'}
              borderRadius={'8px'}
            />
            <Box>
              <Text fontSize={'18px'} fontWeight={'bold'}>
                KAOS BASIC COTTON KENARI
              </Text>
              <Box display={'flex'} alignItems={'center'} gap={2} mb={2}>
                <Text fontSize={'16px'}>Rp 55.000</Text>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>Stok: 20</Text>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>SKU: 0219AKD192</Text>
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
