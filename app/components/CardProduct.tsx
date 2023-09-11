import {
  Card,
  Image,
  CardBody,
  Text,
  Heading,
  Button,
  Box,
  Divider,
} from '@chakra-ui/react';
import type { Cart } from '~/interfaces/ProductUnpaid';

export default function CardProducts(props: Cart) {
  const message =
    'Halo! Ini dari bakulan store.id apakah anda ingin melakukan transaksi bayar di tempat?.';

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${props.cartItems.map(
      (item) => item.user?.phone
    )}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };
  return (
    <>
      <Box>
        <Card
          // key={props.id}
          overflow="hidden"
          variant="outline"
          display={'flex'}
          justifyContent={'space-between'}
          margin={'50px 5% 10px'}
        >
          {/* atas */}
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            padding={'15px'}
          >
            <Box>
              <Button
                padding={'4px 8px'}
                borderRadius={'4px'}
                backgroundColor={'#E8C600'}
                fontSize={'14px'}
                fontWeight={'600'}
                size={'sm'}
                mb={2}
              >
                {props.invoice.map((item) => item.status)}
              </Button>

              <Text
                fontSize={'14px'}
                fontWeight={'500'}
                lineHeight={'16px'}
                color={'#909090'}
              >
                {props.invoice.map((item) => item.invoiceNumber)}
              </Text>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
              <Button
                onClick={handleSendMessage}
                borderRadius={'15px'}
                padding={'4px 12px'}
                border={'1px solid #D5D5D5'}
                size={'sm'}
                bg={'transparent'}
              >
                Hubungi user
              </Button>
            </Box>
          </Box>

          <Divider w={'100%'} />

          {/* bawah */}
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            padding={'15px'}
          >
            <Box display={'flex'}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'column'}
              >
                <Image
                  objectFit="cover"
                  width={'52px'}
                  height={'52px'}
                  src={'#'}
                  // src={`${props.cartItems.map((item) => item.product?.attachments[0])}`}
                  alt="brown clothes"
                  borderRadius={'8px'}
                />
              </Box>

              <Box>
                <CardBody>
                  <Heading
                    size="md"
                    fontSize={'16px'}
                    lineHeight={'20px'}
                    fontWeight={'700'}
                  >
                    <Text isTruncated>
                      {props.cartItems.map((item) => item.product?.name)}
                    </Text>
                  </Heading>
                  <Text
                    py="2"
                    fontSize={'14px'}
                    color={'#909090'}
                    lineHeight={'16px'}
                  >
                    {props.cartItems.map((item) => item.qty)} Barang
                  </Text>
                </CardBody>
              </Box>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              flexDirection={'column'}
              flex={'end'}
            >
              <Text
                fontSize={'14px'}
                fontWeight={'500'}
                color={'#909090'}
                lineHeight={'16px'}
              >
                Total Belanja
              </Text>
              <Text fontSize={'14px'} fontWeight={'700'}>
                {props.price}
              </Text>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
