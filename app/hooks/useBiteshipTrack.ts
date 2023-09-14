import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
import { ITracking } from "~/interfaces/order/orderTracking";


export function useBiteshipTrack() {
  

  const [trackingInfoArray, setTrackingInfoArray] = useState<ITracking[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<ITracking>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.biteship.com/v1/trackings/Roi50pFE5PWwkU7UMYgYlb5I",
          {
            headers: {
              authorization:
                "biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZyIsInVzZXJJZCI6IjY0ZjU1NDQ1M2VlYmViM2MyZGJiMmY4ZiIsImlhdCI6MTY5MzgzMzcxNX0.5CUu--0tl8oVDLrT_eUlrFgmV4qu0y8HaJnrN-NWdUA",
            },
          }
        );

        setTrackingInfo(response.data);
        setTrackingInfoArray(response.data.history);
      } catch (err) {
        setError(null);
      }
    };

    fetchData();
  }, []);

  return {
    trackingInfo,
    error,
    trackingInfoArray,
  };
}
