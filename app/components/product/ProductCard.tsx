import { Box, Checkbox, Image, Text } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';
import type { IProduct } from '~/interfaces/product/product';

interface IProductCardProps {
  product: IProduct;
  children?: ReactNode;
}

export default function ProductCard(props: IProductCardProps) {
  const { product, children } = props;

  return (
    <>
      <Box
        mt={3}
        p={3}
        borderWidth="2px"
        borderRadius={'10px'}
        key={product.id}
      >
        <Box display={'flex'} gap={3}>
          <Box display={'flex'} gap={3}>
            <Image
              src={product.attachments[0]?.url}
              w={'100px'}
              h={'100px'}
              borderRadius={'8px'}
              objectFit={'cover'}
            />
            <Box>
              <Box display={'flex'}>
                <Text
                  fontSize={'18px'}
                  color={'#1D1D1D'}
                  w={'375px'}
                  whiteSpace={'nowrap'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                >
                  {product.name}
                </Text>
                <Box ms={'65px'}>
                  <Checkbox />
                </Box>
              </Box>
              <Box display={'flex'} alignItems={'center'} gap={2} mb={2}>
                <Text fontSize={'16px'}>
                  Rp
                  {product.variants.map((a) =>
                    a.variantOptions.map((b) =>
                      b.variantOptionValues.map((c) => c.price)
                    )
                  )}
                </Text>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>
                    Stok:{' '}
                    {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.stock)
                      )
                    )}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>
                    SKU:{' '}
                    {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.sku)
                      )
                    )}
                  </Text>
                </Box>
              </Box>
              {children}
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'flex-end'}
            flexDirection={'column'}
            py={1}
            gap={10}
          ></Box>
        </Box>
      </Box>
    </>
  );
}
