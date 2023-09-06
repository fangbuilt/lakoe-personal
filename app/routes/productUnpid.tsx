import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import datetimeDifference from 'datetime-difference';
import MailerLite from '@mailerlite/mailerlite-nodejs';
import { PrismaClient } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
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

const mailerlite = new MailerLite({
  api_key:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZTNhM2I0ZjQyM2I1ZjMzNGFmZjYwMTI1M2NiOWNiYjkzMmJlYmRhNjM2MjA4Mjc1NjY4Zjc2MzBiMDNlZTdmNzNlZTYwNzAzYmNkNTdmMWQiLCJpYXQiOjE2OTM5MzExMjUuNDQ3MDg5LCJuYmYiOjE2OTM5MzExMjUuNDQ3MDkyLCJleHAiOjQ4NDk2MDQ3MjUuNDQyOTIsInN1YiI6IjYxMTE1NyIsInNjb3BlcyI6W119.ulMjk2-7itYmldu0zKRZutb37X5Ys8GeUe8hHN9X0y_dJmaBjZFB9xzfupK-6oIgO9aFWkXhMfj623BKE64sK75rJo99WtCqvgOuuG4XS2xeqvKlXY_2e45dSmE8-N-IKthQoYNqX02hBu-7fMUjByQ5ViQjq2jl1to3f7nOg_zNmy8pbQoPdCemFGtbvwBtJ0ACbog-mLztu6vNDEto7WbMYfWXWpMmY_6s4qPmKR30EhX4UyzK9UQ2pkxGpXCNERra8Bm0EMsJc35vgW12nFtnZP3g4Puz_DI5tiDWjQ8b6VIWLCJUrpiWZ9MeemBABl5azOHOFmkf-WH0xtRE4NbW9QWQN3sEIqEMBkSrlFbUdj7U10R5U2l-w3NY8EavxR47fcwQL08ef6JySz45NwbbNdQ_ymhK05AnEXrd5deZBhmU2MUr-sqeSwtTdivD8g8W3uuq6lraArs5bE5UypPyk-reT4exdvAnSCxmtn7q0FYJlqz3mTDZNpudJL98EAhCY4tqntbg7KqDpirDLhzHVhqzASgpapFM5E1WMK1nBK2diQjZpR7F5qovvcvOIjCu4vKMIrCbvtFi6rF7bnJLRjr9BdRxrQmCrdyEN7xlV1pEeIgl1K0mfbdD-zhTrNHoAa7lCbtVYsH397BXawtUNLExcJnB5z8bFhCULic',
});
const prisma = new PrismaClient();

export async function loader() {
  const datash = await prisma.payment.findMany();

  for (const data of datash) {
    const waktuTerakhirPembayaran = data.updatedAt;
    console.log('waktuTerakhirPembayaran', waktuTerakhirPembayaran);
    const selisihWaktu = hitungSelisihWaktu(waktuTerakhirPembayaran);

    if (selisihWaktu > 3 && data.status !== 'paid') {
      const pengguna = await prisma.user.findFirst({
        where: { id: data.usersId as string },
        select: { email: true },
      });
      if (pengguna) {
        await kirimNotifikasiEmail(pengguna.email);
        await perbaruiStatusPembayaran(data.id, 'unpaid');
      }
    }
  }
  return datash;
}

function hitungSelisihWaktu(waktu: Date) {
  const saatIni = new Date();
  const waktuTerakhir = new Date(waktu);
  const result = datetimeDifference(saatIni, waktuTerakhir);
  console.log('result', result.seconds);
  return result;
}

async function kirimNotifikasiEmail(email: string) {
  console.log('ini emali', email);
  const params: CreateOrUpdateParams = {
    email: email,
    fields: {
      name: 'badriana',
      last_name: 'badriana',
      company: 'MailerLite',
      country: 'Best country',
      city: 'Best city',
      phone: '37060677606',
      state: 'Best state',
      z_i_p: '99999',
    },
    groups: ['98493588162217945'],
    status: 'active',
  };
  try {
    const cobaconsole = await mailerlite.subscribers.createOrUpdate(params);
    console.log('cobaconsole', cobaconsole);
    console.log('Notifikasi email berhasil dikirim ke', email);
  } catch (error) {
    console.error('Gagal mengirim notifikasi email:', error);
  }
}

async function perbaruiStatusPembayaran(paymentId: any, status: any) {
  try {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: status },
    });
  } catch (error) {
    console.error('Gagal memperbarui status pembayaran di basis data:', error);
  }
}

const MailerLiteComponent = () => {
  const datas = useLoaderData<typeof loader>();
  return (
    <>
      <div>{/* <Button onClick={kirimNotifikasiEmail}>Kirim</Button> */}</div>
      <Box marginTop={'20px'}>
        {datas &&
          datas.map((data) => (
            <Box key={data.id}>
              <Text>{data.id}</Text>
              <Text>{data.bank}</Text>
              <Text>{data.vaNumber}</Text>
              <Text>{data.amount}</Text>
              <Text>{data.status}</Text>
              <Text>{data.usersId}</Text>
              <Text>{data.createdAt}</Text>
              <Text>{data.updatedAt}</Text>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default MailerLiteComponent;
