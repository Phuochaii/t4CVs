// khoa
import { useState, useEffect } from 'react';
import { TextField, FormControl, OutlinedInput, InputAdornment, MenuItem, Button } from '@mui/material';
// import { Carousel } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

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
const slides = [
  '../../../public/images/slide_1.png',
  '../../../public/images/slide_2.png',
  '../../../public/images/slide_3.png',
  '../../../public/images/slide_4.png',
  '../../../public/images/slide_5.png'
];

// const [currentSlide, setCurrentSlide] = useState(0);

// const previous = () => {
//   setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
// };

// const next = () => {
//   setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
// };

function Home() {
  const autoSlideInterval = 5000;
  const [currentSlide, setCurrentSlide] = useState(0);

  const previous = () => {
    setCurrentSlide((current) => (current == 0 ? slides.length - 1 : current - 1));
  };

  const next = () => {
    setCurrentSlide((current) => (current == slides.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    setInterval(next, autoSlideInterval);
  }, []);

  return <>
    <div className="section-header">
      <div className="container justify-center flex flex-col gap-4">
        <div className="hearder-box text-center">
          <h1 className="title">Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
          <p className="description">
            Tiếp cận <span className="font-medium">40,000+</span> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
          </p>
        </div>

        <form className="search-job flex flex-row gap-x-4">
          <div className="group-search flex flex-row">
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
          <div className="group flex flex-row gap-x-4">
            <div className="item">
              <TextField
                  id="outlined-select-currency"
                  select
                  defaultValue="0"
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

        <div className="box-work-market flex flex-row gap-4">
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="lable-item text-sm">Vị trí chờ bạn khám phá</span>
            <span className='quantity item-number number-job-new-today'>46.052</span>
          </div>
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="mr-2">•</span>
            <span className="lable-item text-sm">Việc làm mới nhất</span>
            <span className='quantity item-number number-job-new-today'>2.396</span>
          </div>
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="mr-2">•</span>
            <span className="lable-item text-sm">Cập nhật lúc: </span>
            <span className='time-scan item-number number-job-new-today'>00:33 06/04/2024</span>
          </div>
        </div>

        <div className="section-banner-vip-company">
          <div className="max-w-screen-lg relative">
            <div className="overflow-hidden rounded-lg">
              <div className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map(slide => (
                    <img src={slide} />
                  ))}
              </div>
            </div>
            <button
                onClick={previous}
                className="absolute w-10 h-10 top-1/2 -left-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500/40 hover:bg-green-500 hover:text-white ease-out duration-300"
              >
                <ChevronLeftIcon className='mx-2 w-5 h-5' />
              </button>
              <button
                onClick={next}
                className="absolute w-10 h-10 top-1/2 -right-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500 hover:bg-green-500 hover:text-white ease-out duration-300"
              >
                <ChevronRightIcon className='mx-3 w-5 h-5'  />
              </button>
          </div>
        </div>
      </div>

    </div>
  </>;
}

export default Home;
