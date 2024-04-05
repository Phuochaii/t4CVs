import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputAdornment, TextField } from '@mui/material';
import { User, Lock } from 'lucide-react';

function AdminLogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit
    // Kiểm tra các trường có dữ liệu đầy đủ không
    // if (!formData.agreeToTerms || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)) {
    //   alert("Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản dịch vụ và chính sách bảo mật.");
    //   return;
    // }
    // Lưu thông tin tài khoản vào Local Storage hoặc gửi đến server
    localStorage.setItem('user', JSON.stringify(formData));
    console.log('Đăng ký thành công.');
    //setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 px-40 py-20">
        <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600 mb-4">Hệ thống quản lý TopCV</h3>
      
        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <h4 className='text-gray-700 font-bold'>Tên tài khoản</h4>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            placeholder="Tên tài khoản"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required // Đánh dấu trường này là bắt buộc
            margin='dense'
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User color='#00b14f' />
                </InputAdornment>
              ),
            }}
          />
          <h4 className='text-gray-700 font-bold'>Mật khẩu</h4>
          <TextField
            id="password"
            name="password"
            variant="outlined"
            type="password"
            placeholder="Mật khẩu (6 đến 25 ký tự)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            margin='dense'
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color='#00b14f' />
                </InputAdornment>
              ),
            }}
          />

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
      </div>

      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src="../../shared/assets/images/Sign-up-user.png" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default AdminLogIn;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác
