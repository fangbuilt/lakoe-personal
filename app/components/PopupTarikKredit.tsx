import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';

// export async function loader({ request }: LoaderArgs) {
//   const userId = await getuserId(request);
//   const username = await getUser(request);
//   const apikey = process.env.MAILERLITE_API_KEY as string;
// }

// if (userId) {
//   return json({ username, apikey });
// } else {
//   throw (new Response("Unauthorized", { status: 401 }), redirect("/dasboard"));
// }

export default function TarikKredit({ dataBank }: any) {
  // const data = useRouteLoaderData<typeof loader>();
  // const dataApi = data.apikey;
  // const mailerlite = new MailerLite({
  //   api_key: dataApi,
  // });

  // interface CreateOrUpdateParams {
  //   email: string;
  //   fields?: object;
  //   groups?: Array<string>;
  //   status?: "active" | "unsubsribed" | "unconfirmed" | "bounced" | " junk";
  //   subscribed_at?: string;
  //   ip_address: string;
  //   opted_in_at?: string;
  //   optin_ip?: string;
  //   unsubscribed_at?: string;
  // }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} bg={'#8dc63f'} color={'#fff'} colorScheme="none">
        Check
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} alignItems={'center'}>
            <Text ml={'5px'}>Tarik Credit</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box bg={'yellow.300'} padding={'10px'} fontSize={'13px'}>
              <Box textAlign={'center'}>
                <Text>Anda melakukan penarikan sebesar</Text>
                <Text fontSize={'20px'} fontWeight={'bold'} color={'gray.700'}>
                  Rp.500.000
                </Text>
                <Text>Ke Nomor Rekening :</Text>
                <Text fontSize={'20px'} fontWeight={'bold'} color={'gray.700'}>
                  BCA-67842874385
                </Text>
                <Text>Mohon tunggu beberapa saat..</Text>
                <Text>Terima Kasih!</Text>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="none"
              mr={3}
              onClick={onClose}
              color={'gray.500'}
              border={'1px solid'}
              borderColor={'gray.500'}
            >
              Batal
            </Button>
            <Button colorScheme="green" mr={3}>
              Withdraw
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
