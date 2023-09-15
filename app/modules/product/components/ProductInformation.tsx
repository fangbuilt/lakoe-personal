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
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export function ProductInformation() {
  const {
    handleClick,
    handleClick2,
    handleClick3,
    // options,
    parentOptions,
    data,
    data2,
    selected,
    toggleOptions,
    openOptions,
  } = useNestedOptions();

  const { handleChange } = useAddProduct();

  const checkValue = selected.child;
  console.log(checkValue);

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
              onChange={handleChange}
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
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <InputGroup onClick={toggleOptions} style={{ cursor: 'pointer' }}>
              <Input
                type="text"
                fontSize={'sm'}
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
              <Grid templateColumns={'repeat(3, 1fr)'} mt={4}>
                <Stack>
                  {parentOptions.map((option) => (
                    <Button
                      justifyContent={'left'}
                      variant={'ghost'}
                      fontSize={'xs'}
                      size={'sm'}
                      onClick={() => handleClick(option.id)}
                      key={option.id}
                      _focusWithin={{ textColor: 'lakoeCyan' }}
                    >
                      {option.name}
                    </Button>
                  ))}
                </Stack>

                <Stack>
                  {data.map((option) => (
                    <Button
                      justifyContent={'left'}
                      variant={'ghost'}
                      fontSize={'xs'}
                      size={'sm'}
                      onClick={() => handleClick2(option.id)}
                      key={option.id}
                    >
                      {option.name}
                    </Button>
                  ))}
                </Stack>

                <Stack>
                  {data2.map((option) => (
                    <Button
                      justifyContent={'left'}
                      variant={'ghost'}
                      fontSize={'xs'}
                      size={'sm'}
                      onClick={() => handleClick3(option.id)}
                      key={option.id}
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
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
