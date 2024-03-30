import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSignUp = () => {
    // Lưu thông tin tài khoản vào Local Storage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    console.log('Đăng ký thành công.');
    setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
  };

  const isEmailValid = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isSignUpDisabled = !agreeToTerms || !name || !email || !password || !confirmPassword || (password !== confirmPassword);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Đăng ký</h2>
        <div className="space-y-4">
          <TextField
            id="name"
            label="Họ Tên"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={name.length > 15 || (name.trim() !== "" && !/^[\p{L}\s]+$/u.test(name))}
            helperText={(name.length > 15 && "Tên không được quá 15 ký tự.") || ((name.trim() !== "" && !/^[\p{L}\s]+$/u.test(name)) && "Tên chỉ được chứa các ký tự chữ cái và khoảng trắng.") || ""}
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!email && !isEmailValid(email)}
            helperText={(!!email && !isEmailValid(email)) ? "Email không hợp lệ." : ""}
          />

          <TextField
            id="password"
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password.length > 0 && (password.length < 6 || password.length > 15)}
            helperText={(password.length > 0 && password.length < 6 && "Mật khẩu phải có ít nhất 6 ký tự.") || (password.length > 15 && "Mật khẩu không được quá 15 ký tự.")}
          />

          <TextField
            id="confirmPassword"
            label="Xác nhận mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword !== password}
            helperText={confirmPassword !== password ? 'Mật khẩu và xác nhận mật khẩu không khớp.' : ''}
          />

          <FormControlLabel
            control={<Checkbox checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} color="primary" />}
            label="Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của TopCV"
          />
          
          <Button variant="contained" onClick={handleSignUp} fullWidth disabled={isSignUpDisabled}>
            Đăng ký
          </Button>
          {showSuccessMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
              Đăng ký thành công!
            </div>
          )}
          <p className="text-center mt-2">
            Bạn đã có tài khoản?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
