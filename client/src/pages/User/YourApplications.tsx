// Hùng
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
import { useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#81F79F',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const companies = [
  { id: 1, job_title: 'Thực tập sinh kiểm thử phần mềm', name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG', CV: 'TopCV', logo: VNRS, time: '06-09-2023 21:36 PM', status: 'Đã ứng tuyển', salary: '3 - 5 triệu' },
  { id: 2, job_title: 'Thực tập sinh kiểm thử phần mềm', name: 'FPT information system', CV: 'TopCV', logo: FPT, time: '14-09-2023 15:55 PM', status: 'NTD đã xem', salary: 'Thỏa thuận' },

  // Add more companies as needed
];
function CompanyList() {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="company-list space-y-4 w-3/4">
      <div className='flex justify-between'>
        <h1 className='text-black text-xl'>Công việc đã ứng tuyển</h1>
        <div className="dropdown">
          <button
            className="text-black bg-white border-2 rounded-sm font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            onClick={handleDropDown}
          >
            Trạng thái
            <svg
              className="ml-2 w-4 h-4"
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
            className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${isOpen ? "block" : "hidden"
              }`}
          >
            <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                  blablabla
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                  blablabla
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {companies.map(company => (
        // <div className='box-content shadow-md pb-10 rounded mt-10'>
        <div key={company.id} className="company-container items-start shadow-md pb-10 rounded flex  items-center space-x-5">
          <img className='border-2 rounded-md ml-5 w-28 h-28' src={company.logo} />
          <div className=" company-details text-left w-full">

            <div className='flex justify-between mr-10'>
              <h1 className='font-bold text-2xl'>{company.job_title}</h1>
              <p className='text-green-500 font-bold'>{company.salary}</p>
            </div>
            <p className='font-light'>{company.name}</p>
            <p>Thời gian ứng tuyển: {company.time}</p>
            <div className='flex justify-between mr-10'>
              <p className='font-light'>CV đã ứng tuyển: <span className='font-normal text-green-500 underline'>{company.CV}</span></p>
              <div className='flex space-x-1'>
                <button className="bg-green-500 text-sm font-medium hover:bg-green-700 text-white py-1 px-2 rounded-full inline-flex items-center me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Nhắn tin
                </button>
                <button className="bg-green-500 text-sm font-medium hover:bg-green-700 text-white py-1 px-2 rounded-full inline-flex items-center me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Xem CV
                </button>
              </div>
            </div>
            <div className='flex justify-between mr-10'>
              <p>Trạng thái: <span className={`font-bold ${company.status === "NTD đã xem" ? "text-orange-500" : "text-blue-500"}`}>{company.status}</span></p>
              <p>Vào lúc: {company.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function YourApplications() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-screen-lg">
        <div className='justify-center items-center'>
          <CompanyList /> {/* Sử dụng component danh sách công ty */}
        </div>
      </div>
    </div>
  );
}

export default YourApplications;
