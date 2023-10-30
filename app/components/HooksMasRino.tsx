import { useState } from 'react';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import { useSubmit } from '@remix-run/react';

export default function HooksMasRino() {
  const [selectedProps, setSelectedProps] = useState<IOrderDetailInvoice>();
  const submit = useSubmit();

  async function updateInvoiceAndHistoryStatusReadyToShip() {
    try {
      if (!selectedProps?.id) {
        return console.log('Order ID not found!');
      }

      submit(
        {
          id: selectedProps.id,
          status: 'READY_TO_SHIP',
          actionType: 'updateInvoiceAndHistoryStatusReadyToShip',
        },
        { method: 'POST' }
      );
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleBalanceNotif = async () => {
    try {
      const mailerBaseUrl = 'https://connect.mailerlite.com';
      const mailerEndPoint = '/api/subscribers';
      const mailerApiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2E4ZjZkNTMxMDdkY2M1MjZjM2M5YTQxY2JhMjg0ZjJlOTc5NmFjOTA2MjVkMzRjN2I5NTVmNDY1ODlkZjcxOGM5NzY5ZmYyMzU5OTcxZTkiLCJpYXQiOjE2OTQxNTU1NDQuMTI1MzUyLCJuYmYiOjE2OTQxNTU1NDQuMTI1MzU0LCJleHAiOjQ4NDk4MjkxNDQuMTIwNDQsInN1YiI6IjYxNDY4NSIsInNjb3BlcyI6W119.KgsXIIo-rqViucL5U0QTHaG-Nhp0YJn0c752CSW1taUIVgfP0Dyk-vL-mHEGCLWl4CROGPwtzGakauaIGV1A-ijvg_16vEz04u8xKRzzuP4F9Hza78RnhTXjewo6oEiB4_E3WwFU6qalQmzoNaSzmaBI4zi6HZOO29uEHtZRswRfmi5g1XmDyqo2SmaL6S3nTU7xMoHaBlvY7UnanzqdpX0nr-nxS-05ADZRlo1a3YDQBihDFLzrhN8xgtXipU5O7nz18-Ivpj2TNjaMNk85zZukLYPxF1lVXrbNFWKVWJKMk9gthqMWsPDQTg7GexZSE-0uzZL8CO1azw_hCdJUJQYM3KYw1pb6PUm4YSO-Br4etsClpICaivipa5EGSOKF3wvAhyHa12ZIZuJcBadQPyAaiDi8a0s1O6UbLMBa_45oDDfeNQsEpXg9i5hkAe7H0DEdgM69JMh0zmu4Vi8s3f_fmz0pfGjXfKVT6g0KHx0K6AYhN714R2x6FOB-au4QrPlE_UdvIOO959uozJ4CHHiBKClWcTLRELWwCPmo6y5s-K8_s7h1czfV2MVx5mfihABiLyxCv3y6EwxgTi6gjKiN4NcCMoGnxt0dwPos67QQ-gRn2SdQoN0rsrKGuZltLOBza1cnqoHAZAFHiSrJq332VNoJhNuXN-3MoXw1LCY'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const mailerData = {
        email: 'payumiswari+112224555bismilah@gmail.com',
        fields: {
          company: 'ADD MORE BALANCE', //company berperan sebagai "title" dalam mailerlite
          last_name:
            "you need to add more balance to your platform system so that your sellers can keep sending packages to their customer without being delayed just because you're lack of money. do what you gotta do", //last_name berperan sebagai isian pesan ("message") dalam mailerlite
        },
        groups: ['98713000939095999'],
      };

      const mailerRequest = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mailerApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailerData),
      };

      await fetch(`${mailerBaseUrl}${mailerEndPoint}`, mailerRequest);
      alert('System sedang terkendala, cobalah beberapa saat lagi');
    } catch (error) {
      alert(error);
    }
  };

  const systembalance = 1; //saldo LAKOE

  const afterpacking = () => {
    if (systembalance > 50000) {
      handleOrderCourier();
      updateInvoiceAndHistoryStatusReadyToShip();
    } else {
      handleBalanceNotif();
    }
  };

  const handleOrderCourier = async () => {
    try {
      const baseUrl = 'https://api.biteship.com';
      const endpoint = '/v1/orders';
      const apiKey =
        'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmlub1B1amEtTEFLT0UiLCJ1c2VySWQiOiI2NTA4MDJiOTA5ZWRjNTViMThjNGQxNDMiLCJpYXQiOjE2OTUxOTkyOTZ9.yNL64MzGSESlk-zln4iv0-yz9Nv3osEmt2_sVqOJ2xI'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const dataforBiteShip = {
        // shipper_contact_name: props[0].cart?.store?.users[0].name,
        shipper_contact_name: selectedProps?.cart?.store?.users[0].name,
        shipper_contact_phone: selectedProps?.cart?.store?.users[0].phone,
        shipper_contact_email: selectedProps?.cart?.store?.users[0].email,
        shipper_organization: selectedProps?.cart?.store.name,
        origin_contact_name: selectedProps?.cart?.store?.users[0].name,
        origin_contact_phone: selectedProps?.cart?.store?.users[0].phone,
        origin_address: selectedProps?.cart?.store?.locations[0].address,
        origin_note: selectedProps?.cart?.store?.locations[0].addressNote,

        origin_coordinate: {
          latitude: selectedProps?.cart.store.locations[0].latitude,
          longitude: selectedProps?.cart.store.locations[0].longtitude,
        },
        origin_postal_code: selectedProps?.cart?.store?.locations[0].postalCode,
        destination_contact_name: selectedProps?.receiverName,
        destination_contact_phone: selectedProps?.receiverPhone,
        destination_contact_email: selectedProps?.receiverEmail,
        destination_address: selectedProps?.receiverAddress,
        destination_postal_code: selectedProps?.receiverPostalCode,
        destination_note: selectedProps?.receiverAddressNote,
        destination_cash_proof_of_delivery: true,
        destination_coordinate: {
          latitude: selectedProps?.receiverLatitude,
          longitude: selectedProps?.receiverLongitude,
        },
        courier_company: selectedProps?.courier.courierName,

        courier_type: selectedProps?.courier.courierType,
        courier_insurance: selectedProps?.courier.courierInsurance,
        delivery_type: selectedProps?.courier.courierType,
        delivery_date: selectedProps?.courier.deliveryDate,
        delivery_time: selectedProps?.courier.deliveryTime,
        order_note: selectedProps?.courier.description,
        metadata: {},
        items: [
          {
            id: selectedProps?.cart.cartItems[0].product.id,
            name: selectedProps?.cart.cartItems[0].product.name,
            image: '',
            description: selectedProps?.cart.cartItems[0].product.description,
            value: selectedProps?.price,
            quantity: selectedProps?.cart.cartItems[0].qty,
            height: selectedProps?.cart.cartItems[0].product.height,
            length: selectedProps?.cart.cartItems[0].product.length,
            weight:
              selectedProps?.cart.cartItems[0].variantOption
                .variantOptionValues[0].weight,
            width: selectedProps?.cart.cartItems[0].product.width,
          },
        ],
      };

      const orderDataJSON = JSON.stringify(dataforBiteShip);

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: orderDataJSON,
      };

      await fetch(`${baseUrl}${endpoint}`, requestOptions);
      alert(
        'Kami sedang mencarikan kurir untuk penjemputan paket anda, Mohon Menunggu'
      );
    } catch (error) {
      alert(error);
    }
  };

  return { setSelectedProps, afterpacking };
}
