import { useEffect, useState } from "react";
import { useSteps } from "@chakra-ui/react";
import { ITracking } from "~/components/ModalInShipping";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
export function loader() {
  const apiUrl = "biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZyIsInVzZXJJZCI6IjY0ZjU1NDQ1M2VlYmViM2MyZGJiMmY4ZiIsImlhdCI6MTY5MzgzMzcxNX0.5CUu--0tl8oVDLrT_eUlrFgmV4qu0y8HaJnrN-NWdUA" as string
  return apiUrl
}
export function useBiteshipTrack() {
  const data = useLoaderData<typeof loader>()
  const [trackingInfoArray, setTrackingInfoArray] = useState<ITracking[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<ITracking>();
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
    const response = await axios.get(
      `https://api.biteship.com/v1/trackings/Roi50pFE5PWwkU7UMYgYlb5I`,
      {
        headers: {
          authorization:
            "biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZyIsInVzZXJJZCI6IjY0ZjU1NDQ1M2VlYmViM2MyZGJiMmY4ZiIsImlhdCI6MTY5MzgzMzcxNX0.5CUu--0tl8oVDLrT_eUlrFgmV4qu0y8HaJnrN-NWdUA",
        },
      }
    );

    // const headers = {
    //   Authorization: `biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZyIsInVzZXJJZCI6IjY0ZjU1NDQ1M2VlYmViM2MyZGJiMmY4ZiIsImlhdCI6MTY5MzgzMzcxNX0.5CUu--0tl8oVDLrT_eUlrFgmV4qu0y8HaJnrN-NWdUA`,
    // };

      // const data = await response.
      if (response.status === 200) {
        setTrackingInfo(response.data);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { activeStep } = useSteps({
    index: 1,
    count: trackingInfoArray.length,
  });

  return {
    trackingInfo,
    trackingInfoArray,
    activeStep,
    error,
  };

  // return { error, trackingInfo };
}
