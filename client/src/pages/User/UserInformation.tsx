import clsx from 'clsx';
import { ArrowUpCircle, Camera, Check, Info } from 'lucide-react';
import { useState } from 'react';
import Switch from '../../shared/components/CustomSwitch';

const fields: {
  label: string;
  required: boolean;
  placeholder: string;
  disabled: boolean;
  accessor: 'fullname' | 'phone' | 'email';
}[] = [
  {
    label: 'Họ và tên',
    required: true,
    placeholder: 'Nhập họ và tên',
    accessor: 'fullname',
    disabled: false,
  },
  {
    label: 'Số điện thoại',
    required: false,
    placeholder: 'Nhập số điện thoại',
    accessor: 'phone',
    disabled: false,
  },
  {
    label: 'Email',
    required: false,
    placeholder: 'Nhập email',
    accessor: 'email',
    disabled: true,
  },
];

function UserInformation() {
  const [userInfo, setUserInfo] = useState({
    fullname: 'Hải Yến Viên',
    phone: '0123 456 789',
    email: 'yyen9319@gmail.com',
  });

  const [jobSeekingActive, setJobSeekingActive] = useState(false);
  const [availble, setAvailable] = useState(false);

  const handleChange = (
    field: 'fullname' | 'phone' | 'email',
    value: string,
  ) => {
    const newUserInfo = { ...userInfo };
    newUserInfo[field] = value;
    setUserInfo(newUserInfo);
  };

  return (
    <main className="flex items-start justify-center gap-8 p-2 py-8 text-black bg-neutral-200">
      <div className="flex w-[45%] flex-col gap-4 p-4 bg-white rounded-lg">
        <h1 className="text-lg font-bold">Cài đặt thông tin cá nhân</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-500">(*)</span>Các thông tin bắt buộc
        </div>

        {fields.map((item, index) => {
          return (
            <div key={index} className="flex flex-col justify-center gap-2">
              <label htmlFor="full-name">
                {item.label}
                {item.required && <span className="text-red-500">*</span>}
              </label>
              <input
                name="full-name"
                type="text"
                className={clsx(
                  'px-4 py-2 border rounded-lg bg-white',
                  item.disabled ? 'text-gray-500 cursor-not-allowed' : '',
                )}
                value={userInfo[item.accessor]}
                placeholder={item.placeholder}
                disabled={item.disabled}
                onChange={(event) =>
                  handleChange(item.accessor, event.currentTarget.value)
                }
              ></input>
            </div>
          );
        })}
        <button className="items-start self-start px-8 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800">
          Lưu
        </button>
      </div>
      <div className="flex flex-col p-2 divide-y gap-6 bg-white rounded-lg max-w-[400px]">
        <div className="flex gap-6">
          <div className="relative">
            <span className="absolute right-0 py-[2px] px-[4px] text-[8px] text-white uppercase bg-slate-500">
              Verified
            </span>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              alt="User Image"
              className="object-cover w-20 h-20 rounded-full"
            />
            <div className="absolute p-1 right-0 flex items-center justify-center bg-green-500 rounded-full bottom-[25%]">
              <Camera size={16} stroke="white" />
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
              <ArrowUpCircle size={16}></ArrowUpCircle>Nâng cấp tài khoản
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
            Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn
            trong danh sách tìm kiếm của NTD
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
            Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn
            qua:
          </p>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <div className="p-1 bg-green-200 rounded-full">
                <Check className="text-green-500" size={16} />
              </div>
              Nhắn tin qua Top Connect trên TopCV
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
            Khởi tạo TopCV Profile để gia tăng 300% cơ hội việc làm tốt
          </div>
          <button className="px-4 py-2 font-bold text-green-500 border border-green-600 rounded">
            Tạo TopCV Profile
          </button>
        </div>
      </div>
    </main>
  );
}

export default UserInformation;
