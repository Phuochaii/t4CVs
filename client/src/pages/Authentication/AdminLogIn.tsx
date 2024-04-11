import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import img from '../../shared/assets/images/Sign-up user.png';

function AdminLogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit

    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      // Đăng nhập thành công
      console.log('Đăng nhập thành công với email:', formData.email);
      setError('');
      setShowError(false);
      setIsLoggedIn(true); // Set state để hiển thị thông báo đăng nhập thành công
    } else {
      // Đăng nhập không thành công
      setError('Email hoặc mật khẩu không chính xác.');
      setShowError(true);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 px-40 py-20">
        <img src="https://tuyendung.topcv.vn/app/_nuxt/img/topcv-logo.c9a1ca1.webp" alt='logo-signup' className='w-52 h-auto pb-20'></img>
        <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600 mb-4">Hệ thống quản lý TopCV</h3>

        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <h4 className='text-gray-700 font-bold'>Tên tài khoản</h4>
          <div className="relative">
            <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Tên tài khoản"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="text-black mt-1 bg-white focus:border-green-500 pl-12 pr-3 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full"
            />
          </div>
          <h4 className='text-gray-700 font-bold'>Mật khẩu</h4>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="w-5 h-5 text-green-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="text-black mt-1 bg-white focus:border-green-500 pl-12 pr-3 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full"
              />
              <div className="absolute right-3 top-7 transform -translate-y-1/2">
                <button type="button" onClick={handlePasswordToggle} className="focus:outline-none">
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>
          </div>


          <div className='flex justify-end'>
            <Link to="/" className="text-green-500 hover:underline">
              Quên mật khẩu
            </Link>
          </div>

          <button
            type="submit"
            className='py-2 px-4 w-full focus:outline-none text-white rounded-md bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'>
            Đăng nhập
          </button>
        </form>

        {showError && (
          <div className="text-red-500">{error}</div>
        )}
        {isLoggedIn && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
            Đăng nhập thành công!
          </div>
        )}

      </div>

      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src={img} alt='banner' className="fixed top-0 left-2/3 w-auto h-full" />
      </div>

      <div className='col-span-2 relative mb-3'>
        <img src='https://tuyendung.topcv.vn/app/_nuxt/img/background.89c9cc5.svg' className='w-full'></img>
        <div className='absolute bottom-0 left-0 w-full text-center text-green-500'>
          <span>©2014-2024 TopCV Vietnam JSC. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogIn;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác
