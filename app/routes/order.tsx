import { Flex } from "@chakra-ui/react";
import NavOrder from "~/layouts/NavOrder";
import { ImplementGrid } from "~/layouts/Grid";
import CanceledService, {whatsappTemplateDb} from "~/modules/order/orderCanceledService";
import { useLoaderData } from "@remix-run/react";
import {  json } from "@remix-run/node";


export async function loader (){
  const [canceledService,whatsappDb] = await Promise.all([
       CanceledService(),
       whatsappTemplateDb(),
       //your order service here !
  ]);
  return json({
    canceledService,
    whatsappDb
    // your return order service here !
  });
};
export default function Order() {
const allOrderServices = useLoaderData<typeof loader>()
  return (
    <ImplementGrid>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <NavOrder order = {allOrderServices}
        />
      </Flex>
    </ImplementGrid>
  );
}
