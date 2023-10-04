import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { IBiteshipTracking } from '~/interfaces/orderTracking';
import type { loader } from '~/routes/order';

export default function useOrderTracking(trackingId: string) {
  const data = useLoaderData<typeof loader>();
  const [orderTrackingsData, setOrderTrackingsData] =
    useState<IBiteshipTracking>();

  const [orderMultiTrackingsData, setOrderMultiTrackingsData] = useState<
    IBiteshipTracking[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.biteship.com/v1/trackings/${trackingId}`,
          {
            headers: {
              authorization: data.apiKey,
            },
          }
        );

        setOrderTrackingsData(response.data);
        setOrderMultiTrackingsData(response.data.history);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData };
}
