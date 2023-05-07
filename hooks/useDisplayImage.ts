import React from 'react';

const useDisplayImage = (onChange: (imageURL: string) => void) => {
  const [image, setImage] = React.useState<File>();
  const [imageURL, setImageURL] = React.useState<string>();

  const onUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    const file = fileList[0];
    if (file && file.type.substring(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    } else {
      setImage(undefined);
    }
  };
  return { image, imageURL, onUploader };
};

export default useDisplayImage;
