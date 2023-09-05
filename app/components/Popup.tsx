import { Box, Button, Text } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

export default function Popup(props: any) {
  return props.trigger ? (
    <>
      <Box
        position={'fixed'}
        top={0}
        left={0}
        width={'100%'}
        height={'100vh'}
        bg={'rgba(0,0,0,0.2)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          bg={'white'}
          my={10}
          p={'10px'}
          position={'relative'}
          width={'100%'}
          maxWidth={'530px'}
        >
          {props.children}
          <Button
            p={6}
            rounded={'0'}
            w={'100%'}
            color={'gray.600'}
            display={'flex'}
            justifyContent={'space-between'}
            bg={'lightblue'}
            fontSize={'23px'}
            position={'absolute'}
            top={'20px'}
            onClick={() => props.setTrigger(false)}
            colorScheme="none"
          >
            <Text fontSize={'15px'}>Tarik Credit</Text>
            <AiOutlineClose />
          </Button>
        </Box>
      </Box>
    </>
  ) : null;
}
