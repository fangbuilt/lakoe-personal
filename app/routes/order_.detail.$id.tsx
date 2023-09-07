import { Stack } from "@chakra-ui/react";
import { ImplementGrid } from "~/layouts/Grid";
import StatusOrderDetail from "~/modules/order/components/statusOrderDetail";
import StatusOrderPengiriman from "~/modules/order/components/statusOrderPengiriman";

export default function OrderDetailId() {
  return (
    <>
      <ImplementGrid>
        <Stack mt={"7.5vh"} spacing={4}>
          <StatusOrderPengiriman />
        </Stack>
      </ImplementGrid>
    </>
  );
}
