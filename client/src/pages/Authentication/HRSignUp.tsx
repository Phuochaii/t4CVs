import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Snackbar,
} from "@mui/material";
import {
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { User, Mail, Lock, Phone, Building } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import "../../shared/assets/styles/hr-signup.css";
import { data_provinces } from "../auth-page/signup-page/provinces-data";
import { data_districts } from "../auth-page/signup-page/districts-data";
import Input from "../auth-page/signup-page/Input";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  role: string;
  name: string;
  sex: string;
  phone: string;
  company: string;
  position: string;
  address_work: string; // này là hiện code
  address: string; // này là hiện tên
  district: string;
  skype_account: string;
}

interface ValidateMessages {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
  sex: string;
  name: string;
  address: string;
  position: string;
}


function HRSignUp() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    role: "",
    name: "",
    sex: "",
    phone: "",
    company: "",
    position: "",
    address_work: "",
    address: "",
    district: "",
    skype_account: ""
  });
  
  const [validateMessages, setValidateMessages] = useState<ValidateMessages>({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    sex: "",
    name: "",
    address: "",
    position: ""
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const [openDialog, setOpenDialog] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredDistricts = data_districts.data.filter(
    (district) => district.parent_code === formData.address_work
  );

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidateMessages(prevState => ({
      ...prevState,
      email: ""
    }));

    if (!email) {
      setValidateMessages(prevState => ({
        ...prevState,
        email: "Email đăng nhập không được để trống"
      }));
      return false;
    } else if (!emailRegex.test(email)) {
      setValidateMessages(prevState => ({
        ...prevState,
        email: "Định dạng email không phù hợp"
      }));
      return false;
    } else {
      return true;
    }
  };

  const isPasswordValid = (password: string) => {
    setValidateMessages(prevState => ({
      ...prevState,
      password: ""
    }));

    const passwordRegexOnlyNumber = /^(?=.*\d)[0-9]{6,25}$/;
    const passwordRegexOnlyLowcase = /^[a-z]{6,25}$/;
    const passwordRegexOnlyUppcase = /^[A-Z]{6,25}$/;
    const passwordRegexNumberandLowcase =
      /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,25}$/;
    const passwordRegexNumberandUpcase =
      /^(?=.*\d)(?=.*[A-Z])[A-Z\d]{6,25}$/;
    const passwordRegexNoNumber = /^[a-zA-Z]{6,25}$/;

    const passwordLength = password.length;
    if (!password) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu không được để trống"
      }));
      return false;
    } else if (passwordLength < 6 || passwordLength > 25) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu từ 6 đến 25 ký tự"
      }));
      return false;
    } else if (passwordRegexOnlyNumber.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ hoa và một chữ thường"
      }));
      return false;
    } else if (passwordRegexOnlyLowcase.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ số và một chữ hoa"
      }));
      return false;
    } else if (passwordRegexOnlyUppcase.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ số và một chữ thường"
      }));
      return false;
    } else if (passwordRegexNumberandLowcase.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ hoa"
      }));
      return false;
    } else if (passwordRegexNumberandUpcase.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ thường"
      }));
      return false;
    } else if (passwordRegexNoNumber.test(password)) {
      setValidateMessages(prevState => ({
        ...prevState,
        password: "Mật khẩu phải chứa ít nhất một chữ số"
      }));
      return false;
    } else {
      return true;
    }
  };

  const isConfirmPasswordValid = (
    confirmpassword: string,
    password: string
  ) => {
    setValidateMessages(prevState => ({
      ...prevState,
      confirmPassword: ""
    }));

    if (!confirmpassword) {
      setValidateMessages(prevState => ({
        ...prevState,
        confirmPassword: "Nhập lại mật khẩu không được để trống"
      }));
      return false;
    } else if (confirmpassword !== password) {
      setValidateMessages(prevState => ({
        ...prevState,
        confirmPassword: "Nhập lại mật khẩu không đúng"
      }));
      return false;
    } else {
      return true;
    }
  };

  const isPhoneValid = (phone: string) => {
    setValidateMessages(prevState => ({
      ...prevState,
      phone: ""
    }));

    if (!phone) {
      setValidateMessages(prevState => ({
        ...prevState,
        phone: "Số điện thoại cá nhân không được để trống"
      }));
      return false;
    } else if (phone.length !== 10) {
      setValidateMessages(prevState => ({
        ...prevState,
        phone: "Số điện thoại phải có 10 ký tự"
      }));
      return false;
    } else {
      return true;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseDialog = (roleclick: any) => {
    setFormData({ ...formData, role: roleclick });
    setOpenDialog(false);
  };

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let error = false;

    const validations = [
      {
        check: !formData.address_work,
        action: () => {
          setValidateMessages(prevState => ({
            ...prevState,
            address: "Địa chỉ làm việc không được để trống"
          }));
          setErrorMessage(validateMessages.address);
        },
      },
      {
        check: !formData.position,
        action: () => {
          setValidateMessages(prevState => ({
            ...prevState,
            position: "Vị trí công tác không được để trống"
          }));
          setErrorMessage(validateMessages.position);
        },
      },
      {
        check: !formData.company,
        action: () => {
          setValidateMessages(prevState => ({
            ...prevState,
            company: "Tên công ty không được để trống"
          }));
          setErrorMessage(validateMessages.company);
        },
      },
      {
        check: !isPhoneValid(formData.phone),
        action: () => setErrorMessage(validateMessages.phone),
      },
      {
        check: !formData.sex,
        action: () => {
          setValidateMessages(prevState => ({
            ...prevState,
            sex: "Giới tính không được để trống"
          }));
          setErrorMessage(validateMessages.sex);
        },
      },
      {
        check: !formData.name,
        action: () => {
          setValidateMessages(prevState => ({
            ...prevState,
            name: "Họ tên không được để trống"
          }));
          setErrorMessage(validateMessages.name);
        },
      },
      {
        check: !isConfirmPasswordValid(
          formData.confirmPassword,
          formData.password
        ),
        action: () => setErrorMessage(validateMessages.confirmPassword),
      },
      {
        check: !isPasswordValid(formData.password),
        action: () => {
          setErrorMessage(validateMessages.password);
        },
      },
      {
        check: !isEmailValid(formData.email),
        action: () => setErrorMessage(validateMessages.email),
      },
      {
        check: !formData.agreeToTerms,
        action: () =>
          setErrorMessage("Bạn chưa đồng ý với điều khoản dịch vụ của TopCV"),
      },
    ];

    validations.forEach(({ check, action }) => {
      if (check) {
        action();
        error = true;
      }
    });

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    if (!error) {
      setShowSuccessMessage(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 px-20 py-20">
          <img
            src="https://tuyendung.topcv.vn/app/_nuxt/img/topcv-logo.c9a1ca1.webp"
            alt="logo-signup"
            className="w-52 h-auto pb-4"
          ></img>
          <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600">
            Đăng ký tài khoản Nhà tuyển dụng
          </h3>
          <div className="text-gray-500 mb-4">
            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
            tuyển dụng ứng dụng sâu AI & Hiring Funnel.
          </div>

          <Card className="mb-4 border border-green-500">
            <CardActions disableSpacing>
              <b className="text-green-600 text-2xl font-bold">Quy định</b>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Để đảm bảo chất lượng dịch vụ, TopCV{" "}
                  <span className="text-red-600">
                    không cho phép một người dùng tạo nhiều tài khoản khác nhau
                  </span>
                  .
                </Typography>
                <Typography paragraph>
                  Nếu phát hiện vi phạm, TopCV sẽ ngừng cung cấp dịch vụ tới tất
                  cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ
                  thống website của TopCV. Đối với trường hợp khách hàng đã sử
                  dụng hết 3 tin tuyển dụng miễn phí, TopCV hỗ trợ kích hoạt
                  đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp
                  cung cấp thông tin giấy phép kinh doanh.
                </Typography>
                <Typography paragraph>
                  Mọi thắc mắc vui lòng liên hệ Hotline CSKH:
                </Typography>
                <Typography className="flex">
                  <Phone color="#00b14f"></Phone>
                  <span className="text-green-500 ml-1 pr-10 font-bold">
                    (024) 71079799
                  </span>
                  <Phone color="#00b14f"></Phone>
                  <span className="text-green-500 ml-1 font-bold">
                    0862 691929
                  </span>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <form onSubmit={handleSignUp} className="space-y-4 mb-4">
            <div className="border-l-4 border-green-500">
              <span className="text-2xl font-bold ml-2 text-black">
                Tài khoản
              </span>
            </div>
            <h4 className="text-gray-700 font-bold">
              Email đăng nhập <span className="text-red-500">*</span>
            </h4>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData(prevFormData => ({ ...prevFormData, email: e.target.value }))
              }
              errorMessage={validateMessages.email}
              icon={Mail}
            />

            <h4 className="text-gray-700 font-bold">
              Mật khẩu <span className="text-red-500">*</span>
            </h4>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={(e) =>
                setFormData(prevFormData => ({ ...prevFormData, password: e.target.value }))
              }
              errorMessage={validateMessages.password}
              icon={Lock}
            />

            <h4 className="text-gray-700 font-bold">
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </h4>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData(prevFormData => ({ ...prevFormData, confirmPassword: e.target.value }))
              }
              errorMessage={validateMessages.confirmPassword}
              icon={Lock}
            />

            <div className="border-l-4 border-green-500">
              <span className="text-2xl font-bold ml-2 text-black">
                Thông tin nhà tuyển dụng
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-gray-700 font-bold">
                  Họ và tên <span className="text-red-500">*</span>
                </h4>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prevFormData => ({ ...prevFormData, name: e.target.value }))}
                  errorMessage={validateMessages.name}
                  icon={User}
                />
              </div>

              <div className="col-span-1 justify-self-end">
                <h4 className="text-gray-700 font-bold">
                  Giới tính <span className="text-red-500">*</span>
                </h4>
                <FormControl>
                  <RadioGroup
                    row
                    name="sex"
                    id="sex"
                    onChange={(e) => {
                      setFormData(prevFormData => ({ ...prevFormData, sex: e.target.value }));
                      setValidateMessages(prevState => ({
                        ...prevState,
                        sex: ""
                      }));
                    }}
                  >
                    <FormControlLabel
                      value="Nam"
                      control={<Radio />}
                      label="Nam"
                      className={`text-black ${formData.sex === "Nam" ? "green-radio" : ""}`}
                    />
                    <FormControlLabel
                      value="Nữ"
                      control={<Radio />}
                      label="Nữ"
                      className={`text-black ${formData.sex === "Nữ" ? "green-radio" : ""}`}
                    />
                  </RadioGroup>
                </FormControl>
                {validateMessages.sex && (
                  <div className="text-red-500 font-semibold">
                    {validateMessages.sex}
                  </div>
                )}
              </div>
            </div>

            <h4 className="text-gray-700 font-bold">
              Số điện thoại cá nhân <span className="text-red-500">*</span>
            </h4>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Số điện thoại cá nhân"
              value={formData.phone}
              onChange={(e) =>
                setFormData(prevFormData => ({ ...prevFormData, phone: e.target.value }))
              }
              errorMessage={validateMessages.phone}
              icon={Phone}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-gray-700 font-bold">
                  Công ty <span className="text-red-500">*</span>
                </h4>
                <Input
                  id="name_company"
                  name="name_company"
                  type="text"
                  placeholder="Tên công ty"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData(prevFormData => ({ ...prevFormData, company: e.target.value }))}
                  errorMessage={validateMessages.company}
                  icon={Building}
                />
              </div>

              <div className="col-span-1">
                <h4 className="text-gray-700 font-bold">
                  Vị trí công tác <span className="text-red-500">*</span>
                </h4>
                <FormControl fullWidth>
                  <Select
                    id="Position"
                    value={formData.position}
                    displayEmpty
                    onChange={(e) => {
                      setFormData(prevFormData => ({ ...prevFormData, position: e.target.value }));
                      setValidateMessages(prevState => ({
                        ...prevState,
                        position: ""
                      }));
                    }}
                    placeholder="Chọn vị trí công tác"
                    className="mt-2 h-9"
                  >
                    <MenuItem value="" disabled>
                      Chọn vị trí công tác
                    </MenuItem>
                    <MenuItem value={"Nhân viên"}>Nhân viên</MenuItem>
                    <MenuItem value={"Trưởng nhóm"}>Trưởng nhóm</MenuItem>
                    <MenuItem value={"Phó phòng"}>Phó phòng</MenuItem>
                    <MenuItem value={"Trưởng phòng"}>Trưởng phòng</MenuItem>
                    <MenuItem value={"Phó giám đốc"}>Phó giám đốc</MenuItem>
                    <MenuItem value={"Giám đốc"}>Giám đốc</MenuItem>
                    <MenuItem value={"Tổng giám đốc"}>Tổng giám đốc</MenuItem>
                  </Select>
                </FormControl>
                {validateMessages.position && (
                  <div className="text-red-500 font-semibold">
                    {validateMessages.position}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h4 className="text-gray-700 font-bold">
                  Địa chỉ làm việc <span className="text-red-500">*</span>
                </h4>
                <FormControl fullWidth>
                  <Select
                    id="Address"
                    value={formData.address_work}
                    displayEmpty
                    onChange={(e) => {
                      setFormData(prevFormData => ({ ...prevFormData, address_work: e.target.value }));

                      const foundProvince = data_provinces.data.find(
                        (province) => province.code === e.target.value
                      );
                
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        address: foundProvince?.name_with_type || "",
                      }));

                      setValidateMessages(prevState => ({
                        ...prevState,
                        address: ""
                      }));

                    }}
                    placeholder="Chọn tỉnh/ thành phố"
                    className="mt-2 h-9"
                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                  >
                    <MenuItem value="" disabled>
                      Chọn tỉnh/ thành phố
                    </MenuItem>
                    {data_provinces.data.map((province) => (
                      <MenuItem key={province.code} value={province.code}>
                        {province.name_with_type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {validateMessages.address && (
                  <div className="text-red-500 font-semibold">
                    {validateMessages.address}
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <h4 className="text-gray-700 font-bold">Quận/ huyện</h4>
                <FormControl fullWidth>
                  <Select
                    id="District"
                    value={formData.district}
                    displayEmpty
                    onChange={(e) =>
                      setFormData(prevFormData => ({ ...prevFormData, district: e.target.value }))
                    }
                    placeholder="Chọn quận/ huyện"
                    className="mt-2 h-9"
                    disabled={!formData.address_work}
                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                  >
                    <MenuItem value="" disabled>
                      Chọn quận/ huyện
                    </MenuItem>
                    {filteredDistricts.map((district) => (
                      <MenuItem
                        key={district.code}
                        value={district.name_with_type}
                      >
                        {district.name_with_type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <h4 className="text-gray-700 font-bold">Skype</h4>
            <input
              id="skype_account"
              name="skype_account"
              type="text"
              placeholder="Tài khoản skype"
              value={formData.skype_account}
              onChange={(e) =>
                setFormData(prevFormData => ({ ...prevFormData, skype_account: e.target.value }))
              }
              className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 
                  `}
            />

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
                  Tôi đồng ý với{" "}
                  <Link to="/" className="text-green-500 hover:text-green-600">
                    Điều khoản dịch vụ
                  </Link>
                  {" của TopCV."}
                </span>
              }
            />
            <button
              type="submit"
              className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${formData.role === "employee" ? "bg-gray-500" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"}`}
              disabled={formData.role === "employee" ? true : false}
            >
              Hoàn tất
            </button>
            {showSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                Đăng ký thành công!
              </div>
            )}
          </form>

          <p className="text-center text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link
              to="/hr-login"
              className="text-green-500 hover:underline hover:text-green-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <div className="col-span-1 fixed top-0 right-0 left-2/3 bottom-0">
          <div className="absolute top-0 left-0 right-0 text-center text-3xl text-white font-bold pt-48 z-10">
            Track your funnel with{" "}
            <span className="text-green-500">Report</span>
          </div>
          <Slider {...settings}>
            {images.map((step, _index) => (
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "20px",
          },
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 justify-self-center text-center pt-16">
            <div className="text-2xl font-bold pb-3">Chào bạn,</div>
            <div className="flex text-gray-600 pb-3">
              Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
              <img
                src="https://tuyendung.topcv.vn/app/_nuxt/img/ring.8fa28ce.png"
                alt="bell"
                style={{ width: "40px" }}
              />
            </div>
          </div>
          <div className="col-span-2 border border-gray-100 pb-3"></div>
          <div className="col-span-2 text-center font-medium text-lg">
            <div>Để tối ưu tốt nhất cho trải nghiệm của bạn với TopCV,</div>
            <div>vui lòng lựa chọn nhóm phù hợp nhất với bạn.</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-row">
          <img
            className="basis-1/2 justify-self-center"
            src="https://tuyendung.topcv.vn/app/_nuxt/img/bussiness.efbec2d.png"
            alt="HR"
            style={{ width: "384px" }}
          />
          <img
            className="basis-1/2 justify-self-center"
            src="https://tuyendung.topcv.vn/app/_nuxt/img/student.c1c39ee.png"
            alt="employ"
            style={{ width: "384px" }}
          />
        </div>
        <div className="col-span-2 flex flex-row pb-16">
          <div className="basis-1/2 justify-self-center  text-center">
            <button
              className="rounded-full px-4 py-4 bg-green-600 text-white hover:bg-green-700"
              onClick={(_e) => handleCloseDialog("HR")}
            >
              Tôi là nhà tuyển dụng
            </button>
          </div>
          <div className="basis-1/2 justify-self-center text-center">
            <a
              className="rounded-full px-4 py-4 bg-green-600 text-white hover:bg-green-700"
              href="/user-signup"
            >
              Tôi là ứng viên tìm việc
            </a>
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {errorMessage}
        </div>
      </Snackbar>
    </>
  );
}

export default HRSignUp;
