import type { UploadApiResponse } from 'cloudinary';
import cloudinary from 'cloudinary';
import { writeAsyncIterableToWritable } from '@remix-run/node';
import { cloudinaryConfig } from '../../modules/order/order.cloudinary';

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  cloudinaryConfig();
  const uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      try {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'remixImages' },

          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result as UploadApiResponse);
          }
        );
        await writeAsyncIterableToWritable(data, uploadStream);
      } catch (error) {
        console.log('error data uploads', error);
      }
    }
  );

  return uploadPromise;
}

export { uploadImage };
