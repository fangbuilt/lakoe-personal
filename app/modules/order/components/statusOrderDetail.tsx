import {
  Badge,
  Box,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import documentIcon from "~/assets/DetailOrderIcon/document.svg";
import calender from "~/assets/DetailOrderIcon/calendar-2.svg";
import barcode from "~/assets/DetailOrderIcon/barcode.svg";
import copy from "~/assets/DetailOrderIcon/copy.svg";
import profile from "~/assets/DetailOrderIcon/profile-circle.svg";
import whatsapp from "~/assets/DetailOrderIcon/whatsapp.svg";
import box from "~/assets/DetailOrderIcon/box.svg";
import truck from "~/assets/DetailOrderIcon/truck-fast.svg";
import wallet from "~/assets/DetailOrderIcon/wallet.svg";
import { useOrderDetalil } from "../hooks/useOrderDetail";
import { BsCircleFill } from "react-icons/bs";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { IOrderDetailInvoice } from "~/interfaces/orderDetail";
import { useState } from "react";
import { db } from "~/libs/prisma/db.server";
import ModalInShipping from "~/components/ModalInShipping";
import { ITracking } from "~/interfaces/order/orderTracking";

export function getStatusBadge(status: string) {
  if (status.toUpperCase() === "UNPAID") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--yellow-400, #E8C600)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-dark, #1D1D1D)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Belum Dibayar
        </Text>
      </Badge>
    );
  }
  if (status.toUpperCase() === "NEW_ORDER") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--green-800, #008F5D)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-light, #FFF)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Pesanan Baru
        </Text>
      </Badge>
    );
  }
  if (status.toUpperCase() === "READY_TO_SHIP") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--blue-800, #147AF3)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-light, #FFF)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Siap Dikirim
        </Text>
      </Badge>
    );
  }
  if (status.toUpperCase() === "IN_TRANSIT") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--orange-600, #F68511)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-light, #FFF)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Dalam Pengiriman
        </Text>
      </Badge>
    );
  }
  if (status.toUpperCase() === "ORDER_COMPLETED") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--gray-200, #E6E6E6)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-dark, #1D1D1D)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Pesanan Selesai
        </Text>
      </Badge>
    );
  }
  if (status.toUpperCase() === "ORDER_CANCELLED") {
    return (
      <Badge
        display={"flex"}
        height={"24px"}
        padding={`var(--1, 4px) var(--2, 8px)`}
        justifyContent={"center"}
        alignItems={"center"}
        gap={`var(--1, 4px)`}
        borderRadius={`var(--rounded, 4px)`}
        background={`var(--red-800, #EA3829)`}
        width={"150px"}
      >
        <Text
          color={`var(--text-light, #FFF)`}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={"600"}
        >
          Dibatalkan
        </Text>
      </Badge>
    );
  }
}

export function getStatusLacakButton(status: string) {
  if (status.toUpperCase() === "NEW_ORDER") {
    return (
      <Flex
        justifyContent={"space-between"}
        padding={`var(--4, 16px) var(--5, 20px)`}
        alignItems={"center"}
        alignSelf={"stretch"}
        borderRadius={`var(--rounded-lg, 12px)`}
        background={`var(--gray-50, #FFF)`}
      >
        <Box>
          <Button
            display={"flex"}
            height={"40px"}
            padding={`var(--3, 12px) var(--4, 16px)`}
            justifyContent={"center"}
            alignItems={"center"}
            gap={`var(--1, 4px)`}
            borderRadius={`var(--rounded-full, 9999px)`}
            border={`1px solid var(--red-800, #EA3829)`}
            background={`var(--gray-50, #FFF)`}
          >
            <Text
              color={`var(--text-red, #EA3829)`}
              fontSize={"14px"}
              fontWeight={"600"}
              lineHeight={"15.5px"}
            >
              Tolak Pesanan
            </Text>
          </Button>
        </Box>
        <Box>
          <Button
            display={"flex"}
            height={"40px"}
            padding={`var(--3, 12px) var(--4, 16px)`}
            justifyContent={"center"}
            alignItems={"center"}
            gap={`var(--1, 4px)`}
            borderRadius={`var(--rounded-full, 9999px)`}
            background={`var(--cyan-800, #0086B4)`}
          >
            <Text
              color={`var(--text-light, #FFF)`}
              fontSize={"14px"}
              fontWeight={"600"}
              lineHeight={"15.5px"}
            >
              Proses Pesanan
            </Text>
          </Button>
        </Box>
      </Flex>
    );
  }
}

export function getStatusLacakPengiriman(
  status: string,
  data: any,
  dataTracking: ITracking
) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  if (status.toUpperCase() === "IN_TRANSIT") {
    return (
      <>
        <Button
          fontSize={"14px"}
          fontWeight={"700"}
          lineHeight={"20px"}
          color={"#0086B4"}
          background={"#FFFFFF)"}
          colorScheme="#FFFFFF)"
          w={"120px"}
          onClick={() => {
            openModal();
          }}
        >
          Lacak Pengiriman
        </Button>
        {modalIsOpen && (
          <ModalInShipping
            isOpen={modalIsOpen}
            onClose={closeModal}
            data={dataTracking}
          />
        )}
      </>
    );
  }

  if (status.toUpperCase() === "ORDER_COMPLETED") {
    return (
      <Button
        fontSize={"14px"}
        fontWeight={"700"}
        lineHeight={"20px"}
        color={"#0086B4"}
        background={"#FFFFFF)"}
        colorScheme="#FFFFFF)"
        w={"120px"}
      >
        Lacak Pengiriman
      </Button>
    );
  }
  return null;
}

export async function getInvoiceById(id: any) {
  const dataInvoice = await db.invoice.findFirst({
    where: {
      id,
    },
    include: {
      payment: true,
      courier: true,
      cart: {
        include: {
          store: {
            include: {
              products: true,
            },
          },
        },
      },
    },
  });

  console.log("ini data inv", dataInvoice);
  return dataInvoice;
}

export default function StatusOrderDetail({
  data,
  dataTracking,
}: {
  data: IOrderDetailInvoice;
  dataTracking: ITracking;
}) {
  const { isOrderHistoryVisible, toggleOrderHistory, steps, activeStep } =
    useOrderDetalil();

  const toast = useToast();
  const [_, setCopied] = useState(false);

  const handleCopyClick = () => {
    const textToCopy = data.invoiceNumber;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);

      toast({
        title: "Teks telah disalin ke clipboard!",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    });
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={3}>
        <Flex>
          <Text color={"#0EADD7"}>Daftar Pesanan</Text>{" "}
          <Text>
            <ChevronRightIcon /> CREWNECK ...
          </Text>
        </Flex>
        <Box
          display={"flex"}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Image
            height={"24px"}
            width={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
            src={documentIcon}
          />
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            {getStatusBadge(data.status)}
            <Text fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"}>
              Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
              <Text as={"span"} fontWeight={"700"}>
                {" "}
                {data.updatedAt}
              </Text>
              . Silahkan tunggu sampai pembayaran terkonfirmasi sebelum
              mengirimkan barang.
            </Text>
            <Text
              color={"#0086B4"}
              cursor={"pointer"}
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
                size={"sm"}
                border={"1px solid #E6E6E6"}
                borderRadius={"12px"}
                index={activeStep}
                orientation="vertical"
                height="100%"
                width={"50%"}
                gap="5"
                p={"16px"}
              >
                {steps.map((step) => (
                  <Step key={step.id}>
                    <StepIndicator fontSize={"11px"}>
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
          display={"flex"}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
          flexDirection={"column"}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={3}>
              <Image
                height={"24px"}
                width={"24px"}
                justifyContent={"center"}
                alignItems={"center"}
                src={calender}
              />
              <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
                Tanggal
              </Text>
            </Box>
            <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
              {data.createdAt}
            </Text>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={3}>
              <Image
                height={"24px"}
                width={"24px"}
                justifyContent={"center"}
                alignItems={"center"}
                src={barcode}
              />
              <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
                Invoice
              </Text>
            </Box>
            <Box display={"flex"} gap={3}>
              <Image
                height={"18px"}
                width={"18px"}
                justifyContent={"center"}
                alignItems={"center"}
                src={copy}
                onClick={handleCopyClick}
                style={{ cursor: "pointer" }}
                color={"gray.900"}
              />
              <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                {data.invoiceNumber}
              </Text>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={3}>
              <Image
                height={"24px"}
                width={"24px"}
                justifyContent={"center"}
                alignItems={"center"}
                src={profile}
              />
              <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
                Pembeli
              </Text>
            </Box>
            <Box
              display={"flex"}
              gap={3}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                width={"32px"}
                height={"32px"}
                padding={`var(--1, 4px)`}
                justifyContent={"center"}
                alignItems={"center"}
                gap={`var(--1, 4px)`}
                borderRadius={`var(--rounded-full, 9999px)`}
                background={`var(--green-800, #008F5D)`}
              >
                <Image
                  height={"24px"}
                  width={"24px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  src={whatsapp}
                />
              </Box>
              <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                {data.receiverName}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Image
            height={"24px"}
            width={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
            src={box}
          />

          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Box>
              <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
                Detail Produk
              </Text>
            </Box>
            <Box>
              <Card
                overflow="hidden"
                variant="outline"
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Divider w={"100%"} />

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  padding={"15px"}
                >
                  <Box display={"flex"}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                    >
                      <Image
                        objectFit="cover"
                        width={"52px"}
                        height={"52px"}
                        src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
                        alt="brown clothes"
                        borderRadius={"8px"}
                      />
                    </Box>

                    <Box>
                      <CardBody>
                        <Heading
                          size="md"
                          fontSize={"16px"}
                          lineHeight={"20px"}
                          fontWeight={"700"}
                          overflow={"hidden"}
                          textOverflow={"ellipsis"}
                        >
                          CREWNECK BASIC-BLACK | sweeter polos hodie polos
                          crewneck - S
                        </Heading>
                        <Text
                          py="2"
                          fontSize={"14px"}
                          color={"#909090"}
                          lineHeight={"16px"}
                        >
                          2 Barang
                        </Text>
                      </CardBody>
                    </Box>
                  </Box>
                  <Box
                    justifyContent={"center"}
                    display={"flex"}
                    flexDirection={"column"}
                    flex={"end"}
                  >
                    <Text
                      fontSize={"14px"}
                      fontWeight={"500"}
                      color={"#909090"}
                      lineHeight={"16px"}
                      textAlign={"right"}
                    >
                      Total Belanja
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"700"}
                      lineHeight={"16px"}
                      textAlign={"right"}
                    >
                      190.000
                    </Text>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={"24px"}
              width={"24px"}
              justifyContent={"center"}
              alignItems={"center"}
              src={truck}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={1} width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
                Detail Pengiriman
              </Text>
              {getStatusLacakPengiriman(data.status, data, dataTracking)}
            </Box>
            <Box display={"flex"}>
              <Box display={"flex"} flexDirection={"column"} width={"192px"}>
                <Text
                  color={`var(--text-dark, #1D1D1D)`}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  lineHeight={"20px"}
                  fontStyle={"normal"}
                >
                  Kurir
                </Text>
                <Box display={"flex"} gap={1}>
                  <Text
                    color={`var(--text-dark, #1D1D1D)`}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"20px"}
                    fontStyle={"normal"}
                  >
                    No. Resi
                  </Text>
                  <Image
                    height={"18px"}
                    width={"18px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    src={copy}
                    style={{ cursor: "pointer" }}
                    color={"gray.900"}
                  />
                </Box>
                <Box display={"flex"} gap={1}>
                  <Text
                    color={`var(--text-dark, #1D1D1D)`}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"20px"}
                    fontStyle={"normal"}
                  >
                    Alamat
                  </Text>
                  <Image
                    height={"18px"}
                    width={"18px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    src={copy}
                    style={{ cursor: "pointer" }}
                    color={"gray.900"}
                  />
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Text
                  color={`var(--text-dark, #1D1D1D)`}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  lineHeight={"20px"}
                >
                  {data.courier.courierCode}
                </Text>
                <Text
                  color={`var(--text-dark, #1D1D1D)`}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  lineHeight={"20px"}
                >
                  {data.courier.courierServiceCode}
                </Text>
                <Box display={"flex"} flexDirection={"column"}>
                  <Text
                    color={`var(--text-dark, #1D1D1D)`}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"20px"}
                    fontStyle={"normal"}
                  >
                    {data.receiverAddress}
                  </Text>
                  <Text
                    color={`var(--text-gray, #909090)`}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"20px"}
                    fontStyle={"normal"}
                  >
                    {data.receiverPhone}
                  </Text>
                  <Text
                    color={`var(--text-gray, #909090)`}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"20px"}
                    fontStyle={"normal"}
                  >
                    {data.receiverName}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          padding={`var(--3, 12px)var(--5, 20px)`}
          gap={`var(--3, 12px)`}
          borderRadius={`var(--rounded-lg, 12px)`}
          background={`var(--gray-50, #FFF)`}
        >
          <Box>
            <Image
              height={"24px"}
              width={"24px"}
              justifyContent={"center"}
              alignItems={"center"}
              src={wallet}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}>
              Rincian Pembayaran
            </Text>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                  Total Harga (1 barang)
                </Text>
              </Box>
              <Box>
                <Text fontSize={"14px"} fontWeight={"700"} lineHeight={"20px"}>
                  Rp{data.cart.price}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                  Total Ongkos Kirim (10kg)
                </Text>
              </Box>
              <Box>
                <Text fontSize={"14px"} fontWeight={"700"} lineHeight={"20px"}>
                  Rp{data.courier.price}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                  Diskon
                </Text>
              </Box>
              <Box>
                <Text fontSize={"14px"} fontWeight={"700"} lineHeight={"20px"}>
                  Rp{data.discount}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
                  Biaya Layanan
                </Text>
              </Box>
              <Box>
                <Text fontSize={"14px"} fontWeight={"700"} lineHeight={"20px"}>
                  Rp0
                </Text>
              </Box>
            </Box>
            <Divider my={3} />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"16px"} fontWeight={"700"} lineHeight={"20px"}>
                  Total Penjualan
                </Text>
              </Box>
              <Box>
                <Text fontSize={"18px"} fontWeight={"700"} lineHeight={"24px"}>
                  Rp{data.price}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {getStatusLacakButton(data.status)}
      </Box>
    </>
  );
}
