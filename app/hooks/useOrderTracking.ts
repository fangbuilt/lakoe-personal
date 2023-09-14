import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IBiteshipTracking } from "~/interfaces/orderTracking";

export async function loader() {
  return process.env.API_LAKOE_TEST as string;
}

export default function getBiteshipTracking() {
  const useData = useLoaderData<typeof loader>();
  const [orderTrackingsData, setOrderTrackingsData] =
    useState<IBiteshipTracking>();
  const [orderMultiTrackingsData, setOrderMultiTrackingsData] = useState<
    IBiteshipTracking[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.biteship.com/v1/trackings/scPhFwoqEulGqPL3IQmjDYUp",
          {
            headers: {
              authorization: "useData",
            },
          }
        );

        setOrderTrackingsData(response.data); // Update the state with Biteship data

        setOrderMultiTrackingsData(response.data.history); // Update the state with Biteship data

        console.log("value response history: ", response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return { orderTrackingsData, orderMultiTrackingsData };
}
