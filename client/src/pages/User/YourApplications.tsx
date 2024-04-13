// Hùng
import { useState } from "react";
import { Switch } from "@mui/material";
import Avatar from "../../shared/assets/images/vietnam-flag-icon.png";
import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
const companies = [
  { id: 1, job_title: 'Thực tập sinh kiểm thử phần mềm', name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG', CV: 'TopCV', logo: VNRS, time: '06-09-2023 21:36 PM', status: 'Đã ứng tuyển', salary: '3 - 5 triệu' },
  { id: 2, job_title: 'Thực tập sinh kiểm thử phần mềm', name: 'FPT information system', CV: 'TopCV', logo: FPT, time: '14-09-2023 15:55 PM', status: 'NTD đã xem', salary: 'Thỏa thuận' },

  // Add more companies as needed
];

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Trạng thái");
  const setContent = (content: any) => {
    setSelectedContent(content);
  }
  const handleDropDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,) => {
    setIsOpen(!isOpen);
    const dropdownMenu = document.getElementById('dropdown');
    if (dropdownMenu && event.currentTarget) {
      const buttonWidth = event.currentTarget.offsetWidth;
      dropdownMenu.style.width = buttonWidth + 'px';
    }
  };

  return (
    <div className="relative">
      <button
        className="text-black bg-white border-2 rounded-sm font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative w-48 hover:border-green-500"
        onClick={handleDropDown}
      >
        {selectedContent}
        <svg
          className="absolute right-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        className={`absolute z-10 top-full right-0 mt-1 bg-white rounded divide-y divide-gray-100 shadow ${isOpen ? "block" : "hidden"}`}
      >
        <ul className="py-2">
          <li>
            <button
              onClick={() => {setContent("Trạng thái"), setIsOpen(false)}} // Change content and close dropdown when clicked
              className="block py-2 px-4 w-full text-left hover:bg-gray-100"
            >
              Trạng thái
            </button>
          </li>
          <li>
            <button
              onClick={() => {setContent("Đã ứng tuyển"), setIsOpen(false)}} // Change content and close dropdown when clicked
              className="block py-2 px-4 w-full text-left hover:bg-gray-100"
            >
              Đã ứng tuyển
            </button>
          </li>
          <li>
            <button
              onClick={() => {setContent("NTD đã xem hồ sơ"), setIsOpen(false)}} // Change content and close dropdown when clicked
              className="block py-2 px-4 w-full text-left hover:bg-gray-100"
            >
              NTD đã xem hồ sơ
            </button>
          </li>
          <li>
            <button
              onClick={() => {setContent("Hồ sơ phù hợp"), setIsOpen(false)}} // Change content and close dropdown when clicked
              className="block py-2 px-4 w-full text-left hover:bg-gray-100"
            >
              Hồ sơ phù hợp
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

function CompanyList() {
  return (
    <div className="company-list space-y-4 w-full shadow border-2 rounded-lg bg-white">
      <div className='flex justify-between m-5'>
        <h1 className='text-black text-xl font-bold'>Công việc đã ứng tuyển</h1>
        <DropdownMenu></DropdownMenu>
      </div>

      <div className='company-list m-5'>
        {companies.map(company => (
          // <div className='box-content shadow-md pb-10 rounded mt-10'>
          <div key={company.id} className="company-container mb-5 border-2 pb-10 rounded flex items-center space-x-5 bg-white">
            <img className='border-2 rounded-md mb-10 ml-5 w-28 h-28' src={company.logo} />
            <div className=" company-details text-left w-full h-full items-center mt-5">

              <div className='flex justify-between mr-10 mt-5'>
                <h1 className='font-bold text-2xl hover:underline'>{company.job_title}</h1>
                <p className='text-green-500 font-bold'>{company.salary}</p>
              </div>
              <div className='space-y-2 mt-2 mb-2'>
                <p className='font-light hover:underline'>{company.name}</p>
                <p>Thời gian ứng tuyển: {company.time}</p>
              </div>
              <div className='flex justify-between mr-10'>
                <p className='font-light'>CV đã ứng tuyển: <span className='font-normal text-green-500 underline'>{company.CV}</span></p>
                <div className='flex space-x-1'>
                  <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 20" fill="#008000"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Nhắn tin
                  </button>
                  <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 20" fill="#008000" ><path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z" /></svg>
                    Xem CV
                  </button>
                </div>
              </div>
              <div className='flex justify-between mr-10 mt-5 border-t-2'>
                <p>Trạng thái: <span className={`font-bold ${company.status === "NTD đã xem" ? "text-orange-500" : "text-blue-500"}`}>{company.status}</span></p>
                <p>Vào lúc: {company.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function YourApplications() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="flex justify-center flex-row items-start bg-gray-100 w-screen space-x-5">
      <div className='justify-center flex-row items-center  w-8/12 mt-5 mb-5'>
        <CompanyList /> {/* Sử dụng component danh sách công ty */}
      </div>
      <div className="rounded-lg p-5  border-2 w-3/12 bg-white mt-5 mb-5">
        <div className="container mx-auto mt-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 overflow-hidden">
              <img
                src={Avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-4">
              <p>Chào bạn trở lại,</p>
              <p className="font-medium">Trần Nguyên</p>
              <div className=" bg-gray-200 rounded inline-block">
                <p>Tài khoản đã xác thực</p>
              </div>
              <p>Nâng cấp tài khoản</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t-2 border-gray mt-4">
          <div className="flex items-center">
            <Switch
              checked={isOn}
              onChange={toggleSwitch}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "& .MuiSwitch-thumb": {
                  bgcolor: isOn ? "green" : "gray",
                },
                "& .MuiSwitch-track": {
                  bgcolor: isOn ? "green" : "gray",
                },
              }}
            />
            <span
              className={`ml-2 ${isOn ? "text-green-500" : "text-gray-400"} font-bold`}
            >
              {isOn ? "Đang Bật Tìm Việc" : "Đang Tắt Tìm Việc"}
            </span>
          </div>
          <p>
            Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều
            hơn trong danh sách tìm kiếm của NTD.
          </p>
          <div className="flex items-center">
            <Switch
              checked={isOn}
              onChange={toggleSwitch}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "& .MuiSwitch-thumb": {
                  bgcolor: isOn ? "green" : "gray",
                },
                "& .MuiSwitch-track": {
                  bgcolor: isOn ? "green" : "gray",
                },
              }}
            />
            <span
              className={`ml-2 ${isOn ? "text-green-500" : "text-gray-400"} font-bold`}
            >
              {isOn
                ? "Đang cho phép NTD tìm kiếm hồ sơ"
                : "Chưa cho phép NTD tìm kiếm hồ sơ"}
            </span>
          </div>
          <p>
            Khi bạn cho phép, các NTD uy tín có thể chủ động kết nối và gửi
            đến bạn những cơ hội việc làm hấp dẫn nhất, giúp nhân đôi hiệu quả
            tìm việc.
          </p>
        </div>
        <div className="flex flex-col border-t-2 border-gray mt-4">
          <div>
            <p>Khởi tạo TopCV Profile để gia tăng 300% cơ hội việc làm tốt</p>
          </div>
          <button className="mt-4 px-4 py-2 text-xs font-bold w-40 h-8 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition duration-300">
            Tạo TopCV Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default YourApplications;
