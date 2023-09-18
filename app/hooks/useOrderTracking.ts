import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useState, useEffect } from "react";
import type { IBiteshipTracking } from "~/interfaces/orderTracking";
import { loader } from "~/routes/order";

export default function GetBiteshipTracking() {
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
          "https://api.biteship.com/v1/trackings/rCFV2hRPtZp7E7VLoRvge7b2",
          {
            headers: {
              authorization: data.api_key,
            },
          }
        );

        setOrderTrackingsData(response.data); // Update the state with Biteship data

        setOrderMultiTrackingsData(response.data.history); // Update the state with Biteship data
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData };
}
