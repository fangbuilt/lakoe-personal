import { Box, Button, Card, Flex, Img, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { iOrderList } from "../interfaces/order/iOrderList";
import { IOrderDetailInvoice } from "~/interfaces/orderDetail";
import ModalInShipping from "./ModalInShipping";
import { ITracking } from "~/interfaces/order/orderTracking";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/order";
import { UseBiteshipTrack } from "~/hooks/useBiteshipTrack";

export default function CardInShipping(props: ITracking) {
  const data = useLoaderData<typeof loader>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
 

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

      {/* CARD START HERE */}
      <Card mb={5} boxShadow={"xs"}>
        {data.dataShipping.map((data) => (
          <Box>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={"space-between"} px={2}>
                  <Button
                    bg={"#F68511"}
                    color={"white"}
                    fontWeight={"bold"}
                    colorScheme="F68511"
                    size={"sm"}
                    pointerEvents={"none"}
                  >
                    {data.status}
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
                  {modalIsOpen && (
                    <ModalInShipping
                      isOpen={modalIsOpen}
                      onClose={closeModal}
                      data={props}
                    />
                  )}
                </Flex>
                <Text my={1} fontSize={"14px"} color={"gray.400"} px={2}>
                  {data.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={"space-between"}>
                  <Box display={"flex"} w={"80%"}>
                    {data.cart?.cartItems.map((item) => (
                      <Img
                        key={item.id}
                        w={"52px"}
                        h={"52px"}
                        display={"inline"}
                        src={item.product?.attachments[0].url}
                        mt={3}
                      />
                    ))}
                    <Text
                      mt={4}
                      id="fm500"
                      fontSize={"16px"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      fontWeight={"700"}
                    >
                      {data.cart?.cartItems.map((item) => (
                        <Box key={item.id}>{item.product?.name}</Box>
                      ))}
                      <Text color={"gray.400"} pb={3} fontWeight={"normal"}>
                        {data.cart?.cartItems.map((item) => item.qty)} Barang
                      </Text>
                    </Text>
                  </Box>
                  <Box mt={4} w={"15%"}>
                    <Flex gap={1}>
                      <Text color={"#909090"} fontSize={"14px"}>
                        Total
                      </Text>
                      <Text color={"#909090"} fontSize={"14px"}>
                        Belanja
                      </Text>
                    </Flex>
                    <Text fontWeight={"bold"} fontSize={"14px"}>
                      Rp {data.price}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Card>

      {/* END CARD */}
    </>
  );
}
