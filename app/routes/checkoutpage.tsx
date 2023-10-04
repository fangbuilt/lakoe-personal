import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '../libs/prisma/db.server';
import React from 'react';

export async function loader() {
  return await db.product.findMany({
    include: {
      store: {
        include: {
          locations: true,
        },
      },
      attachments: true,
      variants: {
        include: {
          variantOptions: {
            include: {
              variantOptionValues: true,
            },
          },
        },
      },
    },
  });
}

export default function CheckoutPage() {
  const item = useLoaderData<typeof loader>();

  return (
    <>
      <Box
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
                _hover={{
                  bg: 'gray.100',
                  cursor: 'pointer',
                  transition: '0.5s',
                  transform: 'scale(1.1)',
                }}
              >
                <Stack align={'start'} spacing={2}>
                  <Image
                    height={'180px'}
                    objectFit={'cover'}
                    borderRadius={'10px'}
                    src={i.attachments[0].url}
                    alt="none"
                  />
                  <Link to={`/checkout/${i.store?.name}/${i.slug}`}>
                    <Box mt={2}>
                      <Heading size="md">{i.name}</Heading>
                      <Text>
                        Rp.
                        {i.variants[0].variantOptions[0].variantOptionValues[0].price.toLocaleString(
                          'id-ID'
                        )}
                      </Text>
                      <Text>slug :{i.slug}</Text>
                      <Text>{i.store?.name}</Text>
                    </Box>
                  </Link>
                </Stack>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
}
