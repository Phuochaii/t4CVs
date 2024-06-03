import React, { useState, useRef, useCallback } from 'react';

const ImageVerification = ({
  title,
  chosenImage,
  chosenFile,
  onImageChange,
  onFileChange,
}) => {
  const [imageFile, setImageFile] = useState(chosenFile);
  const [image, setImage] = useState(chosenImage);
  const imageUploadRef = useRef(null);
  const handleImageUpload = useCallback(() => {
    imageUploadRef?.current?.click();
  }, []);
  const imagePreview = (e) => {
    const selectedImage = e.target.files[0];
    setImageFile(selectedImage);
    console.log(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
        onImageChange(event.target.result);
        onFileChange(selectedImage);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  return (
    <div className="item mr-8 w-[50%]">
      <div className="relative w-full inner border border-dashed border-[#a8afb6] h-[206px] rounded-[8px] flex justify-center">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        )}
        <input
          type="file"
          name="file"
          ref={imageUploadRef}
          onChange={imagePreview}
          style={{ display: 'none' }}
          accept="image/png, image/gif, image/jpeg"
        />
        <div
          className={`absolute w-full bottom-0 py-2 flex justify-center items-center ${image && 'bg-white opacity-90'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
              width: '28px',
              height: '28px',
              marginRight: '12px',
              fill: '#00B14F',
            }}
          >
            <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
          </svg>
          <div>
            <div>Kéo thả ảnh vào hoặc</div>
            <a
              className="underline italic cursor-pointer text-[#00B14F]"
              onClick={handleImageUpload}
            >
              Chọn từ máy tính
            </a>
          </div>
        </div>
      </div>
      <div className="w-full outer text-center my-[10px] text-xl font-light">
        {title ? title : ''}
      </div>
    </div>
  );
};

export default ImageVerification;
