import { useNavigate } from 'react-router-dom';
import img from '../../shared/assets/images/Sign-up user.png';

function AdminInit() {
  const navigation = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4">
      <div
        className="col-span-2 px-40 py-20 relative bg-no-repeat bg-contain bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://tuyendung.topcv.vn/app/_nuxt/img/background.89c9cc5.svg')",
        }}
      >
        <img
          src="https://tuyendung.topcv.vn/app/_nuxt/img/topcv-logo.c9a1ca1.webp"
          alt="logo-signup"
          className="w-52 h-auto pb-20"
        ></img>
        <h3 className="text-2xl font-bold  mt-1 text-green-600 mb-4">
          Hệ thống quản lý t4CVs
        </h3>
        <button
          onClick={() => {
            navigation('/admin-login');
          }}
          className="py-2 px-4 focus:outline-none text-white rounded-md bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Đăng nhập với vai trò là Quản trị viên
        </button>

        <div className="absolute bottom-0 w-full text-center text-green-500">
          <span>©2014-2024 t4CVs Vietnam. All rights reserved.</span>
        </div>
      </div>

      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src={img} alt="banner" className="top-0 left-2/3 w-auto h-full" />
      </div>
    </div>
  );
}

export default AdminInit;
