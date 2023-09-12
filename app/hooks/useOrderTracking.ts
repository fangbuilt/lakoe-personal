import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IBiteshipTracking } from "~/interfaces/orderTracking";

export async function loader() {
  return process.env.BITESHIP_API_KEY as string;
}

export default function getBiteshipTracking() {
  const useData = useLoaderData<typeof loader>();
  const [orderTrackingsData, setOrderTrackingsData] =
    useState<IBiteshipTracking>();
  const [orderMultiTrackingsData, setOrderMultiTrackingsData] = useState<
    IBiteshipTracking[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.biteship.com/v1/trackings/JT99418534765/couriers/jne",
        {
          headers: {
            authorization:
              "biteship_live.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTEFLT0UiLCJ1c2VySWQiOiI2NGY1MjYyMjM5Yzk5YzNkMjg0MDkwM2MiLCJpYXQiOjE2OTQwMTA1MjJ9.yRPWTEOquLEhyX99aQ3HPeAg8F5koDRRnPMYvl5Bw9o",
          },
        }
      );

      setOrderTrackingsData(response.data); // Update the state with Biteship data
      setOrderMultiTrackingsData(response.data); // Update the state with Biteship data

      console.log("orderTrackingsData", orderTrackingsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData, fetchData };
}
