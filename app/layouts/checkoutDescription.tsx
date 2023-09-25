import { Box, Center, Img } from '@chakra-ui/react';

export default function CheckoutDescription() {
  return (
    <>
      <Box>
        <Center>
          <Img
            src={
              'https://images.unsplash.com/photo-1558050032-160f36233a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
            }
          ></Img>
        </Center>
      </Box>
    </>
  );
}
