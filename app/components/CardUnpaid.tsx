import { Box, Button, Card, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import type { Invoice } from '~/interfaces/ProductUnpaid';
// import { Link } from '@remix-run/react';

export default function UnpaidCard({
  filteredOrdersByCourier,
}: {
  filteredOrdersByCourier: Invoice[];
}) {
  console.log('UnpaidCard UnpaidCard terbaru', filteredOrdersByCourier);
  const formatter = new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  console.log(
    'ini fotooooooo',
    filteredOrdersByCourier.map((item) =>
      item.cart?.cartItems.map((item) => item.product?.attachments[0])
    )
  );
  return (
    <>
      {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

      {/* CARD START HERE */}
      {filteredOrdersByCourier.map((item) => (
        <Card mb={5} boxShadow={'xs'} key={item.id}>
          <Box>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#E8C600'}
                    color={'#1D1D1D'}
                    fontWeight={'bold'}
                    colorScheme="red.500"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    {item.status}
                    {/* {item.invoice.map((item) => item.payment?.status)} */}
                  </Button>

                  {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                  <Link to={`http://wa.me/${item.user?.phone}`}>
                    <Button
                      bg={'transparent'}
                      border={'1px solid #D5D5D5'}
                      borderRadius={'full'}
                      fontSize={'14px'}
                    >
                      Hubungi Pembeli
                    </Button>
                  </Link>

                  {/*  */}
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {item.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'} w={'80%'}>
                    <Image
                      w={'52px'}
                      h={'52px'}
                      display={'inline'}
                      src={`${item.cart?.cartItems.map(
                        (item) => item.product?.attachments[0]
                      )}`}
                      mt={3}
                      // alt={data.cartItems.map((item) => item.product?.name)}
                    />
                    <Text
                      mt={4}
                      id="fm500"
                      fontSize={'16px'}
                      textOverflow={'ellipsis'}
                      overflow={'hidden'}
                      whiteSpace={'nowrap'}
                      fontWeight={'700'}
                    >
                      {item.cart?.cartItems.map((item) => item.product?.name)}
                      <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                        {item.cart?.cartItems.map((item) => item.qty)} Barang
                      </Text>
                    </Text>
                  </Box>
                  <Box mt={4} w={'15%'}>
                    <Flex gap={1}>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Total
                      </Text>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Belanja
                      </Text>
                    </Flex>
                    <Text fontWeight={'bold'} fontSize={'14px'}>
                      {/* Rp {item.price.toLocaleString('en-IDR', {
                        style: 'currency',
                        currency: 'IDR',
                      })} */}

                      {formatter.format(item.price)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}

      {/* END CARD */}
    </>
  );
}
