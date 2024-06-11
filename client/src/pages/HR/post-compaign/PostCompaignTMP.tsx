import { useState } from 'react';
import image from '../../../shared/assets/images/topcv.jpg';
import { ChevronRight, CircleHelp, Pencil, X } from 'lucide-react';
import Select from 'react-select';
function PostCompaign() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const cityOptions = [
    { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
    { value: 'Bình Dương', label: 'Bình Dương' },
    { value: 'Bắc Ninh', label: 'Bắc Ninh' },
    { value: 'Đồng Nai', label: 'Đồng Nai' },
    { value: 'Hưng Yên', label: 'Hưng Yên' },
    { value: 'Hải Dương', label: 'Hải Dương' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  ];
  return (
    <div className="w-screen h-screen m-10">
      <h1 className="mb-5 text-xl font-bold text-black">
        Tạo chiến dịch đầu tiên của bạn
      </h1>
      <div className="w-4/5 p-1 mb-5 bg-white rounded-sm">
        <div className="m-2">
          <div className="flex flex-row mb-5 space-x-2 justify-items-center">
            <div className="flex items-center justify-center bg-green-600 rounded-full w-7 h-7">
              <span className="text-lg font-bold text-white">1</span>
            </div>
            <h1 className="text-xl font-bold text-black">
              Bắt đầu một chiến dịch mới
            </h1>
          </div>
          <p className="text-xs text-black">
            Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo tiêu tuyển
            dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng nơi nơi tổng hợp
            cách hoạt động khác nhau của một đợt
          </p>
          <p className="text-xs text-black">
            tuyển dụng được thực hiện trên nền tảng t4CVs.
          </p>
        </div>
        <div className="flex flex-row m-2 space-x-4">
          <img className="w-1/2 border-2" src={image} />
          <div className="w-1/2">
            <p className="mb-5 text-xl font-bold text-black">
              Tài liệu nên xem
            </p>
            <button
              className="flex flex-row items-center justify-between w-full p-4 text-sm btn"
              style={{
                backgroundColor: '#EBF3FF',
                color: '#2D7CF1',
                marginBottom: '15.96px',
              }}
            >
              <span className="ml-1 mr-1 font-bold">
                Smart Recruitment Platform Principle
              </span>
              <ChevronRight
                color="#000000"
                style={{
                  strokeWidth: '0.5px',
                  width: 40,
                  height: 40,
                }}
              />
            </button>
            <button
              className="flex flex-row items-center justify-between w-full p-4 text-sm btn"
              style={{
                backgroundColor: '#EBF3FF',
                color: '#2D7CF1',
                marginBottom: '15.96px',
              }}
            >
              <span className="ml-1 mr-1 font-bold">
                Khái niệm Chiến dịch tuyển dụng
              </span>
              <ChevronRight
                color="#000000"
                style={{
                  strokeWidth: '0.5px',
                  width: 40,
                  height: 40,
                }}
              />
            </button>
            <button
              className="flex flex-row items-center justify-between w-full p-4 text-sm btn"
              style={{
                backgroundColor: '#EBF3FF',
                color: '#2D7CF1',
                marginBottom: '15.96px',
              }}
            >
              <span className="ml-1 mr-1 font-bold">
                Khởi tạo chiến dịch tuyển dụng đúng cách
              </span>
              <ChevronRight
                color="#000000"
                style={{
                  strokeWidth: '0.5px',
                  width: 40,
                  height: 40,
                }}
              />
            </button>
          </div>
        </div>
        <div className="m-2">
          <p className="text-xs text-black">
            Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt
            hơn hoạt động tuyển dụng của doanh nghiệp trên t4CVs. Hãy chắc chắn
            bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng từ
          </p>
          <p className="text-xs text-black">các nội dung phía trên.</p>
        </div>
      </div>
      <div className="w-4/5 p-1 mb-10 bg-white rounded-sm">
        <div className="m-2">
          <div className="flex flex-row mb-5 space-x-2 justify-items-center">
            <div className="flex items-center justify-center bg-green-600 rounded-full w-7 h-7">
              <span className="text-lg font-bold text-white">2</span>
            </div>
            <h1 className="text-xl font-bold text-black">
              Tạo chiến dịch tuyển dụng đầu tiên của bạn
            </h1>
          </div>
          <div className="flex flex-row w-full pt-2 mb-5 space-x-10 border-t-2">
            <div className="w-1/2 space-y-3 ">
              <span className="text-base font-bold text-black">
                Tên chiến dịch tuyển dụng
              </span>
              <input
                type="text"
                className="bg-white border border-slate-600 hover:border-green-500 outline-green-500 text-black text-sm rounded-lg w-full p-2.5"
                placeholder="VD: Tuyển nhân viên marketing tháng 10, tuyển dụng design.."
              />
            </div>
            <div className="w-1/2 space-y-3">
              <span className="text-base font-bold text-black">
                Vị trí tuyển dụng
              </span>
              <input
                type="text"
                className="bg-white border border-slate-600 hover:border-green-500 outline-green-500 text-black text-sm rounded-lg w-full p-2.5"
                placeholder="VD: Nhân viên Marketing, Designer,.."
              />
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-base font-bold text-black">
              Khu vực làm việc
            </span>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  boxShadow: 'none',
                  borderColor: 'black',
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
              }}
              menuPlacement="top"
              placeholder="-- Chọn khu vực làm việc --"
              isMulti
              name="cities"
              options={cityOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <div className="flex flex-row justify-center">
              <button
                onClick={togglePopup}
                className="px-2 py-1 text-white bg-green-600"
              >
                Tiếp theo
              </button>
            </div>
            <div className="relative">
              {showPopup && (
                <div className="fixed items-center justify-center w-8/12 p-6 bg-white rounded shadow-lg top-5">
                  <div className="flex flex-row justify-between mb-4">
                    <h2 className="text-xl font-bold ">
                      Khởi động chiến dịch: Tuyển dụng Marketing tháng 10
                    </h2>
                    <button className="bg-white" onClick={togglePopup}>
                      <X></X>
                    </button>
                  </div>
                  <p className="text-[13.5px] font-semibold mb-4 border-t pt-4">
                    Vui lòng lựa chọn hoạt động đầu tiên để khởi động chiến dịch
                    tuyển dụng của bạn. Dựa vào Insights chiến dịch tuyển dụng
                    bạn chia sẻ, chúng tôi gợi ý những hoạt động phù hợp phía
                    dưới. Hãy lựa chọn loại hoạt động bạn thấy phù hợp nhất vào
                    lúc này.
                  </p>
                  <div className="flex flex-row w-full">
                    <div className="w-5/12">
                      <button className="flex items-center w-full p-4 bg-gray-200">
                        <span className="mr-1 text-base font-semibold ">
                          Thu hút ứng tuyển tự nhiên
                        </span>
                        <CircleHelp
                          className="text-slate-400"
                          style={{ width: 18, height: 18 }}
                        />
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-6 bg-green-100">
                        <span className="text-base font-semibold text-green-700">
                          Đăng tin tuyển dụng
                        </span>
                        <span className="text-[8px] bg-green-200 p-1 text-green-800 font-semibold">
                          ĐỀ XUẤT
                        </span>
                      </button>
                      <button className="flex items-center w-full p-4 bg-gray-200">
                        <span className="mr-1 text-base font-semibold">
                          Săn tìm ứng viên
                        </span>
                        <CircleHelp
                          className="text-slate-400"
                          style={{ width: 18, height: 18 }}
                        />
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-6 bg-white border">
                        <span className="text-base font-semibold">
                          Scout AI - Tự động săn tìm CV
                        </span>
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-6 bg-white border">
                        <span className="text-base font-semibold">
                          Lọc CV ứng viên t4CVs
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full border ">
                      <div className="p-4 mb-10 border-4 border-black rounded-full w-fit">
                        <Pencil
                          style={{
                            color: 'black',
                            width: 40,
                            height: 40,
                          }}
                        ></Pencil>
                      </div>
                      <p className="mb-5 font-bold">Tuyển dụng tại t4CVs</p>
                      <p>
                        Đăng tin tuyển dụng tiếp cận 3 triệu ứng viên tiềm năng
                        &
                      </p>
                      <p>nhận về CV ứng tuyển</p>
                      <button
                        onClick={togglePopup}
                        className="px-4 py-2 mt-4 text-white bg-green-600 "
                      >
                        Đăng tin tuyển dụng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCompaign;
