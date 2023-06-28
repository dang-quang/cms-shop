import { BASE_API_URL } from 'utilities/const';

const imageHandler = (image) => {
  let processedImage = '';

  if (image) {
    if (image.startsWith('http') || image.startsWith('https')) {
      processedImage = image;
    } else {
      processedImage = `${BASE_API_URL}/assets/${image}`;
    }
  }

  return processedImage;
};

export default imageHandler;
