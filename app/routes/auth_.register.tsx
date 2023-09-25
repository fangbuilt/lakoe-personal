/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ActionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
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

export async function loader() {
  return {};
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'get') {
  }

  if (request.method.toLowerCase() === 'post') {
  }

  if (request.method.toLowerCase() === 'patch') {
  }

  if (request.method.toLowerCase() === 'delete') {
  }
}

export default function Register() {
  // const data = useLoaderData<typeof loader>();
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
                <FormControl id="name">
                  <FormLabel fontSize="15px" color={'gray.600'}>
                    Name
                  </FormLabel>
                  <Input type="text" placeholder="name" fontSize={'13px'} />
                </FormControl>
                <FormControl id="email">
                  <FormLabel fontSize="15px" color={'gray.600'}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    fontSize={'13px'}
                  />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel fontSize="15px" color={'gray.600'}>
                    Phone
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder="+62 8123456"
                    fontSize={'13px'}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel fontSize="15px" color={'gray.600'}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    fontSize={'13px'}
                  />
                </FormControl>
                <Stack spacing={2}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  ></Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
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
              </Stack>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </div>
  );
}
