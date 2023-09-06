import { Stack } from "@chakra-ui/react";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IOrderDetailInvoice } from "~/interfaces/orderDetail";
import { ImplementGrid } from "~/layouts/Grid";
import StatusOrderDetail, {
  getInvoiceById,
} from "~/modules/order/components/statusOrderDetail";

export async function loader({ params }: LoaderArgs) {
  const { id } = params;

  try {
    const dataCart = await getInvoiceById(id as string);
    return dataCart;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

export default function OrderDetailId() {
  const data = useLoaderData<IOrderDetailInvoice>();
  return (
    <>
      <ImplementGrid>
        <Stack mt={"7.5vh"} spacing={4}>
          <StatusOrderDetail data={data} />
        </Stack>
      </ImplementGrid>
    </>
  );
}
