import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';
import UseMapeUnpaid from '~/hooks/useMapeUnpaid';
// import { getProductUnpid } from '~/modules/order/order.service';
// import { useLoaderData } from '@remix-run/react';
// export async function loader() {
//   const datas = await getProductUnpid()
//   return datas
// }
export default function Order() {
  // const datas = useLoaderData<typeof loader>() //as unknown as any;
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder />
        <UseMapeUnpaid />
      </Flex>
    </ImplementGrid>
  );
}
