import { Box, Button, Flex, Input, Image, Text } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { AiOutlineClose } from 'react-icons/ai';
import PopupBank from '~/components/PopupBank';
import UpdateBank from '~/components/PopupBankUpdate.$id';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';
import {
  createBank,
  deleteBankList,
  getBankList,
  updateBank,
} from '~/modules/dashboard/dashboard.service';

export async function loader(
  { request, context, params }: DataFunctionArgs,
  storeId: string
) {
  await authorize({ request, context, params }, '2');

  return await getBankList(storeId);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  // delete
  const bankId = formData.get('bankId');

  // create
  const actionType = formData.get('actionType');
  const storeId = formData.get('storeId');
  const accountName = formData.get('accountName');
  const bank = formData.get('bank');
  const accountNumber = formData.get('accountNumber');

  // update
  const updateAccountName = formData.get('updateAccountName');
  const updateBankName = formData.get('updateBankName');
  const updateAccountNumber = formData.get('updateAccountNumber');

  if (actionType === 'delete' && bankId) {
    await deleteBankList(bankId as string);
    return redirect('/bank');
  }

  if (actionType === 'create' && bank && accountNumber && accountName) {
    const bankData = {
      store: {
        connect: { id: storeId },
      },
      accountName: accountName,
      bank: bank,
      accountNumber: accountNumber,
    };

    const userId = await getUserId(request);

    await createBank(bankData, userId as string); // Pass userId as the second argument
    return redirect('/bank');
  }

  if (
    actionType === 'update' &&
    bankId &&
    updateAccountName &&
    updateBankName &&
    updateAccountNumber
  ) {
    const updated = await updateBank(
      bankId as string,
      updateAccountName as string,
      updateBankName as string,
      updateAccountNumber as string
    );
    return {
      updated,
    };
  }
  return redirect('/bank');
}

export default function Bank() {
  const dataBank = useLoaderData<typeof loader>();

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

                <Link to={'/dashboard'}>
                  <Text fontSize="13px">
                    <Text as={'span'} fontWeight={'700'}>
                      {data.bank}
                    </Text>
                    -{data.accountName}-{data.accountNumber}
                  </Text>
                </Link>
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
      </Box>
    </>
  );
}
