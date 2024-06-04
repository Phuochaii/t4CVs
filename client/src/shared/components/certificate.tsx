import { SetStateAction, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateVerification from './CertificateVerification';
import { Dot, HardDriveDownload } from 'lucide-react';
import axios from 'axios';
import { successToast, errorToast } from '../../utils/toast';
function Certificate() {
  const navigation = useNavigate();
  const [user, setUser] = useState();
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
        successToast('Cập nhật thành công! Trở lại màn hình chính sau 2 giấy');
        setTimeout(() => {
          navigation('/');
        }, 2000);
      })
      .catch((res) => {
        errorToast('Cập nhật thất bại, xin vui lòng thử lại sau');
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/employer/1');
        const userInfo = await response.json();
        setUser(userInfo);
        console.log(userInfo);
        if (userInfo) {
          if (userInfo.license) {
            setFirstImage(userInfo.license);
          }
          if (userInfo.license) {
            setSecondImage(userInfo.license);
          }
        }
      } catch (error) {
        return errorToast('Không tìm thấy thông tin người dùng hiện tại');
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full m-10 flex flex-col">
      <h1 className="text-black text-sl mb-5">
        Thông tin giấy phép kinh doanh
      </h1>
      <div className="w-[90%] border-slate-200 border-2 px-8 py-4 space-y-4">
        <h1 className="text-black text-[13px] mb-2">
          Trạng thái:{' '}
          <span className="text-green-700 font-bold">
            {user ? 'Đã cập nhật giấy tờ' : 'Chưa cập nhật giấy tờ'}
          </span>
        </h1>
        <div className="rounded-lg inline-block text-[#00b14f] py-2 px-3 border border-[#00b14f] cursor-pointer">
          <div
            className="flex items-center gap-1"
            onClick={() => {
              window.open(
                'https://docs.google.com/document/d/1PkPCJWYlA2oF-jb9cAaOea9agFM35Z_P/edit',
              );
            }}
          >
            <HardDriveDownload style={{ width: 16, height: 16 }} />
            Tải mẫu giấy ủy quyền
          </div>
        </div>
        <div className="w-full flex flex-row items-center">
          <div className="w-[50%]">
            <span className="text-black text-[13px]">Giấy ủy quyền *</span>
          </div>
          <div className="w-[50%]">
            <span className="text-black text-[13px]">
              Giấy tờ định danh (CCCD/ Hộ chiếu) *
            </span>
          </div>
        </div>

        <div className="flex ">
          <CertificateVerification
            chosenImage={firstImage}
            onImageChange={(image: SetStateAction<null>) => {
              setFirstImage(image);
            }}
            onFileChange={(file) => {
              setFirstFile(file);
            }}
          />
          <CertificateVerification
            chosenImage={secondImage}
            onImageChange={(image: SetStateAction<null>) => {
              setSecondImage(image);
            }}
            onFileChange={(file) => {
              setSecondFile(file);
            }}
          />
        </div>
        <div className="w-full justify-end flex flex-row space-x-8">
          <button
            onClick={() => {
              handleUploadLicense();
            }}
            className={`text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md ${firstFile && secondFile ? 'opacity-100 cursor-pointer ' : 'opacity-65 cursor-default'}`}
          >
            Lưu
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
