import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, Check, Info, Search } from 'lucide-react';

import ManganeBanner from '../../shared/assets/images/manage-cv-banner.webp';
import NoCVImage from '../../shared/assets/images/no-cv.webp';
import NoCVUploadImage from '../../shared/assets/images/no-cv-upload.webp';
import NoProfileImage from '../../shared/assets/images/no-profile.webp';

import * as UserModule from '../../modules/user-module';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfileContext } from '../../shared/services/authen/domain/context';

interface UserInfoType {
  fullname: string;
  phone: string;
  avatar: string;
  email: string;
}

const CV = () => {
  const { user } = useAuth0();

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const [jobSeekingActive, setJobSeekingActive] = useState(false);
  const [availble, setAvailable] = useState(false);
  const { token } = useProfileContext();
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const fetchUserInfo = async () => {
    UserModule.getUserById({ userId: user?.sub, token: token })
      .then((res) => {
        const response = res.data;
        console.log(response);
        const currentInfo = {
          fullname: response.fullname,
          phone: response.phone,
          avatar:
            response.image ||
            'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg',
          email: '*****@gmail.com',
        };
        setUserInfo(currentInfo);
      })
      .catch();
  };

  useEffect(() => {
    if (user) fetchUserInfo();
  }, []);

  return (
    <div
      className="justify-center flex flex-row"
      style={{ backgroundColor: "#f1f2f6" }}
    >
      <div className="w-1/2 flex flex-col m-8">
        <div className="w-full mb-2">
          <img
            className="w-full self-start b rounded-lg"
            src={ManganeBanner}
            loading="eager"
            alt="banner"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md mb-2 mt-4 p-6 flex flex-row justify-between h-64 border border-gray-100">
          <div>
            <h1 className="text-black text-19 font-bold leading-24 m-0">
              CV đã tạo trên t4CVs
            </h1>
          </div>
          <div className="justify-end items-center flex flex-col">
            <img className="mb-4" src={NoCVImage} loading="eager" alt="NoCV" />
            <p> Bạn chưa tạo CV nào</p>
          </div>
          <div>
            <button
              className="bg-green-600 rounded-full text-white leading-none px-4 py-3 hover:bg-green-700"
              onClick={() => navigate('/list-cv')}
            >
              <span className="font-bold"> + Tạo mới</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-2 mt-4 p-6 flex flex-row justify-between h-64 border border-gray-100">
          <div>
            <h1 className="text-black text-19 font-bold leading-24 m-0">
              CV đã tải lên t4CVs
            </h1>
          </div>
          <div className="justify-end items-center flex flex-col">
            <img
              className="mb-4"
              src={NoCVUploadImage}
              loading="eager"
              alt="NoCV"
            />
            <p> Bạn chưa tải lên CV nào</p>
          </div>
          <div>
            <button className="bg-green-600 rounded-full text-white leading-none px-4 py-3 hover:bg-green-700">
              <span className="font-bold"> + Tải CV lên</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-2 mt-4 p-6 flex flex-row justify-between h-64 border border-gray-100">
          <div>
            <h1 className="text-black text-19 font-bold leading-24 m-0">
              t4CVs Profile
            </h1>
          </div>
          <div className="justify-end items-center flex flex-col">
            <img
              className="mb-4"
              src={NoProfileImage}
              loading="eager"
              alt="NoCV"
            />
            <p> Bạn chưa tạo t4CVs Profile</p>
          </div>
          <div>
            <button className="bg-green-600 rounded-full text-white leading-none px-4 py-3 hover:bg-green-700">
              <span className="font-bold"> + Tạo mới</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-3/12 m-8 flex flex-col">
        {userInfo && (
          <div className="flex flex-col p-2 divide-y gap-6 bg-white rounded-lg max-w-[400px]">
            <div className="flex gap-6">
              <div className="relative">
                <span className="absolute right-0 py-[2px] px-[4px] text-[8px] text-white uppercase bg-slate-500">
                  Verified
                </span>
                <div className="cursor-pointer">
                  <img
                    src={
                      userInfo.avatar ||
                      'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg'
                    }
                    alt="User Image"
                    className="object-cover w-20 h-20 rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm">Chào bạn trở lại,</div>
                  <h1 className="font-bold text-md">{userInfo.fullname}</h1>
                  <div className="flex items-center p-1 text-xs text-white bg-gray-500">
                    Tài khoản đã xác thực
                  </div>
                </div>
                <button className="flex items-center gap-2 px-2 py-1 text-sm font-bold rounded-full bg-slate-200">
                  <ArrowUpCircle size={16} />
                  Nâng cấp tài khoản
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={jobSeekingActive}
                  onChange={() => setJobSeekingActive(!jobSeekingActive)}
                />{' '}
                <span
                  className={clsx(
                    'font-bold',
                    jobSeekingActive ? 'text-green-500' : 'text-slate-500',
                  )}
                >
                  Đang Tắt tìm việc
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều
                hơn trong danh sách tìm kiếm của NTD
              </p>
              <div className="flex items-center gap-2">
                <Switch
                  checked={availble}
                  onChange={() => setAvailable(!availble)}
                />{' '}
                <span
                  className={clsx(
                    'font-bold',
                    availble ? 'text-green-500' : 'text-slate-500',
                  )}
                >
                  Cho phép NTD tìm kiếm hồ sơ
                </span>
              </div>
              <p>
                Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với
                bạn qua:
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <div className="p-1 bg-green-200 rounded-full">
                    <Check className="text-green-500" size={16} />
                  </div>
                  Nhắn tin qua Top Connect trên t4CVs
                </li>
                <li className="flex items-center gap-2">
                  <div className="p-1 bg-green-200 rounded-full">
                    <Check className="text-green-500" size={16} />
                  </div>
                  Email và Số điện thoại của bạn
                </li>
              </ul>
              <img src="/images/banner-app.png" />
            </div>
            <div className="flex flex-col items-start gap-4 py-2">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-gray-400" />
                Khởi tạo t4CVs Profile để gia tăng 300% cơ hội việc làm tốt
              </div>
              <button className="px-4 py-2 font-bold text-green-500 border border-green-600 rounded">
                Tạo t4CVs Profile
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-5 md:p-6 mb-5">
          <div>
            <h1 className="font-bold">Ẩn hồ sơ với NTD</h1>
            <p>
              Tôi không muốn CV của tôi hiển thị với danh sách các NTD có tên
              miền email và thuộc các công ty dưới đây:
            </p>
          </div>
          <div>
            <h1>Các NTD với email có tên miền</h1>
          </div>
          <div className="flex flex-row mt-4">
            <div className="w-2/3 mr-4">
              <label className="relative items-center">
                <span className="text-gray-500 mr-2 absolute left-3 top-1/2 transform -translate-y-1/2">
                  @
                </span>
                <span className="sr-only">Nhập tên miền email</span>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 hover:border-green-500 focus:border-green-500 outline-none w-full"
                  placeholder="Nhập tên miền email"
                />
              </label>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Thêm
            </button>
          </div>
          <div className="flex flex-col border-t-2 border-gray mt-4">
            <div className="mt-4">
              <h1 className="font-bold">Các NTD thuộc công ty</h1>
            </div>
            <div className="mt-4 relative">
              <Search
                className={`
                  w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500
                  `}
              />
              <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-lg py-2 pl-12 pr-4 hover:border-green-500 focus:border-green-500 outline-none w-full"
                placeholder="Nhập tên công ty"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 md:p-6 mb-5">
          <div>
            <h1 className="font-bold text-green-500">CV của bạn đã đủ tốt?</h1>
            <p>Bao nhiêu NTD đang quan tâm tới Hồ sơ của bạn?</p>
          </div>
          <div className="rounded-lg p-5 md:p-6 shadow-md">
            <div className="flex items-center">
              <p>
                Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần
                hơn với công việc phù hợp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
