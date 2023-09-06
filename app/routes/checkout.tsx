import { Box, Button, Image, Text } from '@chakra-ui/react';
import data from '../utils/dataFake.json';
import { Link } from '@remix-run/react';

export default function CheckoutPage() {
  return (
    <>
      <Box
        m={'10%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        borderBlockStart={'1px'}
        borderRadius={['120px', '140px', '160px', '180px']}
        pt={'50px'}
      >
        <Box
          gap={3}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text>Fungsi Utama</Text>
          <Text>Cave Natural Hair Powder</Text>
          {data.map((i, o) => (
            <Box
              key={o}
              display={'flex'}
              alignItems={'center'}
              border={'1px'}
              borderRadius={'10px'}
              pr={3}
              gap={3}
              width={['80%', '70%', '60%']}
            >
              <Image
                bgColor={'#3a5255'}
                border={'1px'}
                borderRadius={'full'}
                boxSize={'60px'}
                ml={-7}
                src="https://cdn.icon-icons.com/icons2/2109/PNG/512/people_male_young_hair_style_sunglasses_party_icon_131009.png"
                alt=""
                width={'60px'}
              />
              <Text>{i.content}</Text>
            </Box>
          ))}
          <Box>
            <Link to={`/checkout/form`}>
              <Button bg={'#3a5255'} color={'white'} m={'20px'} w={'200px'}>
                Buy
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
