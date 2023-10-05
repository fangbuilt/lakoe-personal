import { Box } from '@chakra-ui/react';
import MailerLite from '@mailerlite/mailerlite-nodejs';

// import { db } from '~/libs/prisma/db.server';
import { GetUnpidData } from '~/modules/unpid/unpid.service';

export async function loader() {
  const datash = await GetUnpidData();
  return datash;
}
interface CreateOrUpdateParams {
  email: string;
  fields?: object;
  groups?: Array<string>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
  subscribed_at?: string;
  ip_address?: string;
  opted_in_at?: string;
  optin_ip?: string;
  unsubscribed_at?: string;
}
// const apikey = process.env.API_KEY as string;
const mailerlite = new MailerLite({
  api_key:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWQ0NmUwMjdkZmFiZTQ4ZWUzYzIwMWU3ZDllNmFjZmMwMGFhNjBlY2ZmNWRmNGYzMmQyZGMyZTYyNjFkYjc2NjJhZWY3MjIyN2JhNzM1MGEiLCJpYXQiOjE2OTUyODQ2MjkuMDUxMTI1LCJuYmYiOjE2OTUyODQ2MjkuMDUxMTI4LCJleHAiOjQ4NTA5NTgyMjkuMDQ1ODg3LCJzdWIiOiI2MTExNTciLCJzY29wZXMiOltdfQ.FUftStmZRJdD0g0ar4FGn3FpuPWH_gy2wLRkaL-r5lFl0Nr05_VR1kYzWdFfEdbXzoyTVxJL13DeaMHVS6AmAfyyVbT3Ef7TzwsEPvgNf8j-x8k6J-beJOrjtS0khuQRO2hgGREuNE997TstNXf7gVFdjIBTogj5kIpnZsUpiEuHE8ak6GIKoUz5gxG1dyjB7R88TWHS05ZNS3ydkvxeNiK7_YqxMpG-lq9eexWMKgUyDb-rXr1ewct62n9UtrgdlmpnI54Ikl1hlHbJsuwvO01ZNYu9_dD8ABr9z8XeKl1Uky3817m8iVtcwxsq7xAV3sbTKokdUZekUS-2oQejvn9_pBx_Xmvvrw0rvXtuTJdqnTnyTVwD5lZQq87vu_jVPXsqE5groAYfCNVKbmmQbICa_Voc99tWkVETRa9wxmY541hGYay3pjVKRW42ozhFG7uXGSJRaZ9uNrbg7_9eEDVWW1WXudWJ17VEXSrMRBSY0V8LhBlgNCuaZoHC63bYIts2EPXVUcYe60S39LjXQrMvnhgkihYBaOqcVzfY96Ur3hbmPG2lEv5MgZ--JAfGm_t5g7gETndMbaWDc7Z_BGz33ddg7kL8RP-SR-Ch7jLF6Zux9yXTOnFHp3Joxx4_1kY2h8Xg1uYkGnNMMeQaae-j2UWuqd5f4Dvb5P7r3uw',
});

export function handleClick(
  name: string,
  email: string,
  totalPriceSendEmail: string
) {
  const emails = `${email}`;
  const date = new Date().getTime();
  const atIndex = emails.indexOf('@');
  const usernameEmail = emails.slice(0, atIndex);
  const domainEmail = emails.slice(atIndex + 1);
  const newEmail = `${usernameEmail}+${date}@${domainEmail}`;
  console.log('newEmail', newEmail);

  const params: CreateOrUpdateParams = {
    email: newEmail,
    fields: {
      namabuyer: name,
      subtotal: totalPriceSendEmail,
    },
    groups: ['98467998998726134'],
    status: 'active',
    subscribed_at: '2021-08-31 14:22:08',
    // Anda dapat mengisi nilai-nilai lain sesuai kebutuhan
  };

  console.log('params', params);

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      console.log('Email berhasil dikirim:', response.data);
      // Tambahkan kode lain yang ingin Anda jalankan setelah pengiriman email berhasil
    })
    .catch((error) => {
      console.error('Gagal mengirim email:', error);
      // Tambahkan kode lain untuk menangani kesalahan jika diperlukan
    });
}

export function handleClickSeller(
  emailSeller: string,
  name: string,
  totalPriceSendEmail: string,
  nameStore: string
) {
  const emails = `${emailSeller}`;
  console.log('emailSeller', emailSeller);
  console.log('emails', emails);
  const date = new Date().getTime();
  const atIndex = emails.indexOf('@');
  const usernameEmail = emails.slice(0, atIndex);
  const domainEmail = emails.slice(atIndex + 1);
  const newEmail = `${usernameEmail}+${date}@${domainEmail}`;
  console.log('newEmail', newEmail);

  const params: CreateOrUpdateParams = {
    email: newEmail,
    fields: {
      namabuyer: name,
      namestore: nameStore,
      subtotal: totalPriceSendEmail,
    },
    groups: ['99989191188809082'],
    status: 'active',
    subscribed_at: '2021-08-31 14:22:08',
    // Anda dapat mengisi nilai-nilai lain sesuai kebutuhan
  };

  console.log('params', params);

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      console.log('Email berhasil dikirim:', response.data);
      // Tambahkan kode lain yang ingin Anda jalankan setelah pengiriman email berhasil
    })
    .catch((error) => {
      console.error('Gagal mengirim email:', error);
      // Tambahkan kode lain untuk menangani kesalahan jika diperlukan
    });
}
const MailerLiteComponent3 = () => {
  return (
    <>
      <Box marginTop={'20px'}></Box>
    </>
  );
};

export default MailerLiteComponent3;
