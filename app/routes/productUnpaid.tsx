// // import { Box } from '@chakra-ui/react';
// // import React from 'react';

// // import datetimeDifference from 'datetime-difference';
// // import MailerLite from '@mailerlite/mailerlite-nodejs';
// // import { db } from '~/libs/prisma/db.server';
// // import { useLoaderData } from '@remix-run/react';
// // import { GetUnpid } from '~/modules/unpid/unpid.service';

// // interface CreateOrUpdateParams {
// //   email: string;
// //   fields?: object;
// //   groups?: Array<string>;
// //   status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
// //   subscribed_at?: string;
// //   ip_address?: string;
// //   opted_in_at?: string;
// //   optin_ip?: string;
// //   unsubscribed_at?: string;
// // }

// // const apikey = process.env.API_KEY as string;

// // const mailerlite = new MailerLite({
// //   api_key: apikey,
// // });

// // export async function loader() {
// //   const datash = await GetUnpid();

// //   for (const data of datash) {
// //     const waktuTerakhirPembayaran = data.updatedAt;
// //     const selisihWaktu = hitungSelisihWaktu(waktuTerakhirPembayaran);
// //     console.log('selisihWaktu', selisihWaktu.minutes);
// //     if (selisihWaktu.hours > 12 && data.status !== 'paid') {
// //       const pengguna = await db.user.findFirst({
// //         where: { id: data.userId as string },
// //         select: { name: true, phone: true, email: true },
// //       });
// //       if (pengguna) {
// //         await kirimNotifikasiEmail(
// //           pengguna.email,
// //           pengguna.name,
// //           pengguna.phone
// //         );
// //         await perbaruiStatusPembayaran(data.id, 'unpaid');
// //       }
// //     }
// //   }
// //   return datash;
// // }

// // function hitungSelisihWaktu(waktu: Date) {
// //   const saatIni = new Date();
// //   const waktuTerakhir = new Date(waktu);
// //   const result = datetimeDifference(saatIni, waktuTerakhir);
// //   console.log('result', result.seconds);
// //   return result;
// // }

// <<<<<<< HEAD
// // async function kirimNotifikasiEmail(
// //   email: string,
// //   name: string,
// //   phone: string
// // ) {
// //   console.log('ini emali', email);
// //   const params: CreateOrUpdateParams = {
// //     email: email,
// //     fields: {
// //       name: name,
// //       company: null,
// //       country: null,
// //       city: null,
// //       phone: phone,
// //       state: 'Best state',
// //       z_i_p: '99999',
// //     },
// //     groups: ['98493588162217945'],
// //     status: 'active',
// //   };
// //   try {
// //     const cobaconsole = await mailerlite.subscribers.createOrUpdate(params);
// //     console.log('cobaconsole', cobaconsole);
// //     console.log('Notifikasi email berhasil dikirim ke', email);
// //   } catch (error) {
// //     console.error('Gagal mengirim notifikasi email:', error);
// //   }
// // }
// =======
// async function kirimNotifikasiEmail(
//   email: string,
//   name: string,
//   phone: string
// ) {
//   console.log('ini emali', email);
//   const params: CreateOrUpdateParams = {
//     email: email,
//     fields: {
//       name: name,
//       company: null,
//       country: null,
//       city: null,
//       phone: phone,
//       state: 'Best state',
//       z_i_p: '99999',
//     },
//     groups: ['98493588162217945'],
//     status: 'active',
//   };
//   try {
//     await mailerlite.subscribers.createOrUpdate(params);

//     console.log('Notifikasi email berhasil dikirim ke', email);
//   } catch (error) {
//     console.error('Gagal mengirim notifikasi email:', error);
//   }
// }
// >>>>>>> 679ce09abbe1205eafc972958b6054ce4ae00481

// // async function perbaruiStatusPembayaran(paymentId: any, status: any) {
// //   try {
// //     await db.payment.update({
// //       where: { id: paymentId },
// //       data: { status: status },
// //     });
// //   } catch (error) {
// //     console.error('Gagal memperbarui status pembayaran di basis data:', error);
// //   }
// // }

// // const MailerLiteComponent = () => {
// //   const datas = useLoaderData<typeof loader>();
// //   console.log('datasdatasdatasdatasdatas', datas);
// //   return (
// //     <>
// //       <Box marginTop={'20px'}>{/* <CardProducts /> */}</Box>
// //     </>
// //   );
// // };

// // export default MailerLiteComponent;
