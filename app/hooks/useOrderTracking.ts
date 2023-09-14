// import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { IBiteshipTracking } from '~/interfaces/orderTracking';

export async function loader() {
  return process.env.API_BITESHIP_TEST as string;
}

export default function GetBiteshipTracking() {
  // const useData = useLoaderData<typeof loader>();

  const [orderTrackingsData, setOrderTrackingsData] =
    useState<IBiteshipTracking>();
  const [orderMultiTrackingsData, setOrderMultiTrackingsData] = useState<
    IBiteshipTracking[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.biteship.com/v1/trackings/scPhFwoqEulGqPL3IQmjDYUp',
          {
            headers: {
              authorization:
                'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQVBJX0JJVEVTSElQX1RFU1QiLCJ1c2VySWQiOiI2NGY1MjYyMjM5Yzk5YzNkMjg0MDkwM2MiLCJpYXQiOjE2OTQ2NzQ2NTB9.3lmu3MXV2ipjU_naD3teN2aNDa-ez6Sm77oSh0Q9xlk',
            },
          }
        );

        setOrderTrackingsData(response.data); // Update the state with Biteship data

        setOrderMultiTrackingsData(response.data.history); // Update the state with Biteship data

        console.log('value response history: ', response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData };
}
