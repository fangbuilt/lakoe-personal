import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IBiteshipTracking } from "~/interfaces/orderTracking";

export async function loader() {
  return process.env.BITESHIP_API_KEY as string;
}

export default function APITrackings() {
  const useData = useLoaderData<typeof loader>();
  const [orderTrackingsData, setOrderTrackingsData] = useState<
    IBiteshipTracking[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.biteship.com/v1/trackings/JT99418534765/couriers/jne",
        {
          headers: {
            authorization: useData,
          },
        }
      );

      const data = response.data;
      setOrderTrackingsData(data); // Update the state with Biteship data
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { orderTrackingsData };
}
