import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { IBiteshipTracking } from '~/interfaces/orderTracking';
import type { loader } from '~/routes/order';

export function UseBiteshipTrack(trackingNumber: string) {
  const data = useLoaderData<typeof loader>();

  const [trackingInfoArray, setTrackingInfoArray] = useState<
    IBiteshipTracking[]
  >([]);
  const [trackingInfo, setTrackingInfo] = useState<IBiteshipTracking>();
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
    } catch (err) {
      setError(null);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    trackingInfo,
    error,
    trackingInfoArray,
  };
}
