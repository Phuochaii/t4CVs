import { useNavigate } from 'react-router-dom';
import Footer from '../../layouts/UserLayout/components/Footer';

function HRInit() {
  const navigation = useNavigate();
  return (
    <div className="pt-20">
      <header className="flex justify-center menu-top bg-white text-black m-auto fixed top-0 right-0 left-0 border border-b-gray-200">
        <div className="max-w-[1170px] w-full px-16 my-3 mx-6 flex flex-row justify-between items-center">
          <div className="main flex flex-row items-center gap-5">
            <div className="flex flex-col justify-center">
              <img
                className="logo w-[90px] translate-y-2"
                src="https://tuyendung.topcv.vn/images/topcv-logo.png"
                alt=""
              />
            </div>
            <nav className="nav-menu">
              <ul className="flex flex-row items-center">
                <li className="relative">
                  <a
                    href="#"
                    style={{ fontSize: '13px' }}
                    className="font-semibold px-3  hover:text-green-500"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#"
                    style={{ fontSize: '13px' }}
                    className="font-semibold px-3  hover:text-green-500"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#"
                    style={{ fontSize: '13px' }}
                    className="font-semibold px-3  hover:text-green-500"
                  >
                    Báo giá
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#"
                    style={{ fontSize: '13px' }}
                    className="font-semibold px-3  hover:text-green-500"
                  >
                    Hỗ trợ
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#"
                    style={{ fontSize: '13px' }}
                    className="font-semibold px-3  hover:text-green-500"
                  >
                    Blog tuyển dụng
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="user-actions justify-end flex flex-row gap-3">
            {/* NOTIFY BUTTON */}
          </div>
          <div className="list-none flex items-center">
            <li>
              <button
                onClick={() => {
                  navigation('/hr-login');
                }}
                className="py-3.5 px-5 rounded-md mx-2 border text-[#00A74B] border-[#00A74B] hover:border-green-800 bg-white"
              >
                Đăng nhập
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation('/hr-signup');
                }}
                className="py-3.5 px-5 rounded-md mx-2 bg-[#00A74B] hover:bg-green-800 text-white"
              >
                Đăng kí
              </button>
            </li>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center max-w-[1170px] m-auto">
        <div className="text-5xl font-bold text-center mt-8 mb-4 leading-snug">
          Đăng tin tuyển dụng,
          <br /> tìm kiếm ứng viên hiệu quả
        </div>
        <button
          onClick={() => {
            navigation('/user-signup');
          }}
          className="font-bold py-1 px-4 rounded-md mx-2 bg-[#00B14F] hover:bg-green-800 text-white"
        >
          Đăng tin miễn phí <span className="text-2xl font-extrabold">→</span>
        </button>
      </div>
      <div
        className="bg-no-repeat bg-cover bg-center mt-4"
        style={{
          backgroundImage:
            "url('https://tuyendung.topcv.vn/images/introduction/background_header.png')",
        }}
      >
        <img
          src="https://tuyendung.topcv.vn/images/introduction/header_campaign.png"
          alt=""
          className="w-[936px] m-auto"
        />
      </div>
      <div className="px-40 bg-no-repeat bg-cover bg-center flex items-center bg-[#F4F5F5]">
        <div className="flex-grow">
          <p className="text-[#00B14F] font-medium">BIG UPDATE</p>
          <p
            className="font-medium text-2xl border border-l-[5px] border-l-green-500 pl-2 my-3"
            style={{ fontFamily: 'Alexandria, sans-serif;' }}
          >
            t4CVs Smart Recruitment Platform
          </p>
          <p style={{ color: '#646464' }}>
            Nền tảng công nghệ ứng dụng sâu trí tuệ nhân tạo (AI) và Recruitment
            Marketing, mang đến các giải pháp toàn diện giúp doanh nghiệp giải
            quyết đồng thời các bài toán xoay quanh vấn đề tuyển dụng, từ việc
            tạo nguồn CV, sàng lọc hồ sơ ứng viên cho đến đánh giá ứng viên và
            đo lường hiệu quả.
          </p>
          <button
            onClick={() => {
              navigation('/user-signup');
            }}
            className="font-bold py-1 px-4 rounded-md mx-2 my-3 bg-[#00B14F] hover:bg-green-800 text-white"
          >
            Tư vấn tuyển dụng miễn phí{' '}
            <span className="text-2xl font-extrabold">→</span>
          </button>
        </div>
        <img
          src="https://tuyendung.topcv.vn/images/introduction/bg-big-update.png"
          alt=""
          className="w-[600px] p-8"
        />
      </div>
      <Footer />
    </div>
  );
  return <></>;
}

export default HRInit;
