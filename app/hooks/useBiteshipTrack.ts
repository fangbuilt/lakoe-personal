import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { ITracking } from '~/interfaces/order/orderTracking';
import type { loader } from '~/routes/order';

export function UseBiteshipTrack(trackingNumber: string) {
  const data = useLoaderData<typeof loader>();

  const [trackingInfoArray, setTrackingInfoArray] = useState<ITracking[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<ITracking>();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.biteship.com/v1/trackings/${trackingNumber}`,
        {
          headers: {
            authorization: data.apiKey,
          },
        }
      );

      setTrackingInfo(response.data);
      setTrackingInfoArray(response.data.history);
      // }
    } catch (err) {
      setError(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    trackingInfo,
    error,
    trackingInfoArray,
  };
}
