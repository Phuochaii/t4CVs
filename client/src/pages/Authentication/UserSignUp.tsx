import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox } from '@mui/material';
import { User, Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import img from '../../shared/assets/images/Sign-up user.png';

function UserSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: true,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [socialAgree, setSocialAgree] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,25}$/;
    console.log(passwordRegex.test(password));
    return passwordRegex.test(password);
  };

  const isEmailValid = (email: string) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit
    setErrorMessage('');
    setEmailError(false);
    setNameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    let errorCount = 0;

    // Kiểm tra các trường có dữ liệu đầy đủ không
    if (!formData.confirmPassword) {
      errorCount++;
      setErrorMessage('Mật khẩu xác nhập chưa đúng 2');
      setConfirmPasswordError(true);
      setPasswordError(true);
    }
    if (!formData.password) {
      errorCount++;
      setErrorMessage('Hãy cho chúng tôi biết mật khẩu của bạn');
      setPasswordError(true);
    }
    if (!formData.email) {
      errorCount++;
      setErrorMessage('Hãy cho chúng tôi biết địa chỉ email của bạn');
      setEmailError(true);
    }
    if (!formData.name) {
      errorCount++;
      setErrorMessage('Hãy cho chúng tôi biết họ tên của bạn');
      setNameError(true);
    }

    if (formData.email && !isEmailValid(formData.email)) {
      errorCount++;
      setErrorMessage('Định dạng email không đúng');
      setEmailError(true);
    }

    if (formData.password && !isPasswordValid(formData.password)) {
      errorCount++;
      setErrorMessage('Định dạng mật khẩu không đúng');
      setEmailError(true);
      console.log(formData);
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      errorCount++;
      setErrorMessage('Mật khẩu xác nhập chưa đúng');
      setConfirmPasswordError(true);
      setPasswordError(true);
    }

    if (errorCount === 0) {
      // Lưu thông tin tài khoản vào Local Storage hoặc gửi đến server
      // console.log('Đăng ký thành công.');
      setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 px-52 py-20">
        <h3 className="text-2xl font-semibold mb-1 mt-1 text-green-600">
          Chào mừng bạn đến với TopCV
        </h3>
        <div className="text-gray-500 mb-4">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
          tưởng
        </div>
        <form onSubmit={handleSignUp} className="space-y-4 mb-4">
          {errorMessage ? (
            <div
              className="text-red-500 py-2"
              style={{ backgroundColor: 'rgba(255, 69, 58, 0.05)' }}
            >
              <span className="px-4 py-4">{errorMessage}</span>
            </div>
          ) : (
            ''
          )}
          <h4 className="text-gray-700">Họ và tên</h4>
          <div className="relative">
            <User
              className={`
                            w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 
                            ${nameError ? 'text-red-500' : 'text-green-500'}  
                            `}
            />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nhập họ tên"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`
                                text-black bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                                focus:border-gray-400 focus:outline-none focus:border-gray-400
                                ${nameError ? 'border-red-500' : ''}
                            `}
            />
          </div>

          <h4 className="text-gray-700">Email</h4>
          <div className="relative">
            <Mail
              className={`
                            w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 
                            ${emailError ? 'text-red-500' : 'text-green-500'}  
                            `}
            />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Nhập email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`
                                text-black bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                                focus:border-gray-400 focus:outline-none focus:border-gray-400
                                ${emailError ? 'border-red-500' : ''}
                            `}
            />
          </div>

          <h4 className="text-gray-700">Mật khẩu</h4>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <ShieldCheck
                  className={`w-5 h-5 ${passwordError ? 'text-red-500' : 'text-green-500'}`}
                />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`
                                    text-black bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                                    focus:border-gray-400 focus:outline-none focus:border-gray-400
                                    ${passwordError ? 'border-red-500' : ''}
                                `}
                onFocus={() => setShowGuide(true)}
                onBlur={() => setShowGuide(false)}
              />
              <div className="absolute right-3 top-8 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {showGuide && (
            <ul className="list-disc pl-6 text-xs text-gray-600">
              <li>Mật khẩu từ 6 đến 25 ký tự</li>
              <li>Bao gồm chữ hoa, chữ thường và ký tự số</li>
            </ul>
          )}

          <h4 className="text-gray-700">Xác nhận mật khẩu</h4>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <ShieldCheck
                  className={`w-5 h-5 ${confirmPasswordError ? 'text-red-500' : 'text-green-500'}`}
                />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`
                                    text-black bg-white pl-12 pr-3 py-3 border-gray-200 border rounded-md w-full
                                    focus:border-gray-400 focus:outline-none focus:border-gray-400
                                    ${confirmPasswordError ? 'border-red-500' : ''}
                                `}
              />
              <div className="absolute right-3 top-8 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                name="agreeToTerms"
                color="success"
              />
            }
            label={
              <span className="text-gray-700">
                Tôi đã đọc và đồng ý với{' '}
                <Link
                  to="/"
                  className="text-green-500 hover:underline hover:text-green-500"
                >
                  Điều khoản dịch vụ
                </Link>
                {' và '}
                <Link
                  to="/"
                  className="text-green-500 hover:underline hover:text-green-500"
                >
                  Chính sách bảo mật
                </Link>
                {' của TopCV.'}
              </span>
            }
          />
          <button
            type="submit"
            className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${!formData.agreeToTerms ? 'bg-green-400' : 'bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
            disabled={!formData.agreeToTerms}
          >
            Đăng ký
          </button>
          {showSuccessMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
              Đăng ký thành công!
            </div>
          )}
        </form>

        <div>
          <p className="text-center text-gray-600 mb-4">Hoặc đăng nhập bằng</p>
          <div className="flex fullwidth">
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 mr-2 mb-4 text-white ${!socialAgree ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'}`}
            >
              <GoogleIcon></GoogleIcon> Google
            </button>
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 mx-2 mb-4 text-white ${!socialAgree ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              <FacebookIcon></FacebookIcon> Facebook
            </button>
            <button
              disabled={!socialAgree}
              className={`flex-grow rounded-md py-2 px-4 ml-2 mb-4 text-white ${!socialAgree ? 'bg-blue-500' : 'bg-blue-800 hover:bg-blue-700'}`}
            >
              <LinkedInIcon></LinkedInIcon> Linkedin
            </button>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={socialAgree}
                onChange={(e) => setSocialAgree(e.target.checked)}
                name="agreeToTerms"
                color="success"
              />
            }
            label={
              <span className="text-gray-700">
                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và
                đồng ý với{' '}
                <Link
                  to="/"
                  className="text-green-500 hover:underline hover:text-green-500"
                >
                  Điều khoản dịch vụ
                </Link>
                {' và '}
                <Link
                  to="/"
                  className="text-green-500 hover:underline hover:text-green-500"
                >
                  Chính sách bảo mật
                </Link>
                {' của TopCV.'}
              </span>
            }
            className="mb-4"
          />

          <p className="text-center text-gray-600">
            Bạn đã có tài khoản?{' '}
            <Link
              to="/user-login"
              className="text-green-500 hover:underline hover:text-green-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
          <hr className="my-4 border-gray-200" />
          <div className="flex flex-col items-center">
            <b className="text-gray-700">Bạn gặp khó khăn khi tạo tài khoản?</b>
            <div className="text-gray-700">
              Vui lòng gọi tới số{' '}
              <span className="text-green-500 font-bold">(024) 6680 5588</span>{' '}
              (giờ hành chính).
            </div>
          </div>

          <div className="text-green-500 text-center mt-16">
            © 2016. All Rights Reserved. TopCV Vietnam JSC.
          </div>
        </div>
      </div>
      <div className="col-span-1">
        {/* Hình ảnh */}
        <img
          src={img}
          alt="banner"
          className="fixed top-0 left-2/3 w-auto h-full"
        />
      </div>
    </div>
  );
}

export default UserSignUp;
