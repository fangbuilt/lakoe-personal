import React, { useState } from 'react';
import type { ActionArgs } from '@remix-run/node';
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';
import { uploadImage } from '~/utils/uploadImage';
// import { createProduct } from '~/modules/product/product.service';
import axios from 'axios';
import { Form } from '@remix-run/react';
import { Button } from '@chakra-ui/react';

export async function action({ request }: ActionArgs) {
  // const formDataString = await request.formData()
  const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
    if (name !== 'image') {
      return undefined;
    }

    const uploadedImage = await uploadImage(data);

    return uploadedImage.secure_url;
  }, createMemoryUploadHandler());

  const formData = await parseMultipartFormData(request, uploadHandler);

  const imageUrl = formData.get('image') as string;

  console.log('image', imageUrl);

  // if (request.method.toLowerCase() === 'post') {
  //   const data = {

  //     url: imageUrl,

  //   };
  //   await createProduct(data, '1');
  //   // return redirect('/product');
  //   return null;
  // }
  return null;
}

function UploadImageWithDragAndDrop() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [droppedImage, setDroppedImage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    console.log('huh', files);

    if (files) {
      setSelectedImage(URL.createObjectURL(files));

      try {
        const formData = new FormData();
        formData.append('image', files);

        const response = await axios.post(
          'http://localhost:3000/product/add',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const imageUrls = response.data.map((data: any) => data.secure_url);

        setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);

        console.log('inniniinini', uploadedImages);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      setDroppedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <h1>Unggah Gambar dengan Drag-and-Drop dan Pratinjau</h1>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <p>Drag & drop gambar di sini atau klik untuk memilih gambar</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {selectedImage && (
            <div>
              <h2>Gambar yang Anda Pilih:</h2>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
          {droppedImage && (
            <div>
              <h2>Pratinjau Gambar yang Anda Jatuhkan:</h2>
              <img
                src={droppedImage}
                alt="Dropped"
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
        </div>
        <Button type="submit">Unggah</Button>
      </Form>
    </div>
  );
}

export default UploadImageWithDragAndDrop;
