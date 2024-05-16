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

const salary_range = [
  {
    value: "0",
    label: "Tất cả mức lương",
    minSalary: 0,
    maxSalary: 0,
  },
  {
    value: "1",
    label: "Dưới 10 triệu",
    minSalary: 0,
    maxSalary: 10,
  },
  {
    value: "2",
    label: "10 - 15 triệu",
    minSalary: 10,
    maxSalary: 15,
  },
  {
    value: "3",
    label: "15 - 20 triệu",
    minSalary: 15,
    maxSalary: 20,
  },
  {
    value: "4",
    label: "20 - 25 triệu",
    minSalary: 20,
    maxSalary: 25,
  },
  {
    value: "5",
    label: "25 - 30 triệu",
    minSalary: 25,
    maxSalary: 30,
  },
  {
    value: "6",
    label: "30 - 50 triệu",
    minSalary: 30,
    maxSalary: 50,
  },
  {
    value: "7",
    label: "Trên 50 triệu",
    minSalary: 50,
    maxSalary: 0,
  },
  {
    value: "8",
    label: "Thỏa thuận",
    minSalary: 0,
    maxSalary: 0,
  },
];

const news_type = [
  {
    value: "0",
    label: "Tất cả loại tin",
  },
  {
    value: "1",
    label: "Tin đăng NTD tương tác thường xuyên",
  },
  {
    value: "2",
    label: "Tin đăng thường",
  },
];
interface filterSearch {
  titleRecruitment: string;
  salaryMin: number;
  salaryMax: number;
  locationId: number;
  expId: number;
}

interface SearchParams {
  titleRecruitment: string;
  salaryMin: number;
  salaryMax: number;
  locationId: number;
  expId: number;
  majorId: number;
  fieldId: number;
  typeId: number;
  levelId: number;
}

function SearchJob() {
  const navigation = useNavigate();
  const url = useLocation();

  const searchParams = new URLSearchParams(url.search);
  const newLocationId = Number(searchParams.get("locationId")) ?? 0;
  const newExpId = Number(searchParams.get("expId")) ?? 0;
  const newTitleRecruitment = searchParams.get("titleRecruitment") ?? "";
  const newSalaryMin = Number(searchParams.get("salaryMin")) ?? 0;
  const newSalaryMax = Number(searchParams.get("salaryMax")) ?? 0;

  function findSalaryRangeValue(
    minSalary: number,
    maxSalary: number,
    salaryRanges: any[]
  ) {
    if (minSalary === 0 && maxSalary === 0) {
      return "0";
    }

    const selectedRange = salaryRanges.find(
      (range) => range.minSalary === minSalary && range.maxSalary === maxSalary
    );
    return selectedRange ? selectedRange.value : "0";
  }

  const [cities, setCities] = useState<any[]>([]);
  const [exp_year, setExpYear] = useState<any[]>([]);
  const [majors, setMajor] = useState<any[]>([]);
  const [fields, setField] = useState<any[]>([]);
  const [types, setType] = useState<any[]>([]);
  const [levels, setLevel] = useState<any[]>([]);

  const [filter, setFilter] = useState<filterSearch>({
    titleRecruitment: "",
    salaryMin: 0,
    salaryMax: 0,
    locationId: 0,
    expId: 0,
  });

  const [searchParam, setSearchParam] = useState<SearchParams>({
    titleRecruitment: newTitleRecruitment,
    salaryMin: newSalaryMin,
    salaryMax: newSalaryMax,
    locationId: newLocationId,
    expId: newExpId,
    majorId: 0,
    fieldId: 0,
    typeId: 0,
    levelId: 0,
  });

  // const [locationId, setLocationId] = useState(newLocationId);
  // const [expId, setExpId] = useState(newExpId);
  // const [titleRecruitment, setTitleRecruitment] = useState(newTitleRecruitment);

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

      const majorResponse = await JobService.getAllMajor();
      setMajor(majorResponse);

      const fieldResponse = await JobService.getAllField();
      setField(fieldResponse);

      const typeResponse = await JobService.getAllType();
      setType(typeResponse);

      const levelResponse = await JobService.getAllLevel();
      setLevel(levelResponse);
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
      titleRecruitment: searchParam.titleRecruitment,
      locationId: searchParam.locationId,
      expId: searchParam.expId,
      salaryMin: searchParam.salaryMin,
      salaryMax: searchParam.salaryMax,
      fieldId: searchParam.fieldId,
      majorId: searchParam.majorId,
      levelId: searchParam.levelId,
      typeId: searchParam.typeId,
    }).then((response) => {
      // console.log(response);

      setJobResult(response.data);
      setTotalPage(response.total_pages);
      setTotalJob(response.total);
    });
  };

  const SelectLocation = (value: number) => {
    setFilter((prevState) => ({ ...prevState, locationId: value }));
  };

  const SelectExp = (value: number) => {
    setFilter((prevState) => ({ ...prevState, expId: value }));
  };

  const setTitleRecruitment = (value: string) => {
    setFilter((prevState) => ({ ...prevState, titleRecruitment: value }));
  };

  const SelectSalary = (value: number) => {
    if (value !== 0) {
      const foundRange = salary_range.find(
        (range) => Number(range.value) === value
      );
      if (foundRange) {
        setSearchParam((prevFilter) => ({
          ...prevFilter,
          salaryMin: foundRange.minSalary,
          salaryMax: foundRange.maxSalary,
        }));
      }
    } else {
      setSearchParam((prevFilter) => ({
        ...prevFilter,
        salaryMin: 0,
        salaryMax: 0,
      }));
    }
  };

  const handleClick = () => {
    setIsActive(!isActive);
    setIconDirection(iconDirection === "down" ? "up" : "down");
    setBoxOptionShow(!boxOptionShow);
  };

  const handleSearch = () => {
    const queryParams = {
      titleRecruitment:
        filter.titleRecruitment !== ""
          ? `titleRecruitment=${filter.titleRecruitment}`
          : "",
      salaryMin: filter.salaryMin !== 0 ? `salaryMin=${filter.salaryMin}` : "",
      salaryMax: filter.salaryMax !== 0 ? `salaryMax=${filter.salaryMax}` : "",
      locationId:
        filter.locationId !== 0 ? `locationId=${filter.locationId}` : "",
      expId: filter.expId !== 0 ? `expId=${filter.expId}` : "",
    };

    const queryString = Object.values(queryParams)
      .filter((param) => param !== "")
      .join("&");

    navigation(`/results?${queryString}`);

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
                locationId={filter.locationId}
                setLocationId={SelectLocation}
                expId={filter.expId}
                setExpId={SelectExp}
                titleRecruitment={filter.titleRecruitment}
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
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setSearchParam((prevState) => ({
                          ...prevState,
                          majorId: Number(e.target.value),
                        }));
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả ngành nghề
                      </MenuItem>
                      {majors
                        ? majors.map((major: any) => (
                            <MenuItem key={major.id} value={major.id}>
                              {major.name}
                            </MenuItem>
                          ))
                        : "Error to fetch majors"}
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
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setSearchParam((prevState) => ({
                          ...prevState,
                          fieldId: Number(e.target.value),
                        }));
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả lĩnh vực
                      </MenuItem>
                      {fields
                        ? fields.map((field: any) => (
                            <MenuItem key={field.id} value={field.id}>
                              {field.name}
                            </MenuItem>
                          ))
                        : "Error to fetch fields"}
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
                      onChange={(e) => {
                        setSearchParam((prevState) => ({
                          ...prevState,
                          typeId: Number(e.target.value),
                        }));
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả hình thức
                      </MenuItem>
                      {types
                        ? types.map((type: any) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))
                        : "Error to fetch types"}
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
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        },
                      }}
                      onChange={(e) => {
                        setSearchParam((prevState) => ({
                          ...prevState,
                          levelId: Number(e.target.value),
                        }));
                      }}
                    >
                      <MenuItem key="0" value="0">
                        Tất cả cấp bậc
                      </MenuItem>
                      {levels
                        ? levels.map((level: any) => (
                            <MenuItem key={level.id} value={level.id}>
                              {level.name}
                            </MenuItem>
                          ))
                        : "Error to fetch levels"}
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
