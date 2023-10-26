import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';
import useOrderTracking from '~/hooks/useOrderTracking';

interface SendProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: string;
}

export default function ModalTracking(props: SendProps) {
  const { orderTrackingsData, orderMultiTrackingsData } = useOrderTracking(
    props.selectedCardId
  );
  let steps = orderMultiTrackingsData;

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent minWidth="fit-content" height="fit-content">
          <ModalHeader>Lacak Pengiriman</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box
                width={'606px'}
                height={'176px'}
                padding={'10px'}
                gap={'10px'}
                display={'flex'}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  width={'288px'}
                  height={'156px'}
                  gap={3}
                >
                  <Box width={'288px'} height={'44px'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      Kurir
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      {orderTrackingsData?.courier.company}
                    </Text>
                  </Box>
                  <Box width={'288px'} height={'44px'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      No. Resi
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      {orderTrackingsData?.waybill_id}
                    </Text>
                  </Box>
                  <Box width={'288px'} height={'44px'} gap={1}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      Pengirim
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      {orderTrackingsData?.origin.contact_name}
                    </Text>
                  </Box>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  width={'288px'}
                  height={'86px'}
                  gap={4}
                >
                  <Box width={'288px'} height={'44px'} gap={'4px'}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      Penerima
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      {orderTrackingsData?.destination.contact_name}
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      color={'#1D1D1D'}
                    >
                      {orderTrackingsData?.destination.address}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box
                width={'606px'}
                height={'20px'}
                padding={'10px'}
                gap={'2px'}
                display={'flex'}
              >
                <Box width={'55px'} height={'20px'}>
                  <Text
                    fontSize={'16px'}
                    fontWeight={'500'}
                    lineHeight={'20px'}
                    color={'#1D1D1D'}
                  >
                    Status:
                  </Text>
                </Box>
                <Box width={'250px'} height={'20px'}>
                  <Text
                    fontSize={'16px'}
                    fontWeight={'700'}
                    lineHeight={'20px'}
                    color={'#1D1D1D'}
                  >
                    {orderTrackingsData?.status}
                  </Text>
                </Box>
              </Box>
              <Box
                width={'606px'}
                // height={"300px"}
                padding={' 20px 16px 0px 16px'}
              >
                {/* Stepper */}
                <Stepper
                  size={'sm'}
                  border={'1px solid #E6E6E6'}
                  borderRadius={'12px'}
                  index={activeStep}
                  orientation="vertical"
                  // height="110%"
                  width={'100%'}
                  gap="5"
                  p={'16px'}
                >
                  {steps.reverse().map((step: any, index: number) => (
                    <Step key={index}>
                      <StepIndicator fontSize={'11px'}>
                        <StepStatus
                          complete={<BsCircleFill />}
                          incomplete={<BsCircleFill color="gray" />}
                          active={<BsCircleFill color="gray" />}
                        />
                      </StepIndicator>

                      <Box flexShrink="0">
                        <StepTitle>{step.note}</StepTitle>
                        <StepDescription>
                          {new Date(step.updated_at).toLocaleString()}
                        </StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
