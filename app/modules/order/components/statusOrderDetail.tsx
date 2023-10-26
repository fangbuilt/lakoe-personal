import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
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
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import barcode from '~/assets/DetailOrderIcon/barcode.svg';
import box from '~/assets/DetailOrderIcon/box.svg';
import calender from '~/assets/DetailOrderIcon/calendar-2.svg';
import copy from '~/assets/DetailOrderIcon/copy.svg';
import documentIcon from '~/assets/DetailOrderIcon/document.svg';
import circle from '~/assets/DetailOrderIcon/info-circle.svg';
import profile from '~/assets/DetailOrderIcon/profile-circle.svg';
import truck from '~/assets/DetailOrderIcon/truck-fast.svg';
import wallet from '~/assets/DetailOrderIcon/wallet.svg';
import whatsapp from '~/assets/DetailOrderIcon/whatsapp.svg';
import ModalInShipping from '~/components/ModalInShipping';
import type { ITracking } from '~/interfaces/order/orderTracking';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import {
  dateConversion,
  formatCurrency,
  useOrderDetail,
} from '../hooks/useOrderDetail';
import getStatusBadge from './statusInvoice';
import NewOrderHooks from '~/modules/webhook/hooks/NewOrderHooks';
import type { loader } from '~/routes/order_.detail.$id';

export default function StatusOrderDetail({
  data,
  dataTracking,
  apiKey,
}: {
  data: IOrderDetailInvoice;
  dataTracking: ITracking;
  apiKey: string;
}) {
  const dataTrack = useLoaderData<typeof loader>();
  const currentTime = dataTrack.currentTime;

  const {
    isOrderHistoryVisible,
    toggleOrderHistory,
    activeStep,
    filterStepsByStatus,
  } = useOrderDetail();

  const {
    toastStyle,
    isCopied1,
    isCopied2,
    isCopied3,
    setIsCopied1,
    setIsCopied2,
    setIsCopied3,
    handleCopyClick,
  } = useCopyToClipboard();

  const handleCopyInvoiceClick = () => {
    handleCopyClick(data.invoiceNumber, setIsCopied1);
  };

  const handleCopyResiClick = () => {
    handleCopyClick(data.waybill, setIsCopied2);
  };

  const handleCopyAddressClick = () => {
    handleCopyClick(data.receiverAddress, setIsCopied3);
  };

  const [modalText, setModalText] = useState('');
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();

  const { afterpacking, setSelectedProps } = NewOrderHooks();

  useEffect(() => {
    setSelectedProps(data);
  }, []);

  const stepCount = filterStepsByStatus(data?.status).length;
  const stepHeight = 65;
  const sortedHistories = data?.invoiceHistories.slice().sort((a, b) => {
    return b.id.localeCompare(a.id);
  });

  const handleCancelNotif = async () => {
    try {
      const mailerBaseUrl = 'https://connect.mailerlite.com';
      const mailerEndPoint = '/api/subscribers';
      const mailerApiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2E4ZjZkNTMxMDdkY2M1MjZjM2M5YTQxY2JhMjg0ZjJlOTc5NmFjOTA2MjVkMzRjN2I5NTVmNDY1ODlkZjcxOGM5NzY5ZmYyMzU5OTcxZTkiLCJpYXQiOjE2OTQxNTU1NDQuMTI1MzUyLCJuYmYiOjE2OTQxNTU1NDQuMTI1MzU0LCJleHAiOjQ4NDk4MjkxNDQuMTIwNDQsInN1YiI6IjYxNDY4NSIsInNjb3BlcyI6W119.KgsXIIo-rqViucL5U0QTHaG-Nhp0YJn0c752CSW1taUIVgfP0Dyk-vL-mHEGCLWl4CROGPwtzGakauaIGV1A-ijvg_16vEz04u8xKRzzuP4F9Hza78RnhTXjewo6oEiB4_E3WwFU6qalQmzoNaSzmaBI4zi6HZOO29uEHtZRswRfmi5g1XmDyqo2SmaL6S3nTU7xMoHaBlvY7UnanzqdpX0nr-nxS-05ADZRlo1a3YDQBihDFLzrhN8xgtXipU5O7nz18-Ivpj2TNjaMNk85zZukLYPxF1lVXrbNFWKVWJKMk9gthqMWsPDQTg7GexZSE-0uzZL8CO1azw_hCdJUJQYM3KYw1pb6PUm4YSO-Br4etsClpICaivipa5EGSOKF3wvAhyHa12ZIZuJcBadQPyAaiDi8a0s1O6UbLMBa_45oDDfeNQsEpXg9i5hkAe7H0DEdgM69JMh0zmu4Vi8s3f_fmz0pfGjXfKVT6g0KHx0K6AYhN714R2x6FOB-au4QrPlE_UdvIOO959uozJ4CHHiBKClWcTLRELWwCPmo6y5s-K8_s7h1czfV2MVx5mfihABiLyxCv3y6EwxgTi6gjKiN4NcCMoGnxt0dwPos67QQ-gRn2SdQoN0rsrKGuZltLOBza1cnqoHAZAFHiSrJq332VNoJhNuXN-3MoXw1LCY'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const mailerData = {
        email: `angga.ardiansyah955+${new Date().getTime()}@gmail.com`,
        fields: {
          company: 'ORDER CANCELED',
          last_name: 'this order have been canceled from the seller',
        },
        groups: ['98713000939095999'],
      };

      const mailerRequest = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mailerApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailerData),
      };

      const response = await fetch(
        `${mailerBaseUrl}${mailerEndPoint}`,
        mailerRequest
      );
      await response.json();
    } catch (error) {
      alert(error);
    }
  };

  const products = data?.cart?.cartItems.map((cartItem) => {
    return { ...cartItem, cartItem };
  });

  function getStatusText(status: string) {
    if (status?.toUpperCase() === 'UNPAID') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
          <Text as={'span'} fontWeight={'700'}>
            {' '}
            {dateConversion(data.updatedAt)} WIB
          </Text>
          . Silahkan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan
          barang.
        </Text>
      );
    }
    if (status?.toUpperCase() === 'NEW_ORDER') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Segera proses pesanan yang masuk. Jangan membuat pembeli menunggu
          terlalu lama.
        </Text>
      );
    }
    if (status?.toUpperCase() === 'READY_TO_SHIP') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Pesanan telah di-pickup oleh Kurir dan siap untuk dikirim.
        </Text>
      );
    }
    if (status?.toUpperCase() === 'IN_TRANSIT') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Pesanan sudah dalam proses pengiriman. Silakan tunggu penerimaan
          barang oleh pembeli.
        </Text>
      );
    }
    if (status?.toUpperCase() === 'ORDER_COMPLETED') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Produk telah diterima oleh pembeli dan pesanan ini diselesaikan.
        </Text>
      );
    }
    if (status?.toUpperCase() === 'ORDER_CANCELLED') {
      return (
        <Text fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>
          Pesanan dibatalkan karena pembeli tidak melakukan pembayaran tepat
          waktu.
        </Text>
      );
    }
  }

  function useStatusLacakPengiriman(status: string) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string>('');
    const [cardModals, setCardModals] = useState<{ [key: string]: boolean }>(
      {}
    );

    function openModal(trackingId: string, id: string) {
      // Check if the modal for this card is already open
      if (cardModals[id]) {
        return;
      }

      // Set the modal state for this card to open
      const updatedCardModals = { ...cardModals };
      updatedCardModals[id] = true;
      setCardModals(updatedCardModals);

      setSelectedCardId(trackingId);
      setModalIsOpen(true);
    }

    function closeModal(id: string) {
      // Set the modal state for this card to closed
      const updatedCardModals = { ...cardModals };
      updatedCardModals[id] = false;
      setCardModals(updatedCardModals);

      setModalIsOpen(false);
    }

    if (status.toUpperCase() === 'IN_TRANSIT') {
      return (
        <>
          <Form
            method="POST"
            onSubmit={() => {
              openModal(data.courier?.trackingId as string, data.id);
              console.log(
                new Date(
                  data.biteshipTrackinglimits?.nextAccessTime ?? ''
                ).getTime() / 10000
              );
              console.log(
                currentTime -
                  new Date(
                    data.biteshipTrackinglimits?.nextAccessTime ?? ''
                  ).getTime() /
                    (30 * 60 * 1000)
              );
              console.log(
                new Date(
                  data.biteshipTrackinglimits?.nextAccessTime ?? ''
                ).getTime() /
                  (30 * 60 * 1000) -
                  currentTime
              );
              console.log(30 * 60 * 1000);
              console.log(currentTime / (30 * 60 * 1000));
              console.log(
                currentTime / 1000 -
                  new Date(
                    data.biteshipTrackinglimits?.nextAccessTime ?? ''
                  ).getTime() /
                    1000
              );
              console.log(
                'Condition Value:',
                currentTime / 1000 <
                  new Date(
                    data.biteshipTrackinglimits?.nextAccessTime ?? ''
                  ).getTime() /
                    1000
              );
            }}
          >
            <Input
              name="actionType"
              defaultValue={'createTrackingLimit'}
              hidden
            />
            <Input name="invoiceId" defaultValue={data.id} hidden />
            <Button
              fontSize={'14px'}
              fontWeight={'700'}
              lineHeight={'20px'}
              color={'#0086B4'}
              background={'#FFFFFF)'}
              colorScheme="#FFFFFF)"
              w={'120px'}
              type="submit"
              isDisabled={
                currentTime / 1000 <
                new Date(
                  data.biteshipTrackinglimits?.nextAccessTime ?? ''
                ).getTime() /
                  1000
              }
            >
              Lacak Pengiriman
            </Button>
          </Form>

          {modalIsOpen && (
            <ModalInShipping
              isOpen={modalIsOpen}
              onClose={() => closeModal(selectedCardId)}
              selectedCardId={selectedCardId}
            />
          )}
        </>
      );
    }

    if (status.toUpperCase() === 'ORDER_COMPLETED') {
      return (
        <Button
          fontSize={'14px'}
          fontWeight={'700'}
          lineHeight={'20px'}
          color={'#0086B4'}
          background={'#FFFFFF)'}
          colorScheme="#FFFFFF)"
          w={'120px'}
        >
          Lacak Pengiriman
        </Button>
      );
    }
    return null;
  }

  let totalQuantity = 0;
  for (const item of data?.cart?.cartItems || 'tidak ada data') {
    totalQuantity += item.qty;
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Flex>
          <Text color={'#0EADD7'}>Daftar Pesanan</Text>{' '}
          <Text
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxW="200px"
          >
            <ChevronRightIcon />
            {data?.cart?.cartItems[0]?.product?.name}
          </Text>
          {isCopied1 && (
            <Box {...toastStyle}>
              <Box display={'flex'} gap={3}>
                <Image src={circle} />
                <Text>Nomor Invoice berhasil disalin</Text>
              </Box>
              <Text onClick={() => setIsCopied1(false)} cursor={'pointer'}>
                OK
              </Text>
            </Box>
          )}
          {isCopied2 && (
            <Box {...toastStyle}>
              <Box display={'flex'} gap={3}>
                <Image src={circle} />
                <Text>Nomor Resi berhasil disalin</Text>
              </Box>
              <Text onClick={() => setIsCopied2(false)} cursor={'pointer'}>
                OK
              </Text>
            </Box>
          )}
          {isCopied3 && (
            <Box {...toastStyle}>
              <Box display={'flex'} gap={3}>
                <Image src={circle} />
                <Text>Alamat berhasil disalin</Text>
              </Box>
              <Text onClick={() => setIsCopied3(false)} cursor={'pointer'}>
                OK
              </Text>
            </Box>
          )}
        </Flex>
        <Box
          display={'flex'}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Image
            height={'24px'}
            width={'24px'}
            justifyContent={'center'}
            alignItems={'center'}
            src={documentIcon}
          />
          <Box display={'flex'} flexDirection={'column'} gap={3}>
            {getStatusBadge({ status: data?.status })}
            {getStatusText(data?.status)}

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
                index={activeStep}
                orientation="vertical"
                width={'400px'}
                height={`${stepCount * stepHeight}px`}
                gap="0"
                border={'1px solid #E6E6E6'}
                padding={'var(--4, 16px)'}
                borderRadius={'var(--rounded-lg, 12px)'}
              >
                {filterStepsByStatus(data?.status).map((step, index) => (
                  <Step key={step.id}>
                    <StepIndicator>
                      <StepStatus
                        complete={
                          <div
                            style={{
                              background:
                                index === 0 ? '#C5F8FF' : 'transparent',
                              borderRadius: '50%',
                              padding: '7px',
                              display: 'inline-block',
                            }}
                          >
                            <BsCircleFill size={'12px'} color="#0086B4" />
                          </div>
                        }
                        incomplete={
                          <div
                            style={{
                              background: '#F8F8F8',
                              borderRadius: '50%',
                              padding: '7px',
                              display: 'inline-block',
                            }}
                          >
                            <BsCircleFill size={'12px'} color="#D5D5D5" />
                          </div>
                        }
                        active={
                          <div
                            style={{
                              background: '#F8F8F8',
                              borderRadius: '50%',
                              padding: '7px',
                              display: 'inline-block',
                            }}
                          >
                            <BsCircleFill size={'12px'} color="#D5D5D5" />
                          </div>
                        }
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle
                        style={{ fontWeight: '700', fontSize: '14px' }}
                      >
                        {step.title}
                      </StepTitle>
                      <StepDescription
                        style={{ fontWeight: '500', fontSize: '12px' }}
                      >
                        {dateConversion(sortedHistories[index]?.createdAt)} WIB
                      </StepDescription>
                    </Box>

                    <StepSeparator style={{ background: '#E6E6E6' }} />
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
              {dateConversion(data?.createdAt)} WIB
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
                height={'18px'}
                width={'18px'}
                justifyContent={'center'}
                alignItems={'center'}
                src={copy}
                // onClick={handleCopyInvoiceClick}
                onClick={handleCopyInvoiceClick}
                style={{ cursor: 'pointer' }}
                color={'gray.900'}
              />
              <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                {data?.invoiceNumber}
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
              <Link to={`https://wa.me/${data?.receiverPhone}`} target="_blank">
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
              </Link>
              <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                {data?.receiverName}
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
          <Image
            height={'24px'}
            width={'24px'}
            justifyContent={'center'}
            alignItems={'center'}
            src={box}
          />

          <Box display={'flex'} flexDirection={'column'} gap={1} width={'100%'}>
            <Box>
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Detail Produk
              </Text>
            </Box>
            <Box>
              {products?.map((item) => (
                <Card
                  overflow="hidden"
                  variant="outline"
                  display={'flex'}
                  justifyContent={'space-between'}
                  key={item.id}
                  mb={1.5}
                >
                  <Divider w={'100%'} />
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    padding="var(--2, 8px) var(--3, 12px)"
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
                          src={item.product?.attachments[0]?.url}
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
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                          >
                            {item.product?.name}
                          </Heading>
                          <Text
                            py="2"
                            fontSize={'14px'}
                            color={'#1D1D1D'}
                            lineHeight={'16px'}
                            fontWeight={'500'}
                          >
                            {item.cartItem.qty} x{' '}
                            {formatCurrency(
                              item.cartItem.variantOption.variantOptionValues[0]
                                .price
                            )}
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
                        textAlign={'right'}
                      >
                        Total Belanja
                      </Text>
                      <Text
                        fontSize={'14px'}
                        fontWeight={'700'}
                        lineHeight={'16px'}
                        textAlign={'right'}
                      >
                        {formatCurrency(item.cartItem.price)}
                      </Text>
                    </Box>
                  </Box>
                </Card>
              ))}
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

          <Box display={'flex'} flexDirection={'column'} gap={1} width={'100%'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'24px'}>
                Detail Pengiriman
              </Text>
              {useStatusLacakPengiriman(data?.status)}
            </Box>
            <Box display={'flex'}>
              <Box display={'flex'} flexDirection={'column'} gap={3}>
                <Box display={'flex'}>
                  <Box width={'192px'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      Kurir
                    </Text>
                  </Box>
                  <Box width={'100%'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                    >
                      {data?.courier?.courierName} -{' '}
                      {data?.courier?.courierServiceName}
                    </Text>
                  </Box>
                </Box>
                <Box display={'flex'}>
                  <Box display={'flex'} gap={1} width={'192px'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      No. Resi
                    </Text>
                    {data?.waybill ? (
                      <Image
                        height={'18px'}
                        width={'18px'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        src={copy}
                        onClick={handleCopyResiClick}
                        style={{ cursor: 'pointer' }}
                        color={'gray.900'}
                      />
                    ) : null}
                  </Box>
                  <Box width={'100%'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'20px'}
                    >
                      {data?.waybill ? data.waybill : '-'}
                    </Text>
                  </Box>
                </Box>
                <Box display={'flex'}>
                  <Box display={'flex'} gap={1} width={'192px'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      Alamat
                    </Text>
                    <Image
                      height={'18px'}
                      width={'18px'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      src={copy}
                      onClick={handleCopyAddressClick}
                      style={{ cursor: 'pointer' }}
                      color={'gray.900'}
                    />
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Text
                      color={`var(--text-dark, #1D1D1D)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      {data?.receiverAddress}
                    </Text>
                    <Text
                      color={`var(--text-gray, #909090)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      {data?.receiverPhone}
                    </Text>
                    <Text
                      color={`var(--text-gray, #909090)`}
                      fontSize={'14px'}
                      fontWeight={'400'}
                      lineHeight={'20px'}
                      fontStyle={'normal'}
                    >
                      {data?.receiverName}
                    </Text>
                  </Box>
                </Box>
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
                  Total Harga ({totalQuantity} barang)
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  {formatCurrency(data?.cart.price)}
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'}>
                  Total Ongkos Kirim
                </Text>
              </Box>
              <Box>
                <Text fontSize={'14px'} fontWeight={'700'} lineHeight={'20px'}>
                  {formatCurrency(data?.courier.price)}
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
                  {formatCurrency(data?.discount)}
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
                  Rp 0
                </Text>
              </Box>
            </Box>
            <Divider my={3} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'16px'} fontWeight={'700'} lineHeight={'20px'}>
                  Total Penjualan
                </Text>
              </Box>
              <Box>
                <Text fontSize={'18px'} fontWeight={'700'} lineHeight={'24px'}>
                  {formatCurrency(data?.price)}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {data?.status === 'NEW_ORDER' && (
          <Flex
            justifyContent={'space-between'}
            padding={`var(--4, 16px) var(--5, 20px)`}
            alignItems={'center'}
            alignSelf={'stretch'}
            borderRadius={`var(--rounded-lg, 12px)`}
            background={`var(--gray-50, #FFF)`}
          >
            <Box>
              <Button
                display={'flex'}
                height={'40px'}
                padding={`var(--3, 12px) var(--4, 16px)`}
                justifyContent={'center'}
                alignItems={'center'}
                gap={`var(--1, 4px)`}
                borderRadius={`var(--rounded-full, 9999px)`}
                border={`1px solid var(--red-800, #EA3829)`}
                background={`var(--gray-50, #FFF)`}
                onClick={() => {
                  setModalText(
                    'Apakah anda yakin untuk membatalkan proses ini?'
                  );
                  onOpenModal1();
                }}
              >
                <Text
                  color={`var(--text-red, #EA3829)`}
                  fontSize={'14px'}
                  fontWeight={'600'}
                  lineHeight={'15.5px'}
                >
                  Tolak Pesanan
                </Text>
              </Button>
            </Box>
            <Modal
              blockScrollOnMount={false}
              isOpen={isOpenModal1}
              onClose={() => {
                setModalText('');
                onCloseModal1();
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Tolak Pesanan</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    {modalText}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      setModalText('');
                      onCloseModal1();
                    }}
                  >
                    Cancel
                  </Button>
                  <Form method="post">
                    <Input
                      name="actionType"
                      defaultValue={'cancelNotif'}
                      hidden
                    />
                    <Input name="id" type="hidden" defaultValue={data.id} />
                    <Button
                      variant="ghost"
                      onClick={handleCancelNotif}
                      type="submit"
                    >
                      Tolak Pesanan
                    </Button>
                  </Form>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Box>
              <Button
                display={'flex'}
                height={'40px'}
                padding={`var(--3, 12px) var(--4, 16px)`}
                justifyContent={'center'}
                alignItems={'center'}
                gap={`var(--1, 4px)`}
                borderRadius={`var(--rounded-full, 9999px)`}
                background={`var(--cyan-800, #0086B4)`}
                onClick={() => {
                  setModalText(
                    'Apakah anda yakin untuk melanjutkan proses ini?'
                  );
                  onOpenModal2();
                }}
              >
                <Text
                  color={`var(--text-light, #FFF)`}
                  fontSize={'14px'}
                  fontWeight={'600'}
                  lineHeight={'15.5px'}
                >
                  Proses Pesanan
                </Text>
              </Button>
            </Box>
            <Modal
              blockScrollOnMount={false}
              isOpen={isOpenModal2}
              onClose={() => {
                setModalText('');
                onCloseModal2();
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Proses Pesanan</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    {modalText}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      setModalText('');
                      onCloseModal2();
                    }}
                  >
                    Cancel
                  </Button>
                  {/* <Form method="patch"> */}
                  {/* <Input name="id" type="hidden" value={data.id} /> */}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      afterpacking();
                      onCloseModal2();
                    }}
                    type="submit"
                  >
                    Selesai di Packing
                  </Button>
                  {/* </Form> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        )}
      </Box>
    </>
  );
}
