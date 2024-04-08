import { useState } from "react";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { User, Lock } from "lucide-react";
import img from "../../shared/assets/images/admin-login.png";

function AdminLogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit

    const storedUserString = localStorage.getItem("user");
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      // Đăng nhập thành công
      console.log("Đăng nhập thành công với email:", formData.email);
      setError("");
      setShowError(false);
      setIsLoggedIn(true); // Set state để hiển thị thông báo đăng nhập thành công
    } else {
      // Đăng nhập không thành công
      setError("Email hoặc mật khẩu không chính xác.");
      setShowError(true);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 px-40 py-20">
        <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600 mb-4">
          Hệ thống quản lý TopCV
        </h3>

        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <h4 className="text-gray-700 font-bold">Tên tài khoản</h4>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            placeholder="Tên tài khoản"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required // Đánh dấu trường này là bắt buộc
            margin="dense"
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User color="#00b14f" />
                </InputAdornment>
              ),
            }}
          />
          <h4 className="text-gray-700 font-bold">Mật khẩu</h4>
          <TextField
            id="password"
            name="password"
            variant="outlined"
            type="password"
            placeholder="Mật khẩu (6 đến 25 ký tự)"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            margin="dense"
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="#00b14f" />
                </InputAdornment>
              ),
            }}
          />

          <div className="flex justify-end">
            <Link to="/" className="text-green-500 hover:underline">
              Quên mật khẩu
            </Link>
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full focus:outline-none text-white rounded-md bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Đăng nhập
          </button>
        </form>

        {showError && <div className="text-red-500">{error}</div>}
        {isLoggedIn && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
            Đăng nhập thành công!
          </div>
        )}
      </div>

      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src={img} className="w-full h-auto" />
      </div>
    </div>
  );
}

export default AdminLogIn;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác
