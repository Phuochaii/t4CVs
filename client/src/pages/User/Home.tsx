// khoa
import React, { SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { DefaultPagination } from '../../shared/components/default-pagination';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import JobService from '../../modules/job-module';
import SearchBoxComponent from '../../layouts/UserLayout/components/SearchBoxComponent';
import { salary_range } from '../../shared/utils/constant';
import SingleDropdown from '../../shared/components/SingleDropDown';
import { SingleValue } from 'react-select';
import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
import { Heart } from 'lucide-react';
import TopCompanies from '../../shared/components/TopCompanies';
import JobSuggestions from '../../shared/components/JobSuggestions';

const vip_company_slides = [
  '../../../images/slide_1.png',
  '../../../images/slide_2.png',
  '../../../images/slide_3.png',
  '../../../images/slide_4.png',
  '../../../images/slide_5.png',
];

const small_interested_jobs_slides = [
  '../../../images/small_slide-interested_jobs_1.png',
  '../../../images/small_slide-interested_jobs_2.png',
  '../../../images/small_slide-interested_jobs_3.png',
  '../../../images/small_slide-interested_jobs_4.png',
  '../../../images/small_slide-interested_jobs_1.png',
  '../../../images/small_slide-interested_jobs_2.png',
  '../../../images/small_slide-interested_jobs_3.png',
  '../../../images/small_slide-interested_jobs_4.png',
  '../../../images/small_slide-interested_jobs_1.png',
];

const big_interested_jobs_slides = [
  '../../../images/big_slide-interested_jobs_1.png',
  '../../../images/big_slide-interested_jobs_2.png',
  '../../../images/big_slide-interested_jobs_3.png',
  '../../../images/big_slide-interested_jobs_4.png',
  '../../../images/big_slide-interested_jobs_5.png',
];

interface filterSearch {
  titleRecruitment: string;
  salaryMin: number;
  salaryMax: number;
  locationId: number;
  expId: number;
}

function Home() {
  const autoSlideInterval = 5000;
  const [vip_company_currentSlide, setVipCompanyCurrentSlide] = useState(0);
  const [
    small_interested_jobs_currentSlide,
    setSmallInterestedJobsCurrentSlide,
  ] = useState(0);
  const [big_interested_jobs_currentSlide, setBigInterestedJobsCurrentSlide] =
    useState(0);

  const [cities, setCities] = useState<string[]>([]);
  const [exp_year, setExpYear] = useState<string[]>([]);

  const [filter, setFilter] = useState<filterSearch>({
    titleRecruitment: '',
    salaryMin: 0,
    salaryMax: 0,
    locationId: 0,
    expId: 0,
  });

  const [jobResult, setJobResult] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    searchJob();
  }, []);

  React.useEffect(() => {
    searchJob();
  }, [page]);

  const searchJob = () => {
    JobService.searchJob({
      page: page,
      limit: 8,
      titleRecruitment: '',
      salaryMin: 0,
      salaryMax: 0,
      fieldId: 0,
      locationId: 0,
      expId: 0,
      majorId: 0,
      typeId: 0,
      levelId: 0,
    }).then((response) => {
      console.log(response);

      setJobResult(response.data);
      setTotalPage(response.total_pages);
    });
  };

  const vip_company_previous = () => {
    setVipCompanyCurrentSlide((current) =>
      current == 0 ? vip_company_slides.length - 1 : current - 1,
    );
  };

  const vip_company_next = () => {
    setVipCompanyCurrentSlide((current) =>
      current == vip_company_slides.length - 1 ? 0 : current + 1,
    );
  };

  const small_interested_jobs_previous = () => {
    setSmallInterestedJobsCurrentSlide((current) =>
      current == 0 ? small_interested_jobs_slides.length / 3 - 1 : current - 1,
    );
  };

  const small_interested_jobs_next = () => {
    setSmallInterestedJobsCurrentSlide((current) =>
      current == small_interested_jobs_slides.length / 3 - 1 ? 0 : current + 1,
    );
  };

  const big_interested_jobs_next = () => {
    setBigInterestedJobsCurrentSlide((current) =>
      current == big_interested_jobs_slides.length - 1 ? 0 : current + 1,
    );
  };

  const navigation = useNavigate();

  const SelectLocation = (value: number) => {
    setFilter((prevState) => ({ ...prevState, locationId: value }));
  };

  const SelectExp = (value: number) => {
    setFilter((prevState) => ({ ...prevState, expId: value }));
  };

  const setTitleRecruitment = (value: string) => {
    setFilter((prevState) => ({ ...prevState, titleRecruitment: value }));
  };
  const options = [
    { value: 'Địa điểm', label: 'Địa điểm' },
    { value: 'Mức lương', label: 'Mức lương' },
    { value: 'Kinh nghiệm', label: 'Kinh nghiệm' },
    { value: 'Ngành nghề', label: 'Ngành nghề' },
  ];
  const data = [
    { value: 'Ngẫu nhiên', label: 'Ngẫu nhiên' },
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'Thành Phố Hồ Chí Minh', label: 'Thành Phố Hồ Chí Minh' },
    { value: 'Miền Bắc', label: 'Miền Bắc' },
    { value: 'Miền Nam', label: 'Miền Nam' },
  ];
  const companies = [
    {
      id: 1,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
      logo: VNRS,
      location: 'Đà Nẵng',
      salary: '3 - 5 triệu',
    },
    {
      id: 2,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 3,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
      logo: VNRS,
      location: 'Đà Nẵng',
      salary: '3 - 5 triệu',
    },
    {
      id: 4,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 5,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
      logo: VNRS,
      location: 'Đà Nẵng',
      salary: '3 - 5 triệu',
    },
    {
      id: 6,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 7,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 8,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
      logo: VNRS,
      location: 'Đà Nẵng',
      salary: '3 - 5 triệu',
    },
    {
      id: 9,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 10,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
    {
      id: 11,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
      logo: VNRS,
      location: 'Đà Nẵng',
      salary: '3 - 5 triệu',
    },
    {
      id: 12,
      job_title: 'Thực tập sinh kiểm thử phần mềm',
      name: 'FPT information system',
      logo: FPT,
      location: 'Hồ Chí Minh',
      salary: 'Thỏa thuận',
    },
  ];
  const [selectedKey, setSelectedKey] = useState('Ngẫu nhiên');
  const [option, setOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const SelectSalary = (value: number) => {
    if (value !== 0) {
      const foundRange = salary_range.find(
        (range) => Number(range.value) === value,
      );
      if (foundRange) {
        setFilter((prevFilter) => ({
          ...prevFilter,
          salaryMin: foundRange.minSalary,
          salaryMax: foundRange.maxSalary,
        }));
      }
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        salaryMin: 0,
        salaryMax: 0,
      }));
    }
  };

  useEffect(() => {
    setInterval(vip_company_next, autoSlideInterval);
    setInterval(small_interested_jobs_next, autoSlideInterval);
    setInterval(big_interested_jobs_next, autoSlideInterval);
    const fetchData = async () => {
      try {
        const locationResponse = await JobService.getAllLocation();
        setCities(locationResponse);

        const expResponse = await JobService.getAllExp();
        setExpYear(expResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const queryParams = {
      titleRecruitment:
        filter.titleRecruitment !== ''
          ? `titleRecruitment=${filter.titleRecruitment}`
          : '',
      salaryMin: filter.salaryMin !== 0 ? `salaryMin=${filter.salaryMin}` : '',
      salaryMax: filter.salaryMax !== 0 ? `salaryMax=${filter.salaryMax}` : '',
      locationId:
        filter.locationId !== 0 ? `locationId=${filter.locationId}` : '',
      expId: filter.expId !== 0 ? `expId=${filter.expId}` : '',
    };

    const queryString = Object.values(queryParams)
      .filter((param) => param !== '')
      .join('&');

    navigation(`/results?${queryString}`);
  };

  return (
    <>
      <div className="section-header">
        <div className="container flex flex-col gap-4">
          <div className="hearder-box text-center">
            <h1 className="title">
              Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.
            </h1>
            <p className="description">
              Tiếp cận <span className="font-medium">40,000+</span> tin tuyển
              dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt
              Nam
            </p>
          </div>

          <div className="max-w-screen-lg mx-auto">
            <SearchBoxComponent
              cities={cities}
              setCities={setCities}
              exp_year={exp_year}
              setExpYear={setExpYear}
              locationId={filter.locationId}
              setLocationId={SelectLocation}
              expId={filter.expId}
              setExpId={SelectExp}
              titleRecruitment={filter.titleRecruitment}
              setTitleRecruitment={setTitleRecruitment}
              handleSearch={handleSearch}
            />
          </div>
        </div>

        <div className="box-work-market flex flex-row justify-center gap-4 text-black my-8">
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="lable-item text-sm">Vị trí chờ bạn khám phá</span>
            <span className="quantity item-number number-job-new-today">
              46.052
            </span>
          </div>
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="mr-2">•</span>
            <span className="lable-item text-sm">Việc làm mới nhất</span>
            <span className="quantity item-number number-job-new-today">
              2.396
            </span>
          </div>
          <div className="box-work-market__item flex flex-row gap-2 items-center">
            <span className="mr-2">•</span>
            <span className="lable-item text-sm">Cập nhật lúc: </span>
            <span className="time-scan item-number number-job-new-today">
              00:33 06/04/2024
            </span>
          </div>
        </div>

        <div className="section-banner-vip-company flex justify-center">
          <div className="max-w-screen-lg relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-out w-full"
                style={{
                  transform: `translateX(-${vip_company_currentSlide * 100}%)`,
                }}
              >
                {vip_company_slides.map((slide, index) => (
                  <img src={slide} key={index} className="cursor-pointer" />
                ))}
              </div>
            </div>
            <button
              onClick={vip_company_previous}
              className="absolute w-10 h-10 top-1/2 -left-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500/40 hover:bg-green-500 hover:text-white ease-out duration-300"
            >
              <ChevronLeftIcon className="mx-2 w-5 h-5" />
            </button>
            <button
              onClick={vip_company_next}
              className="absolute w-10 h-10 top-1/2 -right-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500 hover:bg-green-500 hover:text-white ease-out duration-300"
            >
              <ChevronRightIcon className="mx-3 w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Việc làm tốt nhất */}
        <div className="flex flex-col ml-20 mt-5 items-center ">
          <div className="flex flex-row items-center ml-6 justify-between max-w-screen-lg">
            <div className="flex flex-row items-center">
              <h1 className="title">Việc làm tốt nhất</h1>
              <p className="font-thin text-[30px] mx-5"> | </p>
              <div className="flex flex-col">
                <p className="font-bold">Đề xuất bởi</p>
                <p className="font-extrabold text-[18px]">
                  TOPPY
                  <span className="text-green-500 font-extrabold text-[18px]">
                    AI
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <button
                className="text-black bg-green-50 underline underline-offset-4"
                onClick={() => {}}
              >
                Xem tất cả
              </button>
              <button
                onClick={() => {}}
                className=" w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
              >
                <ChevronLeftIcon className="mx-2 w-5 h-5" />
              </button>
              <button
                onClick={() => {}}
                className="w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
              >
                <ChevronRightIcon className="mx-2 w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center ml-6 justify-between max-w-screen-lg mt-3">
            <div className="w-3/12">
              <SingleDropdown
                placeholder="Chọn bộ lọc"
                options={options}
                onChange={(
                  e: SetStateAction<
                    SingleValue<{ value: string; label: string }>
                  >,
                ) => setOptions(e)}
              />
            </div>
            <div className=" flex flex-row items-center space-x-2">
              <button
                onClick={() => {}}
                className=" w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
              >
                <ChevronLeftIcon className="mx-2 w-5 h-5" />
              </button>
              {data.map((e) => {
                return (
                  <button
                    className={`px-4 py-2 rounded-full ${selectedKey === e.label ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} border hover:border-green-500`}
                    onClick={() => setSelectedKey(e.value)}
                  >
                    {e.label}
                  </button>
                );
              })}
              <button
                onClick={() => {}}
                className=" w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
              >
                <ChevronRightIcon className="mx-2 w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center ml-6 justify-between max-w-screen-lg mt-6 bg-blue-100 rounded-lg p-2">
            <div className="flex flex-row items-center">
              <p className="font-bold">
                Gợi ý:{' '}
                <span className="font-normal">
                  Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
                </span>
              </p>
            </div>
            <button onClick={() => {}}>
              <XMarkIcon className="bg-blue-100 w-5 h-5"></XMarkIcon>
            </button>
          </div>
          <div className="ml-6 mt-4 max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            {companies.length > 0 ? (
              companies.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    // navigation(`/detail-job/${item.id}`);
                  }}
                  className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3 hover:border-green-500"
                >
                  <div className="job-logo-company justify-center w-32 h-24 flex items-center border rounded-lg overflow-hidden">
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="object-contain"
                    />
                  </div>
                  <div className="job-detail w-full h-full overflow-hidden">
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex flex-row justify-between">
                        <span className="job-title text-black font-semibold text-lg truncate w-4/5">
                          {item.job_title}
                        </span>
                      </div>
                      <span className="job-company-name text-slate-600 text-sm truncate w-4/5">
                        {item.name}
                      </span>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row space-x-2">
                          <div className="text-sm bg-gray-200 px-2 py-1 w-fit rounded-lg">
                            {item.salary}
                          </div>
                          <div className="text-sm bg-gray-200 px-2 py-1 w-fit rounded-lg">
                            {item.location}
                          </div>
                        </div>
                        <div className="bg-white">
                          <button onClick={() => {}}>
                            <Heart className="bg-white text-green-500"></Heart>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </div>
          <div className="max-w-screen-lg flex flex-row justify-center space-x-2">
            <button
              onClick={() => {}}
              className=" w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
            >
              <ChevronLeftIcon className="mx-2 w-5 h-5" />
            </button>
            <div className="flex flex-row items-center text-sm">
              <p className="text-green-500">5</p>
              <p className="mx-1 text-gray-400">/</p>
              <p className="text-gray-400">56 trang</p>
            </div>
            <button
              onClick={() => {}}
              className=" w-10 h-10  bg-white text-green-500 rounded-full border-2 border-green-400"
            >
              <ChevronRightIcon className="mx-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="section-body">
        <div className="section-sub-body bg-white py-8 border-y border-slate-100">
          <div className="section-banner-interested-jobs flex justify-center">
            <div className="max-w-screen-lg relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out w-full"
                  style={{
                    transform: `translateX(-${small_interested_jobs_currentSlide * 100}%)`,
                  }}
                >
                  {small_interested_jobs_slides.map((slide, index) => (
                    <img
                      src={slide}
                      key={index}
                      className="w-1/3 rounded-2xl px-2 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={small_interested_jobs_previous}
                className="absolute w-10 h-10 top-1/2 -left-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500/40 hover:bg-green-500 hover:text-white ease-out duration-300"
              >
                <ChevronLeftIcon className="mx-2 w-5 h-5" />
              </button>
              <button
                onClick={small_interested_jobs_next}
                className="absolute w-10 h-10 top-1/2 -right-5 bg-white text-green-500 rounded-full transform -translate-y-1/2 shadow-lg shadow-grey-500 hover:bg-green-500 hover:text-white ease-out duration-300"
              >
                <ChevronRightIcon className="mx-3 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="section-sub-body pt-8 pb-3">
          <div className="section-detail-interested-jobs flex justify-center">
            <div className="max-w-screen-lg relative grid grid-cols-3 gap-4">
              <div className="left-detail col-span-2 flex flex-col gap-3">
                <div className="left-detail--item flex flex-row justify-between items-center">
                  <div className="sub-item--label flex flex-row gap-3 items-center">
                    <span className="title text-3xl text-green-500 py-1 pr-3 border-r-2 border-slate-300 font-bold">
                      Việc làm hấp dẫn
                    </span>
                    <img
                      src="../../images/logo-interested_jobs.png"
                      className="max-h-8"
                    />
                  </div>
                  <div className="item-actions flex flex-row gap-3 items-center">
                    <span className="action-show_all text-[13px] font-medium text-slate-900 underline underline-offset-1 cursor-pointer hover:text-green-600">
                      Xem tất cả
                    </span>

                    {/* <span className="action-show_previous rounded-full border border-green-600 p-2 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white">
                      <ChevronLeftIcon className="w-5 h-5" />
                    </span>

                    <span className="action-show_previous rounded-full border border-green-600 p-2 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white">
                      <ChevronRightIcon className="w-5 h-5" />
                    </span> */}
                  </div>
                </div>
                <div className="left-detail--item"></div>
                <div className="left-detail--item grid grid-cols-2 gap-5">
                  {jobResult.length > 0 ? (
                    jobResult.map((item: any) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigation(`/detail-job/${item.id}`);
                          }}
                          className="job-item-search-result max-h-60 bg-white p-2 border border-transparent rounded-lg shadow-md flex gap-3"
                        >
                          <div className="job-logo-company w-24 h-24 min-w-24 flex items-center border rounded-lg">
                            <img
                              src={
                                item.company?.image
                                  ? item.company?.image
                                  : 'no '
                              }
                            />
                          </div>
                          <div className="job-details flex flex-col w-full">
                            <div className="job-title text-black font-semibold col-span-3 text-lg">
                              {item.titleRecruitment}
                              {/* <div className="job-salary col-start-4 flex items-center">
                                <CurrencyDollarIcon className="w-5 mr-2" />
                                <strong className="salary-count">
                                  {item.salaryMin == 0 && item.salaryMax == 0
                                    ? "Thoả thuận"
                                    : `${item.salaryMin} - ${item.salaryMax} ${item.currency.name}`}{" "}
                                </strong>
                              </div> */}
                            </div>
                            <span className="job-company-name text-slate-600 text-sm col-span-3 mb-2">
                              {item.company?.name
                                ? item.company?.name
                                : 'no name'}
                            </span>
                            <div className="job-action row-start-4 flex flex-row items-end justify-between">
                              <div className="job-detail flex flex-col gap-1">
                                <div className="job-salary_range p-1 rounded bg-slate-200 text-slate-900 text-xs font-medium">
                                  {item.salaryMin == 0 && item.salaryMax == 0
                                    ? 'Thoả thuận'
                                    : `${item.salaryMin} - ${item.salaryMax} ${item.currency.name}`}{' '}
                                </div>
                                <div className="job-location p-1 rounded bg-slate-200 text-slate-900 text-xs font-medium">
                                  {item.locations[0].name}
                                  {item.locations.length > 1
                                    ? ` & ${item.locations.length - 1} nơi khác`
                                    : ''}
                                </div>
                              </div>
                              <span className="btn-save p-2">
                                <Tooltip title="Lưu" placement="top">
                                  <HeartIcon className="w-5 text-slate-500 cursor-pointer hover:text-green-600 hover:bg-slate-100" />
                                </Tooltip>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>Không có dữ liệu</div>
                  )}
                </div>
                <div className="left-detail--item m-auto">
                  <DefaultPagination
                    totalPage={totalPage}
                    active={page}
                    setActive={setPage}
                  />
                </div>
              </div>
              <div className="right-detail min-h-[600px]">
                <div className="overflow-hidden h-full">
                  <div
                    className="flex transition-transform duration-500 ease-out w-full h-full"
                    style={{
                      transform: `translateX(-${big_interested_jobs_currentSlide * 100}%)`,
                    }}
                  >
                    {big_interested_jobs_slides.map((slide, index) => (
                      <img src={slide} key={index} className="cursor-pointer" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopCompanies />
      <JobSuggestions />
    </>
  );
}

export default Home;
