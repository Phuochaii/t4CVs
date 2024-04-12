import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, Card, CardActions, CardContent, Collapse, Typography, Snackbar } from '@mui/material';
import { Checkbox, FormControl, RadioGroup, Radio, Select, MenuItem, Dialog } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { User, Mail, Lock, Phone, Building, Eye, EyeOff } from 'lucide-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import '../../shared/assets/styles/hr-signup.css';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
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
]

function HRSignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role: '',
  });

  const [hrData, setHrData] = useState({
    name: '',
    sex: '',
    phone: '',
    company: '',
    position: '',
    address_work: '',
    district: '',
    skype_account: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const [openDialog, setOpenDialog] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

  const [sexError, setSexError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [addressWorkError, setAddressWorkError] = useState(false);
  const [positionError, setPositionError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const isEmailValid = (email: string) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailErrorMessage("");

    if (!email) {
      setEmailErrorMessage("Email đăng nhập không được để trống");
      return false;
    }
    else if (!emailRegex.test(email)) {
      setEmailErrorMessage("Định dạng email không phù hợp");
      return false;
    }
    else {
      return true;
    }
  };

  const isPasswordValid = (password: string) => {
    setPasswordErrorMessage("");
    //const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,25}$/;
    const passwordRegexOnlyNumber = /^(?=.*\d)[0-9]{6,25}$/;
    const passwordRegexOnlyLowcase = /^[a-z]{6,25}$/;
    const passwordRegexOnlyUppcase = /^[A-Z]{6,25}$/;
    const passwordRegexNumberandLowcase = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,25}$/;
    const passwordRegexNumberandUpcase = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{6,25}$/;
    const passwordRegexNoNumber = /^[a-zA-Z]{6,25}$/;

    const passwordLength = password.length;
    console.log(passwordLength);
    if (!password) {
      setPasswordErrorMessage("Mật khẩu không được để trống");
      return false
    }
    else if (passwordLength < 6 || passwordLength > 25) {
      setPasswordErrorMessage("Mật khẩu từ 6 đến 25 ký tự");
      return false
    }
    else if (passwordRegexOnlyNumber.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ hoa và một chữ thường.");
      return false
    }
    else if (passwordRegexOnlyLowcase.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ số và một chữ hoa.");
      return false
    }
    else if (passwordRegexOnlyUppcase.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ số và một chữ thường.");
      return false
    }
    else if (passwordRegexNumberandLowcase.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ hoa.");
      return false
    }
    else if (passwordRegexNumberandUpcase.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ thường.");
      return false
    }
    else if (passwordRegexNoNumber.test(password)) {
      setPasswordErrorMessage("Mật khẩu phải chứa ít nhất một chữ số.");
      return false
    }
    else {
      return true;
    }
  };

  const isConfirmPasswordValid = (confirmpassword: string, password: string) => {
    setConfirmPasswordErrorMessage("");

    if (!confirmpassword) {
      setConfirmPasswordErrorMessage("Nhập lại mật khẩu không được để trống");
      return false
    }
    else if (confirmpassword !== password) {
      setConfirmPasswordErrorMessage("Nhập lại mật khẩu không đúng");
      return false
    }
    else {
      return true;
    }
  }

  const isPhoneValid = (phone: string) => {
    setPhoneErrorMessage("");

    if (!phone) {
      setPhoneErrorMessage("Số điện thoại cá nhân không được để trống");
      return false;
    }
    else if (phone.length !== 10) {
      setPhoneErrorMessage("Số điện thoại phải có 10 ký tự");
      return false;
    }
    else {
      return true;
    }
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseDialog = (roleclick: any) => {
    setFormData({ ...formData, role: roleclick })
    setOpenDialog(false);
  };

  const handleSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit

    let error = false;

    const validations = [
      { check: !hrData.address_work, action: () => { setAddressWorkError(true); setErrorMessage("Địa chỉ làm việc không được để trống"); } },
      { check: !hrData.position, action: () => { setPositionError(true); setErrorMessage("Vị trí công tác không được để trống"); } },
      { check: !hrData.company, action: () => { setCompanyError(true); setErrorMessage("Tên công ty không được để trống"); } },
      { check: !isPhoneValid(hrData.phone), action: () => setErrorMessage(phoneErrorMessage) },
      { check: !hrData.sex, action: () => { setSexError(true); setErrorMessage("Giới tính không được để trống"); } },
      { check: !hrData.name, action: () => { setNameError(true); setErrorMessage("Họ tên không được để trống"); } },
      { check: !isConfirmPasswordValid(formData.confirmPassword, formData.password), action: () => setErrorMessage(confirmPasswordErrorMessage) },
      { check: !isPasswordValid(formData.password), action: () => { setErrorMessage(passwordErrorMessage) } },
      { check: !isEmailValid(formData.email), action: () => setErrorMessage(emailErrorMessage) },
      { check: !formData.agreeToTerms, action: () => setErrorMessage("Bạn chưa đồng ý với điều khoản dịch vụ của TopCV") },
    ];

    validations.forEach(({ check, action }) => {
      if (check) {
        action();
        error = true;
      }
    });

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    // Lưu thông tin tài khoản vào Local Storage hoặc gửi đến server
    if (!error) {
      // localStorage.setItem('account', JSON.stringify(formData));
      // localStorage.setItem('hr_info', JSON.stringify(hrData))
      console.log('Đăng ký thành công.');
      setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 px-20 py-20">
          <img src="https://tuyendung.topcv.vn/app/_nuxt/img/topcv-logo.c9a1ca1.webp" alt='logo-signup' className='w-52 h-auto pb-4'></img>
          <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600">Đăng ký tài khoản Nhà tuyển dụng</h3>
          <div className='text-gray-500 mb-4'>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel.</div>

          <Card className='mb-4 border border-green-500'>
            <CardActions disableSpacing>
              <b className='text-green-600 text-2xl font-bold'>Quy định</b>
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
                  Để đảm bảo chất lượng dịch vụ, TopCV <span className="text-red-600">không cho phép một người dùng tạo nhiều tài khoản khác nhau</span>.
                </Typography>
                <Typography paragraph>
                  Nếu phát hiện vi phạm, TopCV sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống website của TopCV.
                  Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, TopCV hỗ trợ kích hoạt đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
                </Typography>
                <Typography paragraph>
                  Mọi thắc mắc vui lòng liên hệ Hotline CSKH:
                </Typography>
                <Typography className='flex'>
                  <Phone color='#00b14f'></Phone>
                  <span className='text-green-500 ml-1 pr-10 font-bold'>(024) 71079799</span>
                  <Phone color='#00b14f'></Phone>
                  <span className='text-green-500 ml-1 font-bold'>0862 691929</span>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <form onSubmit={handleSignUp} className="space-y-4 mb-4">
            <div className='border-l-4 border-green-500'><span className='text-2xl font-bold ml-2 text-black'>Tài khoản</span></div>
            <h4 className='text-gray-700 font-bold'>Email đăng nhập <span className='text-red-500'>*</span></h4>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`text-black mt-1 bg-white w-full pl-12 pr-3 py-2 border rounded-md
                focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                ${emailErrorMessage && "border-red-500"}
                `}
                onFocus={() => setEmailErrorMessage("")}
              />
            </div>
            <div className='text-red-500 text-sm'>Trường hợp bạn đăng ký tài khoản bằng email không phải email tên miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới hạn quyền mua hoặc sử dụng.</div>
            {emailErrorMessage && <div className='text-red-500 font-semibold'>{emailErrorMessage}</div>}

            <h4 className='text-gray-700 font-bold'>Mật khẩu <span className='text-red-500'>*</span></h4>
            <div className="relative">
              <div className="flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-green-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu (6 đến 25 ký tự)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                  ${passwordErrorMessage && "border-red-500"}
                  `}
                  onFocus={() => setPasswordErrorMessage("")}
                />
                <div className="absolute right-3 top-7 transform -translate-y-1/2">
                  <button type="button" onClick={handlePasswordToggle} className="focus:outline-none">
                    {showPassword ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
            {passwordErrorMessage && <div className='text-red-500 font-semibold'>{passwordErrorMessage}</div>}

            <h4 className='text-gray-700 font-bold'>Nhập lại mật khẩu <span className='text-red-500'>*</span></h4>
            <div className="relative">
              <div className="flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-green-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                  ${confirmPasswordErrorMessage && "border-red-500"}
                  `}
                  onFocus={() => setConfirmPasswordErrorMessage("")}
                />
                <div className="absolute right-3 top-7 transform -translate-y-1/2">
                  <button type="button" onClick={handleConfirmPasswordToggle} className="focus:outline-none">
                    {showConfirmPassword ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
            {confirmPasswordErrorMessage && <div className='text-red-500 font-semibold'>{confirmPasswordErrorMessage}</div>}

            <div className='border-l-4 border-green-500'><span className='text-2xl font-bold ml-2 text-black'>Thông tin nhà tuyển dụng</span></div>
            <div className='grid grid-cols-2 gap-4'>
              <div className="col-span-1">
                <h4 className='text-gray-700 font-bold'>Họ và tên <span className='text-red-500'>*</span></h4>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Họ và tên"
                    value={hrData.name}
                    onChange={(e) => setHrData({ ...hrData, name: e.target.value })}
                    className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                      focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                      ${nameError && "border-red-500"} 
                      `}
                    onFocus={() => setNameError(false)}
                  />
                </div>
                {nameError && <div className='text-red-500 font-semibold'>Họ tên không được để trống</div>}
              </div>

              <div className="col-span-1 justify-self-end">
                <h4 className='text-gray-700 font-bold'>Giới tính <span className='text-red-500'>*</span></h4>
                <FormControl>
                  <RadioGroup
                    row
                    name="sex"
                    id="sex"
                    onChange={(e) => { setHrData({ ...hrData, sex: e.target.value }); setSexError(false) }}
                  >
                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" className={`text-black ${hrData.sex === 'Nam' ? 'green-radio' : ''}`} />
                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" className={`text-black ${hrData.sex === 'Nữ' ? 'green-radio' : ''}`} />
                  </RadioGroup>
                </FormControl>
                {sexError && <div className='text-red-500 font-semibold'>Giới tính không được để trống</div>}
              </div>
            </div>

            <h4 className='text-gray-700 font-bold'>Số điện thoại cá nhân <span className='text-red-500'>*</span></h4>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Số điện thoại cá nhân"
                value={hrData.phone}
                onChange={(e) => setHrData({ ...hrData, phone: e.target.value })}
                className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                  ${phoneErrorMessage && "border-red-500"}
                  `}
                onFocus={() => setPhoneErrorMessage("")}
              />
            </div>
            {phoneErrorMessage && <div className='text-red-500 font-semibold'>{phoneErrorMessage}</div>}

            <div className='grid grid-cols-2 gap-4'>
              <div className="col-span-1">
                <h4 className='text-gray-700 font-bold'>Công ty <span className='text-red-500'>*</span></h4>
                <div className="relative">
                  <Building className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                  <input
                    id="name_company"
                    name="name_company"
                    type="text"
                    placeholder="Tên công ty"
                    value={hrData.company}
                    onChange={(e) => setHrData({ ...hrData, company: e.target.value })}
                    className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                    focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
                    ${companyError && "border-red-500"} 
                    `} 
                    onFocus={() => setCompanyError(false)}
                    />
                </div>
                {companyError && <div className='text-red-500 font-semibold'>Tên công ty không được để trống</div>}
              </div>

              <div className="col-span-1">
                <h4 className='text-gray-700 font-bold'>Vị trí công tác <span className='text-red-500'>*</span></h4>
                <FormControl fullWidth>
                  <Select
                    id="Position"
                    value={hrData.position}
                    displayEmpty
                    onChange={(e) => {setHrData({ ...hrData, position: e.target.value }); setPositionError(false)}}
                    placeholder="Chọn vị trí công tác"
                    className="mt-2 h-9"
                  >
                    <MenuItem value='' disabled>
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
                {positionError && <div className='text-red-500 font-semibold'>Vị trí công tác không được để trống</div>}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className="col-span-1">
                <h4 className='text-gray-700 font-bold'>Địa chỉ làm việc <span className='text-red-500'>*</span></h4>
                <FormControl fullWidth>
                  <Select
                    id="Address"
                    value={hrData.address_work}
                    displayEmpty
                    onChange={(e) => {setHrData({ ...hrData, address_work: e.target.value }); setAddressWorkError(false)}}
                    placeholder="Chọn tỉnh/ thành phố"
                    className="mt-2 h-9"
                  >
                    <MenuItem value='' disabled>
                      Chọn tỉnh/ thành phố
                    </MenuItem>
                    {/* <MenuItem value={"Nhân viên"}>Nhân viên</MenuItem>
                  <MenuItem value={"Trưởng nhóm"}>Trưởng nhóm</MenuItem>
                  <MenuItem value={"Phó phòng"}>Phó phòng</MenuItem>
                  <MenuItem value={"Trưởng phòng"}>Trưởng phòng</MenuItem>
                  <MenuItem value={"Phó giám đốc"}>Phó giám đốc</MenuItem>
                  <MenuItem value={"Giám đốc"}>Giám đốc</MenuItem>
                  <MenuItem value={"Tổng giám đốc"}>Tổng giám đốc</MenuItem> */}
                  </Select>
                </FormControl>
                {addressWorkError && <div className='text-red-500 font-semibold'>Địa chỉ làm việc  không được để trống</div>}
              </div>

              <div className="col-span-1">
                <h4 className='text-gray-700 font-bold'>Quận/ huyện</h4>
                <FormControl fullWidth>
                  <Select
                    id="District"
                    value={hrData.district}
                    displayEmpty
                    onChange={(e) => setHrData({ ...hrData, district: e.target.value })}
                    placeholder="Chọn quận/ huyện"
                    className="mt-2 h-9"
                  >
                    <MenuItem value='' disabled>
                      Chọn quận/ huyện
                    </MenuItem>
                    {/* <MenuItem value={"Nhân viên"}>Nhân viên</MenuItem>
                  <MenuItem value={"Trưởng nhóm"}>Trưởng nhóm</MenuItem>
                  <MenuItem value={"Phó phòng"}>Phó phòng</MenuItem>
                  <MenuItem value={"Trưởng phòng"}>Trưởng phòng</MenuItem>
                  <MenuItem value={"Phó giám đốc"}>Phó giám đốc</MenuItem>
                  <MenuItem value={"Giám đốc"}>Giám đốc</MenuItem>
                  <MenuItem value={"Tổng giám đốc"}>Tổng giám đốc</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>

            <h4 className='text-gray-700 font-bold'>Skype</h4>
            <input
              id="skype_account"
              name="skype_account"
              type="text"
              placeholder="Tài khoản skype"
              value={hrData.skype_account}
              onChange={(e) => setHrData({ ...hrData, skype_account: e.target.value })}
              className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 
                  `} />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  name="agreeToTerms"
                  color="success" />}
              label={
                <span className='text-gray-700'>
                  Tôi đồng ý với {' '}
                  <Link to="/" className="text-green-500 hover:text-green-600">
                    Điều khoản dịch vụ
                  </Link>
                  {' của TopCV.'}
                </span>
              }
            />
            <button
              type="submit"
              className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${formData.role === "employee" ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
              disabled={formData.role === "employee" ? true : false}>
              Hoàn tất
            </button>
            {showSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                Đăng ký thành công!
              </div>
            )}
          </form>

          <p className="text-center text-gray-600">
            Bạn đã có tài khoản? {' '}
            <Link to="/hr-login" className="text-green-500 hover:underline hover:text-green-500">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <div className="col-span-1 fixed top-0 right-0 left-2/3 bottom-0">
          <div className="absolute top-0 left-0 right-0 text-center text-3xl text-white font-bold pt-48 z-10">Track your funnel with <span className='text-green-500'>Report</span></div>
          <Slider {...settings}>
            {images.map((step, index) => (
              <div key={step.label}>
                <img src={step.path} alt={step.label} className="w-full h-full object-cover"></img>
              </div>
            ))}
          </Slider>
          <img src="https://tuyendung.topcv.vn/app/_nuxt/img/logo-slogan.90e03a7.png" alt='logo' className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-auto pb-10'></img>
        </div>

        <div className='col-span-2 relative mb-3'>
          <img src='https://tuyendung.topcv.vn/app/_nuxt/img/background.89c9cc5.svg' className='w-full'></img>
          <div className='absolute bottom-0 left-0 w-full text-center text-green-500'>
            <span>©2014-2024 TopCV Vietnam JSC. All rights reserved.</span>
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='md'
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '20px' // Đặt giá trị border radius ở đây
          }
        }}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2 justify-self-center text-center pt-16'>
            <div className='text-2xl font-bold pb-3'>Chào bạn,</div>
            <div className='flex text-gray-600 pb-3'>
              Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
              <img src='https://tuyendung.topcv.vn/app/_nuxt/img/ring.8fa28ce.png' alt='bell' style={{ width: '40px' }} />
            </div>
          </div>
          <div className='col-span-2 border border-gray-100 pb-3'></div>
          <div className='col-span-2 text-center font-medium text-lg'>
            <div>Để tối ưu tốt nhất cho trải nghiệm của bạn với TopCV,</div>
            <div>vui lòng lựa chọn nhóm phù hợp nhất với bạn.</div>
          </div>
        </div>
        <div className='col-span-2 flex flex-row'>
          <img className='basis-1/2 justify-self-center' src='https://tuyendung.topcv.vn/app/_nuxt/img/bussiness.efbec2d.png' alt='HR' style={{ width: '384px' }} />
          <img className='basis-1/2 justify-self-center' src='https://tuyendung.topcv.vn/app/_nuxt/img/student.c1c39ee.png' alt='employ' style={{ width: '384px' }} />
        </div>
        <div className='col-span-2 flex flex-row pb-16'>
          <div className='basis-1/2 justify-self-center  text-center'>
            <button className='rounded-full px-4 py-4 bg-green-600 text-white hover:bg-green-700' onClick={(e) => handleCloseDialog("HR")}>Tôi là nhà tuyển dụng</button>
          </div>
          <div className='basis-1/2 justify-self-center text-center'>
            <a className='rounded-full px-4 py-4 bg-green-600 text-white hover:bg-green-700' href="/user-signup">Tôi là ứng viên tìm việc</a>
          </div>
        </div>
      </Dialog>

      <Snackbar open={!!errorMessage} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {errorMessage}
        </div>
      </Snackbar>
    </>
  );
}

export default HRSignUp;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác