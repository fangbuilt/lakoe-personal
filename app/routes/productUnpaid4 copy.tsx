// import { Box } from '@chakra-ui/react';
// import MailerLite from '@mailerlite/mailerlite-nodejs';
// import { GetUnpidData } from '~/modules/unpid/unpid.service';

// // Inisialisasi koneksi ke MailerLite
// const mailerlite = new MailerLite({
//   api_key: 'YOUR_API_KEY_HERE', // Ganti dengan API key MailerLite Anda
// });

// // Fungsi untuk mengirim email dengan data dinamis
// export async function sendDynamicEmail(telp, name, email) {
//   try {
//     // Mengambil data dari database (misalnya menggunakan GetUnpidData)
//     const databaseData = await GetUnpidData();

//     // Menyusun konten email berdasarkan data dari database
//     const emailContent = `
//       Halo ${name},

//       Terima kasih atas pembelian Anda. Berikut adalah rincian pesanan Anda:

//       Daftar Barang:
//       ${databaseData.daftarBarang}

//       Total Pembayaran: ${databaseData.totalPembayaran}

//       Alamat Pengiriman:
//       ${databaseData.alamatPengiriman}

//       Terima kasih telah berbelanja di toko kami.
//     `;

//     // Generate email unik dengan timestamp
//     const date = new Date().getTime();
//     const atIndex = email.indexOf('@');
//     const usernameEmail = email.slice(0, atIndex);
//     const domainEmail = email.slice(atIndex + 1);
//     const newEmail = `${usernameEmail}+${date}@${domainEmail}`;

//     // Parameter untuk mengirim email
//     const emailParams = {
//       subject: 'Rincian Pesanan Anda',
//       email: newEmail,
//       content: emailContent,
//     };

//     // Mengirim email dengan MailerLite
//     const emailResponse = await mailerlite.emails.send(emailParams);
//     console.log('Email berhasil dikirim:', emailResponse.data);

//     // Jika perlu, Anda juga dapat menambahkan logika lain di sini, seperti pembaruan status pembelian di database, dll.

//     return emailResponse.data;
//   } catch (error) {
//     console.error('Gagal mengirim email:', error);
//     throw error;
//   }
// }

// const MailerLiteComponent = () => {
//   // Contoh penggunaan fungsi sendDynamicEmail
//   const handlePurchase = async () => {
//     try {
//       const telp = '1234567890'; // Ganti dengan nomor telepon pengguna
//       const name = 'John Doe'; // Ganti dengan nama pengguna
//       const email = 'user@example.com'; // Ganti dengan alamat email pengguna

//       await sendDynamicEmail(telp, name, email);
//       // Tambahkan logika lain setelah email berhasil dikirim, jika diperlukan
//     } catch (error) {
//       // Handle kesalahan jika diperlukan
//       console.error('Terjadi kesalahan:', error);
//     }
//   };

//   return (
//     <>
//       <Box marginTop={'20px'}>
//         <button onClick={handlePurchase}>Beli Produk</button>
//       </Box>
//     </>
//   );
// };

// export default MailerLiteComponent;
