import { Box, Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');
  const userId = await getUserId(request);

  return { userId };
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const actiontype = String(form.get('actiontype'));
  const name = String(form.get('name'));
  const desc = String(form.get('desc'));
  const userId = String(form.get('userId'));

  if (actiontype === 'addStore') {
    const store = await db.store.create({
      data: {
        name: name,
        description: desc,
        domain: `lakoe.store/${name}`,
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        storeId: store.id,
      },
    });
  }

  return redirect('/dashboard');
}

export default function useAddStore() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Box
        height={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Flex
          borderRadius={10}
          bg={'blue.300'}
          w={'650px'}
          h={'400px'}
          px={8}
          py={6}
          justifyContent={'space-between'}
        >
          <Flex flexDirection={'column'} justifyContent={'center'} mb={7} p={3}>
            <Text fontSize={'45px'} fontWeight="bold">
              LAKOE
            </Text>
            <Text
              fontWeight={'bold'}
              fontSize={'17px'}
              fontStyle={'italic'}
              color="white"
            >
              Let's Create Your Store.
            </Text>
            <Text
              fontSize={'15px'}
              fontFamily={'cursive'}
              mt={5}
              w={'210px'}
              color={'blue.700'}
            >
              "Introduce your product through your store with Lakoe"
            </Text>
          </Flex>
          <Box
            borderRadius={10}
            bg={'white'}
            width={'50%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            p={5}
          >
            <Form method="POST">
              <Input
                name="actiontype"
                defaultValue={'addStore'}
                hidden
                readOnly
              />
              <Input
                name="userId"
                defaultValue={data.userId as string}
                hidden
                readOnly
              />
              <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <FormLabel
                  fontSize={'20px'}
                  color={'blue.600'}
                  fontWeight={'bold'}
                >
                  Your Store Name
                </FormLabel>
                <Input
                  name="name"
                  placeholder="LakoeStore"
                  textAlign={'center'}
                  mb={5}
                  fontSize={'15px'}
                />
                <FormLabel
                  fontSize={'20px'}
                  color={'blue.600'}
                  fontWeight={'bold'}
                >
                  Your Description Store
                </FormLabel>
                <Input
                  name="desc"
                  placeholder="Decribe Your Store"
                  textAlign={'center'}
                  fontSize={'15px'}
                />
                <Button
                  mt={5}
                  type="submit"
                  bg={'gray.500'}
                  colorScheme="green"
                >
                  Create Store
                </Button>
              </Flex>
            </Form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
