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
} from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

import Select, { MultiValue, SingleValue } from "react-select";
function PostCompaign1({
  next,
  previous,
}: {
  next: React.MouseEventHandler<HTMLButtonElement>;
  previous: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [userChoice, setUserChoice] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [careerOptions, setCareerOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [cityOption, setCityOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [district, setDistrictOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [jobTypeOptions, setjobTypeOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [genderOptions, setGenderOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [levelOptions, setLevelOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [expOptions, setExpOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [currencyOptions, setCurrencyOptions] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [emailOption, setEmailOption] = useState('');
  const [fieldOptions, setFieldOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [skill, setSkill] = useState('');
  const [careerError, setCareerError] = useState(true);
  const [skillError, setSkillError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [fieldError, setFieldError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const [jobTypeError, setJobTypeError] = useState(true);
  const [genderError, setGenderError] = useState(true);
  const [levelError, setLevelError] = useState(true);
  const [expError, setExpError] = useState(true);
  const [currencyError, setCurrencyError] = useState(true);
  const [quantityError, setQuantityError] = useState(true);
  const [salaryError, setSalaryError] = useState(true);
  const [salaryMaxError, setSalaryMaxError] = useState(true);
  const [scheduleError, setScheduleError] = useState(true);
  const [cityError, setCityError] = useState(true);
  const [districtError, setDistrictError] = useState(true);
  const [addressError, setAddressError] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(true);
  const [showDescriptionError, setDescritionError] = useState(true);
  const [showRequirement, setRequirementError] = useState(true);
  const [address, setAddress] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('');
  const [quantity, setQuantity] = useState('');
  const [schedule, setSchedule] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState(true);
  const [item, setItem] = useState({
    titleRecruitment: "",
    majorId: 0,
    fieldsId: [] as number[], // Specify the type explicitly
    typeId: 0,
    currencyId: 0,
    levelId: 0,
    campaignId: 0,
    companyId: 0,
    salaryMin: 0,
    salaryMax: 0,
    expId: 0,
    locationsId: [] as number[], // Specify the type explicitly
    expiredDate: "",
    quantity: 0,
    jobSchedule: "",
    gender: "",
    description: "",
    benefit: "",
    requirement: "",
    skills: "",
  });
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    console.log(fieldOptions)
    event.preventDefault();
    if (!titleError && !showError && !showDescriptionError && !showRequirement
      && !fieldError && !careerError &&
      !quantityError && !jobTypeError && !genderError && !levelError && !expError && !currencyError
      && !salaryError && !cityError && !districtError && !addressError &&
      !dateError && !nameError && !phoneError && !emailError && !skillError && !salaryMaxError && !scheduleError) {
      let updatedItem = { ...item };

      // Modify each property
      updatedItem.titleRecruitment = title;
      updatedItem.majorId = Number.parseInt(careerOptions?.value!);
      updatedItem.fieldsId = fieldOptions ? fieldOptions.map(option => parseInt(option.value)) : []; // Replace [2, 3] with your desired array of field IDs
      updatedItem.typeId = Number.parseInt(jobTypeOptions?.value!);
      updatedItem.currencyId = Number.parseInt(currencyOptions?.value!);
      updatedItem.levelId = Number.parseInt(levelOptions?.value!);
      updatedItem.campaignId = 123;
      updatedItem.companyId = 1;
      updatedItem.salaryMin = Number.parseInt(salary);
      updatedItem.salaryMax = Number.parseInt(salary);
      updatedItem.expId = Number.parseInt(expOptions?.value!);
      updatedItem.locationsId = cityOption ? cityOption.map(option => parseInt(option.value)) : []; // Replace [4, 5] with your desired array of location IDs
      updatedItem.expiredDate = date;
      updatedItem.quantity = Number.parseInt(quantity);
      updatedItem.jobSchedule = schedule;
      updatedItem.gender = genderOptions?.value!;
      updatedItem.description =
        jobDescription;
      updatedItem.benefit =
        description;
      updatedItem.requirement =
        requirement;
      updatedItem.skills = skill;

      // Log the updated item
      console.log(updatedItem);
      try {
        const response = await fetch('http://localhost:3000/job/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
          body: JSON.stringify(updatedItem), // Convert item to JSON string
        });

        if (!response.ok) {
          throw new Error('Failed to post data to API');
        }

        console.log('Data posted successfully');
      } catch (error) {
        console.error('Error posting data:', error);
      }
      next(event)

    } else {
      //Do nothing
    }
  };
  const handleTitleError = (value: SetStateAction<string>) => {
    setTitle(value);
    if (value.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  }
  const handleDateError = (value: SetStateAction<string>) => {
    setDate(value);
    if (value.length === 0) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }
  const handleNameError = (value: SetStateAction<string>) => {
    setName(value);
    if (value.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }
  const handlePhoneError = (value: SetStateAction<string>) => {
    setPhone(value);
    if (value.length === 0) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }
  const handleAddressError = (value: SetStateAction<string>) => {
    setAddress(value);
    if (value.length === 0) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  }
  const handleQuantityError = (value: SetStateAction<string>) => {
    setQuantity(value);
    if (value.length === 0) {
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }
  }
  const handleScheduleError = (value: SetStateAction<string>) => {
    setSchedule(value);
    if (value.length === 0) {
      setScheduleError(true);
    } else {
      setScheduleError(false);
    }
  }
  const handleSalaryError = (value: SetStateAction<string>) => {
    setSalary(value);
    if (value.length === 0) {
      setSalaryError(true);
    } else {
      setSalaryError(false);
    }
  }
  const handleSalaryMaxError = (value: SetStateAction<string>) => {
    setSalaryMax(value);
    if (value.length === 0) {
      setSalaryMaxError(true);
    } else {
      setSalaryMaxError(false);
    }
  }
  const handleJobTypeError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setjobTypeOptions(value)
    if (value !== null) {
      setJobTypeError(false);
    } else {
      setJobTypeError(true);
    }
  }
  const handleEmailError = (value: SetStateAction<string>) => {
    setEmailOption(value)
    if (value?.length === 0) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }
  const handleCityError = (value: SetStateAction<MultiValue<{ value: string; label: string }> | null>) => {
    setCityOptions(value)
    if (value?.length !== 0) {
      setCityError(false);
    } else {
      setCityError(true);
    }
  }
  const handleDistrictError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setDistrictOptions(value)
    if (value !== null) {
      setDistrictError(false);
    } else {
      setDistrictError(true);
    }
  }
  //
  const handleGenderError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setGenderOptions(value)
    if (false !== null) {
      setGenderError(false);
    } else {
      setGenderError(true);
    }
  }
  const handleLevelError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setLevelOptions(value)
    if (value !== null) {
      setLevelError(false);
    } else {
      setLevelError(true);
    }
  }
  const handleExpError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setExpOptions(value)
    if (value !== null) {
      setExpError(false);
    } else {
      setExpError(true);
    }
  }
  const handleCurrencyError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setCurrencyOptions(value)
    if (value !== null) {
      setCurrencyError(false);
    } else {
      setCurrencyError(true);
    }
  }
  const handleCareerError = (value: SetStateAction<SingleValue<{ value: string; label: string }>>) => {
    setCareerOptions(value)
    if (value !== null) {
      setCareerError(false);
    } else {
      setCareerError(true);
    }
  }
  //
  const handleFieldError = (value: SetStateAction<MultiValue<{ value: string; label: string }> | null>) => {
    setFieldOptions(value)
    console.log(fieldOptions)
    if (value?.length !== 0) {
      setFieldError(false);
    } else {
      setFieldError(true);
    }
  }
  const handleSkillError = (value: SetStateAction<string>) => {
    setSkill(value)
    if (value?.length === 0) {
      setSkillError(true);
    } else {
      setSkillError(false);
    }
  }
  const handleRequirementValidation = (value: SetStateAction<string>) => {
    setRequirement(value);
    if (value.length === 0) {
      setRequirementError(true);
    } else {
      setRequirementError(false);
    }
  }
  const handleDescriptionValidation = (value: SetStateAction<string>) => {
    setDescription(value);
    if (value.length === 0) {
      setDescritionError(true);
    } else {
      setDescritionError(false);
    }
  }
  const handleJobValidation = (value: SetStateAction<string>) => {
    setJobDescription(value);
    if (value.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }
  //
  const [fields, setFields] = useState<any>(null);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/job/create-info', {
          method: 'GET',
          headers: {
            "Access-control-allow-origin": "http://localhost:3000",
            "Content-type": "application/json"
          },
        }); // Modify the URL to match your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Convert each field to the desired format
  const convertToOptions = (data: { id: any; name: any; }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const major = convertToOptions(fields?.major);
  const city = convertToOptions(fields?.location);
  const level = convertToOptions(fields?.level);
  const currency = convertToOptions(fields?.currency);
  const field = convertToOptions(fields?.field);
  const exp = convertToOptions(fields?.exp);
  const typeOptions = convertToOptions(fields?.type);
  const togglePopup = (
    choice: SetStateAction<SingleValue<{ value: string; label: string }>>
  ) => {
    if (choice !== null) {
      if (typeof choice !== 'function' && choice.value === 'Trong khoảng') {
        setShowPopup(true);
        setSalaryError(true);
        setSalaryMaxError(true);
      }
      else {
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
  const gender = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" }
  ]
  const skills = [
    { value: "SQL", label: "SQL" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
  ]
  const email = [
    { value: "hr@gmail.com", label: "hr@gmail.com" },
    { value: "tuyendung@gmail.com", label: "tuyendung@gmail.com" },
    { value: "example@email.com", label: "example@email.com" },
  ]
  const cityOptions = [
    { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
    { value: "Bình Dương", label: "Bình Dương" },
    { value: "Bắc Ninh", label: "Bắc Ninh" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Hưng Yên", label: "Hưng Yên" },
    { value: "Hải Dương", label: "Hải Dương" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
  ];
  const salaryOptions = [
    { value: "Trong khoảng", label: "Trong khoảng" },
    { value: "Thỏa thuận", label: "Thỏa thuận" },
  ];
  return (
    <div className="flex flex-col overflow-x-hidden">
      <h1 className="text-black text-xl font-bold mb-5">
        Thông tin đăng tuyển chi tiết
      </h1>
      <div className="bg-white p-4 rounded-sm mb-5 border-l-2 border-green-700">
        <span>
          Tin tuyển dụng của bạn sẽ được kiểm duyệt trước khi chính thức hiển
          thị với các ứng viên tiềm năng.{" "}
          <button className="text-green-500 bg-white">
            Tìm hiểu về Quy định đăng tin tại TopCV.
          </button>
        </span>
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <Pencil
              style={{
                fill: "black",
                stroke: "#EEEEEE",
                color: "white",
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
              value={title}
              onChange={(e) => handleTitleError(e.target.value)}
            />
            {titleError && (<div className="text-red-700">
              Tiêu đề không được để trống
            </div>)}
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <Folder
              style={{
                fill: "black",
                stroke: "#EEEEEE",
                color: "white",
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
                  <Select
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxShadow: "none",
                        borderColor: "#6B728064",
                        "&:hover": {
                          borderColor: "green",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "lightgrey"
                          : "white",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "lightgrey",
                          fontWeight: "bold",
                          color: "black",
                        },
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "black",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }),
                      menu: (base) => ({
                        ...base,
                        maxHeight: "200px",
                        overflowY: "auto",
                      }),
                    }}
                    isClearable
                    placeholder="Lựa chọn tối đa một ngành nghề chính cho tin tuyển dụng"
                    name="cities"
                    options={major}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => handleCareerError(e)}
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
                        boxShadow: "none",
                        borderColor: "#6B728064",
                        "&:hover": {
                          borderColor: "green",
                        },
                      }),
                      option: (base) => ({
                        ...base,
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "lightgrey",
                          fontWeight: "bold",
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#C4F0D5",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "black",
                      }),

                      placeholder: (base) => ({
                        ...base,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }),
                      menu: (base) => ({
                        ...base,
                        maxHeight: "200px", // Set maximum height for the dropdown menu
                        overflowY: "auto",
                      }),
                    }}
                    isClearable
                    isMulti
                    placeholder="Lựa chọn tối đa 2 ngành nghề"
                    name="cities"
                    options={field}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => handleFieldError(e)}
                    isOptionDisabled={() => fieldOptions?.length! >= 2}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        {(fieldError || careerError) && (<div className="ml-14 text-red-700">
          Ngành nghề và lĩnh vực không được để trống
        </div>)}
        <span className="ml-14 text-red-600 text-base ">
          *Nội dung được đề xuất bởi Toppy AI
        </span>
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
                    type="text"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Nhập số lượng"
                    value={quantity}
                    onChange={(e) => handleQuantityError(e.target.value)}
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
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Chọn loại công việc --"
                      name="cities"
                      options={typeOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleJobTypeError(e)}
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
                    value={schedule}
                    onChange={(e) => handleScheduleError(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-10">
                <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Giới tính</span>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Chọn giới tính --"
                      name="cities"
                      options={gender}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleGenderError(e)}
                    />
                  </div>
                </div>
                <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Cấp bậc</span>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Chọn cấp bậc --"
                      name="cities"
                      options={level}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleLevelError(e)}
                    />
                  </div>
                </div>
                <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Kinh nghiệm</span>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Chọn kinh nghiệm --"
                      name="cities"
                      options={exp}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleExpError(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="text-base font-semibold mt-4">Mức lương</div>
              <div className="flex flex-row space-x-10 items-center">
                <div className="space-y-2 w-3/12">
                  <span className="text-base font-semibold">Loại tiền tệ</span>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Chọn loại tiền tệ --"
                      name="cities"
                      options={currency}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleCurrencyError(e)}
                    />
                  </div>
                </div>
                <div className="space-y-2 w-3/12">
                  <div className="flex flex-row space-x-1 items-center">
                    <span className="text-base font-semibold">Kiểu lương</span>
                  </div>
                  <div>
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="-- Kiểu lương --"
                      options={salaryOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={togglePopup}
                    />
                  </div>
                </div>
                {showPopup && (
                  <div className='flex flex-row space-x-5 w-3/12'>
                    <div className="space-y-2 w-1/2 bg-red">
                      <span className="text-base font-semibold">
                        Từ
                      </span>
                      <input
                        type="text"
                        className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                        placeholder="0 VND"
                        value={salary}
                        onChange={(e) => handleSalaryError(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 w-1/2 bg-red">
                      <span className="text-base font-semibold">
                        Đến
                      </span>
                      <input
                        type="text"
                        className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                        placeholder="0 VND"
                        value={salaryMax}
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
                      fill: "black",
                      stroke: "#EEEEEE",
                      color: "white",
                      width: 20,
                      height: 20,
                    }}
                  ></MapPin>
                  <div className="font-bold text-base mr-10">Khu vực 1: </div>
                  <div className="w-5/12">
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base) => ({
                          ...base,
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                          },
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#C4F0D5",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "black",
                        }),

                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px", // Set maximum height for the dropdown menu
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="Chọn Tỉnh/ Thành phố"
                      name="cities"
                      options={city}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={cityOption}
                      isMulti
                      onChange={(e) => handleCityError(e)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="w-3/12">
                    <Select
                      styles={{
                        control: (base) => ({
                          ...base,
                          boxShadow: "none",
                          borderColor: "#6B728064",
                          "&:hover": {
                            borderColor: "green",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "lightgrey"
                            : "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            color: "black",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }),
                        menu: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }),
                      }}
                      isClearable
                      placeholder="Chọn Quận/ Huyện"
                      name="cities"
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={district}
                      onChange={(e) => handleDistrictError(e)}
                    />
                  </div>
                  <div className="w-8/12">
                    <input
                      type="text"
                      className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                      placeholder="Nhập địa điểm làm việc cụ thể"
                      value={address}
                      onChange={(e) => handleAddressError(e.target.value)}
                    />
                  </div>
                </div>
                <button className="text-[13px] text-green-500 bg-gray-200 mt-2">
                  + Thêm địa chỉ
                </button>
              </div>
              <button className=" mt-4 px-4 py-2 text-white bg-green-600">
                Thêm khu vực mới
              </button>
            </div>
          </div>
        </div>
        {(quantityError || jobTypeError || genderError || levelError || expError || currencyError || salaryMaxError || salaryError || cityError || scheduleError || districtError || addressError) && (<div className="ml-14 text-red-700">
          Vui lòng điền đầy đủ thông tin
        </div>)}
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <ThumbsUp
              style={{
                fill: "black",
                stroke: "#EEEEEE",
                color: "white",
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
                Bổ sung{" "}
                <span className="text-base font-bold">Lý do ứng tuyển</span> sẽ
                giúp tin tuyển dụng của bạn trở nên nổi bật và hấp dẫ
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
              style={{ fill: "black", color: "black", width: 20, height: 20 }}
            ></AlignLeft>
          </div>
          <div className="w-full space-y-8">
            <span className="font-bold">Tiêu đề tuyển dụng</span>
            <button
              className="btn text-base p-1 flex flex-row items-center w-fit"
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <WandSparklesIcon
                style={{
                  strokeWidth: "0.5px",
                  color: "blue",
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
              <span className="text-slate-600">Mô tả công việc</span>
              <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                <button className="bg-gray-300">
                  <Bold
                    style={{
                      strokeWidth: "4px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Bold>
                </button>
                <button className="bg-gray-300">
                  <Italic
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Italic>
                </button>
                <button className="bg-gray-300">
                  <Underline
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Underline>
                </button>
                <button className="bg-gray-300">
                  <List
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></List>
                </button>
                <button className="bg-gray-300">
                  <ListOrdered
                    style={{
                      strokeWidth: "2px",
                      color: "black",
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
                onChange={(e) => handleJobValidation(e.target.value)}
                value={jobDescription}
              />
              {showError && (<div className="text-red-700">
                Mô tả công việc không được để trống
              </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <AlignLeft
              style={{ fill: "black", color: "black", width: 20, height: 20 }}
            ></AlignLeft>
          </div>
          <div className="w-full space-y-8">
            <span className="font-bold">Yêu cầu ứng viên</span>
            <button
              className="btn text-base p-1 flex flex-row items-center w-fit"
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <WandSparklesIcon
                style={{
                  strokeWidth: "0.5px",
                  color: "blue",
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
                      strokeWidth: "4px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Bold>
                </button>
                <button className="bg-gray-300">
                  <Italic
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Italic>
                </button>
                <button className="bg-gray-300">
                  <Underline
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Underline>
                </button>
                <button className="bg-gray-300">
                  <List
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></List>
                </button>
                <button className="bg-gray-300">
                  <ListOrdered
                    style={{
                      strokeWidth: "2px",
                      color: "black",
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
                onChange={(e) => handleRequirementValidation(e.target.value)}
                value={requirement}
              />

              <div className="text-slate-600 mb-1">Kỹ năng liên quan</div>
              <div className="w-ful">
              <input
                    type="text"
                    className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                    placeholder="Nhập kỹ năng liên quan"
                    value={skill}
                    onChange={(e) => handleSkillError(e.target.value)}
                  />
              </div>
              {(showRequirement || skillError) && (<div className="text-red-700 mb-5">
                Vui lòng điền đầy đủ thông tin
              </div>)}
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
              style={{ fill: "black", color: "black", width: 20, height: 20 }}
            ></AlignLeft>
          </div>
          <div className="w-full space-y-8">
            <span className="font-bold">Quyền lợi ứng viên</span>
            <button
              className="btn text-base p-1 flex flex-row items-center w-fit"
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <WandSparklesIcon
                style={{
                  strokeWidth: "0.5px",
                  color: "blue",
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
                      strokeWidth: "4px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Bold>
                </button>
                <button className="bg-gray-300">
                  <Italic
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Italic>
                </button>
                <button className="bg-gray-300">
                  <Underline
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Underline>
                </button>
                <button className="bg-gray-300">
                  <List
                    style={{
                      strokeWidth: "2px",
                      color: "black",
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></List>
                </button>
                <button className="bg-gray-300">
                  <ListOrdered
                    style={{
                      strokeWidth: "2px",
                      color: "black",
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
                onChange={(e) => handleDescriptionValidation(e.target.value)}
                value={description}
              />
              {showDescriptionError && (<div className="text-red-700">
                Quyền lợi công việc không được để trống
              </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <BriefcaseBusiness
              style={{ stroke: "black", color: "black", width: 20, height: 20 }}
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
                  placeholder="dd/mm/yy"
                  value={date}
                  onChange={(e) => handleDateError(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-10 items-center">
              <div className="space-y-2 w-3/12">
                <span className="text-base font-semibold">Họ tên</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Họ tên"
                  value={name}
                  onChange={(e) => handleNameError(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-3/12">
                <span className="text-base font-semibold">Số điện thoại</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => handlePhoneError(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-3/12">
                <span className="text-base font-semibold">Email</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Email"
                  value={emailOption}
                  onChange={(e) => handleEmailError(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {(dateError || nameError || phoneError || emailError) && (<div className="ml-14 text-red-700">
          Vui lòng điền đầy đủ thông tin
        </div>)}
      </div>
      <div className="bg-white p-4 rounded-sm mb-5">
        <div className="flex flex-row space-x-5 mb-4">
          <div className="border-2 p-1 bg-gray-200 rounded-full w-fit h-fit mb-10 ">
            <Image
              style={{ stroke: "black", color: "black", width: 20, height: 20 }}
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
              chuyên nghiệp hơn, ứng viên cảm nhận rõ ràng hơn về môi trường làm
              việc chuyên nghiệp, bản sắc tinh thần, giúp tăng đáng kể tỷ lệ ứng
              tuyển khi ứng viên xem tin tuyển dụng của bạn. Vui lòng tham khảo
              hướng dẫn chuẩn bị hình ảnh/video chất lượng của TopCV{" "}
              <button className="bg-white text-green-600">Tại đây</button>
            </div>
            <div className="flex flex-row items-center space-x-5">
              <button className="flex px-4 py-2 text-green-600 bg-green-200">
                <Image
                  style={{
                    color: "green",
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
                    stroke: "none",
                    fill: "green",
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
              onClick={previous}
              className="post-compaign-2_content-item--action btn-cancel py-2 px-7 rounded bg-slate-300 shadow-md cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="post-compaign-2_content-item--action btn-success py-2 px-4 rounded text-white bg-green-500 shadow-md cursor-pointer"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostCompaign1;
