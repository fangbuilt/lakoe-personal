import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import type { ActionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PopupBank } from '~/components/Popup';
import {
  deleteBankList,
  getBankList,
} from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return getBankList();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const bankId = formData.get('bankId');
  const actionType = formData.get('actionType');

  if (actionType === 'delete' && bankId) {
    await deleteBankList(parseInt(bankId as string));
    return redirect('/bank');
  }
}

export default function Bank() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const dataBank = useLoaderData<typeof loader>();
  return (
    <>
      <Box m={'2%'} boxShadow={'lg'}>
        <Box px={'15%'} bgColor={'blue.500'}>
          <Flex alignItems={'center'} p={3} justifyContent={'space-between'}>
            <Text bg={'white'} p={2} fontSize="13px">
              Akun Bank
            </Text>
            <Button fontSize="13px" onClick={() => setButtonPopup(true)}>
              Tambah Rekening
            </Button>
          </Flex>
        </Box>
        {dataBank.map((data) => (
          <Box px={'15%'} key={data.id}>
            <Flex
              w={'100%'}
              alignItems={'center'}
              p={2}
              justifyContent={'space-between'}
              bg={'white'}
            >
              <Box>
                <Image></Image>
                <Text fontSize="13px">
                  {data.bank_name}-{data.name}-{data.bank_number}
                </Text>
              </Box>
              <Form method="post">
                <Input type="hidden" name="actionType" value="delete"></Input>
                <Input type="hidden" name="bankId" value={data.id}></Input>
                <Button
                  type="submit"
                  bg={'white'}
                  colorScheme="none"
                  color={'black'}
                >
                  <AiOutlineClose />
                </Button>
              </Form>
            </Flex>
          </Box>
        ))}
        <PopupBank trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'white'}
            mt={5}
          >
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={'white'}
              rounded={'xl'}
              p={0}
              my={12}
            >
              <FormControl id="" isRequired>
                <FormLabel>Bank</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Pilih Rekening Bank untuk menerima penarikan
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        BRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        BCA
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        MANDIRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        BNI
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Atas Nama</FormLabel>
                <Input
                  placeholder="Nama Pemilik Rekening"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  placeholder="123456789"
                  _placeholder={{ color: 'gray.500' }}
                  type="number"
                />
              </FormControl>
              <Stack spacing={6}>
                <Flex justifyContent={'end'} gap={3}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Tambah Akun Bank
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </PopupBank>
      </Box>
    </>
  );
}
