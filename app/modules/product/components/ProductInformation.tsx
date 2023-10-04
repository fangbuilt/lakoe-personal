import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import useAddProduct from '../hooks/useAddProduct';
import useNestedOptions from '../hooks/useNestedOptions';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export function ProductInformation() {
  const {
    handleCategoryClick,
    parentOptions,
    grandParentData,
    parentData,
    selected,
    toggleOptions,
    openOptions,
    activeGrandparent,
    activeParent,
    activeChild,
  } = useNestedOptions();

  const { handleChange } = useAddProduct();
  const [productName, setProductName] = useState('');
  function handleChange2(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log('ini name', name);

    setProductName(value);
  }
  const productNameWithHyphen = productName.replace(/ /g, '-');
  // const randomNumber = Math.floor(Math.random() * 90) + 10;
  // const finalProductName = productNameWithHyphen + '-' + randomNumber
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Informasi Produk</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Nama Produk</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Masukan nama produk"
              onChange={handleChange2}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>URL Halaman Checkout</FormLabel>
            <InputGroup>
              <InputLeftAddon children="lakoe.store/" />
              <Input
                type="text"
                name="url"
                placeholder="nama-produk"
                value={productNameWithHyphen}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <InputGroup onClick={toggleOptions} style={{ cursor: 'pointer' }}>
              <Input
                type="text"
                fontSize={'xs'}
                isReadOnly
                value={`${selected.grandparent || ''} ${
                  selected.parent ? '>' : ''
                } ${selected.parent || ''} ${selected.child ? '>' : ''} ${
                  selected.child || ''
                }`}
              />
              <InputRightElement>
                {!openOptions ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </InputRightElement>
            </InputGroup>

            {openOptions && (
              <Grid
                templateColumns={'repeat(3, 1fr)'}
                mt={4}
                shadow={'sm'}
                border={'1px'}
                borderColor={'gray.200'}
                px={1}
                py={2}
                borderRadius={'md'}
              >
                <Stack borderRight={'1px'} borderColor={'gray.200'} pr={1}>
                  {parentOptions.map((option) => (
                    <Button
                      justifyContent={'space-between'}
                      variant={
                        activeGrandparent === option.id ? 'solid' : 'ghost'
                      }
                      fontSize={'2xs'}
                      size={'xs'}
                      onClick={() =>
                        handleCategoryClick(option.id, 'grandparent')
                      }
                      key={option.id}
                      textColor={
                        activeGrandparent === option.id ? 'lakoeCyan' : 'unset'
                      }
                      rightIcon={<ChevronRightIcon />}
                    >
                      {option.name}
                    </Button>
                  ))}
                </Stack>

                <Stack borderRight={'1px'} borderColor={'gray.200'} px={1}>
                  {grandParentData.map((option) => (
                    <Button
                      justifyContent={'space-between'}
                      variant={activeParent === option.id ? 'solid' : 'ghost'}
                      fontSize={'2xs'}
                      size={'xs'}
                      onClick={() => handleCategoryClick(option.id, 'parent')}
                      key={option.id}
                      textColor={
                        activeParent === option.id ? 'lakoeCyan' : 'unset'
                      }
                      rightIcon={<ChevronRightIcon />}
                    >
                      {option.name}
                    </Button>
                  ))}
                </Stack>

                <Stack pl={1}>
                  {parentData.map((option) => (
                    <Button
                      justifyContent={'left'}
                      variant={activeChild === option.id ? 'solid' : 'ghost'}
                      fontSize={'2xs'}
                      size={'xs'}
                      onClick={() => handleCategoryClick(option.id, 'child')}
                      key={option.id}
                      textColor={
                        activeChild === option.id ? 'lakoeCyan' : 'unset'
                      }
                    >
                      {option.name}
                    </Button>
                  ))}
                </Stack>
              </Grid>
            )}
          </FormControl>

          <VisuallyHiddenInput
            onChange={handleChange}
            value={selected.child || ''}
            name="category"
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
