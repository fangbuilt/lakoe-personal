import { Stack } from "@chakra-ui/react";
import { ImplementGrid } from "~/layouts/Grid";
import StatusOrderDetail from "~/modules/order/components/statusOrderDetail";

export default function OrderDetailId() {
  return (
    <>
      <ImplementGrid>
        <Stack mt={"7.5vh"} spacing={4}>
          <StatusOrderDetail />
        </Stack>
      </ImplementGrid>
    </>
  );
}
