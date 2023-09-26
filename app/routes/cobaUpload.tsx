// import Dropzone, { FileWithPath } from "react-dropzone";
// import type { AxiosResponse } from "axios";
// import axios from "axios";
// import { useState } from "react";
// import { Box, Button, Center, Image, Text } from "@chakra-ui/react";

// const CLOUDINARY_UPLOAD_PRESET = "eenwxkso";
// const CLOUDINARY_CLOUD_NAME = "djpxhz3vu";

// export function PhotoUpload() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);

//   const handleDrop = async (acceptedFiles: FileWithPath[]) => {
//     const file = acceptedFiles[0];
//     const imageUrl = URL.createObjectURL(file);

//     setSelectedImage(imageUrl);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//     try {
//       setIsUploading(true);
//       const response: AxiosResponse = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round(
//               (progressEvent.loaded / progressEvent.total) * 100
//             );
//             setUploadProgress(progress);
//           },
//         }
//       );

//       // response.data.secure_url contains the URL of the uploaded image on Cloudinary
//       console.log("Image uploaded:", response.data.secure_url);
//       setUploadedImage(response.data.secure_url);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     if (selectedImage) {
//       URL.revokeObjectURL(selectedImage);
//       setSelectedImage(null);
//       setUploadedImage(null);

//       deleteImageFromCloudinary(uploadedImage);
//     }
//   };

//   const deleteImageFromCloudinary = async (imageUrl: string | null) => {
//     if (imageUrl) {
//       try {
//         // Extract public_id from the Cloudinary image URL
//         const publicId = imageUrl;

//         // Send a DELETE request to Cloudinary
//         await axios.delete(
//           `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy/${publicId}`,
//           {
//             headers: {
//               Authorization: "Bearer YOUR_CLOUDINARY_API_KEY",
//               "Access-Control-Allow-Origin": "*",
//             },
//           }
//         );

//         console.log("Image deleted from Cloudinary");
//       } catch (error) {
//         console.error("Error deleting image from Cloudinary:", error);
//       }
//     }
//   };

//   return (
//     <Center>
//       <Box>
//         <Text>Unggah Photo</Text>
//         <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
//           {({ getRootProps, getInputProps }) => (
//             <Box {...getRootProps()} style={dropzoneStyles}>
//               <Box bg={"blue"}>
//                 <input {...getInputProps()} />
//               </Box>
//               <Text>
//                 Drag & drop a photo here, or click to select a photo (supports
//                 both methods)
//               </Text>
//             </Box>
//           )}
//         </Dropzone>
//         <Box bg={"yellow"}>
//           <input type="text" value={uploadedImage || ""} />
//         </Box>
//         {selectedImage && (
//           <Box>
//             <Text>Selected Image:</Text>
//             <Image
//               src={selectedImage}
//               alt="Selected Photo"
//               style={imageStyles}
//               hidden
//             />
//             {uploadedImage ? (
//               <Box>
//                 <Text>Image uploaded successfully:</Text>
//                 <Image
//                   src={uploadedImage}
//                   alt="Uploaded Photo"
//                   style={imageStyles}
//                 />
//                 <Button onClick={handleRemove}>Remove</Button>
//               </Box>
//             ) : isUploading ? (
//               <Box>
//                 <Text>Uploading...</Text>
//                 <Text>Progress: {uploadProgress}%</Text>
//               </Box>
//             ) : null}
//           </Box>
//         )}
//       </Box>
//     </Center>
//   );
// }

// // const dropzoneStyles = {
//   background: "red",
//   border: "2px dashed #cccccc",
//   borderRadius: "4px",
//   textAlign: "center",
//   padding: "20px",
//   cursor: "pointer",
// };

// const imageStyles = {
//   maxWidth: "100%",
//   maxHeight: "300px",
// };

// export default PhotoUpload;
