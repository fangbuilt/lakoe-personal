import { Box, Button } from '@chakra-ui/react';

import MailerLite from '@mailerlite/mailerlite-nodejs';
import { db } from '~/libs/prisma/db.server';
import { useLoaderData } from '@remix-run/react';
import { GetUnpid } from '~/modules/unpid/unpid.service';

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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOTVjMzY1MTc4MjQzYTYyM2YwZmIxZmE3YmUzMDBjMDFjNzc3OTJlZGZkOWM1YWRjYzkzOTZmM2JjYjZkNWVjMjk1ZjgyM2NhNDQxNGRlZGUiLCJpYXQiOjE2OTUwOTg1ODAuMDgzODIzLCJuYmYiOjE2OTUwOTg1ODAuMDgzODI1LCJleHAiOjQ4NTA3NzIxODAuMDc5NTg1LCJzdWIiOiI2MTExNTciLCJzY29wZXMiOltdfQ.jx-FmOvtCc-M8h15Kxp8oLw3BUT15t53UlaZiuCT1hL7atQvbKwesdHmI598EVuBLWqr-ffrk_pUn2vZIVaVVKmZ69dC-Z_dacpzBIHnLlTgnn19LhEIghB69yX2lhJEepwAiRJ30WcDydZ-Z9KYY933ycxqThXOK-ECLyUqXgLllnnD0mLgAizzk_zFyGdQg22PrT7TE4Ym-cx34PqGhzJpyyB_bplds5iTHcR1oTbgNKpcsxG-bxsW2uUNQDlzbsMC973M80uRx337pzUzEgzL7GxUMraGk5_id4pCrxHoJJ8BqfeKWhi_aMOCAfgKzLL-JGQ33zQOm1yIjRZkprweSrpa9CfvEwcpb8EyBxqYhpRRbfXE7TikIEqtjxfrB0ewu1EG8TvtYvesrd0DfAZZNmKAK5C4-ZNE1MgOICuUNa40eS8YyPKSvPjn9illBSdpIxnEf4Itk4yfkKByJgefPZOLn1dYZNQRIhWUBHkEu-PHhNvWUujHhXhVOngcRyClK92LzGFRp7fK9Csb6Ckc5LG3gDOcN5m8wq6T5AB9849CsyYL00URKKvqX-lqzEMrn4LXfFIyOkbap63YGcbtIkNLvrraOSEJ2B3FQPbKCu5Vk62RwyQf0WI0KxYJQr5pSIXt1ZxC7Oje8nAyk4rI_3V3zgbXZwCw6QkixD8',
});
export async function loader() {
  const datash = await GetUnpid();

  return datash;
}

// async function kirimNotifikasiEmail(email: string, name: string, phone: string) {

//     const emails = `${email}`;
//     const date = new Date().getTime()
//     const atIndex = emails.indexOf('@');
//     const usernameEmail = emails.slice(0, atIndex);
//     const domainEmail = emails.slice(atIndex + 1);
//     const newEmail = `${usernameEmail}+${date}@${domainEmail}`

//     const params: CreateOrUpdateParams = {
//         email: newEmail,
//         fields: {
//             name: name,
//             company: null,
//             country: null,
//             city: null,
//             phone: phone,
//             state: 'Best state',
//             z_i_p: '99999',
//         },
//         groups: ['98467998998726134'],
//         status: 'active',
//     };

//     console.log('params', params);
//     try {
//         const cobaconsole = await mailerlite.subscribers.createOrUpdate(params);
//         console.log('cobaconsole', cobaconsole);
//         console.log('Notifikasi email berhasil dikirim ke', email);
//     } catch (error) {
//         console.error('Gagal mengirim notifikasi email:', error);
//     }
// }

// async function perbaruiStatusPembayaran(paymentId: any, status: any) {
//     try {
//         await db.payment.update({
//             where: { id: paymentId },
//             data: { status: status },
//         });
//     } catch (error) {
//         console.error('Gagal memperbarui status pembayaran di basis data:', error);
//     }
// }

const MailerLiteComponent = () => {
  const datas = useLoaderData<typeof loader>();
  async function kirimNotifikasiEmail(
    email: string,
    name: string,
    phone: string
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
        name: name,
        company: null,
        country: null,
        city: null,
        phone: phone,
        state: 'Best state',
        z_i_p: '99999',
      },
      groups: ['98467998998726134'],
      status: 'active',
    };

    console.log('params', params);
    try {
      const cobaconsole = await mailerlite.subscribers.createOrUpdate(params);
      console.log('cobaconsole', cobaconsole);
      console.log('Notifikasi email berhasil dikirim ke', email);
    } catch (error) {
      console.error('Gagal mengirim notifikasi email:', error);
    }
  }

  // async function perbaruiStatusPembayaran(paymentId: any, status: any) {
  //     try {
  //         await db.payment.update({
  //             where: { id: paymentId },
  //             data: { status: status },
  //         });
  //     } catch (error) {
  //         console.error('Gagal memperbarui status pembayaran di basis data:', error);
  //     }
  // }
  const sendEmailOnClick = async () => {
    for (const data of datas) {
      if (data.status == 'PAID') {
        const pengguna = await db.invoice.findFirst({
          where: { id: data.id as string },
          select: {
            receiverName: true,
            receiverPhone: true,
            receiverEmail: true,
          },
        });
        if (pengguna) {
          const result = await kirimNotifikasiEmail(
            pengguna.receiverEmail,
            pengguna.receiverName,
            pengguna.receiverPhone
          );
          console.log('result', result);
          // await perbaruiStatusPembayaran(data.id, 'unpaid');
        } else {
          console.error('Data pengguna tidak ditemukan.');
        }
      }
    }
  };
  // console.log('sendEmailOnClick', sendEmailOnClick);
  return (
    <>
      <Box marginTop={'20px'}>
        <Button onClick={sendEmailOnClick}>Send Email</Button>
      </Box>
    </>
  );
};

export default MailerLiteComponent;
