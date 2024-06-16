/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Pencil,
  Folder,
  CircleHelp,
  MapPin,
  ThumbsUp,
  AlignLeft,
  WandSparklesIcon,
  Bold,
  Underline,
  Italic,
  List,
  ListOrdered,
  BriefcaseBusiness,
  Image,
  Video,
} from 'lucide-react';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select, { MultiValue, SingleValue } from 'react-select';
import SingleDropdown from '../components/SingleDropDown';
import MultiDropdown from '../components/MultiDropDown';
import Option from '../types/Option.type';
import { RecruitmentFromServer } from '../types/Recruitment.type';
import axios from 'axios';
import { useProfileContext } from '../services/authen/domain/context';
import { getProfile } from '../../modules/hr-module';
import { districts } from '../types/Districts';
function CampaignEditCard({
  jobItem,
  fields,
  // employer,
}: {
  jobItem: RecruitmentFromServer;
  fields: any;
  employer: any;
}) {
  // console.log(jobItem);
  const { id: compaignId } = useParams();
  const navigate = useNavigate();

  const [, setDistrictOption] = useState<{ value: string; label: string }[]>(
    [],
  );
  function getAllDistrictsOfProvinces(
    provinceNames: string[],
  ): { value: string; label: string }[] {
    const allDistricts: { value: string; label: string }[] = [];
    provinceNames.forEach((provinceName) => {
      const province = districts.data.find(
        (p: { name: string }) => p.name === provinceName,
      );
      if (province) {
        allDistricts.push(...province.districts);
      }
    });
    return allDistricts;
  }
  const handleProvinceChange = (
    selectedProvinces: MultiValue<{ value: string; label: string }> | null,
  ) => {
    setCityOptions(selectedProvinces); // Update the cityOptions state with the selected provinces

    const selectedProvinceNames = selectedProvinces
      ? selectedProvinces.map((province) => province.label)
      : [];

    const allDistricts = getAllDistrictsOfProvinces(selectedProvinceNames);

    setDistrictOption(allDistricts);
  };
  const convertToOptions = (data: { id: string; name: string }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const gender = [
    { value: 'Không quan trọng', label: 'Không quan trọng' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Nam', label: 'Nam' },
  ];
  const major = convertToOptions(fields?.major);
  const city = convertToOptions(fields?.location);
  const level = convertToOptions(fields?.level);
  const currency = convertToOptions(fields?.currency);
  const defaultCurrency = currency.find((item) => {
    return item.value === jobItem.currency.id.toString();
  }) as Option;
  const field = convertToOptions(fields?.field);
  const exp = convertToOptions(fields?.exp);
  const typeOptions = convertToOptions(fields?.type);
  // const my_city = city.filter((item) =>
  //   jobItem.locations
  //     .map((item1) => item1.id)
  //     .includes(Number.parseInt(item.value)),
  // );
  // const districtOptions = getAllDistrictsOfProvinces(
  //   my_city.map((item) => item.label),
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useProfileContext();
  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      const res = await getProfile(token!);
      console.log(res.companyId);
    };

    fetchData();
  }, []);
  const [, setUserChoice] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [careerOptions, setCareerOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    major.find((item) => item.value === jobItem.major.id.toString()) || null,
  );
  const [cityOption, setCityOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(
    city.filter((item) =>
      jobItem.locations
        .map((item1) => item1.id)
        .includes(Number.parseInt(item.value)),
    ) || null,
  );
  // const [, setDistrictOptions] = useState<SingleValue<{
  //   value: string;
  //   label: string;
  // }> | null>(null);
  const [jobTypeOptions, setjobTypeOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    typeOptions.find((item) => {
      return item.value === jobItem.type.id.toString();
    }) || null,
  );
  const [genderOptions, setGenderOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    gender.find((item) => {
      return item.label === jobItem.jobDetail.gender;
    }) || null,
  );
  const [levelOptions, setLevelOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    level.find((item) => {
      return item.value === jobItem.level.id.toString();
    }) || null,
  );
  const [expOptions, setExpOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    exp.find((item) => {
      return item.value === jobItem.exp.id.toString();
    }) || null,
  );
  const [currencyOptions, setCurrencyOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(
    currency.find((item) => {
      return item.value === jobItem.currency.id.toString();
    }) || null,
  );
  const [fieldOptions, setFieldOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(
    field.filter((item) =>
      jobItem.fields
        .map((item1) => item1.id)
        .includes(Number.parseInt(item.value)),
    ) || null,
  );
  const [salaryError, setSalaryError] = useState(false);
  const [salaryMaxError, setSalaryMaxError] = useState(false);
  const [showPopup, setShowPopup] = useState(
    jobItem.salaryMax !== 0 && jobItem.salaryMin !== 0,
  );
  const [salary, setSalary] = useState(jobItem.salaryMin.toString());
  const [salaryMax, setSalaryMax] = useState(jobItem.salaryMax.toString());
  const [date, setDate] = useState(jobItem.expiredDate);
  const today = new Date(jobItem.expiredDate);
  const day = today.setDate(today.getDate());
  const defaultValue = new Date(day).toISOString().split('T')[0];
  const [item] = useState({
    id: jobItem.id,
    titleRecruitment: jobItem.titleRecruitment,
    campaignId: jobItem.campaignId,
    salaryMin: jobItem.salaryMin,
    salaryMax: jobItem.salaryMax,
    expiredDate: jobItem.expiredDate,
    createAt: jobItem.createAt,
    updateAt: jobItem.updateAt,
    status: jobItem.status,
    locations: jobItem.locations,
    fields: jobItem.fields,
    jobDetail: jobItem.jobDetail,
    levelId: jobItem.levelId,
    majorId: jobItem.majorId,
    typeId: jobItem.typeId,
    currencyId: jobItem.currencyId,
    expId: jobItem.expId,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (!salaryError && !salaryMaxError) {
      const updatedItem = { ...item };

      // Modify each property
      updatedItem.titleRecruitment = data.title;
      updatedItem.majorId = Number.parseInt(
        careerOptions?.value !== undefined ? careerOptions?.value : '0',
      );
      updatedItem.fields = fieldOptions
        ? fieldOptions.map((option) => ({
            id: Number.parseInt(option.value),
            name: option.label,
          }))
        : [];
      updatedItem.typeId = Number.parseInt(
        jobTypeOptions?.value !== undefined ? jobTypeOptions?.value : '0',
      );
      updatedItem.currencyId = Number.parseInt(
        currencyOptions?.value !== undefined ? currencyOptions?.value : '0',
      );
      updatedItem.levelId = Number.parseInt(
        levelOptions?.value !== undefined ? levelOptions.value : '0',
      );
      updatedItem.campaignId = Number.parseInt(compaignId as string) as number;
      updatedItem.salaryMin = salary !== '' ? Number.parseInt(salary) : 0;
      updatedItem.salaryMax = salaryMax !== '' ? Number.parseInt(salaryMax) : 0;
      updatedItem.expId = Number.parseInt(
        expOptions?.value !== undefined ? expOptions?.value : '0',
      );
      updatedItem.locations = cityOption
        ? cityOption.map((option) => ({
            id: Number.parseInt(option.value),
            name: option.label,
          }))
        : [];
      updatedItem.expiredDate = date;
      updatedItem.jobDetail = {
        ...updatedItem.jobDetail,
        quantity: Number.parseInt(data.quantity),
        jobSchedule: data.schedule,
        gender: genderOptions?.value ? genderOptions?.value : 'Any',
        description: data.description,
        benefit: data.benefit,
        requirement: data.requirement,
        skills: data.skill,
        id: jobItem.jobDetail.id,
      };
      //debug line
      console.log(JSON.stringify(updatedItem));
      try {
        const response = await axios.put(
          'http://34.28.130.105/job/update-job',
          JSON.stringify(updatedItem),
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status !== 200) {
          throw new Error('Failed to post data to API');
        }

        console.log(response);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    } else {
      //Do nothing
    }
    navigate(-1);
  };
  const handleSalaryError = (value: SetStateAction<string>) => {
    setSalary(value);
    if (value.length === 0) {
      setSalaryError(true);
    } else {
      setSalaryError(false);
    }
  };
  const handleSalaryMaxError = (value: SetStateAction<string>) => {
    setSalaryMax(value);
    if (value.length === 0) {
      setSalaryMaxError(true);
    } else {
      setSalaryMaxError(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const togglePopup = (
    choice: SetStateAction<SingleValue<{ value: string; label: string }>>,
  ) => {
    if (choice !== null) {
      if (typeof choice !== 'function' && choice.value === 'Trong khoảng') {
        if (jobItem.salaryMax !== null && !jobItem.salaryMin !== null) {
          setShowPopup(true);
          setSalaryError(false);
          setSalaryMaxError(false);
        } else {
          setShowPopup(true);
          setSalaryError(true);
          setSalaryMaxError(true);
        }
      } else {
        setShowPopup(false);
        setSalaryError(false);
        setSalaryMaxError(false);
      }
    } else {
      setShowPopup(false);
      setSalaryError(true);
      setSalaryMaxError(true);
    }
    setUserChoice(choice);
  };

  // const cityOptions = [
  //   { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
  //   { value: 'Bình Dương', label: 'Bình Dương' },
  //   { value: 'Bắc Ninh', label: 'Bắc Ninh' },
  //   { value: 'Đồng Nai', label: 'Đồng Nai' },
  //   { value: 'Hưng Yên', label: 'Hưng Yên' },
  //   { value: 'Hải Dương', label: 'Hải Dương' },
  //   { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  // ];
  const salaryOptions = [
    { value: 'Trong khoảng', label: 'Trong khoảng' },
    { value: 'Thỏa thuận', label: 'Thỏa thuận' },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col overflow-x-hidden">
        <h1 className="text-black text-xl font-bold mb-5 pt-4">
          Thông tin đăng tuyển chi tiết
        </h1>
        <div className="bg-white p-4 rounded-sm mb-5 border-l-2 border-green-700">
          <span>
            Tin tuyển dụng của bạn sẽ được kiểm duyệt trước khi chính thức hiển
            thị với các ứng viên tiềm năng.{' '}
            <button className="text-green-500 bg-white">
              Tìm hiểu về Quy định đăng tin tại t4CVs.
            </button>
          </span>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <Pencil
                style={{
                  fill: 'black',
                  stroke: '#EEEEEE',
                  color: 'white',
                  width: 20,
                  height: 20,
                }}
              ></Pencil>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Tiêu đề tuyển dụng</span>
              <input
                type="text"
                className=" bg-white border-b-2 border-slate-100 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="VD: Nhân viên Marketing"
                defaultValue={jobItem.titleRecruitment}
                {...register('title', {
                  required: true,
                })}
              />
              {errors.title && (
                <p className="text-red-700">Tiêu đề không được để trống</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <Folder
                style={{
                  fill: 'black',
                  stroke: '#EEEEEE',
                  color: 'white',
                  width: 20,
                  height: 20,
                }}
              ></Folder>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Ngành nghề và lĩnh vực</span>
              <div className="flex flex-row space-x-10 mb-8">
                <div className="w-3/12 space-y-2">
                  <span className="text-gray-500 text-base font-semibold">
                    Ngành nghề chính
                  </span>
                  <div>
                    <SingleDropdown
                      placeholder="Lựa chọn tối đa một ngành nghề chính cho tin tuyển dụng"
                      options={major}
                      onChange={(e: SetStateAction<SingleValue<Option>>) =>
                        setCareerOptions(e)
                      }
                      defaultValue={major.find((item) => {
                        return item.value === jobItem.major.id.toString();
                      })}
                    />
                  </div>
                </div>
                <div className="w-8/12 space-y-2">
                  <span className="text-gray-500 text-base font-semibold">
                    Ngành nghề phụ
                  </span>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: 'none',
                          borderColor: '#6B728064',
                          '&:hover': {
                            borderColor: 'green',
                          },
                        }),
                        option: (base) => ({
                          ...base,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: 'lightgrey',
                            fontWeight: 'bold',
                          },
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: '#C4F0D5',
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: 'black',
                        }),

                        placeholder: (base) => ({
                          ...base,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: '200px',
                          overflowY: 'auto',
                        }),
                      }}
                      isClearable
                      isMulti
                      placeholder="Lựa chọn tối đa 2 ngành nghề"
                      name="cities"
                      options={field}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setFieldOptions(e)}
                      isOptionDisabled={() =>
                        fieldOptions !== null ? fieldOptions.length >= 2 : false
                      }
                      defaultValue={field.filter((item) =>
                        jobItem.fields
                          .map((item1) => item1.id)
                          .includes(Number.parseInt(item.value)),
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="px-1 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-lg">i</span>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Thông tin chung</span>
              <div className="w-full space-y-4">
                <div className="text-base mb-4">
                  Một số thông tin đã được điền sẵn dựa trên thông tin của chiến
                  dịch tuyển dụng mà bạn đã tạo trước đó
                </div>
                <div className="flex flex-row space-x-10 items-center">
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">
                      Số lượng tuyển
                    </span>
                    <input
                      type="number"
                      className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                      placeholder="Nhập số lượng"
                      {...register('quantity', {
                        required: true,
                      })}
                      defaultValue={jobItem.jobDetail.quantity}
                    />
                  </div>
                  <div className="space-y-2 w-3/12">
                    <div className="flex flex-row space-x-1 items-center">
                      <span className="text-base font-semibold">
                        Loại công việc
                      </span>
                      <CircleHelp
                        className="text-slate-700"
                        style={{ width: 14, height: 14 }}
                      />
                    </div>
                    <div>
                      <SingleDropdown
                        placeholder="-- Chọn loại công việc --"
                        options={typeOptions}
                        onChange={(
                          e: SetStateAction<
                            SingleValue<{ value: string; label: string }>
                          >,
                        ) => setjobTypeOptions(e)}
                        defaultValue={typeOptions.find((item) => {
                          return item.value === jobItem.type.id.toString();
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">
                      Thời gian làm việc
                    </span>
                    <input
                      type="text"
                      className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                      placeholder="Nhập thời gian làm việc"
                      {...register('schedule', {
                        required: true,
                      })}
                      defaultValue={jobItem.jobDetail.jobSchedule}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">Giới tính</span>
                    <div>
                      <SingleDropdown
                        placeholder="-- Chọn giới tính --"
                        options={gender}
                        onChange={(
                          e: SetStateAction<
                            SingleValue<{ value: string; label: string }>
                          >,
                        ) => setGenderOptions(e)}
                        defaultValue={gender.find((item) => {
                          return item.value === jobItem.jobDetail.gender;
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">Cấp bậc</span>
                    <div>
                      <SingleDropdown
                        placeholder="-- Chọn cấp bậc --"
                        options={level}
                        onChange={(
                          e: SetStateAction<
                            SingleValue<{ value: string; label: string }>
                          >,
                        ) => setLevelOptions(e)}
                        defaultValue={level.find((item) => {
                          return item.value === jobItem.level.id.toString();
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">Kinh nghiệm</span>
                    <div>
                      <SingleDropdown
                        placeholder="-- Chọn kinh nghiệm --"
                        options={exp}
                        onChange={(
                          e: SetStateAction<
                            SingleValue<{ value: string; label: string }>
                          >,
                        ) => setExpOptions(e)}
                        defaultValue={exp.find((item) => {
                          return item.value === jobItem.exp.id.toString();
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-base font-semibold mt-4">Mức lương</div>
                <div className="flex flex-row space-x-10 items-center">
                  <div className="space-y-2 w-3/12">
                    <span className="text-base font-semibold">
                      Loại tiền tệ
                    </span>
                    <div>
                      <SingleDropdown
                        placeholder="-- Chọn loại tiền tệ --"
                        options={currency}
                        onChange={(
                          e: SetStateAction<
                            SingleValue<{ value: string; label: string }>
                          >,
                        ) => setCurrencyOptions(e)}
                        defaultValue={defaultCurrency}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-3/12">
                    <div className="flex flex-row space-x-1 items-center">
                      <span className="text-base font-semibold">
                        Kiểu lương
                      </span>
                    </div>
                    <div>
                      <SingleDropdown
                        placeholder="-- Kiểu lương --"
                        options={salaryOptions}
                        onChange={togglePopup}
                        defaultValue={
                          jobItem.salaryMin !== 0 && jobItem.salaryMax !== 0
                            ? salaryOptions[0]
                            : salaryOptions[1]
                        }
                      />
                    </div>
                  </div>
                  {showPopup && (
                    <div className="flex flex-row space-x-5 w-3/12">
                      <div className="space-y-2 w-1/2 bg-red">
                        <span className="text-base font-semibold">Từ</span>
                        <input
                          type="text"
                          className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                          placeholder="0"
                          defaultValue={jobItem.salaryMin}
                          onChange={(e) => handleSalaryError(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 w-1/2 bg-red">
                        <span className="text-base font-semibold">Đến</span>
                        <input
                          type="text"
                          className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                          placeholder="0"
                          defaultValue={jobItem.salaryMax}
                          onChange={(e) => handleSalaryMaxError(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-base font-semibold mt-4">Khu vực</div>
                <div className="w-full bg-gray-200 space-y-5 p-4">
                  <div className="flex flex-row items-center w-full ">
                    <MapPin
                      style={{
                        fill: 'black',
                        stroke: '#EEEEEE',
                        color: 'white',
                        width: 20,
                        height: 20,
                      }}
                    ></MapPin>
                    <div className="font-bold text-base mr-10">Khu vực: </div>
                    <div className="w-5/12">
                      <MultiDropdown
                        placeholder="Chọn Tỉnh/ Thành phố"
                        onChange={handleProvinceChange}
                        options={city}
                        defaultValue={city.filter((item) =>
                          jobItem.locations
                            .map((item1) => item1.id)
                            .includes(Number.parseInt(item.value)),
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-10">
                    <div className="w-full">
                      <input
                        type="text"
                        className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                        placeholder="Nhập địa điểm làm việc cụ thể"
                        {...register('address', {
                          required: true,
                        })}
                        defaultValue={jobItem.company.address}
                      />
                    </div>
                  </div>
                  <button className="text-[13px] text-green-500 bg-gray-200 mt-2">
                    + Thêm địa chỉ
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(errors.quantity ||
            salaryMaxError ||
            salaryError ||
            errors.schedule ||
            errors.address) && (
            <div className="ml-14 text-red-700">
              Vui lòng điền đầy đủ thông tin
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <ThumbsUp
                style={{
                  fill: 'black',
                  stroke: '#EEEEEE',
                  color: 'white',
                  width: 20,
                  height: 20,
                }}
              ></ThumbsUp>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">
                Lý do nên ứng tuyển
                <span className="text-slate-400">
                  (Áp dụng khi mua gói Add-on value)
                </span>
              </span>
              <div className="space-y-4">
                <span className="text-base text-black">
                  Bổ sung{' '}
                  <span className="text-base font-bold">Lý do ứng tuyển</span>{' '}
                  sẽ giúp tin tuyển dụng của bạn trở nên nổi bật và hấp dẫn
                  <button className="bg-white text-green-600">Tại đây</button>
                </span>
                <div className="flex flex-row space-x-20 items-center">
                  <div className="font-semibold">Lý do 1:</div>
                  <input
                    type="text"
                    className=" bg-white border-b-2 border-slate-100 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-9/12 p-2.5"
                    placeholder="Nhập lý do ứng tuyển"
                  />
                </div>
                <div className="flex flex-row space-x-20 items-center">
                  <div className="font-semibold">Lý do 2:</div>
                  <input
                    type="text"
                    className=" bg-white border-b-2 border-slate-100 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-9/12 p-2.5"
                    placeholder="Nhập lý do ứng tuyển"
                  />
                </div>
                <div className="flex flex-row space-x-20 items-center">
                  <div className="font-semibold">Lý do 3:</div>
                  <input
                    type="text"
                    className=" bg-white border-b-2 border-slate-100 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-9/12 p-2.5"
                    placeholder="Nhập lý do ứng tuyển"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <AlignLeft
                style={{ fill: 'black', color: 'black', width: 20, height: 20 }}
              ></AlignLeft>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Mô tả công việc</span>
              <button
                className="btn text-base p-1 flex flex-row items-center w-fit"
                style={{
                  backgroundColor: '#EBF3FF',
                  color: '#2D7CF1',
                  marginBottom: '15.96px',
                }}
              >
                <WandSparklesIcon
                  style={{
                    strokeWidth: '0.5px',
                    color: 'blue',
                    width: 15,
                    height: 15,
                    marginRight: 2,
                  }}
                />
                <span className="ml-1 mr-1 font-bold">
                  Xem gợi ý mô tả cho Nhân viên Marketing
                </span>
              </button>

              <div>
                {/* <span className="text-slate-600">Mô tả công việc</span> */}
                <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                  <button className="bg-gray-300">
                    <Bold
                      style={{
                        strokeWidth: '4px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Bold>
                  </button>
                  <button className="bg-gray-300">
                    <Italic
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Italic>
                  </button>
                  <button className="bg-gray-300">
                    <Underline
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Underline>
                  </button>
                  <button className="bg-gray-300">
                    <List
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></List>
                  </button>
                  <button className="bg-gray-300">
                    <ListOrdered
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></ListOrdered>
                  </button>
                </div>
                <textarea
                  className="w-full bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base h-32 p-2.5"
                  placeholder="Nhập nội dung mô tả công việc"
                  {...register('description', {
                    required: true,
                  })}
                  defaultValue={jobItem.jobDetail.description}
                />
                {errors.description && (
                  <div className="text-red-700">
                    Mô tả công việc không được để trống
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <AlignLeft
                style={{ fill: 'black', color: 'black', width: 20, height: 20 }}
              ></AlignLeft>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Yêu cầu ứng viên</span>
              <button
                className="btn text-base p-1 flex flex-row items-center w-fit"
                style={{
                  backgroundColor: '#EBF3FF',
                  color: '#2D7CF1',
                  marginBottom: '15.96px',
                }}
              >
                <WandSparklesIcon
                  style={{
                    strokeWidth: '0.5px',
                    color: 'blue',
                    width: 15,
                    height: 15,
                    marginRight: 2,
                  }}
                />
                <span className="ml-1 mr-1 font-bold">
                  Xem gợi ý mô tả yêu cầu cho Nhân viên Marketing
                </span>
              </button>

              <div>
                <span className="mb-1 text-slate-600">
                  Mô tả yêu cầu ứng viên
                </span>
                <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                  <button className="bg-gray-300">
                    <Bold
                      style={{
                        strokeWidth: '4px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Bold>
                  </button>
                  <button className="bg-gray-300">
                    <Italic
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Italic>
                  </button>
                  <button className="bg-gray-300">
                    <Underline
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Underline>
                  </button>
                  <button className="bg-gray-300">
                    <List
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></List>
                  </button>
                  <button className="bg-gray-300">
                    <ListOrdered
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></ListOrdered>
                  </button>
                </div>
                <textarea
                  className="w-full bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base h-32 p-2.5"
                  placeholder="Nhập nội dung yêu cầu công việc"
                  {...register('requirement', {
                    required: true,
                  })}
                  defaultValue={jobItem.jobDetail.requirement}
                />

                <div className="text-slate-600 mb-1">Kỹ năng liên quan</div>
                <div className="w-full">
                  <input
                    type="text"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Nhập kỹ năng liên quan"
                    {...register('skill', {
                      required: true,
                    })}
                    defaultValue={jobItem.jobDetail.skills}
                  />
                </div>
                {(errors.skill || errors.requirement) && (
                  <div className="text-red-700 mb-5">
                    Vui lòng điền đầy đủ thông tin
                  </div>
                )}
                <div className="text-base text-red-600">
                  *Nội dung được đề xuất bởi ToppyAI
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <AlignLeft
                style={{ fill: 'black', color: 'black', width: 20, height: 20 }}
              ></AlignLeft>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Quyền lợi ứng viên</span>
              <button
                className="btn text-base p-1 flex flex-row items-center w-fit"
                style={{
                  backgroundColor: '#EBF3FF',
                  color: '#2D7CF1',
                  marginBottom: '15.96px',
                }}
              >
                <WandSparklesIcon
                  style={{
                    strokeWidth: '0.5px',
                    color: 'blue',
                    width: 15,
                    height: 15,
                    marginRight: 2,
                  }}
                />
                <span className="ml-1 mr-1 font-bold">
                  Xem gợi ý mô tả quyền lợi ứng viên cho Nhân viên Marketing
                </span>
              </button>

              <div>
                <span className="text-slate-600">Mô tả quyền lợi ứng viên</span>
                <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                  <button className="bg-gray-300">
                    <Bold
                      style={{
                        strokeWidth: '4px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Bold>
                  </button>
                  <button className="bg-gray-300">
                    <Italic
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Italic>
                  </button>
                  <button className="bg-gray-300">
                    <Underline
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></Underline>
                  </button>
                  <button className="bg-gray-300">
                    <List
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></List>
                  </button>
                  <button className="bg-gray-300">
                    <ListOrdered
                      style={{
                        strokeWidth: '2px',
                        color: 'black',
                        width: 15,
                        height: 15,
                        marginRight: 2,
                      }}
                    ></ListOrdered>
                  </button>
                </div>
                <textarea
                  className="w-full bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base h-32 p-2.5"
                  placeholder="Nhập quyền lợi trong công việc"
                  {...register('benefit', {
                    required: true,
                  })}
                  defaultValue={jobItem.jobDetail.benefit}
                />
                {errors.benefit && (
                  <div className="text-red-700">
                    Quyền lợi công việc không được để trống
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <BriefcaseBusiness
                style={{
                  stroke: 'black',
                  color: 'black',
                  width: 20,
                  height: 20,
                }}
              ></BriefcaseBusiness>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">Thông tin nhận CV</span>
              <div className="flex flex-row space-x-10 items-center">
                <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">
                    Hạn chót nhận CV
                  </span>
                  <input
                    type="date"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    onChange={(e) => setDate(e.target.value)}
                    defaultValue={defaultValue}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-10 items-center">
                {/* <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Họ tên</span>
                  <input
                    type="text"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Họ tên"
                    {...register('name', {
                      required: true,
                    })}
                    defaultValue={employer!.fullname}
                  />
                </div> */}
                {/* <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Số điện thoại</span>
                  <input
                    type="number"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Số điện thoại"
                    {...register('phone', {
                      required: true,
                    })}
                    defaultValue={employer!.phoneNumber}
                  />
                </div> */}
                {/* <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Email</span>
                  <input
                    type="text"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Email"
                    {...register('email', {
                      required: true,
                    })}
                    defaultValue={employer!.skype}
                  />
                </div> */}
              </div>
            </div>
          </div>
          {(errors.name || errors.phone || errors.email) && (
            <div className="ml-14 text-red-700">
              Vui lòng điền đầy đủ thông tin
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-sm mb-5">
          <div className="flex flex-row space-x-5 mb-4">
            <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
              <Image
                style={{
                  stroke: 'black',
                  color: 'black',
                  width: 20,
                  height: 20,
                }}
              ></Image>
            </div>
            <div className="w-full space-y-8">
              <span className="font-bold">
                Hình ảnh và video nổi bật
                <span className="text-slate-400">
                  (Áp dụng khi mua gói Add-on value)
                </span>
              </span>
              <div className="text-base">
                Bổ sung Hình ảnh/video sẽ giúp thông tin công ty được hiển thị
                chuyên nghiệp hơn, ứng viên cảm nhận rõ ràng hơn về môi trường
                làm việc chuyên nghiệp, bản sắc tinh thần, giúp tăng đáng kể tỷ
                lệ ứng tuyển khi ứng viên xem tin tuyển dụng của bạn. Vui lòng
                tham khảo hướng dẫn chuẩn bị hình ảnh/video chất lượng của t4CVs{' '}
                <button className="bg-white text-green-600">Tại đây</button>
              </div>
              <div className="flex flex-row items-center space-x-5">
                <button className="flex px-4 py-2 text-green-600 bg-green-200">
                  <Image
                    style={{
                      color: 'green',
                      width: 20,
                      height: 20,
                      marginRight: 2,
                    }}
                  ></Image>
                  Thêm hình ảnh
                </button>
                <button className="flex px-4 py-2 text-green-600 bg-green-200">
                  <Video
                    style={{
                      stroke: 'none',
                      fill: 'green',
                      width: 20,
                      height: 20,
                      marginRight: 2,
                    }}
                  ></Video>
                  Thêm video online
                </button>
              </div>
            </div>
          </div>
          <div className="post-compaign-2_content-item--actions flex flex-row justify-end font-bold mt-5">
            <div className="post-compaign-2_content-item--actions-group flex flex-row gap-4">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="post-compaign-2_content-item--action btn-cancel py-2 px-7 rounded bg-slate-300 shadow-md cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="post-compaign-2_content-item--action btn-success py-2 px-4 rounded text-white bg-green-500 shadow-md cursor-pointer"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CampaignEditCard;
