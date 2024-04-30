import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import img from '../../shared/assets/images/Sign-up user.png';

function UserLogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [socialAgree, setSocialAgree] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email: string) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit

    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

    if (!formData.password) {
      setErrorMessage("Hãy cho chúng tôi biết mật khẩu của bạn");
      setPasswordError(true);
    }
    if (!formData.email) {
      setErrorMessage("Hãy cho chúng tôi biết địa chỉ email của bạn");
      setEmailError(true);
    }

    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      // Đăng nhập thành công
      console.log('Đăng nhập thành công với email:', formData.email);
      setIsLoggedIn(true); // Set state để hiển thị thông báo đăng nhập thành công
    } else if (formData.password && formData.email) {
      // Đăng nhập không thành công
      setErrorMessage('Email hoặc mật khẩu không chính xác.');
      if (formData.email && !isEmailValid(formData.email)) {
        setErrorMessage("Định dạng email không đúng");
        setEmailError(true);
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 px-40 py-20">
        <h3 className="text-2xl font-semibold mb-1 mt-1 text-green-600">Chào mừng bạn đã quay trở lại</h3>
        <div className='text-gray-500 mb-4'>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</div>
        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          {errorMessage ? <div className='text-red-500 py-2' style={{ backgroundColor: 'rgba(255, 69, 58, 0.05)' }}>
            <span className='px-4 py-4'>{errorMessage}</span>
          </div> : ""}
          <h4 className='text-gray-700'>Email</h4>
          <div className="relative">
            <Mail className={`
                  w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2
                  ${emailError ? "text-red-500" : "text-green-500"}
                  `} />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`
                text-black mt-1 bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                focus:border-gray-400 focus:outline-none focus:border-gray-400
                ${emailError ? "border-red-500" : ""}
                `} />
          </div>

          <h4 className='text-gray-700'>Mật khẩu</h4>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <ShieldCheck className={`
                  w-5 h-5
                  ${passwordError ? "text-red-500" : "text-green-500"}
                  `} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`
                  text-black mt-1 bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                  focus:border-gray-400 focus:outline-none focus:border-gray-400
                  ${passwordError ? "border-red-500" : ""}
                `}
              />
              <div className="absolute right-3 top-8 transform -translate-y-1/2">
                <button type="button" onClick={handlePasswordToggle} className="focus:outline-none">
                  {showPassword ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <Link to="/" className="text-green-500 hover:underline hover:text-green-500">
              Quên mật khẩu
            </Link>
          </div>

          <button
            type="submit"
            className='py-2 px-4 w-full focus:outline-none text-white rounded-md bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'>
            Đăng nhập
          </button>
        </form>

        {isLoggedIn && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
            Đăng nhập thành công!
          </div>
        )}

        <div>
          <p className="text-center text-gray-600 mb-4">
            Hoặc đăng nhập bằng
          </p>
          <div className="flex fullwidth">
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 mr-2 mb-4 text-white ${!socialAgree ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'}`}>
              <GoogleIcon></GoogleIcon>
              {' '}Google
            </button>
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 mx-2 mb-4 text-white ${!socialAgree ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'}`}>
              <FacebookIcon></FacebookIcon>
              {' '}Facebook
            </button>
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 ml-2 mb-4 text-white ${!socialAgree ? 'bg-blue-500' : 'bg-blue-800 hover:bg-blue-700'}`}>
              <LinkedInIcon></LinkedInIcon>
              {' '}Linkedin
            </button>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={socialAgree}
                onChange={(e) => setSocialAgree(e.target.checked)}
                name="agreeToTerms"
                color="success" />}
            label={
              <span className='text-gray-700'>
                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với {' '}
                <Link to="/" className="text-green-500 hover:underline hover:text-green-500">
                  Điều khoản dịch vụ
                </Link>
                {' và '}
                <Link to="/" className="text-green-500 hover:underline hover:text-green-500">
                  Chính sách bảo mật
                </Link>
                {' của TopCV.'}
              </span>
            }
            className="mb-4"
          />

          <p className="text-center text-gray-600">
            Bạn chưa có tài khoản? {' '}
            <Link to="/user-signup" className="text-green-500 hover:underline hover:text-green-500">
              Đăng ký ngay
            </Link>
          </p>
          <hr className="my-4 border-gray-200" />
          <div className="flex flex-col items-center">
            <b className="text-gray-700">Bạn gặp khó khăn khi tạo tài khoản?</b>
            <div className="text-gray-700">
              Vui lòng gọi tới số <span className="text-green-500 font-bold">(024) 6680 5588</span> (giờ hành chính).
            </div>
          </div>
        </div>

        <div className='text-green-500 text-center mt-16'>© 2016. All Rights Reserved. TopCV Vietnam JSC.</div>
      </div>
      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src={img} alt='banner' className="fixed top-0 left-2/3 w-auto h-full" />
      </div>
    </div>
  );
}

export default UserLogIn;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác
