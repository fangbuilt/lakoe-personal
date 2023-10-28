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
import {
  json,
  type ActionArgs,
  type LoaderArgs,
  redirect,
} from '@remix-run/node';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { db } from '~/libs/prisma/db.server';
import {
  createUserSession,
  getUserId,
  login,
} from '~/modules/auth/auth.service';
import { badRequest } from '~/utils/request.server';

function validateUrl(url: string) {
  const urls = ['/dashboardAdmin', '/checkout', '/dashboard'];
  if (urls.includes(url)) {
    return url;
  }
  return '/';
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

  const email = String(form.get('email'));
  const password = String(form.get('password'));

  if (typeof email !== 'string' || typeof password !== 'string') {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Form not submitted correctly.',
    });
  }

  const fields = { password, email };
  const fieldErrors = {
    password: validatePassword(password),
    email: validateEmail(email),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const user = await login({ email, password });
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: 'Username/Password combination is incorrect',
    });
  }

  if (user.roleId === '1') {
    const redirectTo = validateUrl(
      (form.get('redirectTo') as string) || '/dashboardAdmin'
    );

    return createUserSession(user.id, redirectTo);
  } else if (user.roleId === '2') {
    const redirectTo = validateUrl(
      (form.get('redirectTo') as string) || '/dashboard'
    );

    return createUserSession(user.id, redirectTo);
  } else {
    const redirectTo = validateUrl(
      (form.get('redirectTo') as string) || '/checkout'
    );

    return createUserSession(user.id, redirectTo);
  }
}

export default function Login() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
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
                bg={'blue.500'}
                p={3}
                borderLeftRadius={3}
                cursor={'pointer'}
                _hover={{ bg: 'blue.200' }}
              >
                <Text color={'white'} fontSize={'13px'} textAlign={'center'}>
                  Sign In
                </Text>
              </Box>
              <Box
                w={'50%'}
                bg={'blue.300'}
                p={3}
                borderRightRadius={3}
                cursor={'pointer'}
                _hover={{ bg: 'blue.300' }}
              >
                <Text
                  color={'white'}
                  fontSize={'13px'}
                  textAlign={'center'}
                  onClick={() => navigate('/auth/register')}
                >
                  Sign Up
                </Text>
              </Box>
            </Box>

            <Box mt={2} rounded={'lg'} p={8} w={'80%'}>
              <Stack spacing={4}>
                <Form method="POST">
                  <FormControl id="email">
                    <FormLabel fontSize="15px" color={'gray.600'}>
                      Email address
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
                  </FormControl>
                  <Stack spacing={2}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Text color={'blue.400'} fontSize="13px">
                        Forgot password?
                      </Text>
                    </Stack>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign in
                    </Button>
                    <Flex
                      mt={1}
                      gap={1}
                      fontSize="13px"
                      justifyContent={'center'}
                      alignItems="center"
                    >
                      <Text>Don't have an account? </Text>
                      <Text
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        onClick={() => navigate('/auth/register')}
                      >
                        Sign Up here
                      </Text>
                    </Flex>
                  </Stack>
                </Form>
              </Stack>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                gap={2}
                mt={8}
              >
                <Box border={'1px'} borderColor={'gray.600'} w={'50px'}></Box>
                <Text
                  fontStyle={'italic'}
                  color={'gray.600'}
                  mt={3}
                  fontWeight={'bold'}
                  mb={4}
                >
                  0r
                </Text>
                <Box border={'1px'} borderColor={'gray.600'} w={'50px'}></Box>
              </Flex>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                gap={10}
                mt={7}
              >
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={1}
                >
                  <Text fontSize={'30px'} color={'gray.700'}>
                    <AiOutlineGooglePlus />
                  </Text>
                  <Text fontWeight={'bold'} color={'gray.700'}>
                    Google
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={1}
                >
                  <Text fontSize={'20px'} color={'gray.700'}>
                    <BsFacebook />
                  </Text>
                  <Text fontWeight={'bold'} color={'gray.700'}>
                    Facebook
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </div>
  );
}
