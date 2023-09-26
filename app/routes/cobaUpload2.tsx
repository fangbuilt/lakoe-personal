// const generateSHA1 = (data: any) => {
//   const hash = crypto.createHash("sha1");
//   hash.update(data);
//   return hash.digest("hex");
// }

// const generateSignature = (publicId: string, apiSecret: string) => {
//   const timestamp = new Date().getTime();
//   return public_id=${publicId}&timestamp=${timestamp}${apiSecret};
// };

// const deleteImageFromCloudinary = async (imageUrl: string | null) => {
//   try {
//     // Extract public_id from the Cloudinary image URL
//     const publicId = imageUrl?.split('/').pop()?.replace(/\.[^/.]+$/, '') as string;
//     console.log("publicoy", publicId);

//     const timestamp = new Date().getTime();
//     const apiKey = '524875873527981';
//     const apiSecret = 'vdySQK--pQjVIz6l6vUcENdHowQ'
//     const signature = generateSHA1(generateSignature(publicId, apiSecret));

//     // Send a DELETE request to Cloudinary
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
//       {
//         public_id: publicId,
//         signature: signature,
//         api_key: apiKey,
//         timestamp: timestamp,
//       }
//     );

//     console.log("ini ini", response);

//     console.log('Image deleted from Cloudinary');
//   } catch (error) {
//     console.error('Error deleting image from Cloudinary:', error);
//   }
// };
