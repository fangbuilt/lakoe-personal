import cloudinary from 'cloudinary';

export const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: 'dhgrecamo',
    api_key: '771447337456437',
    api_secret: 'H6p7sT3G_iykv7bchna8c6HTyB4',
  });
};
