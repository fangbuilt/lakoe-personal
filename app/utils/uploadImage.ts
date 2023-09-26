import type { UploadApiResponse } from 'cloudinary';
import cloudinary from 'cloudinary';
import { writeAsyncIterableToWritable } from '@remix-run/node';

cloudinary.v2.config({
  cloud_name: 'drowmny4s',
  api_key: '769923789834989',
  api_secret: 'd6JRbpYjWKrbnFJ1gRBUddA7avE',
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
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
        reject(error);
      }
    }
  );

  return uploadPromise;
}

export { uploadImage };
