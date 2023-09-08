import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IOrderDetailInvoice } from "~/interfaces/orderDetail";
import { PrismaClient } from "@prisma/client";
import ModalPengiriman from "~/components/ModalPengiriman";

const dataDummy = [
  {
    id: "1",
    title: " CREWNECK BASIC-BLACK | sweeter polos hodie polos crewneck - S",
    quantity: "2",
    price: "190.000",
    invoice: "INV/20230809/MPL/00003432",
    status: "Dalam Pengiriman",
    picture:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    cta: "Lihat Rincian Pengiriman",
  },
];

const prisma = new PrismaClient()

export async function getInvoiceById(id: any) {
  try {
    const dataInvoice = await prisma.invoice.findFirst({
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

    if (!dataInvoice) {
      throw new Error("Faktur tidak ditemukan")
    }

    return dataInvoice;
  } catch (error) {
    console.error("Error while fetching invoice:", error)
  }
}

export default function Index() {
  const { onOpen } = useDisclosure()
  const [invoiceData, setInvoiceData] = useState<IOrderDetailInvoice | null>(
    null
  );

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  };

  const closeModal = () => {
    setModalIsOpen(false)
  };

  

  return (
    <>
      <Box>
        {invoiceData && (
          <Card
            key={invoiceData.id}
            overflow="hidden"
            variant="outline"
            display={"flex"}
            justifyContent={"space-between"}
            margin={"50px 5% 10px"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              padding={"15px"}
            >
              <Box>
                <Button
                  padding={"4px 8px"}
                  borderRadius={"4px"}
                  backgroundColor={"#F68511"}
                  size={"sm"}
                  mb={2}
                >
                  <Text
                    color={"#FFFFFF"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    textAlign={"center"}
                  >
                    {invoiceData.status}
                  </Text>
                </Button>

                <Text
                  fontSize={"14px"}
                  fontWeight={"500"}
                  lineHeight={"16px"}
                  color={"#909090"}
                >
                  {invoiceData.invoiceNumber}
                </Text>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Button
                  borderRadius={"15px"}
                  padding={"4px 12px"}
                  border={"1px solid #D5D5D5"}
                  size={"sm"}
                  bg={"transparent"}
                  onClick={openModal}
                >
                  Lihat Rincian Pengiriman
                </Button>
                <ModalPengiriman
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  data={invoiceData}
                />
              </Box>
            </Box>

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
                    // src={invoiceData.picture}
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
                    >
                      CREWNECK BASIC-BLACK | sweeter polos hodie polos crewneck
                      - S
                    </Heading>
                    <Text
                      py="2"
                      fontSize={"14px"}
                      color={"#909090"}
                      lineHeight={"16px"}
                    >
                      12 Barang
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
                >
                  Total Belanja
                </Text>
                <Text fontSize={"14px"} fontWeight={"700"}>
                  {invoiceData.price}
                </Text>
              </Box>
            </Box>
          </Card>
        )}
      </Box>
    </>
  );
}
