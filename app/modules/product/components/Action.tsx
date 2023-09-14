import { Button, Card, CardBody, Flex, HStack } from '@chakra-ui/react';

export function Action() {
  return (
    <Card>
      <CardBody>
        <Flex justify={'space-between'}>
          <Button borderRadius={'full'} variant={'outline'}>
            Preview Halaman Checkout
          </Button>

          <HStack>
            <Button borderRadius={'full'} variant={'outline'}>
              Batal
            </Button>
            <Button
              borderRadius={'full'}
              bgColor={'lakoeCyan'}
              textColor={'white'}
              _hover={{ textColor: 'black', bgColor: 'gray.200' }}
              type="submit"
            >
              Simpan
            </Button>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
}
