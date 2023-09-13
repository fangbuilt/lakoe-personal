import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IBiteshipTracking } from "~/interfaces/orderTracking";

export async function loader() {
  return process.env.BITESHIP_API_KEY as string;
}

export default function getBiteshipTracking() {
  // const useData = useLoaderData<typeof loader>();
  const [orderTrackingsData, setOrderTrackingsData] = useState<IBiteshipTracking>();
  const [orderMultiTrackingsData, setOrderMultiTrackingsData] = useState<IBiteshipTracking[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.biteship.com/v1/trackings/scPhFwoqEulGqPL3IQmjDYUp",
        {
          headers: {
            authorization:
              "biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQVBJX0xBS09FX1RFU1QiLCJ1c2VySWQiOiI2NGY1MjYyMjM5Yzk5YzNkMjg0MDkwM2MiLCJpYXQiOjE2OTQ1NjQ5Mzh9.c7NG5ncA_iE66d3Iv5LAjZ9pdTBMDj5EjqqwoDi6IZQ",
          },
        }
      );

      setOrderTrackingsData(response.data); // Update the state with Biteship data

      setOrderMultiTrackingsData(response.data.history); // Update the state with Biteship data

      // console.log("response setOrderMultiTrackingsData", setOrderMultiTrackingsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData, fetchData };
}
