import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';

export async function loader() {
  return await db.product.findMany({
    include: {
      store: {
        include: {
          locations: true,
        },
      },
      variants: {
        include: {
          variantOptions: {
            include: {
              variantOptionValues: {
                include: {
                  size: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export default function CheckoutPage() {
  const item = useLoaderData<typeof loader>();
  // console.log(item);
  return (
    <>
      <Box
        m={'10%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        borderRadius={['120px', '140px', '160px', '180px']}
        pt={'50px'}
      >
        <Text textAlign={'center'} fontSize={'30px'} fontWeight={'bold'} mb={5}>
          Product
        </Text>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {item.map((i, o) => (
            <Box key={o}>
              <Box
                boxShadow={'dark-lg'}
                maxW={{ base: 'full', md: '275px' }}
                w={'full'}
                minH={'380px'}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={5}
              >
                <Stack align={'start'} spacing={2}>
                  <Image borderRadius={'10px'} src={i.attachments[0]} alt="" />
                  <Link to={`/checkout/form/${i.id}`}>
                    <Box mt={2}>
                      <Heading size="md">{i.name}</Heading>
                      {/* <Text mt={1} fontSize={"sm"}>
                        {i.description}
                      </Text> */}
                      <Text>{i.id}</Text>
                      <Text fontWeight={'bold'}>Rp.50.000</Text>
                      <Text>{i.store?.name}</Text>
                      {/* <Text>{i.store?.locations[0].address}</Text> */}
                    </Box>
                  </Link>
                </Stack>
              </Box>
            </Box>
          ))}
        </Flex>
        {/* <Box display={"flex"} flexDir={"column"} gap={3}>
          {item.map((i, o) => (
            <>
              <Card border={"1px"} p={4}>
                <Box display={"flex"} gap={3}>
                  <Image
                    boxSize={"10"}
                    borderRadius={"10%"}
                    src={i.attachments[0]}
                    alt=""
                  />
                  <Link to={`/checkout/form/${i.id}`}>
                    <Text>{i.name}</Text>
                    <Text>{i.description}</Text>
                  </Link>
                </Box>
              </Card>
            </>
          ))}
        </Box> */}
      </Box>
    </>
  );
}
