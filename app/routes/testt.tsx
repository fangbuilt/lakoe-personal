import { getDataProductReadyToShip } from '~/modules/order/order.service';

export default async function TestGetTracking() {
  const dataTracking = await getDataProductReadyToShip();
  const trackingIds = dataTracking.map((item: any) => item.courier.tracking_id);

  console.log(trackingIds);
}
