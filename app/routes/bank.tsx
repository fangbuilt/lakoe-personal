import { Box, Button, Flex, Input, Image, Text } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { AiOutlineClose } from 'react-icons/ai';
import PopupBank from '~/components/PopupBank';
import UpdateBank from '~/components/PopupBankUpdate.$id';
import {
  createBank,
  deleteBankList,
  getBankList,
  updateBank,
} from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getBankList();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log('ini isi formData', formData);

  const bankId = formData.get('bankId');
  const actionType = formData.get('actionType');
  // const name = formData.get("name");
  const bank = formData.get('bank');
  const accountNumber = formData.get('accountNumber');
  const updateBankName = formData.get('updateBankName');
  const updateAccountNumber = formData.get('updateAccountNumber');

  if (actionType === 'delete' && bankId) {
    await deleteBankList(bankId as string);
    return redirect('/bank');
  }

  if (actionType === 'create' && bank && accountNumber) {
    await createBank({
      // name: name,
      bank: bank,
      accountNumber: accountNumber,
    });
    return redirect('/bank');
  }

  if (
    actionType === 'update' &&
    bankId &&
    updateBankName &&
    updateAccountNumber
  ) {
    const updated = await updateBank(
      bankId as string,
      updateBankName as string,
      parseInt(updateAccountNumber as string)
    );
    return {
      updated,
    };
  }
  return redirect('/bank');
}

export default function Bank() {
  const dataBank = useLoaderData<typeof loader>();
  console.log('data bank', dataBank);
  return (
    <>
      <Box m={'2%'} boxShadow={'lg'}>
        <Box px={'15%'} bgColor={'#9ddce3'}>
          <Flex alignItems={'center'} p={3} justifyContent={'space-between'}>
            <Text
              bg={'white'}
              p={2}
              fontSize="13px"
              fontWeight={'700'}
              padding={'5px 10px'}
            >
              Akun Bank
            </Text>

            <PopupBank />
          </Flex>
        </Box>
        {dataBank.map((data) => (
          <Box px={'15%'} key={data.id}>
            <Flex
              w={'100%'}
              alignItems={'center'}
              p={2}
              justifyContent={'space-between'}
              key={data.id}
              bg={'white'}
            >
              <Box display={'flex'}>
                <Box display={'flex'} alignItems={'center'} mr={'8px'}>
                  {data.bank === 'BNI' && (
                    <Image
                      src="https://ik.imagekit.io/lcfefbv0i/BNI.png?updatedAt=1693928593197"
                      height={'14px'}
                      width={'37px'}
                    />
                  )}

                  {data.bank === 'BCA' && (
                    <Image
                      src="https://ik.imagekit.io/lcfefbv0i/bca.png?updatedAt=1693841171817"
                      height={'14px'}
                      width={'39px'}
                    />
                  )}

                  {data.bank === 'MANDIRI' && (
                    <Image
                      src="https://ik.imagekit.io/lcfefbv0i/MANDIRI.png?updatedAt=1693928593263"
                      height={'14px'}
                      width={'40px'}
                    />
                  )}

                  {data.bank === 'BRI' && (
                    <Image
                      src="https://i0.wp.com/febi.uinsaid.ac.id/wp-content/uploads/2020/11/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru.png?ssl=1"
                      height={'28px'}
                      width={'35px'}
                    />
                  )}
                </Box>

                <Text fontSize="13px">
                  <Text as={'span'} fontWeight={'700'}>
                    {data.bank}
                  </Text>
                  {/* -{data.name}- */}-{data.accountNumber}
                </Text>
              </Box>
              <Box display={'flex'}>
                <Form method="post">
                  <Input type="hidden" name="actionType" value="update" />
                  <Input type="hidden" name="bankId" value={data.id} />
                  <Button
                    gap={5}
                    bg={'white'}
                    colorScheme="none"
                    color={'black'}
                  >
                    <UpdateBank id={data.id} />
                  </Button>
                </Form>
                <Form method="post">
                  <Input type="hidden" name="actionType" value="delete" />
                  <Input type="hidden" name="bankId" value={data.id} />
                  <Button
                    gap={5}
                    type="submit"
                    bg={'white'}
                    colorScheme="none"
                    color={'black'}
                  >
                    <AiOutlineClose />
                  </Button>
                </Form>
              </Box>
            </Flex>
          </Box>
        ))}
        {/* <Ali Alltrigger={buttonPopup} setTrigger={setButtonPopup}>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"white"}
            mt={5}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={"white"}
              rounded={"xl"}
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
                      <Button colorScheme="none" color={"gray.600"}>
                        BRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        BCA
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
                        MANDIRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={"gray.600"}>
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
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  placeholder="123456789"
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                />
              </FormControl>
              <Stack spacing={6}>
                <Flex justifyContent={"end"} gap={3}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Tambah Akun Bank
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </Ali> */}
      </Box>
    </>
  );
}
