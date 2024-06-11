import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Snackbar,
} from '@mui/material';
import {
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Dialog,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { User, Mail, Lock, Phone, Building } from 'lucide-react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import '../../shared/assets/styles/hr-signup.css';
import { data_provinces } from '../auth-page/signup-page/provinces-data';
import { data_districts } from '../auth-page/signup-page/districts-data';
import Input from '../auth-page/signup-page/Input';
import { createEmpolyer, getPosition } from '../../modules/hr-module';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Roles,
  useProfileContext,
} from '../../shared/services/authen/domain/context';
import Spinner from '../Spinner';
import {
  AUTH0_BACKEND_AUDIENCE,
  AUTH0_CLIENT_ID,
} from '../../shared/services/authen/infrastructure/config';

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
    label: 'banner_01',
    path: 'https://tuyendung.topcv.vn/app/_nuxt/img/banner-01.d2c28c7.png',
  },
  {
    label: 'banner_02',
    path: 'https://tuyendung.topcv.vn/app/_nuxt/img/banner-02.3506b83.png',
  },
  {
    label: 'banner_03',
    path: 'https://tuyendung.topcv.vn/app/_nuxt/img/banner-03.6c4018d.png',
  },
];

interface FormData {
  agreeToTerms: boolean;
  role: string;
  name: string;
  sex: string;
  phone: string;
  company: string;
  position: number | null;
  address_work: string; // này là hiện code
  address: string; // này là hiện tên
  district: string;
  skype_account: string;
}

interface ValidateMessages {
  phone: string;

  company: string;
  sex: string;
  name: string;
  address: string;
  position: string;
}

function HRProfileRegister() {
  const { user, logout, getAccessTokenSilently, isAuthenticated, isLoading } =
    useAuth0();
  const { role, setRole } = useProfileContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    agreeToTerms: false,
    role: '',
    name: user?.name || '',
    sex: '',
    phone: '',
    company: '',
    position: null,
    address_work: '',
    address: '',
    district: '',
    skype_account: '',
  });

  const [validateMessages, setValidateMessages] = useState<ValidateMessages>({
    phone: '',

    company: '',
    sex: '',
    name: '',
    address: '',
    position: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [positions, setPositions] = useState<any[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredDistricts = data_districts.data.filter(
    (district) => district.parent_code === formData.address_work,
  );
  const fetchDataPosition = async () => {
    try {
      const positionResponse = await getPosition();
      setPositions(positionResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchDataPosition();
  }, []);

  const isPhoneValid = (phone: string) => {
    setValidateMessages((prevState) => ({
      ...prevState,
      phone: '',
    }));

    if (!phone) {
      setValidateMessages((prevState) => ({
        ...prevState,
        phone: 'Số điện thoại cá nhân không được để trống',
      }));
      return false;
    } else if (phone.length !== 10) {
      setValidateMessages((prevState) => ({
        ...prevState,
        phone: 'Số điện thoại phải có 10 ký tự',
      }));
      return false;
    } else {
      return true;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let error = false;

    const validations = [
      {
        check: !formData.address_work,
        action: () => {
          setValidateMessages((prevState) => ({
            ...prevState,
            address: 'Địa chỉ làm việc không được để trống',
          }));
          setErrorMessage(validateMessages.address);
        },
      },
      {
        check: !formData.position,
        action: () => {
          setValidateMessages((prevState) => ({
            ...prevState,
            position: 'Vị trí công tác không được để trống',
          }));
          setErrorMessage(validateMessages.position);
        },
      },
      {
        check: !formData.company,
        action: () => {
          setValidateMessages((prevState) => ({
            ...prevState,
            company: 'Tên công ty không được để trống',
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
          setValidateMessages((prevState) => ({
            ...prevState,
            sex: 'Giới tính không được để trống',
          }));
          setErrorMessage(validateMessages.sex);
        },
      },
      {
        check: !formData.name,
        action: () => {
          setValidateMessages((prevState) => ({
            ...prevState,
            name: 'Họ tên không được để trống',
          }));
          setErrorMessage(validateMessages.name);
        },
      },

      {
        check: !formData.agreeToTerms,
        action: () =>
          setErrorMessage('Bạn chưa đồng ý với điều khoản dịch vụ của t4CVs'),
      },
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

    if (error) return;

    createEmpolyer({
      id: user?.sub as string,
      fullname: formData.name,
      gender: formData.sex,
      positionId: formData.position as number,
      skype: formData.skype_account,
      phoneNumber: formData.phone,
      image: user?.picture as string,
      token: await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_BACKEND_AUDIENCE,
        },
        cacheMode: 'off',
      }),
    })
      .then(() => console.log('Success register profile'))
      .then(() => setErrorMessage(''))
      .then(() => setShowSuccessMessage(true))
      .then(() => setRole(Roles.HR))
      .catch(() => setErrorMessage('Failed to set up employer profile !'));
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate(Roles.HR.loginUrl);
      return;
    }
    if (!user) return console.error('isAuthenticated is true but user is null');
    if (role === undefined) {
      const checkRole = async () => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: AUTH0_BACKEND_AUDIENCE,
            },
            cacheMode: 'off',
          });
          const result = await Roles.HR.check(token);
          if (result) {
            setRole(Roles.HR);
            return;
          }
          setRole(null);
        } catch (e) {
          console.error(e);
          setRole(null);
        }
      };
      checkRole();
    }
    if (role === Roles.HR) {
      navigate(Roles.HR.redirectUrl);
      return;
    }
  }, [role, isAuthenticated, isLoading]);
  if (isLoading || !isAuthenticated || role === undefined || role === Roles.HR)
    return <Spinner />;

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

          <form onSubmit={handleSignUp} className="space-y-4 mb-4">
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
                  onChange={(e) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      name: e.target.value,
                    }));
                    setValidateMessages((prevState) => ({
                      ...prevState,
                      name: '',
                    }));
                  }}
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
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        sex: e.target.value,
                      }));
                      setValidateMessages((prevState) => ({
                        ...prevState,
                        sex: '',
                      }));
                    }}
                  >
                    <FormControlLabel
                      value="Nam"
                      control={<Radio />}
                      label="Nam"
                      className={`text-black ${formData.sex === 'Nam' ? 'green-radio' : ''}`}
                    />
                    <FormControlLabel
                      value="Nữ"
                      control={<Radio />}
                      label="Nữ"
                      className={`text-black ${formData.sex === 'Nữ' ? 'green-radio' : ''}`}
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
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  phone: e.target.value,
                }));
                setValidateMessages((prevState) => ({
                  ...prevState,
                  phone: '',
                }));
              }}
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
                  onChange={(e) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      company: e.target.value,
                    }));
                    setValidateMessages((prevState) => ({
                      ...prevState,
                      company: '',
                    }));
                  }}
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
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        position: parseInt(e.target.value as string) || null,
                      }));
                      setValidateMessages((prevState) => ({
                        ...prevState,
                        position: '',
                      }));
                    }}
                    placeholder="Chọn vị trí công tác"
                    className="mt-2 h-9"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px',
                        },
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Chọn vị trí công tác
                    </MenuItem>
                    {positions
                      ? positions.map((position) => (
                          <MenuItem key={position.id} value={position.id}>
                            {position.name}
                          </MenuItem>
                        ))
                      : 'Error to fetch positions'}
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
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        address_work: e.target.value,
                      }));

                      const foundProvince = data_provinces.data.find(
                        (province) => province.code === e.target.value,
                      );

                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        address: foundProvince?.name_with_type || '',
                      }));

                      setValidateMessages((prevState) => ({
                        ...prevState,
                        address: '',
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
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        district: e.target.value,
                      }))
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
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  skype_account: e.target.value,
                }))
              }
              className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
                  focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 
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
                  Tôi đồng ý với{' '}
                  <Link to="/" className="text-green-500 hover:text-green-600">
                    Điều khoản dịch vụ
                  </Link>
                  {' của t4CVs.'}
                </span>
              }
            />
            <button
              type="submit"
              className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${formData.role === 'employee' ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
              disabled={formData.role === 'employee' ? true : false}
            >
              Hoàn tất
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout({
                  clientId: AUTH0_CLIENT_ID,
                  logoutParams: {
                    returnTo: `${window.location.origin}${Roles.HR.loginUrl}`,
                  },
                });
              }}
              className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${formData.role === 'employee' ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
            >
              Đăng xuất
            </button>
            {showSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                Đăng ký thành công!
              </div>
            )}
          </form>
        </div>

        <div className="col-span-1 fixed top-0 right-0 left-2/3 bottom-0">
          <div className="absolute top-0 left-0 right-0 text-center text-3xl text-white font-bold pt-48 z-10">
            Track your funnel with{' '}
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
            <span>©2014-2024 t4CVs Vietnam JSC. All rights reserved.</span>
          </div>
        </div>
      </div>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {errorMessage}
        </div>
      </Snackbar>
    </>
  );
}

export default HRProfileRegister;
