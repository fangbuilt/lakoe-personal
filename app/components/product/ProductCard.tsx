import { Box, Checkbox, Switch, Text, Image, Button } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import type { ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';
import type { IProduct } from '~/interfaces/product/product';
import { updateIsActive } from '~/modules/product/product.service';

interface IProductCardProps {
  product: IProduct;
  isActive: boolean;
  isSelected: boolean;
  onSelectChange: (isSelected: boolean) => void;
  children?: ReactNode;
}

export default function ProductCard(props: IProductCardProps) {
  const { product, isSelected, onSelectChange, children } = props;
  const { id, isActive } = product;
  const handleSwitchChange = async () => {
    try {
      await updateIsActive({ id, isActive: !isActive });
    } catch (error) {
      console.error('Error updating isActive:', error);
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
              src={product.attachments[0]?.url}
              w={'100px'}
              h={'100px'}
              borderRadius={'8px'}
              objectFit={'cover'}
            />
            <Box>
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
              </Box>
              <Box display={'flex'} alignItems={'center'} gap={2} mb={2}>
                <Text fontSize={'16px'}>
                  Rp
                  {
                    product.variants[0]?.variantOptions[0]
                      ?.variantOptionValues[0]?.price
                  }
                  {/* {product.variants.map((a) =>
                    a.variantOptions.map((b) =>
                      b.variantOptionValues.map((c) => c.price)
                    )
                  )} */}
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
                    {
                      product.variants[0]?.variantOptions[0]
                        ?.variantOptionValues[0]?.stock
                    }
                    {/* {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.stock)
                      )
                    )} */}
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
                    {
                      product.variants[0]?.variantOptions[0]
                        ?.variantOptionValues[0]?.sku
                    }
                    {/* {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.sku)
                      )
                    )} */}
                  </Text>
                </Box>
              </Box>
              {children}
            </Box>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'column'}
            py={1}
          >
            <Checkbox
              size="lg"
              isChecked={isSelected}
              onChange={(e) => onSelectChange(e.target.checked)}
            />
            <Form method="PATCH">
              <input type="hidden" value={product.id} name="id" />
              <Button
                type="submit"
                variant={'ghost'}
                onClick={handleSwitchChange}
              >
                <Switch
                  size={'md'}
                  isChecked={product.isActive}
                  name="isActive"
                  value={product.isActive.toString()}
                />
              </Button>
            </Form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
