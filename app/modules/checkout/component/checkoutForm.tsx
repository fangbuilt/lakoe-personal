import {
  Box,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';

export function InputHidden(data: any) {
  return (
    <>
      <Box>
        <Input
          type="hidden"
          name="option"
          value={data.selectedOption}
          readOnly
          required
        />
        <Input type="hidden" name="price" readOnly value={data.price} />
        <Input type="hidden" name="storeId" value={data.storeId} readOnly />
        <Input type="hidden" name="productId" value={data.productId} readOnly />
        <Input type="hidden" name="valueId" readOnly value={data.valueId} />
        <Input
          type="hidden"
          name="variantOptionId"
          readOnly
          value={data.variantOptionId}
        />
        <Input type="hidden" name="userId" readOnly value={data.userId} />
      </Box>
    </>
  );
}

export function ModalCheckout(data: any) {
  return (
    <>
      <Box>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'} textAlign={'center'}>
            {data.text}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={data.displaySpinner}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              mb={5}
            >
              <Spinner
                w={10}
                h={10}
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          </ModalBody>
          <ModalFooter>{data.children}</ModalFooter>
        </ModalContent>
      </Box>
    </>
  );
}
