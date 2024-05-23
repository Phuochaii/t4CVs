// khoa
import React from 'react';
import { useState, useEffect } from 'react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JobService from '../../modules/job-module';

import SearchBoxComponent from '../../layouts/UserLayout/components/SearchBoxComponent';
import { DefaultPagination } from '../../shared/components/default-pagination';
// import { salary_range } from '../../shared/utils/constant';

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

  // const SelectSalary = (value: number) => {
  //   if (value !== 0) {
  //     const foundRange = salary_range.find(
  //       (range) => Number(range.value) === value,
  //     );
  //     if (foundRange) {
  //       setFilter((prevFilter) => ({
  //         ...prevFilter,
  //         salaryMin: foundRange.minSalary,
  //         salaryMax: foundRange.maxSalary,
  //       }));
  //     }
  //   } else {
  //     setFilter((prevFilter) => ({
  //       ...prevFilter,
  //       salaryMin: 0,
  //       salaryMax: 0,
  //     }));
  //   }
  // };

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
        <div className="section-sub-body bg-slate-100 pt-8 pb-3">
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
                                    ? 'Thoả thuận'
                                    : `${item.salaryMin} - ${item.salaryMax} ${item.currency.name}`}{' '}
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
    </>
  );
}

export default Home;
