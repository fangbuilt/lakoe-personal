import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from '@chakra-ui/react';
import documentIcon from '~/assets/DetailOrderIcon/document.svg';
import calender from '~/assets/DetailOrderIcon/calendar-2.svg';
import barcode from '~/assets/DetailOrderIcon/barcode.svg';
import copy from '~/assets/DetailOrderIcon/copy.svg';
import profile from '~/assets/DetailOrderIcon/profile-circle.svg';
import whatsapp from '~/assets/DetailOrderIcon/whatsapp.svg';
import box from '~/assets/DetailOrderIcon/box.svg';
import truck from '~/assets/DetailOrderIcon/truck-fast.svg';
import wallet from '~/assets/DetailOrderIcon/wallet.svg';
import { useOrderDetalil } from '../hooks/useOrderDetail';
import { BsCircleFill } from 'react-icons/bs';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';

export default function StatusOrderDetail() {
  const { isOrderHistoryVisible, toggleOrderHistory, steps, activeStep } =
    useOrderDetalil();
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={3}
        padding={3}
        margin={3}
      >
        <Flex mt={5}>
          <Text color={'#0EADD7'}>Daftar Pesanan</Text>{' '}
          <Text>
            <ChevronRightIcon /> CREWNECK BASIC-BLACK...
          </Text>
        </Flex>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={'24px'}
              width={'24px'}
              justifyContent={'center'}
              alignItems={'center'}
              src={documentIcon}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Box
              background={'yellow.400'}
              display={'flex'}
              height={'24px'}
              padding={`var(--1, 4px) var(--2, 8px)`}
              justifyContent={'center'}
              alignItems={'center'}
              gap={`var(--1, 4px)`}
              borderRadius={`var(--rounded, 4px)`}
              width={'150px'}
            >
              <Text
                textAlign={'center'}
                fontSize={'14px'}
                fontWeight={'600'}
                lineHeight={'15.5px'}
              >
                Belum Dibayar
              </Text>
            </Box>
            <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
              Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
              <Text as={'span'} fontWeight={'700'}>
                {' '}
                10 Agustus 2023 - 00:00 WIB
              </Text>
              . Silahkan tunggu sampai pembayaran terkonfirmasi sebelum
              mengirimkan barang.
            </Text>
            <Text
              color={'#0086B4'}
              cursor={'pointer'}
              onClick={toggleOrderHistory}
            >
              {isOrderHistoryVisible ? (
                <>
                  Sembunyikan <ChevronUpIcon />
                </>
              ) : (
                <>
                  Lihat riwayat pesanan <ChevronDownIcon />
                </>
              )}
            </Text>
            {isOrderHistoryVisible && (
              <Stepper
                size={'sm'}
                border={'1px solid #E6E6E6'}
                borderRadius={'12px'}
                index={activeStep}
                orientation="vertical"
                height="100%"
                width={'50%'}
                gap="5"
                p={'16px'}
              >
                {steps.map((step) => (
                  <Step key={step.id}>
                    <StepIndicator fontSize={'11px'}>
                      <StepStatus
                        complete={<BsCircleFill />}
                        incomplete={<BsCircleFill color="gray" />}
                        active={<BsCircleFill color="gray" />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>
        </Box>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
          flexDirection={'column'}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={3}>
              <Image
                height={'24px'}
                width={'24px'}
                justifyContent={'center'}
                alignItems={'center'}
                src={calender}
              />
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Tanggal
              </Text>
            </Box>
            <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
              09 Agustus 2023 - 19:43 WIB
            </Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={3}>
              <Image
                height={'24px'}
                width={'24px'}
                justifyContent={'center'}
                alignItems={'center'}
                src={barcode}
              />
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Invoice
              </Text>
            </Box>
            <Box display={'flex'} gap={3}>
              <Image
                height={'24px'}
                width={'24px'}
                justifyContent={'center'}
                alignItems={'center'}
                src={copy}
              />
              <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                INV/120983298470123740325
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={3}>
              <Image
                height={'24px'}
                width={'24px'}
                justifyContent={'center'}
                alignItems={'center'}
                src={profile}
              />
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Pembeli
              </Text>
            </Box>
            <Box
              display={'flex'}
              gap={3}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box
                display={'flex'}
                width={'32px'}
                height={'32px'}
                padding={`var(--1, 4px)`}
                justifyContent={'center'}
                alignItems={'center'}
                gap={`var(--1, 4px)`}
                borderRadius={`var(--rounded-full, 9999px)`}
                background={`var(--green-800, #008F5D)`}
              >
                <Image
                  height={'24px'}
                  width={'24px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  src={whatsapp}
                />
              </Box>
              <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                Tes Dulu Nggak sih
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={'24px'}
              width={'24px'}
              justifyContent={'center'}
              alignItems={'center'}
              src={box}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box>
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Detail Produk
              </Text>
            </Box>
            <Box>
              <Card
                overflow="hidden"
                variant="outline"
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Divider w={'100%'} />

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
                        src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
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
                          CREWNECK BASIC-BLACK | sweeter polos hodie polos
                          crewneck - S
                        </Heading>
                        <Text
                          py="2"
                          fontSize={'14px'}
                          color={'#909090'}
                          lineHeight={'16px'}
                        >
                          2 Barang
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
                      190.000
                    </Text>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={'24px'}
              width={'24px'}
              justifyContent={'center'}
              alignItems={'center'}
              src={truck}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
              Detail Pengiriman
            </Text>
            <Box display={'flex'}>
              <Text
                fontSize={'14px'}
                fontWeight={'400'}
                lineHeight={'20px'}
                width={'192px'}
              >
                Kurir
              </Text>
              <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                J&T - Reguler
              </Text>
            </Box>
            <Box display={'flex'}>
              <Text
                fontSize={'14px'}
                fontWeight={'400'}
                lineHeight={'20px'}
                width={'192px'}
              >
                No. Resi
              </Text>
              <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                {' '}
                -{' '}
              </Text>
            </Box>
            <Box display={'flex'}>
              <Text
                fontSize={'14px'}
                fontWeight={'400'}
                lineHeight={'20px'}
                width={'192px'}
              >
                Alamat
              </Text>
              <Box display={'flex'} flexDirection={'column'}>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  jln elang 4 sawah lama
                </Text>
                <Text
                  color={`var(--text-gray, #909090)`}
                  fontSize={'14px'}
                  fontWeight={'400'}
                  lineHeight={'20px'}
                >
                  08298123128974213
                </Text>
                <Text
                  color={`var(--text-gray, #909090)`}
                  fontSize={'14px'}
                  fontWeight={'400'}
                  lineHeight={'20px'}
                >
                  Tes Dulu Nggak sih
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={'24px'}
              width={'24px'}
              justifyContent={'center'}
              alignItems={'center'}
              src={wallet}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={3}>
            <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
              Rincian Pembayaran
            </Text>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  Total Harga (1 barang)
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  Rp180.000
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  Total Ongkos Kirim (10kg)
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  Rp10.000
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  Diskon
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  Rp0
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  Biaya Layanan
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  Rp0
                </Text>
              </Box>
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'20px'}>
                  Total Penjualan
                </Text>
              </Box>
              <Box>
                <Text fontSize={'18px'} fontWeight={'700'} lineHeight={'24px'}>
                  Rp190.000
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
