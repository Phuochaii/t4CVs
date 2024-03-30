import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lấy thông tin tài khoản từ Local Storage
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Đăng nhập thành công
      console.log('Đăng nhập thành công với email:', email);
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
        <div className="space-y-4">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Đăng nhập
          </Button>
          {showError && (
            <div className="text-red-500">{error}</div>
          )}
          {isLoggedIn && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
              Đăng nhập thành công!
            </div>
          )}
          <p className="text-center mt-2">
            Bạn chưa có tài khoản?{' '}
            <Link to="/sign_up" className="text-blue-500 hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
