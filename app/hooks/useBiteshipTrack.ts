import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData } from '@remix-run/react';
import type { ITracking } from '~/interfaces/order/orderTracking';
import type { loader } from '~/routes/order';

export function UseBiteshipTrack() {
  const data = useLoaderData<typeof loader>();

  const [trackingInfoArray, setTrackingInfoArray] = useState<ITracking[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<ITracking>();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.biteship.com/v1/trackings/Roi50pFE5PWwkU7UMYgYlb5I',
        {
          headers: {
            authorization: data.apiKey,
          },
        }
      );

      setTrackingInfo(response.data);
      setTrackingInfoArray(response.data.history);
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
