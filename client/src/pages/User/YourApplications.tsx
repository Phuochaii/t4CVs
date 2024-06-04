// Hùng
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import Avatar from '../../shared/assets/images/vietnam-flag-icon.png';
import { Check, CircleAlert } from 'lucide-react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Select from 'react-select';
import TopCVBanner from '../../shared/assets/images/Topcv-banner.jpg';
import { getApplications } from '../../shared/utils/helper';
import { ApplicationFromServer } from '../../shared/types/Application.type';
import { RecruitmentFromServer } from '../../shared/types/Recruitment.type';
import { UserCV } from '../../shared/types/CV_user.type';
import moment from 'moment';
const option = [
  { value: 'Đã ứng tuyển', label: 'Đã ứng tuyển' },
  { value: 'NTD đã xem hồ sơ', label: 'NTD đã xem hồ sơ' },
  { value: 'Hồ sơ phù hợp', label: 'Hồ sơ phù hợp' },
];

function YourApplications() {
  const [isOn, setIsOn] = useState(false);
  const [applications, setApplication] = useState<
    ApplicationFromServer[] | undefined
  >([]);
  const [jobs, setJobs] = useState<RecruitmentFromServer[] | null>([]);
  const [CVs] = useState<UserCV[] | null>([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getApplications('22');
        // console.log(result);
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
  }, []);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center flex-row items-start  w-screen space-x-5 max-w-screen-lg mx-auto">
        <div className="justify-center flex-row items-center w-8/12 my-5 ">
          <div className="company-list space-y-4 w-full shadow border-2 rounded-lg bg-white">
            <div className="flex justify-between m-5 items-center">
              <h1 className="text-black text-xl font-medium">
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
              {applications!.length! > 0 ? (
                applications!.map((item) => {
                  const createdAt = moment(new Date(item.createdAt)).format(
                    'DD-MM-YYYY HH:mm A',
                  );
                  const updatedAt = moment(new Date(item.updateAt)).format(
                    'DD-MM-YYYY HH:mm A',
                  );
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        // navigation(`/detail-job/${item.id}`);
                      }}
                      className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-sm shadow-sm flex gap-6 hover:border-green-500"
                    >
                      <img
                        className="job-logo-company justify-center w-[84px] h-[84px] flex items-center border rounded-lg"
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
                          <span className="job-company-name text-slate-500 col-span-3 mb-1">
                            {
                              jobs!.find(
                                (e) => e.campaignId === item.campaignId,
                              )?.company.name
                            }
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-row space-x-1">
                            <p>Thời gian ứng tuyển: {createdAt}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-light">
                            CV đã ứng tuyển:{' '}
                            <span className="font-normal text-green-500 underline">
                              CV tải lên
                            </span>
                          </p>
                          <div className="job-actions row-start-4 flex items-center justify-end space-x-2">
                            <button className="bg-[#c0eed4ba] text-sm font-bold hover:bg-green-300 text-[#00b14f] py-0.5 px-2 rounded-full inline-flex items-center me-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 30 20"
                                fill="#00b14f"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              Nhắn tin
                            </button>
                            <button className="bg-[#c0eed4ba] text-sm font-bold hover:bg-green-300 text-[#00b14f] py-0.5 px-2 rounded-full inline-flex items-center me-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 30 20"
                                fill="#00b14f"
                              >
                                <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z" />
                              </svg>
                              Xem CV
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5 pt-3 border-t-2 text-slate-500">
                          <p>
                            Trạng thái:{' '}
                            <span
                              className={`font-medium ${item.status === true ? 'text-orange-500' : 'text-blue-500'}`}
                            >
                              {item.status === true
                                ? 'NTD đã xem'
                                : 'Đã ứng tuyển'}
                            </span>
                          </p>
                          <p className="text-base">Vào lúc: {updatedAt}</p>
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
                Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với
                bạn qua:
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
    </div>
  );
}
export default YourApplications;
