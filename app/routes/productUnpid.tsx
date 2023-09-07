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

const apikey = process.env.API_KEY as string;
console.log('mailerlite iniiiiii', apikey);

const mailerlite = new MailerLite({
  api_key: apikey,
});

const prisma = new PrismaClient();

export async function loader() {
  const datash = await prisma.payment.findMany({
    include: {
      user: true,
    },
  });

  for (const data of datash) {
    const waktuTerakhirPembayaran = data.updatedAt;
    // console.log('waktuTerakhirPembayaran', waktuTerakhirPembayaran);
    const selisihWaktu = hitungSelisihWaktu(waktuTerakhirPembayaran);
    console.log('selisihWaktu', selisihWaktu.minutes);
    if (selisihWaktu.hours > 12 && data.status !== 'paid') {
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

              <Text>{data.user?.id}</Text>
              <Text>{data.user?.name}</Text>
              <Text>{data.user?.phone}</Text>
              <Text>{data.user?.email}</Text>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default MailerLiteComponent;
