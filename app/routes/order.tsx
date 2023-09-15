import { Flex } from "@chakra-ui/react";
import NavOrder from "~/layouts/NavOrder";
import { ImplementGrid } from "~/layouts/Grid";
import { useLoaderData } from "@remix-run/react";
import getDataInShipping from "~/modules/order/orderShippingService";
export async function loader() {
  const apiKey = process.env.API_KEY_BITESHIP as string;
  console.log("apiiiiii", apiKey);

  return {
    dataShipping: await getDataInShipping(),
    apiKey
  };
}
export default function Order() {
  const data = useLoaderData<typeof loader>();

  return (
    <ImplementGrid>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <NavOrder cardProduct={data} />
      </Flex>
    </ImplementGrid>
  );
}
