import React from 'react';
import { BASE_API_URL } from 'utilities/const';

const useImageHandler = (image: string) => {
  const [processedImage, setProcessedImage] = React.useState<string>('');

  React.useEffect(() => {
    let _image = '';

    if (image) {
      if (image.startsWith('http') || image.startsWith('https')) {
        _image = image;
      } else {
        _image = `${BASE_API_URL}/assets/${image}`;
      }
    }

    setProcessedImage(_image);
  }, [image, BASE_API_URL]);

  return processedImage;
};

export default useImageHandler;
