import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import documentIcon from "~/assets/DetailOrderIcon/document.svg";
import calender from "~/assets/DetailOrderIcon/calendar-2.svg"
import barcode from "~/assets/DetailOrderIcon/barcode.svg"
import copy from "~/assets/DetailOrderIcon/copy.svg"
import profile from "~/assets/DetailOrderIcon/profile-circle.svg"
import whatsapp from "~/assets/DetailOrderIcon/whatsapp.svg"

export default function StatusOrderDetail() {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        padding={3}
        margin={3}
      >
        <Text>Daftar Pesanan</Text>
        <Card gap={3} padding={3} margin={3}>
          <Box display={"flex"} gap={3}>
            <Box>
              <Image src={documentIcon} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Button width={"150px"} background={"yellow.400"}>
                Belum Dibayar
              </Button>
              <Text>
                Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
                <Text as={"span"} fontWeight={"bold"}>
                  {" "}
                  10 Agustus 2023 - 00:00 WIB
                </Text>
                . Silahkan tunggu sampai pembayaran terkonfirmasi sebelum
                mengirimkan barang.
              </Text>
              <Text>Lihat RIwayat Pesanan</Text>
            </Box>
          </Box>
        </Card>
        <Card gap={3} padding={3} margin={3}>
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={3}>
                <Image src={calender} />
                <Text>Tanggal</Text>
              </Box>
              <Text>09 Agustus 2023 - 19:43 WIB</Text>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={3}>
                <Image src={barcode} />
                <Text>Invoice</Text>
              </Box>
              <Box display={"flex"} gap={3}>
                <Image src={copy} />
                <Text>INV 120983298470123740325</Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={3}>
                <Image src={profile} />
                <Text>Pembeli</Text>
              </Box>
              <Box display={"flex"} gap={3}>
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
                  <Image src={whatsapp}/>
                </Box>
                <Text>Angga Ganteng</Text>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
