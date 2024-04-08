// khoa
import { useState } from 'react';

import { TextField, FormControl, OutlinedInput, InputAdornment, MenuItem, Button } from '@mui/material';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/material';


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
const job_name = [
  {
    value: '0',
    label: 'Tất cả ngành nghề',
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
const job_field = [
  {
    value: '0',
    label: 'Tất cả lĩnh vực',
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
const job_type = [
  {
    value: '0',
    label: 'Tất cả hình thức',
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
const job_level = [
  {
    value: '0',
    label: 'Tất cả cấp bậc',
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
const news_type = [
  {
    value: '0',
    label: 'Tất cả loại tin',
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

function SearchJob() {
  const [isActive, setIsActive] = useState(false);
  const [iconDirection, setIconDirection] = useState('down');
  const [boxOptionShow, setBoxOptionShow] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setIconDirection(iconDirection === 'down' ? 'up' : 'down');
    setBoxOptionShow(!boxOptionShow);
  };
  
  return <>
    <div className="search-job">
      <div className="header">
        <div className="container">
          <div className="max-w-screen-lg mx-auto">
            <form className="box-search-job grid grid-cols-7 justify-center gap-x-4">
              <div className="group-search col-span-3 flex flex-row">
                <div className="item item-search">
                  <FormControl>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start"><MagnifyingGlassIcon /></InputAdornment>}
                    />
                  </FormControl>
                </div>
                <div className="item search-city">
                  <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="0"
                  >
                    {city.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="group col-span-3 grid grid-cols-2 gap-x-4">
                {/* Số năm kinh nghiệm */}
                <div className="item col-span-1">
                  <TextField
                      id="outlined-select-currency"
                      select
                    defaultValue="0"
                    className='w-full'
                    >
                      {exp_year.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                </div>
              
                {/* Lương */}
                <div className="item col-span-1">
                  <TextField
                    id="outlined-select-currency"
                    select
                  defaultValue="0"
                  className='w-full'
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

            <div className="search-result flex flex-row justify-between gap-x-96 mt-4">
              <div className="search-result-text font-bold text-white flex items-center mr-28 px-4 rounded-md">
                <span>
                  <span className="high-light">Tổng</span>
                  <span className='total-job-search mx-1'>117</span>
                  <span className="high-light">kết quả</span>
                </span>
              </div>
              <div
                className={`search-result-tool ml-28 flex flex-row items-center px-4 font-bold text-white rounded-md ${isActive ? 'active' : ''}`}
                onClick={handleClick}
              >
                <span>Lọc nâng cao</span>
                {iconDirection === 'down' ? <ChevronDownIcon className='w-8' /> : <ChevronUpIcon className='w-8' />}
              </div>
            </div>
            
            {boxOptionShow ?
              <div className="box-option grid grid-cols-5 gap-x-4 mt-4 p-4">
                <div className="item col-span-1">
                  <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="0"
                    className='w-full'
                  >
                    {job_name.map((option) => (
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
                    className='w-full'
                  >
                    {job_field.map((option) => (
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
                    className='w-full'
                  >
                    {job_type.map((option) => (
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
                    className='w-full'
                  >
                    {job_level.map((option) => (
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
                    className='w-full'
                  >
                    {news_type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              : 
              <></>
            }
          </div>
        </div>


      </div>

      <div className="result-job-search">
        <div className="container">
          <div className="max-w-screen-lg mx-auto">
            <div className="list-job">
              <div className="job-body wrapper-main grid grid-cols-3 gap-x-4">
                <div className="wrapper-content col-span-2">
                  <div className="job-list-search-result mt-4">
                    {/* job content 1 */}
                    <div className="job-item-search-result max-h-40 bg-white p-3 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3">
                      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                        <img src="../../../public/images/logo_company_1.png" />
                      </div>
                      <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col gap-y-2">
                        <span className="job-title font-semibold col-span-3">Nhân viên IT (PHP + JAVASCRIPT)</span>
                        <span className="job-company-name text-sm col-span-3">CÔNG TY TNHH CHYANG SHENG VIỆT NAM</span>
                        <span className="row-start-4 col-span-3 flex items-center">
                          <span className="job-sub-detail job-location text-xs">Hồ Chí Minh</span>
                          <span className="job-sub-detail job-remaining-application-days text-xs">
                            Còn <strong>19</strong> ngày để ứng tuyển
                          </span>
                          <span className="job-sub-detail job-update-time text-xs">Cập nhật 4 giờ trước</span>
                        </span>
                        <div className="job-salary col-start-4 flex items-center">
                          <CurrencyDollarIcon className='w-4 mr-2' />
                          <strong className="salary-count">Thỏa thuận</strong>
                        </div>
                        <div className="job-actions row-start-4 flex items-center justify-end">
                          <span className='btn-apply mr-2'>Ứng tuyển</span>
                          <span className='btn-save'>
                            <Tooltip title="Lưu" placement="top">
                              <HeartIcon className='w-5' />
                            </Tooltip>
                            
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* job content 2*/}
                    <div className="job-item-search-result max-h-40 bg-white p-3 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3">
                      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                        <img src="../../../public/images/logo_company_1.png" />
                      </div>
                      <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col gap-y-2">
                        <span className="job-title font-semibold col-span-3">Nhân viên IT (PHP + JAVASCRIPT)</span>
                        <span className="job-company-name text-sm col-span-3">CÔNG TY TNHH CHYANG SHENG VIỆT NAM</span>
                        <span className="row-start-4 col-span-3 flex items-center">
                          <span className="job-sub-detail job-location text-xs">Hồ Chí Minh</span>
                          <span className="job-sub-detail job-remaining-application-days text-xs">
                            Còn <strong>19</strong> ngày để ứng tuyển
                          </span>
                          <span className="job-sub-detail job-update-time text-xs">Cập nhật 4 giờ trước</span>
                        </span>
                        <div className="job-salary col-start-4 flex items-center">
                          <CurrencyDollarIcon className='w-4 mr-2' />
                          <strong className="salary-count">Thỏa thuận</strong>
                        </div>
                        <div className="job-actions row-start-4 flex items-center justify-end">
                          <span className='btn-apply mr-2'>Ứng tuyển</span>
                          <span className='btn-save'>
                            <Tooltip title="Lưu" placement="top">
                              <HeartIcon className='w-5' />
                            </Tooltip>
                            
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* job content 2*/}
                    <div className="job-item-search-result max-h-40 bg-white p-3 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3">
                      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                        <img src="../../../public/images/logo_company_1.png" />
                      </div>
                      <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col gap-y-2">
                        <span className="job-title font-semibold col-span-3">Nhân viên IT (PHP + JAVASCRIPT)</span>
                        <span className="job-company-name text-sm col-span-3">CÔNG TY TNHH CHYANG SHENG VIỆT NAM</span>
                        <span className="row-start-4 col-span-3 flex items-center">
                          <span className="job-sub-detail job-location text-xs">Hồ Chí Minh</span>
                          <span className="job-sub-detail job-remaining-application-days text-xs">
                            Còn <strong>19</strong> ngày để ứng tuyển
                          </span>
                          <span className="job-sub-detail job-update-time text-xs">Cập nhật 4 giờ trước</span>
                        </span>
                        <div className="job-salary col-start-4 flex items-center">
                          <CurrencyDollarIcon className='w-4 mr-2' />
                          <strong className="salary-count">Thỏa thuận</strong>
                        </div>
                        <div className="job-actions row-start-4 flex items-center justify-end">
                          <span className='btn-apply mr-2'>Ứng tuyển</span>
                          <span className='btn-save'>
                            <Tooltip title="Lưu" placement="top">
                              <HeartIcon className='w-5' />
                            </Tooltip>
                            
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* job content 2*/}
                    <div className="job-item-search-result max-h-40 bg-white p-3 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3">
                      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                        <img src="../../../public/images/logo_company_1.png" />
                      </div>
                      <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col gap-y-2">
                        <span className="job-title font-semibold col-span-3">Nhân viên IT (PHP + JAVASCRIPT)</span>
                        <span className="job-company-name text-sm col-span-3">CÔNG TY TNHH CHYANG SHENG VIỆT NAM</span>
                        <span className="row-start-4 col-span-3 flex items-center">
                          <span className="job-sub-detail job-location text-xs">Hồ Chí Minh</span>
                          <span className="job-sub-detail job-remaining-application-days text-xs">
                            Còn <strong>19</strong> ngày để ứng tuyển
                          </span>
                          <span className="job-sub-detail job-update-time text-xs">Cập nhật 4 giờ trước</span>
                        </span>
                        <div className="job-salary col-start-4 flex items-center">
                          <CurrencyDollarIcon className='w-4 mr-2' />
                          <strong className="salary-count">Thỏa thuận</strong>
                        </div>
                        <div className="job-actions row-start-4 flex items-center justify-end">
                          <span className='btn-apply mr-2'>Ứng tuyển</span>
                          <span className='btn-save'>
                            <Tooltip title="Lưu" placement="top">
                              <HeartIcon className='w-5' />
                            </Tooltip>
                            
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* job content 2*/}
                    <div className="job-item-search-result max-h-40 bg-white p-3 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3">
                      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                        <img src="../../../public/images/logo_company_1.png" />
                      </div>
                      <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col gap-y-2">
                        <span className="job-title font-semibold col-span-3">Nhân viên IT (PHP + JAVASCRIPT)</span>
                        <span className="job-company-name text-sm col-span-3">CÔNG TY TNHH CHYANG SHENG VIỆT NAM</span>
                        <span className="row-start-4 col-span-3 flex items-center">
                          <span className="job-sub-detail job-location text-xs">Hồ Chí Minh</span>
                          <span className="job-sub-detail job-remaining-application-days text-xs">
                            Còn <strong>19</strong> ngày để ứng tuyển
                          </span>
                          <span className="job-sub-detail job-update-time text-xs">Cập nhật 4 giờ trước</span>
                        </span>
                        <div className="job-salary col-start-4 flex items-center">
                          <CurrencyDollarIcon className='w-4 mr-2' />
                          <strong className="salary-count">Thỏa thuận</strong>
                        </div>
                        <div className="job-actions row-start-4 flex items-center justify-end">
                          <span className='btn-apply mr-2'>Ứng tuyển</span>
                          <span className='btn-save'>
                            <Tooltip title="Lưu" placement="top">
                              <HeartIcon className='w-5' />
                            </Tooltip>
                            
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default SearchJob;
