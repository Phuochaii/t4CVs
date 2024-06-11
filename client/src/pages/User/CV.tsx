import { useState } from 'react';
import { Switch, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Check, CircleAlert } from 'lucide-react';

import ManganeBanner from '../../shared/assets/images/manage-cv-banner.webp';
import NoCVImage from '../../shared/assets/images/no-cv.webp';
import NoCVUploadImage from '../../shared/assets/images/no-cv-upload.webp';
import NoProfileImage from '../../shared/assets/images/no-profile.webp';
import Avatar from '../../shared/assets/images/vietnam-flag-icon.png';
import TopCVBanner from '../../shared/assets/images/Topcv-banner.jpg';
function CV() {
  const [isOn, setIsOn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
  };
  return (
    <div
      className="justify-center flex flex-row"
      style={{ backgroundColor: '#f1f2f6' }}
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
        <div className="bg-white rounded-lg p-5 md:p-6 mb-5">
          <div className="container mx-auto">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 overflow-hidden">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4">
                <p>Chào bạn trở lại,</p>
                <p className="font-medium">Trần Nguyên</p>
                <div className=" bg-gray-200 rounded inline-block">
                  <p>Tài khoản đã xác thực</p>
                </div>
                <p>Nâng cấp tài khoản</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-2 border-gray mt-4">
            <div className="flex items-center">
              <Switch
                checked={isOn}
                onChange={toggleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-thumb': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                }}
              />
              <span
                className={`ml-2 ${isOn ? 'text-green-500' : 'text-gray-400'} font-bold`}
              >
                {isOn ? 'Đang Bật Tìm Việc' : 'Đang Tắt Tìm Việc'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-5 mb-5">
              Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều
              hơn trong danh sách tìm kiếm của NTD.
            </p>
            <div className="flex items-center">
              <Switch
                checked={isOn}
                onChange={toggleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-thumb': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                }}
              />
              <span
                className={`ml-2 ${isOn ? 'text-green-500' : 'text-gray-400'} font-bold`}
              >
                {isOn
                  ? 'Đang cho phép NTD tìm kiếm hồ sơ'
                  : 'Chưa cho phép NTD tìm kiếm hồ sơ'}
              </span>
            </div>
            <p className="text-sm">
              Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn
              qua:
            </p>
            <div className="flex flex-row items-center space-x-2 mb-2 mt-2">
              <div className="p-1 bg-green-100 rounded-full w-fit h-fit">
                <Check
                  style={{ color: 'green', width: 15, height: 15 }}
                ></Check>
              </div>
              <p className="text-sm">Nhắn tin qua Top Connect trên t4CVs</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="p-1 bg-green-100 rounded-full w-fit h-fit">
                <Check
                  style={{ color: 'green', width: 15, height: 15 }}
                ></Check>
              </div>
              <p className="text-sm">Email và Số điện thoại của bạn</p>
            </div>
            <img
              src={TopCVBanner}
              alt="avatar"
              className="w-full h-full object-cover mt-2 mb-4"
            />
          </div>
          <div className="flex flex-col border-t-2 border-gray mt-4">
            <div className="flex flex-row items-start">
              <CircleAlert
                style={{
                  transform: 'rotate(180deg)',
                  width: 15,
                  height: 15,
                  marginTop: 1,
                  marginRight: 3,
                }}
              ></CircleAlert>
              <p className="text-[11px]">
                Khởi tạo t4CVs Profile để gia tăng 300% cơ hội việc làm tốt
              </p>
            </div>
            <button className="mt-4 px-4 py-2 text-xs font-bold w-40 h-8 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition duration-300">
              Tạo t4CVs Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 md:p-6 mb-5">
          <div>
            <div className="flex flex-row items-center space-x-10">
              <h1 className="font-bold">Ẩn hồ sơ với NTD</h1>
              <div className="px-1 rounded-sm bg-orange-400 text-white">
                Mới
              </div>
            </div>

            <p>
              Tôi không muốn CV của tôi hiển thị với danh sách các NTD có tên
              miền email và thuộc các công ty dưới đây:
            </p>
          </div>
          <div className="mt-5">
            <h1 className="font-bold">Các NTD với email có tên miền</h1>
            <div className="flex flex-row items-start w-full p-1 bg-gray-200 space-x-1">
              <CircleAlert
                style={{
                  transform: 'rotate(180deg)',
                  width: 15,
                  height: 15,
                  marginBottom: 2,
                }}
              ></CircleAlert>
              <p className="text-[10px]">
                Ví dụ: Để ẩn hồ sơ của bạn với NTD có email{' '}
                <span className="text-[10px] underline underline-offset-1">
                  admin@tenmiencongty.com
                </span>
                , vui lòng nhập{' '}
                <p className="text-[10px] underline underline-offset-1">
                  tenmiencongty.com
                </p>
                .
              </p>
            </div>
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
            <div className="container mx-auto mt-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <img
                    src={Avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 w-2/3">
                  <p>
                    Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn
                    gần hơn với công việc phù hợp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
