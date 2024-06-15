import { SetStateAction, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateVerification from './CertificateVerification';
import { Dot, HardDriveDownload } from 'lucide-react';
import axios from 'axios';
import { successToast, errorToast } from '../../utils/toast';
import { useProfileContext } from '../services/authen/domain/context';
import { useAuth0 } from '@auth0/auth0-react';
import { getHRById, updateEmployerLicense } from '../../modules/hr-module';
function Certificate() {
  const navigation = useNavigate();
  const [user, setUser] = useState();
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [firstFile, setFirstFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const { token } = useProfileContext();
  const { user: hrId } = useAuth0();

  const handleUploadLicense = async () => {
    // if (!firstImage && !firstFile ) {

    if (!firstFile && !secondFile) {
      return errorToast('Vui lòng chọn file giấy ủy quyền');
    }
    setOnLoading(true);

    const formData = new FormData();
    if (firstFile) {
      console.log('have 1');
      formData.append('files', firstFile);
    }
    if (secondFile) {
      console.log('have 2');
      formData.append('files', secondFile);
    }
    console.log(token);
    await updateEmployerLicense(formData, token)
      .then((res) => {
        successToast(
          'Cập nhật thành công! Xin vui lòng chờ 2 giây để hệ thống cập nhật lại',
        );
        setOnLoading(false);
        setRefresh(!refresh);
      })
      .catch((res) => {
        setOnLoading(false);
        errorToast('Cập nhật thất bại, xin vui lòng thử lại sau');
      });
  };
  const fetchData = async () => {
    try {
      const response = await getHRById(hrId?.sub);
      const userInfo = response.data;
      setUser(userInfo);
      console.log(userInfo);
      // if (userInfo) {
      //   if (userInfo.license) {
      //     setFirstImage(userInfo.license);
      //   }
      //   if (userInfo.license) {
      //     setSecondImage(userInfo.license);
      //   }
      // }
    } catch (error) {
      return errorToast('Không tìm thấy thông tin người dùng hiện tại');
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] border-slate-200 border-2 px-8 py-4 space-y-4 my-9">
        <h1 className="text-black text-sl font-bold mb-5">
          Thông tin giấy phép kinh doanh
        </h1>
        <h1 className="text-black text-[13px] mb-2">
          Trạng thái:{' '}
          <span className="text-green-700 font-bold">
            {user?.license ? 'Đã cập nhật giấy tờ' : 'Chưa cập nhật giấy tờ'}
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
        {user?.license && (
          <div className="text-black ">
            Giấy ủy quyền đã đăng ký:{' '}
            <span
              className="cursor-pointer text-green-700"
              onClick={() => {
                window.open(`${user.license}`);
              }}
            >
              Xem tại đây
            </span>
          </div>
        )}
        {user?.supplement && user?.supplement != 'null' && (
          <div className="text-black">
            Giấy tờ định danh đã đăng ký:{' '}
            <span
              className="cursor-pointer text-green-700"
              onClick={() => {
                window.open(`${user.supplement}`);
              }}
            >
              Xem tại đây
            </span>
          </div>
        )}

        <div className="w-full mt-4 flex flex-row items-center">
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
            className={`text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md ${firstFile || secondFile ? 'opacity-100 cursor-pointer ' : 'opacity-65 cursor-default pointer-events-none'}`}
          >
            {onLoading ? 'On processing...' : 'Lưu'}
          </button>
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
    </div>
  );
}
export default Certificate;
