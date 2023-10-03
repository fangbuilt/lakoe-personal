// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { cloudinaryConfig } from '~/modules/configuration/configuration.cloudinary';
// import { uploadImage } from '~/utils/uploadImage';

// const ImageUploadWithDropzone = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);

//   const onDrop = useCallback(async (acceptedFiles: any) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       setSelectedImage(URL.createObjectURL(file));
//       cloudinaryConfig();

//       try {
//         // Mengunggah gambar ke Cloudinary
//         const cloudinaryResponse = await uploadImage(file);

//         // Mengatur URL gambar hasil unggah sebagai pratinjau
//         setSelectedImage(URL.createObjectURL(file)); // Pratinjau dari file lokal
//         setCloudinaryUrl(cloudinaryResponse.secure_url); // URL dari Cloudinary

//         console.log("ini cloudinary", cloudinaryUrl);

//       } catch (error) {
//         console.error('Gagal mengunggah gambar ke Cloudinary:', error);
//       }
//     } else {
//       setSelectedImage(null);
//       setCloudinaryUrl(null);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,

//   });

//   return (
//     <div>
//       <h1>Form Unggah dan Pratinjau Gambar</h1>
//       <div {...getRootProps()} className="dropzone">
//         <h1>Hanya mencoba</h1>
//         <div style={{ backgroundColor: 'tomato' }}>
//           <h1>heheheh</h1>
//           <input {...getInputProps()} accept='image/*' />
//         </div>
//         {selectedImage ? (
//           <img src={selectedImage} alt="Pratinjau" className="preview-image" />
//         ) : (
//           <p>Klik atau seret file gambar ke sini.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUploadWithDropzone;
