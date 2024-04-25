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
import { SetStateAction, useState } from "react";

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
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(true);
  const [showDescriptionError, setDescritionError] = useState(true);
  const [showRequirement, setRequirementError] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(true);
  const handleTitleError = (value: SetStateAction<string>) => {
    setTitle(value);
    if (value.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
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
  const togglePopup = (
    choice: SetStateAction<SingleValue<{ value: string; label: string }>>
  ) => {
    if (choice !== null) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    setUserChoice(choice);
  };
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
    { value: "Từ", label: "Từ" },
    { value: "Đến", label: "Đến" },
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
            <span className="font-bold">Tiêu đề tuyển dụng</span>
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
                    options={cityOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
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
                    options={cityOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={setSelectedOptions}
                    isOptionDisabled={() => selectedOptions?.length! >= 2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
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
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                      name="cities"
                      options={salaryOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={togglePopup}
                    />
                  </div>
                </div>
                {showPopup && (
                  <div className="space-y-2 w-3/12 bg-red">
                    <span className="text-base font-semibold">
                      {userChoice?.value!}
                    </span>
                    <input
                      type="text"
                      className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                      placeholder="0 VND"
                    />
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
                      placeholder="Chọn Tỉnh/ Thành phố"
                      name="cities"
                      options={cityOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                    />
                  </div>
                  <div className="w-8/12">
                    <input
                      type="text"
                      className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                      placeholder="Nhập địa điểm làm việc cụ thể"
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
              {showRequirement && (<div className="text-red-700">
                Yêu cầu công việc không được để trống
              </div>)}
              <div className="text-slate-600 mb-1">Kỹ năng liên quan</div>
              <div className="w-4/5">
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
                  }}
                  menuPlacement="top"
                  placeholder="-- Chọn kỹ năng liên quan --"
                  isMulti
                  name="cities"
                  options={cityOptions}
                  classNamePrefix="select"
                />
              </div>
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
                 
                />
               
              </div>
              <div className="space-y-2 w-3/12">
                <span className="text-base font-semibold">Số điện thoại</span>
                <input
                  type="text"
                  className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="space-y-2 w-3/12">
                <span className="text-base font-semibold">Email</span>
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
                    placeholder="Email"
                    name="cities"
                    options={cityOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
              onClick={next}
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
