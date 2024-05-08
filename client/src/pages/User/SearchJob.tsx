// khoa
import { useState } from "react";
import React from "react";
import JobService from "../../modules/job-module";
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
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultPagination } from "../../shared/components/default-pagination";
import SearchBoxComponent from "../../layouts/UserLayout/components/SearchBoxComponent";
import InterestedJobComponent from "../../layouts/UserLayout/components/InterestedJobComponent";

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
const job_field = [
  {
    value: "0",
    label: "Tất cả lĩnh vực",
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
const job_type = [
  {
    value: "0",
    label: "Tất cả hình thức",
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
const job_level = [
  {
    value: "0",
    label: "Tất cả cấp bậc",
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
  const url = useLocation();

  const searchParams = new URLSearchParams(url.search);
  const newLocationId = Number(searchParams.get("locationId")) ?? 0;
  const newExpId = Number(searchParams.get("expId")) ?? 0;
  const newTitleRecruitment = searchParams.get("titleRecruitment") ?? "";

  const [cities, setCities] = useState<any[]>([]);
  const [exp_year, setExpYear] = useState<any[]>([]);

  const [locationId, setLocationId] = useState(newLocationId);
  const [expId, setExpId] = useState(newExpId);
  const [titleRecruitment, setTitleRecruitment] = useState(newTitleRecruitment);

  const [isActive, setIsActive] = useState(false);
  const [iconDirection, setIconDirection] = useState("down");
  const [boxOptionShow, setBoxOptionShow] = useState(false);

  const [jobResult, setJobResult] = useState([]);
  const [totalJob, setTotalJob] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const locationResponse = await JobService.getAllLocation();
      setCities(locationResponse);

      const expResponse = await JobService.getAllExp();
      setExpYear(expResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
    searchJob();
  }, []);

  React.useEffect(() => {
    searchJob();
  }, [page]);

  const searchJob = () => {
    JobService.searchJob({
      page: page,
      titleRecruitment: titleRecruitment,
      locationId: locationId,
      expId: expId,
    }).then((response) => {
      console.log(response);

      setJobResult(response.data);
      setTotalPage(response.total_pages);
      setTotalJob(response.total);
    });
  };

  const handleClick = () => {
    setIsActive(!isActive);
    setIconDirection(iconDirection === "down" ? "up" : "down");
    setBoxOptionShow(!boxOptionShow);
  };

  const handleSearch = () => {
    navigation(
      `/results?locationId=${locationId}&expId=${expId}&titleRecruitment=${titleRecruitment}`
    );

    searchJob();
  };

  return (
    <>
      <div className="search-job">
        <div className="header">
          <div className="container">
            <div className="max-w-screen-lg mx-auto">
              <SearchBoxComponent
                cities={cities}
                setCities={setCities}
                exp_year={exp_year}
                setExpYear={setExpYear}
                locationId={locationId}
                setLocationId={setLocationId}
                expId={expId}
                setExpId={setExpId}
                titleRecruitment={titleRecruitment}
                setTitleRecruitment={setTitleRecruitment}
                handleSearch={handleSearch}
              />

              <div className="search-result flex flex-row justify-between gap-x-96 mt-4">
                <div className="search-result-text font-bold text-white flex items-center mr-28 px-4 rounded-md">
                  <span>
                    <span className="high-light">Tổng</span>
                    <span className="total-job-search mx-1">{totalJob}</span>
                    <span className="high-light">kết quả</span>
                  </span>
                </div>
                <div
                  className={`search-result-tool ml-28 flex flex-row items-center py-2 px-4 border border-transparent font-bold text-white rounded-md ${isActive ? "active" : ""}`}
                  // onClick={handleClick}
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ClockIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
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
                      className="w-full"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AcademicCapIcon className="w-7" />
                          </InputAdornment>
                        ),
                      }}
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
                      {jobResult.length > 0 ? (
                        jobResult.map((item: any) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                navigation(`/detail-job/${item.id}`);
                              }}
                              className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3"
                            >
                              <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
                                <img
                                  src={
                                    item.company?.image
                                      ? item.company?.image
                                      : "no "
                                  }
                                />
                              </div>
                              <div className="job-detail w-full h-full">
                                <div className="flex flex-col">
                                  <div className="flex flex-row justify-between">
                                    <span className="job-title text-black font-semibold col-span-3 text-lg">
                                      {item.titleRecruitment}
                                    </span>
                                    <div className="job-salary col-start-4 flex items-center">
                                      <CurrencyDollarIcon className="w-5 mr-2" />
                                      <strong className="salary-count">
                                        {item.salaryMin == 0 &&
                                        item.salaryMax == 0
                                          ? "Thoả thuận"
                                          : `${item.salaryMin} - ${item.salaryMax} ${item.currency.name}`}{" "}
                                      </strong>
                                    </div>
                                  </div>
                                  <span className="job-company-name text-slate-600 text-sm col-span-3 mb-2">
                                    {item.company?.name
                                      ? item.company?.name
                                      : "no name"}
                                  </span>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex flex-row">
                                    {item.fields.map(
                                      (e: any, index: number) => (
                                        <div
                                          className="job-sub-detail job-location text-xs"
                                          key={index}
                                        >
                                          {e.name}
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <div className="flex flex-row space-x-1">
                                    <span className="job-sub-detail job-remaining-application-days text-xs">
                                      Hạn nộp: {item.expiredDate.split("T")[0]}
                                    </span>
                                    <span className="job-sub-detail job-update-time text-xs">
                                      Cập nhật {item.updateAt.split("T")[0]}
                                    </span>
                                  </div>
                                </div>

                                <div className="job-actions row-start-4 flex items-center justify-end">
                                  <span className="btn-apply mr-2">
                                    Ứng tuyển
                                  </span>
                                  <span className="btn-save">
                                    <Tooltip title="Lưu" placement="top">
                                      <HeartIcon className="w-5" />
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
                      <DefaultPagination
                        totalPage={totalPage}
                        active={page}
                        setActive={setPage}
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-span-1 right-box box-interested text-black">
                    <div className="interested sticky top-24">
                      <InterestedJobComponent />
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
