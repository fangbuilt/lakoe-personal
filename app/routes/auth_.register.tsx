/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { db } from '~/libs/prisma/db.server';
import {
  createUserSession,
  getUserId,
  register,
} from '~/modules/auth/auth.service';
import { badRequest } from '~/utils/request.server';
import { generateRandomString } from '~/utils/randomString';
import { verifyEmail } from '~/utils/verifyEmail';

function validateUrl(url: string) {
  const urls = ['/', '/checkout', '/dashboard'];
  if (urls.includes(url)) {
    return url;
  }
  return '/';
}

function validateName(name: string) {
  if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
}
function validateEmail(email: string) {
  if (email.length < 3) {
    return 'Email must be at least 3 characters long';
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
}

function validatePhone(phone: string) {
  if (phone.length < 6) {
    return 'Phone must be at least 6 characters long';
  }
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return json({});
  }

  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (role?.roleId === '1') {
    return redirect('/dashboardAdmin');
  } else if (role?.roleId === '2') {
    return redirect('/dashboard');
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return json({});
  }
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const name = String(form.get('name'));
  const email = String(form.get('email'));
  const phone = String(form.get('phone'));
  const password = String(form.get('password'));
  const storeId = String(null);
  const roleId = '2';
  const isVerify = false;

  const redirectTo = validateUrl(
    (form.get('redirectTo') as string) || '/dashboard'
  );

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof phone !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Form not submitted correctly.',
    });
  }

  const fields = { password, email, name, phone };
  const fieldErrors = {
    name: validateName(name),
    password: validatePassword(password),
    email: validateEmail(email),
    phone: validatePhone(phone),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const userExists = await db.user.findFirst({ where: { email } });
  if (userExists) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `User with email ${email} already exists`,
    });
  }

  const user = await register({
    name,
    email,
    phone,
    password,
    storeId,
    roleId,
    isVerify,
  });

  const token = generateRandomString(15);

  await db.verify.create({
    data: {
      userId: user.id,
      token: token,
    },
  });

  verifyEmail(email, name, token);
  return redirect('/verifyAccount');
}

export default function Register() {
  // const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div>
      <SimpleGrid minChildWidth={'500px'}>
        <GridItem
          w="100%"
          h="100vh"
          bgImage="url('https://img.freepik.com/premium-photo/uthai-thani-thailand-december-31-2018-seller-fresh-market-uthai-thani-province-thailand_256301-1349.jpg?w=900')"
        >
          <Box w="100%" h="100vh" bg={'blue.500'} opacity={'68%'}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              h="100vh"
              flexDirection={'column'}
            >
              <Text
                fontWeight={'bold'}
                fontSize="20px"
                color={'black'}
                opacity={'100%'}
              >
                WELCOME TO
              </Text>
              <Text
                mt={'-5px'}
                color="white"
                fontSize={'60px'}
                fontWeight={'bold'}
                opacity={'100%'}
              >
                LAKOE
              </Text>
              <Text
                textAlign={'center'}
                fontSize={'15px'}
                color={'white'}
                fontWeight={'bold'}
                fontStyle={'italic'}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem w="100%" h="100vh" bg="white">
          <Flex flexDirection={'column'} alignItems={'center'} mt={10}>
            <Box
              mt={'5px'}
              display={'flex'}
              w={'250px'}
              justifyContent={'center'}
            >
              <Box
                w={'50%'}
                bg={'blue.300'}
                p={3}
                borderLeftRadius={3}
                cursor={'pointer'}
                _hover={{ bg: 'blue.200' }}
              >
                <Text
                  color={'white'}
                  fontSize={'13px'}
                  textAlign={'center'}
                  onClick={() => navigate('/auth/login')}
                >
                  Sign In
                </Text>
              </Box>
              <Box
                w={'50%'}
                bg={'blue.500'}
                p={3}
                borderRightRadius={3}
                cursor={'pointer'}
                _hover={{ bg: 'blue.200' }}
              >
                <Text color={'white'} fontSize={'13px'} textAlign={'center'}>
                  Sign Up
                </Text>
              </Box>
            </Box>

            <Box mt={2} rounded={'lg'} p={8} w={'80%'}>
              <Stack spacing={4}>
                <Form method="POST">
                  <Input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get('redirectTo') ?? undefined}
                  />
                  <FormControl id="name">
                    <FormLabel fontSize="15px" color={'gray.600'}>
                      Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      placeholder="name"
                      fontSize={'13px'}
                      defaultValue={actionData?.fields?.name}
                      aria-invalid={Boolean(actionData?.fieldErrors?.name)}
                      aria-errormessage={
                        actionData?.fieldErrors?.name ? 'name-error' : undefined
                      }
                    />
                    {actionData?.fieldErrors?.name ? (
                      <Text
                        className="form-validation-error"
                        role="alert"
                        id="name-error"
                      >
                        {actionData.fieldErrors.name}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel fontSize="15px" color={'gray.600'}>
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      fontSize={'13px'}
                      defaultValue={actionData?.fields?.email}
                      aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                      aria-errormessage={
                        actionData?.fieldErrors?.email
                          ? 'email-error'
                          : undefined
                      }
                    />
                    {actionData?.fieldErrors?.email ? (
                      <Text
                        className="form-validation-error"
                        role="alert"
                        id="email-error"
                      >
                        {actionData.fieldErrors.email}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl id="phone">
                    <FormLabel fontSize="15px" color={'gray.600'}>
                      Phone
                    </FormLabel>
                    <Input
                      type="number"
                      name="phone"
                      placeholder="+62 8123456"
                      fontSize={'13px'}
                      defaultValue={actionData?.fields?.phone}
                      aria-invalid={Boolean(actionData?.fieldErrors?.phone)}
                      aria-errormessage={
                        actionData?.fieldErrors?.phone
                          ? 'phone-error'
                          : undefined
                      }
                    />
                    {actionData?.fieldErrors?.phone ? (
                      <Text
                        className="form-validation-error"
                        role="alert"
                        id="phone-error"
                      >
                        {actionData.fieldErrors.phone}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel fontSize="15px" color={'gray.600'}>
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      fontSize={'13px'}
                      defaultValue={actionData?.fields?.password}
                      aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                      aria-errormessage={
                        actionData?.fieldErrors?.password
                          ? 'password-error'
                          : undefined
                      }
                    />
                  </FormControl>
                  <Stack spacing={2}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      {actionData?.fieldErrors?.password ? (
                        <Text
                          className="form-validation-error"
                          role="alert"
                          id="password-error"
                        >
                          {actionData.fieldErrors.password}
                        </Text>
                      ) : null}
                      <Box id="form-error-message">
                        {actionData?.formError ? (
                          <Text className="form-validation-error" role="alert">
                            {actionData.formError}
                          </Text>
                        ) : null}
                      </Box>
                    </Stack>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                    >
                      Sign up
                    </Button>
                    <Flex
                      mt={1}
                      gap={1}
                      fontSize="13px"
                      justifyContent={'center'}
                      alignItems="center"
                    >
                      <Text>Do you have an account? </Text>
                      <Text
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        onClick={() => navigate('/auth/login')}
                      >
                        I have an account
                      </Text>
                    </Flex>
                  </Stack>
                </Form>
              </Stack>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </div>
  );
}
