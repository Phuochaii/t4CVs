// Hùng
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import Avatar from '../../shared/assets/images/vietnam-flag-icon.png';
import FPT from '../../shared/assets/images/FPT.jpg';
import VNRS from '../../shared/assets/images/VNRS.png';
import { Check, CircleAlert } from 'lucide-react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Select, { MultiValue, SingleValue } from 'react-select';
import TopCVBanner from '../../shared/assets/images/Topcv-banner.jpg';
import { getApplications, getCampaignById } from '../../shared/utils/helper';
import { ApplicationFromServer } from '../../shared/types/Application.type';
import { RecruitmentFromServer } from '../../shared/types/Recruitment.type';
import { UserCV } from '../../shared/types/CV_user.type';
import { set } from 'react-hook-form';
const companies = [
  {
    id: 1,
    job_title: 'Thực tập sinh kiểm thử phần mềm',
    name: 'CÔNG TY CỔ PHẦN TÀI NGUYÊN TRI THỨC VIỆT NĂNG',
    CV: 'TopCV',
    logo: VNRS,
    time: '06-09-2023 21:36 PM',
    status: 'Đã ứng tuyển',
    salary: '3 - 5 triệu',
  },
  {
    id: 2,
    job_title: 'Thực tập sinh kiểm thử phần mềm',
    name: 'FPT information system',
    CV: 'TopCV',
    logo: FPT,
    time: '14-09-2023 15:55 PM',
    status: 'NTD đã xem',
    salary: 'Thỏa thuận',
  },

  // Add more companies as needed
];
const userId =
  localStorage.getItem('user') === null
    ? ''
    : JSON.parse(localStorage.getItem('user') as string).id;
const option = [
  { value: 'Đã ứng tuyển', label: 'Đã ứng tuyển' },
  { value: 'NTD đã xem hồ sơ', label: 'NTD đã xem hồ sơ' },
  { value: 'Hồ sơ phù hợp', label: 'Hồ sơ phù hợp' },
];

// const DropdownMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedContent, setSelectedContent] = useState("Trạng thái");

//   const setContent = (content: any) => {
//     setSelectedContent(content);
//   }
//   const handleDropDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,) => {
//     setIsOpen(!isOpen);
//     const dropdownMenu = document.getElementById('dropdown');
//     if (dropdownMenu && event.currentTarget) {
//       const buttonWidth = event.currentTarget.offsetWidth;
//       dropdownMenu.style.width = buttonWidth + 'px';
//     }
//   };
//   return (
//     <div className="relative">
//       <button
//         className="text-black bg-white border-2 rounded-sm font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative w-48 hover:border-green-500"
//         onClick={handleDropDown}
//       >
//         {selectedContent}
//         <svg
//           className="absolute right-2 w-4 h-4"
//           aria-hidden="true"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 9l-7 7-7-7"
//           ></path>
//         </svg>
//       </button>

//       <div
//         id="dropdown"
//         className={`absolute z-10 top-full right-0 mt-1 bg-white rounded divide-y divide-gray-100 shadow ${isOpen ? "block" : "hidden"}`}
//       >
//         <ul className="py-2">
//           <li>
//             <button
//               onClick={() => { setContent("Trạng thái"), setIsOpen(false) }} // Change content and close dropdown when clicked
//               className="block py-2 px-4 w-full text-left hover:bg-gray-100"
//             >
//               Trạng thái
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => { setContent("Đã ứng tuyển"), setIsOpen(false) }} // Change content and close dropdown when clicked
//               className="block py-2 px-4 w-full text-left hover:bg-gray-100"
//             >
//               Đã ứng tuyển
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => { setContent("NTD đã xem hồ sơ"), setIsOpen(false) }} // Change content and close dropdown when clicked
//               className="block py-2 px-4 w-full text-left hover:bg-gray-100"
//             >
//               NTD đã xem hồ sơ
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => { setContent("Hồ sơ phù hợp"), setIsOpen(false) }} // Change content and close dropdown when clicked
//               className="block py-2 px-4 w-full text-left hover:bg-gray-100"
//             >
//               Hồ sơ phù hợp
//             </button>
//           </li>

//         </ul>
//       </div>
//     </div>
//   );
// };

function CompanyList(companies: any) {
  return (
    <div className="company-list space-y-4 w-full shadow border-2 rounded-lg bg-white">
      <div className="flex justify-between m-5 items-center">
        <h1 className="text-black text-xl font-bold">Công việc đã ứng tuyển</h1>
        <div className="w-48">
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
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#A5D6A7' : 'white',
                color: state.isSelected ? 'green' : 'black',
                fontWeight: state.isSelected ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: '#A5D6A7',
                  fontWeight: 'bold',
                  color: 'green',
                },
              }),
              singleValue: (base) => ({
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
            placeholder="Trạng thái"
            options={option}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      </div>

      <div className="company-list m-5">
        {/* {companies.map(company => (
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
        ))} */}

        {companies.length > 0 ? (
          companies.map((item: any) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  // navigation(`/detail-job/${item.id}`);
                }}
                className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3 hover:border-green-500"
              >
                <div className="job-logo-company justify-center w-32 h-32 min-w-32 flex items-center border rounded-lg">
                  <img src={item.logo} />
                </div>
                <div className="job-detail w-full h-full">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <span className="job-title text-black font-semibold col-span-3 text-lg">
                        {item.job_title}
                      </span>
                      <div className="job-salary col-start-4 flex items-center">
                        <CurrencyDollarIcon className="w-5 mr-2" />
                        <strong className="salary-count">{item.salary}</strong>
                      </div>
                    </div>
                    <span className="job-company-name text-slate-600 text-sm col-span-3 mb-2">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row space-x-1">
                      <p>Thời gian ứng tuyển: {item.time}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-light">
                      CV đã ứng tuyển:{' '}
                      <span className="font-normal text-green-500 underline">
                        TopCV
                      </span>
                    </p>
                    <div className="job-actions row-start-4 flex items-center justify-end space-x-2">
                      <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 30 20"
                          fill="#008000"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Nhắn tin
                      </button>
                      <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 30 20"
                          fill="#008000"
                        >
                          <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z" />
                        </svg>
                        Xem CV
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 border-t-2">
                    <p>
                      Trạng thái:{' '}
                      <span
                        className={`font-bold ${item.status === 'NTD đã xem' ? 'text-orange-500' : 'text-blue-500'}`}
                      >
                        {item.status}
                      </span>
                    </p>
                    <p>Vào lúc: {item.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
}
function YourApplications() {
  const [isOn, setIsOn] = useState(false);
  const [applications, setApplication] = useState<
    ApplicationFromServer[] | undefined
  >([]);
  const [jobs, setJobs] = useState<RecruitmentFromServer[] | null>([]);
  const [CVs, setCVs] = useState<UserCV[] | null>([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getApplications(22); // Wait for the result
        if (result) {
          const { applications, jobs } = result;
          console.log(applications);
          console.log(jobs);
          console.log(CVs);
          setApplication(applications);
          setJobs(jobs);
        } else {
          console.log('No applications found.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchApplications(); // Call the fetchApplications function when the component mounts

    // If you need to specify dependencies for the effect, include them in the dependency array
    // For example:
    // }, [dependency1, dependency2]);
  }, []);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="flex justify-center flex-row items-start bg-gray-100 w-screen space-x-5">
      <div className="justify-center flex-row items-center  w-8/12 mt-5 mb-5">
        <div className="company-list space-y-4 w-full shadow border-2 rounded-lg bg-white">
          <div className="flex justify-between m-5 items-center">
            <h1 className="text-black text-xl font-bold">
              Công việc đã ứng tuyển
            </h1>
            <div className="w-48">
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
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#A5D6A7' : 'white',
                    color: state.isSelected ? 'green' : 'black',
                    fontWeight: state.isSelected ? 'bold' : 'normal',
                    '&:hover': {
                      backgroundColor: '#A5D6A7',
                      fontWeight: 'bold',
                      color: 'green',
                    },
                  }),
                  singleValue: (base) => ({
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
                placeholder="Trạng thái"
                options={option}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>

          <div className="company-list m-5">
            {/* {companies.map(company => (
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
        ))} */}

            {applications!.length! > 0 ? (
              applications!.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      // navigation(`/detail-job/${item.id}`);
                    }}
                    className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex items-center gap-3 hover:border-green-500"
                  >
                    <img
                      className="job-logo-company justify-center w-32 h-32 min-w-32 flex items-center border rounded-lg"
                      src={
                        jobs!.find((e) => e.campaignId === item.campaignId)
                          ?.company.image
                      }
                    />
                    <div className="job-detail w-full h-full">
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                          <span className="job-title text-black font-semibold col-span-3 text-lg">
                            {
                              jobs!.find(
                                (e) => e.campaignId === item.campaignId,
                              )?.titleRecruitment
                            }
                          </span>
                          <div className="job-salary col-start-4 flex items-center">
                            <CurrencyDollarIcon className="w-5 mr-2" />
                            <strong className="salary-count">
                              {
                                jobs!.find(
                                  (e) => e.campaignId === item.campaignId,
                                )?.salaryMin
                              }{' '}
                              -{' '}
                              {
                                jobs!.find(
                                  (e) => e.campaignId === item.campaignId,
                                )?.salaryMax
                              }
                            </strong>
                          </div>
                        </div>
                        <span className="job-company-name text-slate-600 text-sm col-span-3 mb-2">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-row space-x-1">
                          <p>Thời gian ứng tuyển: {item.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-light">
                          CV đã ứng tuyển:{' '}
                          <span className="font-normal text-green-500 underline">
                            TopCV
                          </span>
                        </p>
                        <div className="job-actions row-start-4 flex items-center justify-end space-x-2">
                          <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 30 20"
                              fill="#008000"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Nhắn tin
                          </button>
                          <button className="bg-green-200 text-sm font-bold hover:bg-green-300 text-green-700 py-1 px-2 rounded-full inline-flex items-center me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 30 20"
                              fill="#008000"
                            >
                              <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z" />
                            </svg>
                            Xem CV
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between mt-5 border-t-2">
                        <p>
                          Trạng thái:{' '}
                          <span
                            className={`font-bold ${item.status === true ? 'text-orange-500' : 'text-blue-500'}`}
                          >
                            {item.status === true
                              ? 'NTD đã xem'
                              : 'Đã ứng tuyển'}
                          </span>
                        </p>
                        <p>Vào lúc: {item.updateAt}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/12 m-8 flex flex-col">
        <div className="bg-white rounded-lg p-5 md:p-6 mb-5">
          <div className="container mx-auto">
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
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-thumb': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                }}
              />
              <span
                className={`ml-2 ${isOn ? 'text-green-500' : 'text-gray-400'} font-bold`}
              >
                {isOn ? 'Đang Bật Tìm Việc' : 'Đang Tắt Tìm Việc'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-5 mb-5">
              Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều
              hơn trong danh sách tìm kiếm của NTD.
            </p>
            <div className="flex items-center">
              <Switch
                checked={isOn}
                onChange={toggleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-thumb': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: isOn ? 'green' : 'gray',
                  },
                }}
              />
              <span
                className={`ml-2 ${isOn ? 'text-green-500' : 'text-gray-400'} font-bold`}
              >
                {isOn
                  ? 'Đang cho phép NTD tìm kiếm hồ sơ'
                  : 'Chưa cho phép NTD tìm kiếm hồ sơ'}
              </span>
            </div>
            <p className="text-sm">
              Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn
              qua:
            </p>
            <div className="flex flex-row items-center space-x-2 mb-2 mt-2">
              <div className="p-1 bg-green-100 rounded-full w-fit h-fit">
                <Check
                  style={{ color: 'green', width: 15, height: 15 }}
                ></Check>
              </div>
              <p className="text-sm">Nhắn tin qua Top Connect trên TopCV</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="p-1 bg-green-100 rounded-full w-fit h-fit">
                <Check
                  style={{ color: 'green', width: 15, height: 15 }}
                ></Check>
              </div>
              <p className="text-sm">Email và Số điện thoại của bạn</p>
            </div>
            <img
              src={TopCVBanner}
              alt="avatar"
              className="w-full h-full object-cover mt-2 mb-4"
            />
          </div>
          <div className="flex flex-col border-t-2 border-gray mt-4">
            <div className="flex flex-row items-start">
              <CircleAlert
                style={{
                  transform: 'rotate(180deg)',
                  width: 15,
                  height: 15,
                  marginTop: 1,
                  marginRight: 3,
                }}
              ></CircleAlert>
              <p className="text-[11px]">
                Khởi tạo TopCV Profile để gia tăng 300% cơ hội việc làm tốt
              </p>
            </div>
            <button
              className="mt-4 px-4 py-2 text-xs font-bold w-40 h-8 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition duration-300"
              onClick={() => {}}
            >
              Tạo TopCV Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default YourApplications;
