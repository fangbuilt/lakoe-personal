// // ImageUploadToCloudinary.js

// import { cloudinaryConfig } from "~/modules/configuration/configuration.cloudinary";
// import { v2 as cloudinary } from 'cloudinary';

// const uploadToCloudinary = async (file: any) => {
//   try {
//     // Unggah file ke Cloudinary
//     cloudinaryConfig();
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: 'remixImages', // Ganti dengan folder yang sesuai
//     });

//     return result; // Hasil unggah gambar
//   } catch (error) {
//     console.error('Gagal mengunggah gambar ke Cloudinary:', error);
//     throw error;
//   }
// };

// export default uploadToCloudinary;
