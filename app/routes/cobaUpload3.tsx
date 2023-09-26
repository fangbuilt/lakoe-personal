// import {
//   Box,
//   Button,
//   Card,
//   CardBody,
//   Flex,
//   FormControl,
//   FormHelperText,
//   FormLabel,
//   Heading,
//   Image,
//   Stack,
//   Text,
//   Textarea,
// } from '@chakra-ui/react';
// import Dropzone, { FileWithPath } from 'react-dropzone';
// import CloseCircle from '~/assets/icon-pack/button-icons/close-circle.svg';
// import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
// import { useState } from 'react';
// import axios, { AxiosResponse } from 'axios';
// import crypto from "crypto";

// const CLOUDINARY_UPLOAD_PRESET = 'idmfzrrw';
// const CLOUDINARY_CLOUD_NAME = 'djhgxoqqh';

// export function ProductDetail() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   // const [isUploading, setIsUploading] = useState(false);
//   const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
//   const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
//   const [uploadProgress2, setUploadProgress2] = useState<number>(0);
//   const [photos, setPhotos] = useState([
//     { label: 'Foto Utama', name: 'mainPhoto', image: null },
//     // { label: 'Foto 2', name: 'photo2', image: null },
//     // { label: 'Foto 3', name: 'photo3', image: null },
//     // { label: 'Foto 4', name: 'photo4', image: null },
//     // { label: 'Foto 5', name: 'photo5', image: null },
//   ]);

//   const handleImagePreview = (name: string, image: any) => {
//     const updatedPhotos = photos.map((photo) => {
//       if (photo.name === name) {
//         return { ...photo, image };
//       }
//       return photo;
//     });
//     setPhotos(updatedPhotos);
//   };

//   const handleDrop = async (acceptedFiles: FileWithPath[]) => {
//     const file = acceptedFiles[0];
//     const imageUrl = URL.createObjectURL(file);

//     setSelectedImage(imageUrl);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     try {
//       // setIsUploading(true);
//       const response: AxiosResponse = await axios.post(
//         https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             setUploadProgress(progressEvent.loaded / (progressEvent.total ?? 1) * 100);

//           },
//         }
//       );

//       // response.data.secure_url contains the URL of the uploaded image on Cloudinary
//       console.log('Image uploaded:', response.data.secure_url);
//       setUploadedImage(response.data.secure_url);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//     //  finally {
//     //   setIsUploading(false);
//     // }
//   };
//   const handleDrop2 = async (acceptedFiles: FileWithPath[]) => {
//     const file = acceptedFiles[0];
//     const imageUrl = URL.createObjectURL(file);

//     setSelectedImage2(imageUrl);

//     const formData = new FormData();
//     formData.append('file2', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     try {
//       // setIsUploading(true);
//       const response: AxiosResponse = await axios.post(
//         https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             setUploadProgress2(progressEvent.loaded / (progressEvent.total ?? 1) * 100);

//           },
//         }
//       );

//       // response.data.secure_url contains the URL of the uploaded image on Cloudinary
//       console.log('Image uploaded:', response.data.secure_url);
//       setUploadedImage2(response.data.secure_url);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//     //  finally {
//     //   setIsUploading(false);
//     // }
//   };

//   const
