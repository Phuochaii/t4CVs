// khoa
import { useEffect, useState } from "react";

import {
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import {
  HeartIcon,
  MapPinIcon,
  StarIcon,
  BriefcaseIcon,
  CubeIcon,
  ClockIcon,
  AcademicCapIcon,
  FolderIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobService from "../../modules/job-module";

const filterFromHomePage = {
  titleRecruitment: String(sessionStorage.getItem('titleRecruitment')),
  locationId: Number(sessionStorage.getItem('locationId')),
  expId: Number(sessionStorage.getItem('expId'))
}

const searchJobFromHomePage = await JobService.searchJob(0, 0, filterFromHomePage.titleRecruitment, 0, 0, 0, filterFromHomePage.locationId, filterFromHomePage.expId);

const cities = await JobService.getAllLocation();

const exp_year = await JobService.getAllExp();

const salary_range = [
  {
    value: "0",
    label: "Tất cả mức lương",
  },
  {
    value: "1",
    label: "Dưới 5 triệu",
  },
  {
    value: "2",
    label: "5 đến 10",
  },
  {
    value: "3",
    label: "10 đến 15",
  },
];

const job_name = [
  {
    value: "0",
    label: "Tất cả ngành nghề",
  },
  {
    value: "1",
    label: "Dưới 5 triệu",
  },
  {
    value: "2",
    label: "5 đến 10",
  },
  {
    value: "3",
    label: "10 đến 15",
  },
];
//   {
//     value: "0",
//     label: "Tất cả lĩnh vực",
//   },
//   {
//     value: "1",
//     label: "Dưới 5 triệu",
//   },
//   {
//     value: "2",
//     label: "5 đến 10",
//   },
//   {
//     value: "3",
//     label: "10 đến 15",
//   },
// ];
//   {
//     value: "0",
//     label: "Tất cả hình thức",
//   },
//   {
//     value: "1",
//     label: "Dưới 5 triệu",
//   },
//   {
//     value: "2",
//     label: "5 đến 10",
//   },
//   {
//     value: "3",
//     label: "10 đến 15",
//   },
// ];

const job_field = await JobService.getAllField();

const job_type = await JobService.getAllType();

const job_level = await JobService.getAllLevel();

//   {
//     value: "0",
//     label: "Tất cả cấp bậc",
//   },
//   {
//     value: "1",
//     label: "Dưới 5 triệu",
//   },
//   {
//     value: "2",
//     label: "5 đến 10",
//   },
//   {
//     value: "3",
//     label: "10 đến 15",
//   },
// ];
const news_type = [
  {
    value: "0",
    label: "Tất cả loại tin",
  },
  {
    value: "1",
    label: "Dưới 5 triệu",
  },
  {
    value: "2",
    label: "5 đến 10",
  },
  {
    value: "3",
    label: "10 đến 15",
  },
];

function SearchJob() {
  const navigation = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [iconDirection, setIconDirection] = useState("down");
  const [boxOptionShow, setBoxOptionShow] = useState(false);

  const [jobResult, SetJobResult] = useState([]);
  const [totalJob, setTotalJob] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  SetJobResult(searchJobFromHomePage.data);
  setTotalJob(searchJobFromHomePage.total);
  setTotalPage(searchJobFromHomePage.total_pages);
  setCurrentPage(searchJobFromHomePage.page);

  useEffect(() => {
    console.log(jobResult);
  }, [1])

  const handleClick = () => {
    setIsActive(!isActive);
    setIconDirection(iconDirection === "down" ? "up" : "down");
    setBoxOptionShow(!boxOptionShow);
  };

  const differenceInDays = (expiredDay: Date) => {
    const today: Date = new Date();

    const differenceInMilliseconds: number = expiredDay.getTime() - today.getTime();
    const differenceInDays: number = differenceInMilliseconds / (1000 * 3600 * 24);

    // Làm tròn kết quả (nếu cần)
    const roundedDifferenceInDays: number = Math.round(differenceInDays);

    return roundedDifferenceInDays;
  }

  const updateDaysBefore = (updateDay: Date) => {
    const today: Date = new Date();

    // Tính sự khác biệt trong số mili giây
    const differenceInMilliseconds: number = updateDay.getTime() - today.getTime();

    // Chuyển đổi thành số ngày
    const differenceInDays: number = differenceInMilliseconds / (1000 * 3600 * 24);

    // Kiểm tra nếu sự khác biệt lớn hơn hoặc bằng 1 ngày
    if (differenceInDays >= 1) {
      return differenceInDays;
    } else {
      // Chuyển đổi thành số giờ
      const differenceInHours: number = differenceInMilliseconds / (1000 * 3600);
      
      return differenceInHours;
    }
  }

  return (
    <>
      <div className="search-job">
        <div className="header">
          <div className="container">
            <div className="max-w-screen-lg mx-auto">
              <form className="box-search-job grid grid-cols-7 justify-center gap-x-4">
                <div className="group-search col-span-3 grid grid-cols-2">
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapPinIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả tỉnh/thành phố
                      </MenuItem>
                      {cities.map((city: any) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <StarIcon className="w-6 border-2 border-neutral-500 rounded-full" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả kinh nghiệm
                      </MenuItem>
                      {exp_year.map((exp: any) => (
                        <MenuItem key={exp.id} value={exp.id}>
                          {exp.name}
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
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
                <Button className="btn-search" variant="contained">
                  Tìm kiếm
                </Button>
              </form>

              <div className="search-result flex flex-row justify-between gap-x-96 mt-4">
                <div className="search-result-text font-bold text-white flex items-center mr-28 px-4 rounded-md">
                  <span>
                    <span className="high-light">Tổng</span>
                    <span className="total-job-search mx-1">117</span>
                    <span className="high-light">kết quả</span>
                  </span>
                </div>
                <div
                  className={`search-result-tool ml-28 flex flex-row items-center py-2 px-4 border border-transparent font-bold text-white rounded-md ${isActive ? "active" : ""}`}
                  onClick={handleClick}
                >
                  <Bars3Icon className="w-8 mr-2" />
                  <span>Lọc nâng cao</span>
                  {iconDirection === "down" ? (
                    <ChevronDownIcon className="w-8" />
                  ) : (
                    <ChevronUpIcon className="w-8" />
                  )}
                </div>
              </div>

              {boxOptionShow ? (
                <div className="box-option grid grid-cols-5 gap-x-4 mt-4 p-3">
                  <div className="item col-span-1">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BriefcaseIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CubeIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {job_field.map((field: any) => (
                        <MenuItem key={field.id} value={field.id}>
                          {field.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="item">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ClockIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {job_type.map((type: any) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="item">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AcademicCapIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {job_level.map((level: any) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="item">
                    <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue="0"
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FolderIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {news_type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="result-job-search">
          <div className="container">
            <div className="max-w-screen-lg mx-auto">
              <div className="list-job">
                <div className="job-body wrapper-main grid grid-cols-3 gap-x-4 py-4">
                  <div className="wrapper-content col-span-2">
                    <div className="job-list-search-result">
                      {/* job content */}
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-span-1 right-box box-interested text-black">
                    <div className="interested sticky top-3">
                      <div className="box-maybe-interested mb-3">
                        <h3 className="box-maybe-interested__title text-2xl font-bold mb-3">
                          Có thể bạn quan tâm
                        </h3>
                        <div className="box-maybe-interested__company border border-green-400 rounded-lg overflow-hidden">
                          <div className="box-maybe-interested__company--image">
                            <img src="../../../images/right-box-interested-logo.png" />
                          </div>
                          <div className="box-maybe-interested__company--content company p-5 bg-[#FAFEFD]">
                            <div className="company__info flex flex-row gap-5 pb-4 border-b border-slate-200">
                              <div className="company__info--logo w-24 h-24 min-w-24 min-h-24 flex items-center bg-white rounded-full border-2 border-slate-300 overflow-hidden">
                                <img src="../../../images/right-box-interested-company-logo.png" />
                              </div>
                              <div className="company__info--name text-xl font-bold flex flex-col gap-3">
                                Công ty TNHH Sailun Việt Nam
                                <img
                                  src="../../../images/right-box-interested-spotlight-company-logo.png"
                                  className="max-w-32 max-h-5"
                                />
                              </div>
                            </div>

                            <div className="company__job mt-3">
                              <div className="job job-ta py-4 text-sm font-semibold border-b border-slate-200">
                                <span className="job__name text-lg">
                                  Phiên Dịch Viên Tiếng Indonesia (Làm Việc Tại
                                  Kota Semarang){" "}
                                </span>
                                <div className="job__info mt-3 flex flex-row gap-5">
                                  <div className="job__info--salary flex flex-row items-center gap-2 text-green-500">
                                    <CurrencyDollarIcon className="w-4 h-4" />
                                    <span>Thoả thuận</span>
                                  </div>
                                  <div className="job__info--address flex flex-row items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="rgb(34 197 94)"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <Tooltip
                                      title="Tây Ninh: Gò Dầu"
                                      placement="top"
                                    >
                                      <span className="font-normal">
                                        Tây Ninh
                                      </span>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="company__job mt-3">
                              <div className="job job-ta py-4 text-sm font-semibold border-b border-slate-200">
                                <span className="job__name text-lg">
                                  Phiên Dịch Viên Tiếng Indonesia (Làm Việc Tại
                                  Kota Semarang){" "}
                                </span>
                                <div className="job__info mt-3 flex flex-row gap-5">
                                  <div className="job__info--salary flex flex-row items-center gap-2 text-green-500">
                                    <CurrencyDollarIcon className="w-4 h-4" />
                                    <span>Thoả thuận</span>
                                  </div>
                                  <div className="job__info--address flex flex-row items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="rgb(34 197 94)"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <Tooltip
                                      title="Tây Ninh: Gò Dầu"
                                      placement="top"
                                    >
                                      <span className="font-normal">
                                        Tây Ninh
                                      </span>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="company__job mt-3">
                              <div className="job job-ta py-4 text-sm font-semibold border-b border-slate-200">
                                <span className="job__name text-lg">
                                  Phiên Dịch Viên Tiếng Indonesia (Làm Việc Tại
                                  Kota Semarang){" "}
                                </span>
                                <div className="job__info mt-3 flex flex-row gap-5">
                                  <div className="job__info--salary flex flex-row items-center gap-2 text-green-500">
                                    <CurrencyDollarIcon className="w-4 h-4" />
                                    <span>Thoả thuận</span>
                                  </div>
                                  <div className="job__info--address flex flex-row items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="rgb(34 197 94)"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <Tooltip
                                      title="Tây Ninh: Gò Dầu"
                                      placement="top"
                                    >
                                      <span className="font-normal">
                                        Tây Ninh
                                      </span>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="company__link mt-5 px-7 py-3 bg-green-500 rounded-lg text-white font-bold text-center cursor-pointer">
                              Tìm hiểu ngay
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box-maybe-interested__banner">
                        <img
                          src="../../../images/right-box-interested-banner.png"
                          className="max-w-full rounded-lg"
                        />
                      </div>
                    </div>
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

export default SearchJob;
