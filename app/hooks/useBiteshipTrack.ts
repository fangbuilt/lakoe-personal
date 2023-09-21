import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
import { ITracking } from "~/interfaces/order/orderTracking";
import { loader } from "~/routes/order";
import { db } from "~/libs/prisma/db.server";
import getDataInShipping from "~/modules/order/orderShippingService";



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
