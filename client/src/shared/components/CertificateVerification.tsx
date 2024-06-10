import React, { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';

const CertificateVerification = ({
  title,
  data,
  chosenImage,
  chosenFile,
  onImageChange,
  onFileChange,
}) => {
  const [imageFile, setImageFile] = useState(chosenFile);
  const [fileName, setFileName] = useState('');
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
      setFileName(e.target.files[0].name);
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
      <div className="relative w-full inner border border-dashed border-[#a8afb6] h-[100px] rounded-[8px] flex justify-center">
        {/* {image && (
          <img
            src={image}
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        )}
        {chosenImage && (
          <img
            src={chosenImage}
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        )} */}
        <input
          type="file"
          name="file"
          ref={imageUploadRef}
          onChange={imagePreview}
          style={{ display: 'none' }}
          accept="image/png, image/gif, image/jpeg"
        />
        <div
          className={` w-full bottom-0 py-1 flex justify-center items-center ${(image || chosenImage) && 'bg-white opacity-90'}`}
        >
          <div className="text-center">
            <div className="text-[#5e6368] mb-1 font-semibold line-clamp-1">
              {fileName ? `File: ${fileName}` : 'Chọn hoặc kéo file vào đây'}
            </div>
            <div className="text-black text-xs">
              Dung lượng tối đa 5MB, định dạng: jpeg, png, pdf
            </div>
            <div className="inline-block mt-2 ">
              <div className="bg-[#f5f8fa] flex gap-1 items-center justify-center py-1 px-2 rounded-lg">
                <Upload style={{ color: '00B14F', width: 16, height: 16 }} />
                <a
                  className="italic cursor-pointer text-[#00B14F]"
                  onClick={handleImageUpload}
                >
                  Chọn file
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full outer text-center my-[10px] text-xl font-light">
        {title ? title : ''}
      </div>
    </div>
  );
};

export default CertificateVerification;
