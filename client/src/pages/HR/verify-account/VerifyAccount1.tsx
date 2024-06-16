import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyAccount1() {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const toggleAccept = () => {
    setIsAccepted((prev) => !prev);
  };
  const handleAccept = () => {
    if (isAccepted === true) {
      navigate('/hr/verify-account/2');
    } else {
      return;
    }
  };
  return (
    <div>
      <div className="title p-5 font-medium text-lg text-black bg-white">
        Xác thực tài khoản điện tử
      </div>
      <div className="main mt-4 mx-11 bg-white w-full text-center pt-6 pb-10 px-36">
        <div className="mb-3 flex justify-center">
          <img
            src="https://tuyendung.topcv.vn/app/_nuxt/img/surface_scan.1da01be.png"
            alt="tuyen dung"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
              width: '14px',
              height: '14px',
              fill: '#da4538',
            }}
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
          <span className="font-semibold text-black text-base">
            Hãy chủ động thực hiện xác thực eKYC cùng t4CVs
          </span>
        </div>
        <div className="text-black">
          Hướng tới tăng cường bảo mật cùng gia tăng uy tín cho tài khoản của
          Quý khách hàng,
          <br /> t4CVs mong muốn và khuyến khích Quý khách chủ động thực hiện
          Xác thực tài khoản điện tử - eKYC trên hệ thống.
        </div>
        <a
          href="https://tuyendung.topcv.vn/help/cac-cau-hoi-thuong-gap/lam-the-nao-khi-tai-khoan-nha-tuyen-dung-duoc-yeu-cau-xac-thuc-danh-tinh/"
          className="text-[#00B14F] font-semibold"
        >
          Tìm hiểu thêm
        </a>
        <div className="text-black mt-4 flex items-center">
          <span
            onClick={toggleAccept}
            className={`relative inline-block content-[""] ${isAccepted && 'bg-[#00b14f] border-none'} l-0 h-6 w-6 rounded-[10%] border border-[#303235] cursor-pointer after:content-[""] after:absolute after:left-[7px] after:top-[2px] after:w-[7px] after:h-[13px] after:border-white after:border-b-[3px] after:border-r-[3px] after:rotate-[38deg]	`}
          ></span>
          <span className="ml-5">
            Tôi đồng ý t4CVs được sử dụng thông tin định danh của tôi để xác
            thực tài khoản theo{' '}
            <a
              href="https://www.topcv.vn/privacy-policy"
              className="text-[#00B14F] font-semibold"
            >
              Chính sách bảo mật
            </a>{' '}
            của t4CVs.
          </span>
        </div>
        <button
          className={`w-[313px] px-[10px] py-4 font-bold text-white mt-4 bg-[#00b14f] ${isAccepted ? 'opacity-100' : 'opacity-65 cursor-default'} rounded-[5px]`}
          onClick={handleAccept}
        >
          Xác thực eKYC
        </button>
      </div>
    </div>
  );
}

export default VerifyAccount1;
