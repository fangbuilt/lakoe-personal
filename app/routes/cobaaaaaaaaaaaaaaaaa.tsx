// // Import yang diperlukan
// import { PrismaClient } from '@prisma/client';
// import { type LoaderFunction, json } from '@remix-run/node';
// import { getProductUnpid } from '~/modules/order/order.service';

// // Fungsi untuk mengambil data dari database berdasarkan filter
// export let loader: LoaderFunction = async ({ request }) => {
//   const prisma = new PrismaClient();

//   try {
//     // Mengambil query parameter dari request.url.searchParams
//     const queryParams = new URLSearchParams(request.url.search || '');

//     // Mengambil nilai query parameter "filterKey"
//     const filterKey = queryParams.get('filterKey');

//     if (!filterKey) {
//       return json({ error: 'Parameter filterKey tidak ditemukan.' }, 400);
//     }

//     return json(getProductUnpid());
//   } catch (error) {
//     return json({ error: 'Gagal mengambil data dari database.' }, 500);
//   } finally {
//     await prisma.$disconnect();
//   }
// };
