import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, InputAdornment, Card, CardActions, CardContent, Collapse, Typography, Menu } from '@mui/material';
import { Checkbox, TextField, FormControl, RadioGroup, Radio, Select, MenuItem } from '@mui/material';
import { User, Mail, Lock, Phone, Building } from 'lucide-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

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

function HRSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit
    // Kiểm tra các trường có dữ liệu đầy đủ không
    if (!formData.agreeToTerms || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)) {
      alert("Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản dịch vụ và chính sách bảo mật.");
      return;
    }
    // Lưu thông tin tài khoản vào Local Storage hoặc gửi đến server
    localStorage.setItem('user', JSON.stringify(formData));
    console.log('Đăng ký thành công.');
    setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
  };

  const isEmailValid = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordLength = password.length;
    return passwordLength >= 6 && passwordLength <= 25;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 px-20 py-20">
        <h3 className="text-2xl font-bold mb-1 mt-1 text-green-600">Đăng ký tài khoản Nhà tuyển dụng</h3>
        <div className='text-gray-500 mb-4'>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel.</div>

        <Card className='mb-4 border border-green-500'>
          <CardActions disableSpacing>
            <b className='text-green-500'>Qui định</b>
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
                Để đảm bảo chất lượng dịch vụ, TopCV <span className="text-red-500">không cho phép một người dùng tạo nhiều tài khoản khác nhau</span>.
              </Typography>
              <Typography paragraph>
                Nếu phát hiện vi phạm, TopCV sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống website của TopCV.
                Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, TopCV hỗ trợ kích hoạt đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
              </Typography>
              <Typography paragraph>
                Mọi thắc mắc vui lòng liên hệ Hotline CSKH:
              </Typography>
              <Typography className='flex'>
                <Phone color='#00b14f'></Phone> <span className='text-green-500 ml-1 pr-10 font-bold'>(024) 71079799</span>
                <Phone color='#00b14f'></Phone> <span className='text-green-500 ml-1 font-bold'>0862 691929</span>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>

        <form onSubmit={handleSignUp} className="space-y-4 mb-4">
          <div className='border-l-4 border-green-500'><span className='text-2xl font-bold ml-2'>Tài khoản</span></div>
          <h4 className='text-gray-700 font-bold'>Email đăng nhập <span className='text-red-500'>*</span></h4>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!formData.email && !isEmailValid(formData.email)}
            helperText={(!!formData.email && !isEmailValid(formData.email)) ? "Email không hợp lệ." : ""}
            required // Đánh dấu trường này là bắt buộc
            margin='dense'
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail color='#00b14f' />
                </InputAdornment>
              ),
            }}
          />
          <div className='text-red-500 text-sm'>Trường hợp bạn đăng ký tài khoản bằng email không phải email tên miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới hạn quyền mua hoặc sử dụng.</div>
          <h4 className='text-gray-700 font-bold'>Mật khẩu <span className='text-red-500'>*</span></h4>
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
            error={!!formData.password && !isPasswordValid(formData.password)}
            helperText={formData.password && !isPasswordValid(formData.password) ? "Mật khẩu không hợp lệ." : ""}
          />
          <h4 className='text-gray-700 font-bold'>Nhập lại mật khẩu <span className='text-red-500'>*</span></h4>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            variant="outlined"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={formData.confirmPassword !== formData.password}
            helperText={formData.confirmPassword !== formData.password ? 'Mật khẩu và xác nhận mật khẩu không khớp.' : ''}
            required // Đánh dấu trường này là bắt buộc
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

          <div className='border-l-4 border-green-500'><span className='text-2xl font-bold ml-2'>Thông tin nhà tuyển dụng</span></div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="col-span-1">
              <h4 className='text-gray-700 font-bold'>Họ và tên <span className='text-red-500'>*</span></h4>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required // Đánh dấu trường này là bắt buộc
                margin='dense'
                fullWidth
                className="mt-1"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User color='#00b14f' />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-span-1 justify-self-end">
              <h4 className='text-gray-700 font-bold mb-4'>Giới tính <span className='text-red-500'>*</span></h4>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
            </div>


          </div>

          <h4 className='text-gray-700 font-bold'>Số điện thoại cá nhân <span className='text-red-500'>*</span></h4>
          <TextField
            id="phone"
            name="phone"
            variant="outlined"
            placeholder="Số điện thoại cá nhân"
            //value={formData.email}
            //onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            //error={!!formData.email && !isEmailValid(formData.email)}
            //helperText={(!!formData.email && !isEmailValid(formData.email)) ? "Email không hợp lệ." : ""}
            required // Đánh dấu trường này là bắt buộc
            margin='dense'
            className="mt-1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color='#00b14f' />
                </InputAdornment>
              ),
            }}
          />

          <div className='grid grid-cols-2 gap-4'>
            <div className="col-span-1">
              <h4 className='text-gray-700 font-bold'>Công ty <span className='text-red-500'>*</span></h4>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                placeholder="Tên công ty"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required // Đánh dấu trường này là bắt buộc
                margin='dense'
                fullWidth
                className="mt-1"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Building color='#00b14f' />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-span-1">
              <h4 className='text-gray-700 font-bold'>Vị trí công tác <span className='text-red-500'>*</span></h4>
              <FormControl fullWidth>
                <Select
                  id="Position"
                  value={position}
                  displayEmpty
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Chọn vị trí công tác"
                  className="mt-2"
                  required
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
            </div>


          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className="col-span-1">
              <h4 className='text-gray-700 font-bold'>Địa chỉ làm việc <span className='text-red-500'>*</span></h4>
              <FormControl fullWidth>
                <Select
                  id="Address"
                  value={address}
                  displayEmpty
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Chọn tỉnh/ thành phố"
                  className="mt-2"
                  required
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
            </div>

            <div className="col-span-1">
              <h4 className='text-gray-700 font-bold'>Quận/ huyện</h4>
              <FormControl fullWidth>
                <Select
                  id="District"
                  value={district}
                  displayEmpty
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Chọn quận/ huyện"
                  className="mt-2"
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
          <TextField
            id="skype_account"
            name="skype_account"
            variant="outlined"
            placeholder="Tài khoản Skype"
            //value={formData.email}
            //onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            //error={!!formData.email && !isEmailValid(formData.email)}
            //helperText={(!!formData.email && !isEmailValid(formData.email)) ? "Email không hợp lệ." : ""}
            margin='dense'
            className="mt-1"
            fullWidth
          />

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
            className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${!formData.agreeToTerms ? 'bg-green-400' : 'bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
            disabled={!formData.agreeToTerms}>
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
          <Link to="/user-login" className="text-green-500 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <div className="col-span-1">
        {/* Hình ảnh */}
        <img src="../../shared/assets/images/Sign-up-user.png" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default HRSignUp;
// làm tương tự tạo ra những page đăng nhập, đăng kí khác