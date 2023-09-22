import { Box, Button } from '@chakra-ui/react';
import MailerLite from '@mailerlite/mailerlite-nodejs';

// import { db } from '~/libs/prisma/db.server';
import { useLoaderData } from '@remix-run/react';
import { GetUnpid } from '~/modules/unpid/unpid.service';

export async function loader() {
  const datash = await GetUnpid();
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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOTVjMzY1MTc4MjQzYTYyM2YwZmIxZmE3YmUzMDBjMDFjNzc3OTJlZGZkOWM1YWRjYzkzOTZmM2JjYjZkNWVjMjk1ZjgyM2NhNDQxNGRlZGUiLCJpYXQiOjE2OTUwOTg1ODAuMDgzODIzLCJuYmYiOjE2OTUwOTg1ODAuMDgzODI1LCJleHAiOjQ4NTA3NzIxODAuMDc5NTg1LCJzdWIiOiI2MTExNTciLCJzY29wZXMiOltdfQ.jx-FmOvtCc-M8h15Kxp8oLw3BUT15t53UlaZiuCT1hL7atQvbKwesdHmI598EVuBLWqr-ffrk_pUn2vZIVaVVKmZ69dC-Z_dacpzBIHnLlTgnn19LhEIghB69yX2lhJEepwAiRJ30WcDydZ-Z9KYY933ycxqThXOK-ECLyUqXgLllnnD0mLgAizzk_zFyGdQg22PrT7TE4Ym-cx34PqGhzJpyyB_bplds5iTHcR1oTbgNKpcsxG-bxsW2uUNQDlzbsMC973M80uRx337pzUzEgzL7GxUMraGk5_id4pCrxHoJJ8BqfeKWhi_aMOCAfgKzLL-JGQ33zQOm1yIjRZkprweSrpa9CfvEwcpb8EyBxqYhpRRbfXE7TikIEqtjxfrB0ewu1EG8TvtYvesrd0DfAZZNmKAK5C4-ZNE1MgOICuUNa40eS8YyPKSvPjn9illBSdpIxnEf4Itk4yfkKByJgefPZOLn1dYZNQRIhWUBHkEu-PHhNvWUujHhXhVOngcRyClK92LzGFRp7fK9Csb6Ckc5LG3gDOcN5m8wq6T5AB9849CsyYL00URKKvqX-lqzEMrn4LXfFIyOkbap63YGcbtIkNLvrraOSEJ2B3FQPbKCu5Vk62RwyQf0WI0KxYJQr5pSIXt1ZxC7Oje8nAyk4rI_3V3zgbXZwCw6QkixD8',
});

const MailerLiteComponent3 = () => {
  const datas = useLoaderData<typeof loader>();

  function handleClick() {
    const email = 'bagasvanbacdim+gagagag@gmail.com'; // Ganti dengan alamat email yang sesuai
    const name = 'Dummy';
    const phone = '37060677606';
    console.log(datas);

    const params: CreateOrUpdateParams = {
      email,
      fields: {
        name,
        last_name: 'Testerson',
        company: 'MailerLite',
        country: 'Best country',
        city: 'Best city',
        phone,
        state: 'Best state',
        z_i_p: '99999',
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

  // const handleClick = () => {
  //   alert('Tombol telah diklik!');
  // };

  return (
    <>
      <Box marginTop={'20px'}>
        <Button onClick={handleClick}>Send Email</Button>
      </Box>
    </>
  );
};

export default MailerLiteComponent3;
