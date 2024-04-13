// khoa
import { useState } from 'react';
import { TextField, FormControl, OutlinedInput, InputAdornment, MenuItem, Button, Modal, Box } from '@mui/material';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, StarIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline';

const city = [
  {
    value: '0',
    label: 'Tất cả tỉnh/thành phố',
  },
  {
    value: '1',
    label: 'EUR',
  },
  {
    value: '2',
    label: 'BTC',
  },
  {
    value: '3',
    label: 'JPY',
  },
];
const exp_year = [
  {
    value: '0',
    label: 'Tất cả kinh nghiệm',
  },
  {
    value: '1',
    label: '1 năm',
  },
  {
    value: '2',
    label: '2 năm',
  },
  {
    value: '3',
    label: '3 năm',
  },
];
const salary_range = [
  {
    value: '0',
    label: 'Tất cả mức lương',
  },
  {
    value: '1',
    label: 'Dưới 5 triệu',
  },
  {
    value: '2',
    label: '5 đến 10',
  },
  {
    value: '3',
    label: '10 đến 15',
  },
];

const modalApplyStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '40%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  color: 'black'
};

function ApplyCV() {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return <>
    <div className="apply-cv">
      <div className="search-job">
        <div className="header">
          <div className="container">
            <div className="max-w-screen-lg mx-auto">
              <form className="search-job flex flex-row gap-x-4">
                <div className="group-search flex flex-row">
                  <div className="item item-search">
                    <FormControl>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <MagnifyingGlassIcon className="w-6" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="item search-city">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapPinIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {city.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                <div className="group flex flex-row gap-x-4">
                  <div className="item">
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue="0"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <StarIcon className="w-6 border-2 border-neutral-500 rounded-full" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {exp_year.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                  </div>
                  <div className="item">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyDollarIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {salary_range.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                <Button className="btn-search" variant='contained'>Tìm kiếm</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container job-detail">
        <div className="max-w-screen-lg mx-auto">
          <div className="list-job">
            <div className="job-body grid grid-cols-3 gap-x-4 w-full">
              <div className="job-detail__body-left col-span-2 grid grid-rows gap-y-4">
                <div className="job-detail__info mt-4 bg-white text-black border rounded-lg py-2 px-4 grid grid-rows-4 items-center">
                  <h1 className="job-detail__info--title text-2xl font-bold">Nhân viên IT (PHP + JAVASCRIPT)</h1>
                  <div className="job-detail__info--sections grid grid-cols-3 gap-x-4 justify-center">
                    <div className="job-detail__info--section flex flex-row items-center gap-x-4">
                      <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                          <path d="M21.92 16.75C21.59 19.41 19.41 21.59 16.75 21.92C15.14 22.12 13.64 21.68 12.47 20.82C11.8 20.33 11.96 19.29 12.76 19.05C15.77 18.14 18.14 15.76 19.06 12.75C19.3 11.96 20.34 11.8 20.83 12.46C21.68 13.64 22.12 15.14 21.92 16.75Z" fill="white"></path>
                          <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" fill="white"></path>
                        </svg>
                      </div>
                      <div className="job-detail__info--section-content flex flex-col">
                        <span className="job-detail__info--section-content-title">Mức lương</span>
                        <strong className="job-detail__info--section-content-value">Thỏa thuận</strong>
                      </div>
                    </div>
                    <div className="job-detail__info--section flex flex-row items-center gap-x-4">
                      <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none">
                          <path d="M21.2866 8.45C20.2366 3.83 16.2066 1.75 12.6666 1.75C12.6666 1.75 12.6666 1.75 12.6566 1.75C9.1266 1.75 5.0866 3.82 4.0366 8.44C2.8666 13.6 6.0266 17.97 8.8866 20.72C9.9466 21.74 11.3066 22.25 12.6666 22.25C14.0266 22.25 15.3866 21.74 16.4366 20.72C19.2966 17.97 22.4566 13.61 21.2866 8.45ZM12.6666 13.46C10.9266 13.46 9.5166 12.05 9.5166 10.31C9.5166 8.57 10.9266 7.16 12.6666 7.16C14.4066 7.16 15.8166 8.57 15.8166 10.31C15.8166 12.05 14.4066 13.46 12.6666 13.46Z" fill="white"></path>
                        </svg>
                      </div>
                      <div className="job-detail__info--section-content flex flex-col">
                        <span className="job-detail__info--section-content-title">Địa điểm</span>
                        <strong className="job-detail__info--section-content-value">Bình Dương</strong>
                      </div>
                    </div>
                    <div className="job-detail__info--section flex flex-row items-center gap-x-4">
                      <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                          <path d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z" fill="white"></path>
                          <path d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z" fill="white"></path>
                        </svg>
                      </div>
                      <div className="job-detail__info--section-content flex flex-col">
                        <span className="job-detail__info--section-content-title">Kinh nghiệm</span>
                        <strong className="job-detail__info--section-content-value">1 năm</strong>
                      </div>
                    </div>

                  </div>
                  <div className="job-detail__info--sub-details flex flex-rows gap-x-4">
                    <div className="quantity-applied-user max-h-8 col-span-2 flex flex-rows items-center text-sm text-slate-500 p-2 bg-slate-100 rounded-lg">
                      <div className="quantity-applied-user__icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div className="quantity-applied-user__text">TopCV chưa hỗ trợ xem số lượt ứng tuyển cho việc làm này</div>
                    </div>
                    <div className="job-detail__info--deadline max-h-8 col-span-2 flex flex-rows items-center text-sm text-slate-500 p-2 bg-slate-100 rounded-lg">
                      <div className="quantity-applied-user__icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      Hạn nộp hồ sơ: 26/04/2024
                    </div>
                  </div>
                  <div className="job-detail__info--actions grid grid-cols-5 gap-x-3">
                    <span className="col-span-4 btn-apply flex items-center justify-center font-bold p-2" onClick={handleOpen}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2 font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                      Ứng tuyển ngay
                    </span>
                    <span className="btn-save flex items-center justify-center font-semibold p-2">
                      <HeartIcon className="w-5 mr-2" />
                      Lưu tin
                    </span>
                  </div>
                </div>

                <div className="job-detail__information-detail mb-4 bg-white text-black border rounded-lg p-4 flex flex-col gap-y-6">
                  <h2 className="job-detail__information-detail--title border-l-4 border-green-400 pl-4 text-2xl font-bold">Chi tiết tin tuyển dụng</h2>
                  <div className="job-detail__information-detail--content">
                    <div className="job-description flex flex-col gap-y-6">
                      <div className="job-description__item">
                        <h3 className="text-base font-bold mb-2">Yêu cầu ứng viên</h3>
                        <div className="job-description__item--content flex flex-col gap-y-2">
                          <p>- Có kiến thức cơ bản về lập trình WEB (PHP, JAVASCRIPT) để tạo trang web</p>
                          <p>- Có kiến thức về các hệ quản trị cơ sở dữ liệu MARIADB</p>
                          <p>- Trao đổi thêm khi phỏng vấn</p>
                        </div>
                      </div>
                      <div className="job-description__item">
                        <h3 className="text-base font-bold mb-2">Quyền lợi</h3>
                        <div className="job-description__item--content flex flex-col gap-y-2">
                          <p>- Lương thỏa thuận theo khả năng. </p>
                          <p>- Bảo hiểm và các chính sách khác theo quy định của pháp luật.</p>
                          <p>- Thưởng, phụ cấp và các phúc lợi khác theo quy định chung của công ty.</p>
                          <p>- Có cơ chế thăng tiến cho nhân viên xuất sắc</p>
                        </div>
                      </div>
                      <div className="job-description__item">
                        <h3 className="text-base font-bold mb-2">Địa điểm làm việc</h3>
                        <div className="job-description__item--content">
                          <p>- Bình Dương: 150/3 KP2, An Phú, Thuận An, Bình Dương, Thuận An</p>
                        </div>
                      </div>
                      <div className="job-description__item">
                        <h3 className="text-base font-bold mb-2">Cách thức ứng tuyển</h3>
                        <div className="job-description__item--content">
                          <p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-detail__information-detail--actions flex flex-col gap-y-4">
                    <div className="job-detail__information-detail--actions-buttons flex flex-row items-center gap-x-3">
                      <span className="btn-apply font-bold py-2 px-5" onClick={handleOpen}>
                        Ứng tuyển ngay
                      </span>
                      <span className="btn-save font-semibold py-2 px-6">
                        Lưu tin
                      </span>
                    </div>
                    <div className="job-detail__information-detail--actions-label">Hạn nộp hồ sơ: 26/04/2024</div>
                    <div className="quantity-applied-user w-fit flex flex-rows items-center text-sm text-slate-600 p-2 bg-slate-200 rounded-lg">
                      <div className="quantity-applied-user__icon mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div className="quantity-applied-user__text">TopCV chưa hỗ trợ xem số lượt ứng tuyển cho việc làm này</div>
                    </div>
                  </div>
                  <div className="job-detail__information-detail--report flex flex-row gap-x-3 text-slate-600 bg-slate-200 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                    <span>Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo, <a href='#' className='text-green-600'>hãy phản ánh với chúng tôi.</a></span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Modal Apply CV */}
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-apply-cv" sx={modalApplyStyle}>
        <form>
          <div className="modal-header py-5 px-8 flex flex-row items-center justify-between border-b-4 border-slate-100">
            <div className="form-header_title text-2xl font-bold">
              Ứng tuyển
              <span className='text-green-500'> Nhân viên IT (PHP +JAVASCRIPT)</span>
            </div>
            <div className="form-header_action btn-close w-10 p-2 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <div className="modal-body overflow-auto h-80 py-5 px-8">
            <div className="apply-content flex flex-col gap-5">
              <div className="apply-content_tab">
                <div className="apply-content_tab-title flex flex-row items-center gap-3 text-lg font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7' fill="rgb(34 197 94)" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-4 5h8a4 4 0 1 0-8 0z"/>
                  </svg>
                  Chọn CV để ứng tuyển
                </div>
              </div>
              <div className="apply-content_tab">
                Options here
              </div>
              <div className="apply-content_tab">
                <div className="apply-content_tab-title flex flex-row items-center gap-3 text-lg font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7' fill="rgb(34 197 94)" viewBox="0 0 512 512">
                    <path d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z" />
                  </svg>
                  Thư giới thiệu:
                </div>
                <div className="apply-content_tab-sub-title text-slate-500 mt-2">
                  Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                </div>
                <div className="cover-letter-area border rounded-lg border-slate-400 px-1 mt-2">
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    rows={4}
                    placeholder='Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này.'
                    className='w-full'
                  />
                </div>
              </div>
              <div className="apply-content_tab border border-slate-300 rounded-lg p-3">
                <span className="note-title flex gap-2 items-center text-red-500 font-bold text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="rgb(248 113 113)">
                    <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                  </svg>
                  Lưu ý
                </span>
                <div className="note-content">
                  <p className="note-content__list mt-3">
                    <span>
                      1. TopCV khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc làm trước khi ứng tuyển.
                      <br />
                      Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho TopCV qua email
                      <a className="text-green-500" target="_top" href="mailto:hotro@topcv.vn"> hotro@topcv.vn</a> để được hỗ trợ kịp thời.
                    </span>
                  </p>
                  <p className="note-content__list mt-3">
                    <span>
                      2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo
                      <a href="https://blog.topcv.vn/huong-dan-tim-viec-an-toan-trong-ky-nguyen-so/" target="__blank" className="font-semibold text-green-500"> tại đây.</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer py-5 px-8 flex flex-row gap-3 items-center border-t-4 border-slate-100">
            <span className="btn-close font-semibold py-2 px-4 rounded-lg text-slate-700 bg-slate-200 cursor-pointer hover:bg-slate-300" onClick={handleClose}>
              Hủy
            </span>
            <span className="btn-apply font-bold w-full text-center py-2 px-5 rounded-lg bg-green-500 text-white hover:bg-green-600">
              Ứng tuyển ngay
            </span>
          </div>
        </form>
      </Box>
    </Modal>
  </>;
}

export default ApplyCV;
