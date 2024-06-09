import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Switch from '../../shared/components/CustomSwitch';
import { getCompanyById } from '../../modules/helper';
import {
  getEmployerById,
  updateLicenseStatus,
  updatePhoneStatus,
} from '../../modules/admin-module';
import { CheckCheck, Phone } from 'lucide-react';
import { EmployerFromServer } from '../../shared/types/Employer.type';
import { CompanyFromServer } from '../../shared/types/Company.type';
import { useProfileContext } from '../../shared/services/authen/domain/context';

function EmployerDetail() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [employerInfo, setEmployerInfo] = useState<EmployerFromServer | null>();
  const [companyInfo, setCompanyInfo] = useState<CompanyFromServer | null>();
  const [refresh, setRefresh] = useState(false);
  const { token } = useProfileContext();

  useEffect(() => {
    if (!id) return;
    fetchEmployerInfo(id);
  }, []);
  useEffect(() => {
    if (!id) return;
    fetchEmployerInfo(id);
  }, [id, refresh]);
  useEffect(() => {
    if (employerInfo?.companyId) {
      fetchCompanyInfo(employerInfo.companyId);
      console.log(234, companyInfo);
    }
  }, [employerInfo]);
  const fetchEmployerInfo = async (id: string) => {
    try {
      const response = await getEmployerById(id);
      console.log(response);
      setEmployerInfo(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCompanyInfo = async (id: string | number) => {
    try {
      const response = await getCompanyById(id);
      console.log(response);
      setCompanyInfo(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="bg-slate-200 w-100 flex flex-col items-center ">
      <div className="w-full p-2 bg-white">
        <div className="bg-transparent py-5">
          <div className="link">
            <ul className="flex items-center">
              <li className="">
                <a className="text-[#212F3F] inline-block font-normal cursor-pointer">
                  Danh sách nhà tuyển dụng <span>{''}</span>
                </a>
              </li>
              <li className="">
                <span className="text-[#b3b8bd] ml-2">{'>'}</span>{' '}
                {employerInfo?.fullname ? employerInfo?.fullname : ' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="gap-2 py-8 w-[90%]">
        <div className="relative min-h-[360px] bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-[10px] mb-6">
          <div className="h-[224px] overflow-hidden">
            <img
              src={employerInfo?.image ?? ' '}
              alt="company-banner"
              className="h-full object-cover w-full object-center rounded-t-[10px]"
            />
          </div>
          <div className="">
            <div className="absolute items-center bg-white border-4 rounded-full flex h-[180px] justify-center left-[40px] overflow-hidden top-[136px] w-[180px]">
              <img
                src={employerInfo?.image ?? ' '}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-8 my-[30px] pl-[252px] pr-[40px] relative">
            <div className="block basis-auto grow shrink max-w-full">
              <h1 className="line-clamp-2 text-white text-xl font-semibold mb-4 max-w-full">
                {employerInfo?.fullname}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-4 max-w-full">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{
                      width: '16px',
                      height: '16px',
                      fill: '#FFF',
                    }}
                  >
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                  </svg>
                  <div
                    onClick={() =>
                      navigation(`/admin/company/${employerInfo?.companyId}`)
                    }
                    className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap hover:text-slate-200"
                  >
                    Company:{' '}
                    <span className="text-lg font-bold">
                      {companyInfo?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={async () => {
                await updateLicenseStatus(
                  token,
                  employerInfo?.id as number,
                  !employerInfo?.licenseStatus,
                );
                setRefresh(!refresh);
              }}
              className="cursor-pointer box-follow flex items-center bg-white rounded-[8px] text-[#00b14f] text-lg h-[48px] py-[6px] pl-[14px] pr-[18px]"
            >
              <Switch
                checked={
                  employerInfo?.licenseStatus
                    ? employerInfo?.licenseStatus
                    : false
                }
              />
              <b>Trạng thái</b>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[30px] mb-[32px]">
          <div className="w-2/3 ">
            {/* GIỚI THIỆU CÔNG TY */}
            <div className="bg-white rounded-[8px] overflow-hidden pb-5 mb-5">
              <div className="w-full">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Giới thiệu công ty
                </h2>
                <p className="px-5 pt-5 max-w-[650px]">
                  Giới tính:{' '}
                  {employerInfo?.gender
                    ? employerInfo?.gender
                    : 'Không có mô tả'}
                </p>
                <p className="px-5 pt-5 pb-7 max-w-[650px]">
                  Skype:{' '}
                  {employerInfo?.skype ? employerInfo?.skype : 'Không có mô tả'}
                </p>
                <p className="px-5 pt-5 pb-7 max-w-[650px]"></p>
              </div>
              <h2 className="text-lg font-bold p-5">Giấy phép hoạt động:</h2>
              <div className="flex gap-3 mx-5 items-start">
                {employerInfo?.license ? (
                  <img
                    className="w-1/2 object-contain"
                    src={employerInfo?.license}
                  />
                ) : (
                  'Không có mô tả'
                )}
                {employerInfo?.supplement &&
                employerInfo?.supplement != 'null' ? (
                  <img
                    className="w-1/2 object-contain"
                    src={employerInfo?.supplement}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="rounded-[8px] overflow-hidden">
              <div className="intro mb-[32px] bg-white">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Thông tin liên hệ
                </h2>
                <div className="px-6 pb-7 ">
                  <div className="py-5 border-b-[1px]  border-[#dee0e2]">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 ">
                        <Phone size={20} color="#00b14f" />
                        <a
                          className="hover:text-[#00b14f] font-semibold"
                          href={`tel:${
                            employerInfo?.phoneNumber
                              ? employerInfo?.phoneNumber
                              : ''
                          }`}
                        >
                          {employerInfo?.phoneNumber
                            ? employerInfo?.phoneNumber
                            : 'Không có mô tả'}
                        </a>
                        {employerInfo?.phoneNumberStatus && (
                          <CheckCheck size={15} color="#00b14f" />
                        )}
                      </div>
                      <div
                        onClick={async () => {
                          await updatePhoneStatus(
                            token,
                            employerInfo?.id as number,
                            !employerInfo?.phoneNumberStatus,
                          );
                          setRefresh(!refresh);
                        }}
                        className="cursor-pointer box-follow flex items-center bg-white rounded-[8px] text-[#00b14f] text-lg"
                      >
                        <Switch
                          checked={
                            employerInfo?.phoneNumberStatus
                              ? employerInfo?.phoneNumberStatus
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-5 ">
                    <div className="mb-2 flex gap-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        style={{
                          width: '15px',
                          height: '20px',
                          fill: '#00b14f',
                        }}
                      >
                        <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
                      </svg>
                      <span>Xem bản đồ</span>
                    </div>
                    <div className="text-[#4d5965] font-normal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDetail;
