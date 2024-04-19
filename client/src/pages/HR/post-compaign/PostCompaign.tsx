import { useState } from 'react';
import image from '../../../shared/assets/images/topcv.jpg'
import { ChevronRight, CircleHelp, Pencil, X } from 'lucide-react';
import Select from 'react-select'
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
    <div className="h-screen w-screen m-10">
      <h1 className='text-black text-xl font-bold mb-5'>Tạo chiến dịch đầu tiên của bạn</h1>
      <div className="bg-white p-1 w-4/5 rounded-sm mb-5">
        <div className='m-2'>
          <div className='flex flex-row justify-items-center space-x-2 mb-5'>
            <div className="rounded-full bg-green-600 w-7 h-7 flex items-center justify-center">
              <span className="text-white text-lg font-bold">1</span>
            </div>
            <h1 className='text-black text-xl font-bold'>Bắt đầu một chiến dịch mới</h1>
          </div>
          <p className='text-black text-xs'>Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu tuyển dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng hợp cách hoạt động khác nhau của một đợt</p>
          <p className='text-black text-xs'>tuyển dụng được thực hiện trên nền tảng TopCV.</p>
        </div>
        <div className="flex flex-row space-x-4 m-2">
          <img className='border-2 w-1/2' src={image} />
          <div className='w-1/2'>
            <p className='text-black text-xl font-bold mb-5'>Tài liệu nên xem</p>
            <button
              className='btn text-sm p-4 flex flex-row items-center w-full justify-between'
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <span className="ml-1 mr-1 font-bold">Smart Recruitment Platform Principle</span>
              <ChevronRight color="#000000" style={{ strokeWidth: '0.5px', width: 40, height: 40 }} />
            </button>
            <button
              className='btn text-sm p-4 flex flex-row items-center w-full justify-between'
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <span className="ml-1 mr-1 font-bold">Khái niệm Chiến dịch tuyển dụng</span>
              <ChevronRight color="#000000" style={{ strokeWidth: '0.5px', width: 40, height: 40 }} />
            </button>
            <button
              className='btn text-sm p-4 flex flex-row items-center w-full justify-between'
              style={{
                backgroundColor: "#EBF3FF",
                color: "#2D7CF1",
                marginBottom: "15.96px",
              }}
            >
              <span className="ml-1 mr-1 font-bold">Khởi tạo chiến dịch tuyển dụng đúng cách</span>
              <ChevronRight color="#000000" style={{ strokeWidth: '0.5px', width: 40, height: 40 }} />
            </button>
          </div>
        </div>
        <div className='m-2'>
          <p className='text-black text-xs'>Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh nghiệp trên TopCV. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng từ</p>
          <p className='text-black text-xs'>các nội dung phía trên.</p>
        </div>
      </div>
      <div className="bg-white p-1 w-4/5 rounded-sm mb-10">
        <div className='m-2'>
          <div className='flex flex-row justify-items-center space-x-2 mb-5'>
            <div className="rounded-full bg-green-600 w-7 h-7 flex items-center justify-center">
              <span className="text-white text-lg font-bold">2</span>
            </div>
            <h1 className='text-black text-xl font-bold'>Tạo chiến dịch tuyển dụng đầu tiên của bạn</h1>
          </div>
          <div className='flex flex-row w-full mb-2 space-x-10 border-t-2 pt-2 mb-5'>
            <div className='w-1/2 space-y-3 '>
              <span className="text-black text-base font-bold">Tên chiến dịch tuyển dụng</span>
              <input type="text" className="bg-white border border-slate-600 hover:border-green-500 outline-green-500 text-black text-sm rounded-lg w-full p-2.5" placeholder="VD: Tuyển nhân viên marketing tháng 10, tuyển dụng design.." />
            </div>
            <div className='w-1/2 space-y-3'>
              <span className="text-black text-base font-bold">Vị trí tuyển dụng</span>
              <input type="text" className="bg-white border border-slate-600 hover:border-green-500 outline-green-500 text-black text-sm rounded-lg w-full p-2.5" placeholder="VD: Nhân viên Marketing, Designer,.." />
            </div>
          </div>
          <div className='space-y-3'>
            <span className="text-black text-base font-bold">Khu vực làm việc</span>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  boxShadow: "none",
                  borderColor: 'black',
                  '&:hover': {
                    borderColor: 'green'
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
              menuPlacement='top'
              placeholder='-- Chọn khu vực làm việc --'
              isMulti
              name="cities"
              options={cityOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <div className='flex flex-row justify-center'><button onClick={togglePopup} className='py-1 px-2 text-white bg-green-600'>Tiếp theo</button></div>
            <div className="relative">
              {showPopup && (

                <div className="top-5 fixed bg-white p-6 w-8/12 rounded shadow-lg justify-center items-center">
                  <div className='flex flex-row justify-between mb-4'>
                    <h2 className="text-xl font-bold ">Khởi động chiến dịch: Tuyển dụng Marketing tháng 10</h2>
                    <button className='bg-white' onClick={togglePopup}><X></X></button>
                  </div>
                  <p className='text-[13.5px] font-semibold mb-4 border-t pt-4'>Vui lòng lựa chọn hoạt động đầu tiên để khởi động chiến dịch tuyển dụng của bạn. Dựa vào Insights chiến dịch tuyển dụng bạn chia sẻ, chúng tôi gợi ý những hoạt động phù hợp phía dưới. Hãy lựa chọn loại hoạt động bạn thấy phù hợp nhất vào lúc này.</p>
                  <div className='flex flex-row w-full'>
                    <div className='w-5/12'>
                      <button className="flex items-center p-4 bg-gray-200 w-full">
                        <span className="text-base mr-1 font-semibold ">Thu hút ứng tuyển tự nhiên</span>
                        <CircleHelp className="text-slate-400" style={{ width: 18, height: 18 }} />
                      </button>
                      <button className="flex items-center px-4 py-6 bg-green-100 justify-between w-full">
                        <span className="text-base text-green-700 font-semibold">Đăng tin tuyển dụng</span>
                        <span className="text-[8px] bg-green-200 p-1 text-green-800 font-semibold">ĐỀ XUẤT</span>
                      </button>
                      <button className="flex items-center p-4 bg-gray-200 w-full">
                        <span className="text-base mr-1 font-semibold">Săn tìm ứng viên</span>
                        <CircleHelp className="text-slate-400" style={{ width: 18, height: 18 }} />
                      </button>
                      <button className="flex items-center px-4 py-6 bg-white justify-between border w-full">
                        <span className="text-base font-semibold">Scout AI - Tự động săn tìm CV</span>
                      </button>
                      <button className="flex items-center px-4 py-6 bg-white justify-between border w-full">
                        <span className="text-base font-semibold">Lọc CV ứng viên TopCV</span>
                      </button>
                    </div>
                    <div className='w-7/12 border flex flex-col items-center justify-center w-full'>
                      <div className='border-black border-4 p-4 rounded-full w-fit mb-10'>
                        <Pencil style={{ color: 'black', width: 40, height: 40 }}></Pencil>
                      </div>
                      <p className='font-bold mb-5'>Tuyển dụng tại TopCV</p>
                      <p>Đăng tin tuyển dụng tiếp cận 3 triệu ứng viên tiềm năng &</p>
                      <p>nhận về CV ứng tuyển</p>
                      <button onClick={togglePopup} className=' mt-4 px-4 py-2 text-white bg-green-600'>Đăng tin tuyển dụng</button>
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