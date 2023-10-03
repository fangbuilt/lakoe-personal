import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
} from "@chakra-ui/react";

import Empty from "../../assets/icon-pack/empty-dot.svg";
import ChevronDownIcon from "../../assets/icon-pack/arrow-dropdown.svg";
import SearchProduct from "../../assets/icon-pack/search-product.svg";
import { useSortFilter } from "~/hooks/useSortFilter";
import ReceiptSearch from "../../assets/icon-pack/receipt-search.svg";
import { useState } from "react";
import ModalWhatsapp from "../modalProps/modalWhatsapp";
import { Link } from "@remix-run/react";
import { formatCurrency } from "~/modules/order/hooks/useOrderDetail";
import searchFilterCanceled from "~/hooks/useSearchOrder";
import { useFilterCourier } from "~/hooks/useFilterCourier";
export default function CardCenceled(props: any) {
  const { setSearchQuery, filteredOrders } = searchFilterCanceled(); // search filter
  const { selectedCouriers, toggleCourier, getSelectedCourier } =
    useFilterCourier(); // courier selected
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortFilter(); // sort selcted
    console.log("kurir",selectedCouriers)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {/* start filter */}
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          w={"47%"}
          bg={"white"}
          px={"3"}
          gap={2}
          justifyContent={"space-between"}
          zIndex={10}
          position={"fixed"}
          top={"52"}
          mt={2}
        >
          <InputGroup bg={"white"}>
            <InputLeftElement pointerEvents="none">
              <Image src={SearchProduct} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Cari Pesanan"
              _placeholder={{
                opacity: 1,
                color: "#909090",
                fontSize: "14px",
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </InputGroup>

          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              variant="outline"
              bgColor={"white"}
              fontSize={"14px"}
              width={"100%"}
              color={getSelectedCourier() > 0 ? "black" : "#909090"}
              fontWeight={"normal"}
            >
              <Text fontSize="14px" textAlign="left">
                {getSelectedCourier() > 0
                  ? `${getSelectedCourier()} Kurir terpilih`
                  : "Semua Kurir"}
              </Text>

              <Image
                src={ChevronDownIcon}
                position={"absolute"}
                fontSize={"2px"}
                right={2}
                top={3}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("GoSend")}
                  isChecked={selectedCouriers.includes("GoSend")}

                >
                  GoSend
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("GrabExpress")}
                  isChecked={selectedCouriers.includes("GrabExpress")}
                >
                  GrabExpress
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("AnterAja")}
                  isChecked={selectedCouriers.includes("AnterAja")}
                >
                  AnterAja
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("JNE")}
                  isChecked={selectedCouriers.includes("JNE")}
                >
                  JNE
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("J&T")}
                  isChecked={selectedCouriers.includes("J&T")}
                >
                  J&T
                </Checkbox>
                <Input type="hidden" value={selectedCouriers}onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("Tiki")}
                  isChecked={selectedCouriers.includes("Tiki")}
                >
                  Tiki
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }} ></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("Ninja Xpress")}
                  isChecked={selectedCouriers.includes("Ninja Xpress")}
                >
                  Ninja Xpress
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }}></Input>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier("Pos Indonesia")}
                  isChecked={selectedCouriers.includes("Pos Indonesia")}
                >
                  Pos Indonesia
                </Checkbox>
                <Input type="hidden" value={selectedCouriers} onChange={(e) => {
                setSearchQuery(e.target.value);
              }}></Input>
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              w={"100%"}
              variant="outline"
              bgColor={"white"}
            >
              <Image
                src={ChevronDownIcon}
                position={"absolute"}
                fontSize={"2px"}
                right={2}
                top={3}
              />
              <Text
                fontSize={"14px"}
                textAlign={"left"}
                fontWeight={"normal"}
                color={"black"}
              >
                {getSelectedSortOption() ? (
                  getSelectedSortOption()
                ) : (
                  <Text color={"#909090"}>Urutkan</Text>
                )}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => setSortOption("Semua")}
                className={selectedSortOption === "Semua" ? "active" : ""}
              >
                Semua
                <Image
                  src={Empty}
                  ml={"auto"}
                  display={
                    selectedSortOption === "Semua" ? "inline-block" : "none"
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption("Paling Baru")}
                className={selectedSortOption === "Paling Baru" ? "active" : ""}
              >
                Paling Baru
                <Image
                  src={Empty}
                  ml={"auto"}
                  display={
                    selectedSortOption === "Paling Baru"
                      ? "inline-block"
                      : "none"
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption("Paling Lama")}
                className={selectedSortOption === "Paling Lama" ? "active" : ""}
              >
                Paling Lama
                <Image
                  src={Empty}
                  ml={"auto"}
                  display={
                    selectedSortOption === "Paling Lama"
                      ? "inline-block"
                      : "none"
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption("Respon Tercepat")}
                className={
                  selectedSortOption === "Respon Tercepat" ? "active" : ""
                }
              >
                Respon Tercepat
                <Image
                  src={Empty}
                  ml={"auto"}
                  display={
                    selectedSortOption === "Respon Tercepat"
                      ? "inline-block"
                      : "none"
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption("Respon Terlama")}
                className={
                  selectedSortOption === "Respon Terlama" ? "active" : ""
                }
              >
                Respon Terlama
                <Image
                  src={Empty}
                  ml={"auto"}
                  display={
                    selectedSortOption === "Respon Terlama"
                      ? "inline-block"
                      : "none"
                  }
                />
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      {filteredOrders.length === 0 ? (
        <Box marginTop={"70px"}>
          <Center>
            <Box textAlign="center" mt={5} display={"flex"}>
              <Image src={ReceiptSearch} />
              <Text fontSize="16px" mt={1}>
                Oops, pesanan yang kamu cari tidak ditemukan.
                <Text fontSize={"12px"} color={"#909090"} textAlign={"left"}>
                  Coba bisa cari dengan kata kunci lain
                </Text>
              </Text>
            </Box>
          </Center>
        </Box>
      ) : (
        <Box>
          {/* {filterOrdersByCourier(filteredOrders).map((data, index) => ( */}
          {filteredOrders.map((data:any, index:any) => (
            <Card mb={5} mt={5} boxShadow={"xs"} key={index}>
              <Box>
                <Box >
                  <Box>
                    <Flex justifyContent={"space-between"} px={3} py={2}>
                      <Button
                        bg={"#EA3829"}
                        color={"white"}
                        fontWeight={"bold"}
                        colorScheme="red.500"
                        size={"sm"}
                        pointerEvents={"none"}
                        height={"24px"}

                      >
                        {data.status === "ORDER_CANCELLED" ? "Dibatalkan" : ""}
                      </Button>

                      {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}

                      <Button
                        bg={"transparent"}
                        border={"1px solid #D5D5D5"}
                        borderRadius={"full"}
                        fontSize={"14px"}
                        height={"32px"}
                        onClick={() => {
                          openModal();
                        }}
                        py={1}
                        size={"sm"}
                        px={3}
                        fontWeight={"600"}
                      >
                        Hubungi Pembeli
                      </Button>
                      <ModalWhatsapp
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        selectedCardId={"rCFV2hRPtZp7E7VLoRvge7b2"}
                        itemName={data.receiverName}
                        itemPhone={data.receiverPhone}
                      />
                    </Flex>
                    <Text mb={1}fontSize={"14px"} mt={-3} color={"#909090"} px={3}>
                      INV/{data.invoiceNumber}
                    </Text>
                    <Divider />

                    <Link to={`detail/${data.id}`}>
                      <Flex justifyContent={"space-between"} px={3} >
                        <Box display={"flex"} gap={3} w={"80%"}>
                          <Img
                            w={"52px"}
                            h={"52px"}
                            display={"inline"}
                            borderRadius={"md"}
                            src={"https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"}
                            // src={
                            //   data.cart?.cartItems[0]?.product?.attachments[0]
                            //     ?.url
                            // }
                            mt={3}
                          />
                          <Text
                            mt={4}
                            id="fm500"
                            fontSize={"16px"}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            fontWeight={"700"}
                          >
                            {data.cart?.cartItems.map(
                              (item:any) => item.product?.name
                            )}
                            <Text
                              color={"gray.400"}
                              pb={3}
                              fontWeight={"normal"}
                            >
                              {data.cart?.cartItems.map(
                                (item: any) => item.qty
                              )}{" "}
                              Barang
                            </Text>
                          </Text>
                        </Box>
                        <Box mt={4} w={"18%"}>
                          <Flex gap={1} fontWeight={"500"} >
                            <Text color={"#909090"} fontSize={"14px"}>
                              Total
                            </Text>
                            <Text color={"#909090"} fontSize={"14px"}>
                              Belanja
                            </Text>
                          </Flex>
                          <Text fontWeight={"bold"} fontSize={"14px"}>
                            {formatCurrency(data.price)}
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
          {/* ))} */}
        </Box>
      )}
    </>
  );
}
