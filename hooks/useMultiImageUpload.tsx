import React from 'react';

const useMultiImageUpload = (onChange: (imageURLs: string[]) => void) => {
  const [images, setImages] = React.useState<File[]>([]);
  const [imageURLs, setImageURLs] = React.useState<string[]>([]);

  const onUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const selectedFiles = Array.from(fileList);
    const validImages = selectedFiles.filter((file) => file.type.substring(0, 5) === 'image');

    const readerPromises = validImages.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((results) => {
      setImages(validImages);
      setImageURLs(results);
      onChange(results);
    });
  };

  return { images, imageURLs, onUploader };
};

export default useMultiImageUpload;
