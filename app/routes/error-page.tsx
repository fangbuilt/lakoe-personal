import { Box, Card, Image, Text } from '@chakra-ui/react';

export default function ErrooPage() {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'100px'}
      >
        <Card display={'flex'} flexDir={'column'} alignItems={'center'}>
          <Image
            boxSize={'200px'}
            src="https://www.pngmart.com/files/19/Sad-Emoji-PNG-File.png"
            alt="sad emoji"
          />
          <Text textAlign={'center'} fontWeight={'bold'} fontSize={'4xl'}>
            We Have Error
          </Text>
        </Card>
      </Box>
    </>
  );
}
