import { Box, Button, Card, Flex, Img, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { iOrderList } from "~/interfaces/order/iOrderList";

export default function NewOrderCard(props: iOrderList) {
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
                  bg={"#008F5D"}
                  color={"white"}
                  fontWeight={"bold"}
                  colorScheme="gray.600"
                  size={"sm"}
                  pointerEvents={"none"}
                >
                  Pesanan Baru
                </Button>

                {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                <Link to={`http://wa.me/${props.telephone}`}>
                  <Button
                    bg={"transparent"}
                    border={"1px solid #D5D5D5"}
                    borderRadius={"full"}
                    fontSize={"14px"}
                  >
                    Proses Pesanan
                  </Button>
                </Link>
                {/*  */}
              </Flex>
              <Text my={1} fontSize={"14px"} color={"gray.400"} px={2}>
                {props.invoice}
              </Text>
              <hr />
              <Flex justifyContent={"space-between"}>
                <Box display={"flex"}>
                  <Img
                    w={"62px"}
                    h={"62px"}
                    display={"inline"}
                    src={props.imageProduct}
                  />
                  <Text mt={4} id="fm500" fontWeight={"bold"}>
                    {props.title}
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
                    Rp {props.totalAmount}
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
