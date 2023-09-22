import { Box, Button, Card, Image, Text } from '@chakra-ui/react';
import { Link, useParams } from '@remix-run/react';

export default function ErrooPage() {
  const { slug, store } = useParams();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'100px'}
      >
        <Card
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          p={5}
          boxShadow={'dark-lg'}
        >
          <Image
            boxSize={'200px'}
            src="https://www.pngmart.com/files/19/Sad-Emoji-PNG-File.png"
            alt="sad emoji"
          />
          <Text textAlign={'center'} fontWeight={'bold'} fontSize={'4xl'}>
            We Have Error
          </Text>
          <Box
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            gap={2}
          >
            <Text>Please try again</Text>
            <Text>Click this button</Text>
            <Link to={`/${store}/${slug}`}>
              <Button w={'200px'} colorScheme={'red'}>
                Reload
              </Button>
            </Link>
          </Box>
        </Card>
      </Box>
    </>
  );
}
