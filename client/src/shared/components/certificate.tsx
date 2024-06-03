import { SetStateAction, useState } from 'react';
import ImageVerification from './ImageVerification';
import { Dot } from 'lucide-react';
import axios from 'axios';
function Certificate() {
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [firstFile, setFirstFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const handleUploadLicense = async () => {
    if (!firstImage && !secondImage && !firstFile && !secondFile) {
      return;
    }
    const data = {
      files: [firstFile, secondFile],
      employerId: 1,
    };
    const formData = new FormData();
    formData.append('files', firstFile);
    formData.append('files', secondFile);
    formData.append('employerId', '1');
    console.log(formData);
    // await HRModule.updateEmployerLicense(formData).then((res) => {
    //   console.log(res);
    // });
    await axios
      .put('http://localhost:3000/employer/update/license', formData)
      .then((res) => {
        console.log(res);
      });
    // await axios
    //   .post('http://localhost:3000/upload/uploadfiles', formData)
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  return (
    <div className="w-full m-10 flex flex-col">
      <h1 className="text-black text-sl mb-5">
        Thông tin giấy phép kinh doanh
      </h1>
      <div className="w-[90%] border-slate-200 border-2 px-8 py-4 space-y-4">
        <h1 className="text-black text-[13px] mb-5">
          Trạng thái: <span className="text-slate-400">chưa cập nhật</span>
        </h1>
        <div className="w-full flex flex-row items-center">
          <div className="w-[50%]">
            <span className="text-black text-[13px]">
              Giấy phép kinh doanh / Giấy ủy quyền / Thẻ nhân viên
            </span>
          </div>
          <div className="w-[50%]">
            <span className="text-black text-[13px]">Giấy tờ bổ sung</span>
          </div>
        </div>
        <div className="w-full flex flex-row items-center">
          <div className="w-[50%]">
            <span className="text-black text-[13px]">
              Dung lượng file không vượt quá 5 MB
            </span>
          </div>
          <div className="w-[50%]">
            <span className="text-black text-[13px]">
              Dung lượng file không vượt quá 5 MB
            </span>
          </div>
        </div>
        <div className="flex ">
          <ImageVerification
            title={'Mặt trước'}
            chosenImage={firstImage}
            onImageChange={(image: SetStateAction<null>) => {
              setFirstImage(image);
            }}
            onFileChange={(file) => {
              setFirstFile(file);
            }}
          />
          <ImageVerification
            title={'Mặt sau'}
            chosenImage={secondImage}
            onImageChange={(image: SetStateAction<null>) => {
              setSecondImage(image);
            }}
            onFileChange={(file) => {
              setSecondFile(file);
            }}
          />
        </div>
        <div className="w-10/12 justify-start flex flex-row space-x-8">
          <button className="border-green-600 border-1 text-base btn-success py-3 px-7 rounded text-green-600 bg-white border cursor-pointer">
            Hủy
          </button>
          <button
            onClick={() => {
              handleUploadLicense();
            }}
            className="text-base btn-success py-3 px-7 rounded text-white bg-green-500 shadow-md cursor-pointer"
          >
            Cập nhật
          </button>
        </div>
      </div>
      <div className="mt-5">
        <h1>Tài liệu hướng dẫn</h1>
        <div className="flex flex-row items-center">
          <Dot width={30} height={30}></Dot>
          <div>Mẫu giấy ủy quyền</div>
        </div>
        <div className="flex flex-row items-center">
          <Dot width={30} height={30}></Dot>
          <div>Hướng dẫn đăng tải</div>
        </div>
      </div>
    </div>
  );
}
export default Certificate;
