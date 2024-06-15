// khoa
import { useState } from 'react';
import React from 'react';
import { TextField, InputAdornment, MenuItem } from '@mui/material';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import {
  BriefcaseIcon,
  CubeIcon,
  ClockIcon,
  AcademicCapIcon,
  FolderIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { DefaultPagination } from '../../shared/components/default-pagination';
import SearchBoxComponent from '../../layouts/UserLayout/components/SearchBoxComponent';
import InterestedJobComponent from '../../layouts/UserLayout/components/InterestedJobComponent';
import JobListItem from '../../shared/components/JobListItem';
import {
  getAllExp,
  getAllFields,
  getAllLevel,
  getAllLocation,
  getAllMajor,
  getAllType,
  searchJob,
} from '../../modules/helper';

const news_type = [
  {
    value: '0',
    label: 'Tất cả loại tin',
  },
  {
    value: '1',
    label: 'Tin đăng NTD tương tác thường xuyên',
  },
  {
    value: '2',
    label: 'Tin đăng thường',
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

  const [cities, setCities] = useState<any[]>([]);
  const [exp_year, setExpYear] = useState<any[]>([]);
  const [majors, setMajor] = useState<any[]>([]);
  const [fields, setField] = useState<any[]>([]);
  const [types, setType] = useState<any[]>([]);
  const [levels, setLevel] = useState<any[]>([]);

  const [filter, setFilter] = useState<filterSearch>({
    titleRecruitment: '',
    salaryMin: 0,
    salaryMax: 0,
    locationId: 0,
    expId: 0,
  });

  const [searchParam, setSearchParam] = useState<SearchParams>({
    titleRecruitment: '',
    salaryMin: 0,
    salaryMax: 0,
    locationId: 0,
    expId: 0,
    majorId: 0,
    fieldId: 0,
    typeId: 0,
    levelId: 0,
  });

  const getParams = () => {
    const params = new URLSearchParams(window.location.search);

    const newLocationId = Number(params.get('locationId')) ?? 0;
    const newExpId = Number(params.get('expId')) ?? 0;
    const newTitleRecruitment = params.get('titleRecruitment') ?? '';
    const newSalaryMin = Number(params.get('salaryMin')) ?? 0;
    const newSalaryMax = Number(params.get('salaryMax')) ?? 0;

    setSearchParam({
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
  };

  React.useEffect(() => {
    getParams();
  }, []);

  const [isActive, setIsActive] = useState(false);
  const [iconDirection, setIconDirection] = useState('down');
  const [boxOptionShow, setBoxOptionShow] = useState(false);

  const [jobResult, setJobResult] = useState([]);
  const [totalJob, setTotalJob] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const locationResponse = await getAllLocation();
      setCities(locationResponse);

      const expResponse = await getAllExp();
      setExpYear(expResponse);

      const majorResponse = await getAllMajor();
      setMajor(majorResponse);

      const fieldResponse = await getAllFields();
      setField(fieldResponse);

      const typeResponse = await getAllType();
      setType(typeResponse);

      const levelResponse = await getAllLevel();
      setLevel(levelResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
    findJob();
  }, []);

  React.useEffect(() => {
    findJob();
  }, [page, searchParam]);

  const findJob = () => {
    searchJob({
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
      console.log(response);

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

  const handleClick = () => {
    setIsActive(!isActive);
    setIconDirection(iconDirection === 'down' ? 'up' : 'down');
    setBoxOptionShow(!boxOptionShow);
  };

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

    getParams();

    // searchJob();
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
                  className={`search-result-tool ml-28 flex flex-row items-center py-2 px-4 border border-transparent font-bold text-white rounded-md ${isActive ? 'active' : ''}`}
                  onClick={handleClick}
                >
                  <Bars3Icon className="w-8 mr-2" />
                  <span>Lọc nâng cao</span>
                  {iconDirection === 'down' ? (
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
                        setFilter((prevState) => ({
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
                        : 'Error to fetch majors'}
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
                        setFilter((prevState) => ({
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
                        : 'Error to fetch fields'}
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
                        setFilter((prevState) => ({
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
                        : 'Error to fetch types'}
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
                        setFilter((prevState) => ({
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
                        : 'Error to fetch levels'}
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
                          return <JobListItem item={item} />;
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
