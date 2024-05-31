import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "../../shared/assets/styles/hr-signup.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { accountList } from "../../shared/utils/constant";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthen } from "../../shared/services/authen";
import { Roles } from "../../shared/services/authen/domain/context";
import Spinner from "../Spinner";

const images = [
  {
    label: "banner_01",
    path: "https://tuyendung.topcv.vn/app/_nuxt/img/banner-01.d2c28c7.png",
  },
  {
    label: "banner_02",
    path: "https://tuyendung.topcv.vn/app/_nuxt/img/banner-02.3506b83.png",
  },
  {
    label: "banner_03",
    path: "https://tuyendung.topcv.vn/app/_nuxt/img/banner-03.6c4018d.png",
  },
];

function HRLogIn() {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading} = useAuth0();
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const {usernamePasswordLogin} = useAuthen();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit

    // const storedUserString = localStorage.getItem("user");
    // const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    accountList.forEach((account) => {
      console.log(account);
      if (
        account.email === formData.email &&
        account.password === formData.password &&
        account.role === "hr"
      ) {
        console.log("Đăng nhập thành công với email:", formData.email);
        // store in local storage
        localStorage.setItem("hr", JSON.stringify(account));
        navigate("/hr/news");
      }
    });

    if (!formData.email) {
      setEmailEmpty(true);
    }

    if (!formData.password) {
      setPasswordEmpty(true);
    } else {
      // Đăng nhập không thành công
      setError("Email hoặc mật khẩu không chính xác.");
      setShowError(true);
    }
    
    usernamePasswordLogin({
      username: formData.email,
      password: formData.password,
    }, Roles.HR);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  React.useEffect(() => {
    if(isLoading) return;
    if (isAuthenticated) {
      navigate(Roles.HR.redirectUrl);
      return;
    }
  }, [isAuthenticated, isLoading]);
  if(isLoading || isAuthenticated) return <Spinner/>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 px-48 py-24">
        <img
          src="https://tuyendung.topcv.vn/app/_nuxt/img/topcv-logo.c9a1ca1.webp"
          alt="logo-signup"
          className="w-52 h-auto pb-20"
        ></img>
        <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600">
          Chào mừng bạn đã quay trở lại
        </h3>
        <div className="text-gray-500 mb-4">
          Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
          tuyển dụng ứng dụng sâu AI & Hiring Funnel.
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <h4 className="text-gray-700 font-bold">Email</h4>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`
                  text-black mt-1 bg-white pl-12 pr-3 py-3 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                  ${emailEmpty ? "border-red-500" : ""}
                `}
            />
          </div>
          {emailEmpty && !formData.email ? (
            <div className="text-red-500">Không được để trống email</div>
          ) : (
            ""
          )}

          <h4 className="text-gray-700 font-bold">Mật khẩu</h4>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="w-5 h-5 text-green-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`
                  text-black mt-1 bg-white pl-12 pr-3 py-3 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                  ${passwordEmpty ? "border-red-500" : ""}
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
          {passwordEmpty && !formData.password ? (
            <div className="text-red-500">Không được để trống mất khẩu</div>
          ) : (
            ""
          )}

          <div className="flex justify-end">
            <Link
              to="/"
              className="text-green-500 hover:underline hover:text-green-500"
            >
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

        <p className="text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/hr-signup"
            className="text-green-500 hover:underline hover:text-green-500"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <div className="col-span-1 fixed top-0 right-0 left-2/3 bottom-0">
        <div className="absolute top-0 left-0 right-0 text-center text-3xl text-white font-bold pt-48 z-10">
          Track your funnel with <span className="text-green-500">Report</span>
        </div>
        <Slider {...settings}>
          {images.map((step, index) => (
            <div key={step.label}>
              <img
                src={step.path}
                alt={step.label}
                className="w-full h-full object-cover"
              ></img>
            </div>
          ))}
        </Slider>
        <img
          src="https://tuyendung.topcv.vn/app/_nuxt/img/logo-slogan.90e03a7.png"
          alt="logo"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-auto pb-10"
        ></img>
      </div>

      <div className="col-span-2 relative mb-3">
        <img
          src="https://tuyendung.topcv.vn/app/_nuxt/img/background.89c9cc5.svg"
          className="w-full"
        ></img>
        <div className="absolute bottom-0 left-0 w-full text-center text-green-500">
          <span>©2014-2024 TopCV Vietnam JSC. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default HRLogIn;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác
