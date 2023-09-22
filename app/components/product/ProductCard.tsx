import { Box, Checkbox, Image, Switch, Text } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useState, type ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';
import type { IProduct } from '~/interfaces/product/product';
import { updateIsActive } from '~/modules/product/product.service';

interface IProductCardProps {
  product: IProduct;
  children?: ReactNode;
}

export default function ProductCard(props: IProductCardProps) {
  const { product, children } = props;

  const [isActive, setIsActive] = useState(product.isActive);

  const handleSwitchChange = async (e: any) => {
    e.preventDefault();
    const newData = {
      id: product.id,
      isActive: !isActive,
    };
    console.log('ini target', newData);
    try {
      const response = await fetch(`/producttt/${newData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        const updateStatus = await updateIsActive(newData);
        if (updateStatus) {
          setIsActive(!isActive);
        } else {
          console.error('failed to update product status');
        }
      } else {
        console.error('failed to update product status');
      }
    } catch (error) {
      console.error('failed to update product status', error);
    }
  };

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
              src={product.attachments[0].url}
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
                {product.name}
              </Text>
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
          >
            <Checkbox size="lg" />
            <Form method="PATCH">
              <Switch
                size="md"
                isChecked={isActive}
                name="isActive"
                onChange={handleSwitchChange}
              />
            </Form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
