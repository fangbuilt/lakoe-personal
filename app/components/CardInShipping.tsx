import { Box, Button, Card, Flex, Img, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { IOrderDetailInvoice } from "~/interfaces/orderDetail";
import ModalPengiriman from "./ModalPengiriman";
import { db } from "~/libs/prisma/db.server";

export async function getInvoice() {
  const dataInvoice = await db.invoice.findMany({
    where: {
      status: "IN_TRANSIT",
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
export default function CardInShipping(
  props: IOrderDetailInvoice
  
  // props: { data: IOrderDetailInvoice; status: string }
  ) {
  console.log("data ya ini", props)
  const [modalIsOpen, setModalIsOpen] = useState(false);

    

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    return (
      <>
        {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

        {/* CARD START HERE */}
        <Card mb={5}>
          <Box>
            <Box mt={5} borderTop={"1px"} borderColor={"gray.100"} py={"4"}>
              <Box>
                <Flex justifyContent={"space-between"} px={2}>
                  <Button
                    bg={"#F68511"}
                    color={"white"}
                    fontWeight={"bold"}
                    colorScheme="orange.600"
                    size={"sm"}
                    pointerEvents={"none"}
                  >
                    Dalam Pengiriman
                  </Button>

                  <Button
                    bg={"transparent"}
                    border={"1px solid #D5D5D5"}
                    borderRadius={"full"}
                    fontSize={"14px"}
                    onClick={openModal}
                  >
                    Lihat Rincian Pengiriman
                  </Button>
                  {/* <ModalPengiriman
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  data={props}
                /> */}
                </Flex>
                <Text my={1} fontSize={"14px"} color={"gray.400"} px={2}>
                  {props.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={"space-between"}>
                  <Box display={"flex"}>
                    <Img
                      w={"62px"}
                      h={"62px"}
                      display={"inline"}
                      // src={props.courier}
                    />
                    <Text mt={4} id="fm500" fontWeight={"bold"}>
                      {props.status}
                      <Text color={"gray.400"} fontWeight={"normal"}>
                        1 Barang
                      </Text>
                    </Text>
                  </Box>
                  <Box me={5} mt={4}>
                    <Flex gap={1}>
                      <Text color={"#909090"} fontSize={"14px"}>
                        Total
                      </Text>
                      <Text color={"#909090"} fontSize={"14px"}>
                        Belanja
                      </Text>
                    </Flex>
                    <Text fontWeight={"bold"} fontSize={"14px"}>
                      Rp {props?.price}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* END CARD */}
      </>
    );
  }

