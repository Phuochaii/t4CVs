import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as HelperModule from '../../modules/helper';

import RelatedCompany from '../../shared/components/RelatedCompany';
import RecruitmentItem from '../../shared/components/RecruitmentItem';

import { Search, MapPin, ChevronDown } from 'lucide-react';

const relatedCompanies = [
  {
    name: 'NGÂN HÀNG TMCP HÀNG HẢI VIỆT NAM (MSB)',
    num: 31,
    avatar:
      'https://static.topcv.vn/company_logos/ngan-hang-tmcp-hang-hai-5ca1e09fb0cf2.jpg',
  },
  {
    name: 'NGÂN HÀNG BẢO VIỆT',
    num: 18,
    avatar:
      'https://static.topcv.vn/company_logos/ngan-hang-bao-viet-5937b34d972ad_rs.jpg',
  },
  {
    name: 'NGÂN HÀNG TMCP QUÂN ĐỘI',
    num: 3,
    avatar:
      'https://static.topcv.vn/company_logos/ngan-hang-tmcp-quan-doi-5f16a4ddc5124.jpg',
  },
];

function Company() {
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState<any>();
  useEffect(() => {
    if (!id) return;
    fetchCompanyInfo(id);
  }, []);
  const fetchCompanyInfo = async (id: string) => {
    try {
      // const response = await axios.get(`http://localhost:3000/company/${id}`);
      const response = await HelperModule.getCompanyById(id);
      setCompanyInfo(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="bg-[#f3f5f7] text-black px-48">
      <div className="bg-transparent py-5">
        <div className="link">
          <ul className="flex items-center">
            <li className="">
              <a className="text-[#212F3F] inline-block font-normal cursor-pointer">
                Danh sách Công ty <span>{""}</span>
              </a>
            </li>
            <li className="">
              <span className="text-[#b3b8bd] ml-2">{">"}</span>{" "}
              {companyInfo?.name ? companyInfo?.name : " "}
            </li>
          </ul>
        </div>
      </div>
      <div className="relative min-h-[360px] bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-[10px] mb-6">
        <div className="h-[224px] overflow-hidden">
          <img
            src={companyInfo?.image ? companyInfo?.image : " "}
            alt="company-banner"
            className="h-full object-cover w-full object-center rounded-t-[10px]"
          />
        </div>
        <div className="">
          <div className="absolute items-center bg-white border-4 rounded-full flex h-[180px] justify-center left-[40px] overflow-hidden top-[136px] w-[180px]">
            <img
              src={companyInfo?.image ? companyInfo?.image : " "}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-8 my-[30px] pl-[252px] pr-[40px] relative">
          <div className="block basis-auto grow shrink max-w-full">
            <h1 className="line-clamp-2 text-white text-xl font-semibold mb-4 max-w-full">
              {companyInfo?.name ? companyInfo?.name : " "}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4 max-w-full">
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: "#FFF",
                  }}
                >
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                </svg>
                <a
                  href={companyInfo?.website}
                  className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Website
                </a>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: "#FFF",
                  }}
                >
                  <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                </svg>
                <span className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                  {companyInfo?.companySize ? companyInfo?.companySize : "0"}+
                  nhân viên
                </span>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: "#FFF",
                  }}
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
                <span className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                  {companyInfo?.field ? companyInfo?.field : "0"} người theo dõi
                </span>
              </div>
            </div>
          </div>
          <div className="cursor-pointer box-follow flex items-center bg-white rounded-[8px] text-[#00b14f] text-lg h-[48px] w-[200px] py-[6px] px-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{
                width: "16px",
                height: "16px",
                fill: "#00b14f",
                marginRight: "11px",
              }}
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            <span>Theo dõi công ty</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full gap-[30px]">
        <div className="w-[67%]">
          <div className="w-full rounded-[8px] overflow-hidden">
            <div className="intro mb-[32px] bg-white">
              <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                Giới thiệu công ty
              </h2>
              <div className="px-5 pt-5 pb-7">
                <div className="content overflow-hidden">
                  {companyInfo?.description
                    ? companyInfo?.description
                    : "Không có mô tả"}
                </div>
                {/* <div className="text-[#00b14f] mt-[15px] font-medium flex items-center">
                                    <a href="#!">Thu gọn</a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        style={{
                                            width: "12px",
                                            height: "12px,",
                                            fill: "#00b14f",
                                            marginLeft: "8px",
                                        }}
                                    >
                                        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                                    </svg>
                                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full rounded-[8px] overflow-hidden">
            <div className="intro mb-[32px] bg-white">
              <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                Tuyển dụng
              </h2>
              <div className="px-5 py-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[46%]">
                    <div className="border flex items-center py-4 px-3 rounded-md overflow-hidden">
                      <Search
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "12px",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Tên công viêc, vị trí ứng tuyển..."
                        className="w-full bg-white focus:outline-none  "
                      />
                    </div>
                  </div>
                  <div className="w-[34%]">
                    <div className="border flex items-center py-4 px-3 rounded-md overflow-hidden">
                      <MapPin
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "12px",
                        }}
                      />
                      <div className="cursor-pointer flex items-center">
                        <span>Tất cả tỉnh, thành phố</span>
                        <ChevronDown
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "00B14F",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[20%] cursor-pointer">
                    <div className="border flex items-center p-4 rounded-md overflow-hidden bg-[#00B14F]">
                      <Search
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "12px",
                          color: "white",
                        }}
                      />
                      <span className="text-white">Tìm kiếm</span>
                    </div>
                  </div>
                </div>
                <RecruitmentItem />
                <RecruitmentItem />
                <RecruitmentItem />
              </div>
            </div>
          </div>
          <div className="mb-5 font-semibold text-xl text-[#00b14f]">
            Top công ty cùng lĩnh vực
          </div>
          {relatedCompanies.map((company) => (
            <RelatedCompany key={company} company={company} />
          ))}
        </div>
        <div className="w-[33%]">
          <div className="w-full rounded-[8px] overflow-hidden">
            <div className="intro mb-[32px] bg-white">
              <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                Thông tin liên hệ
              </h2>
              <div className="px-6 pb-7 ">
                <div className="py-5 border-b-[1px]  border-[#dee0e2]">
                  <div className="mb-2 flex gap-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      style={{
                        width: "15px",
                        height: "20px",
                        fill: "#00b14f",
                      }}
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <span>Địa chỉ công ty</span>
                  </div>
                  <div className="text-[#4d5965] font-normal">
                    {companyInfo?.address
                      ? companyInfo?.address
                      : "Không được cung cấp địa chỉ"}
                  </div>
                </div>
                <div className="py-5 ">
                  <div className="mb-2 flex gap-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      style={{
                        width: "15px",
                        height: "20px",
                        fill: "#00b14f",
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
          <div className="w-full rounded-[8px] overflow-hidden">
            <div className="intro mb-[32px] bg-white">
              <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                Chia sẻ công ty tới bạn bè
              </h2>
              <div className="px-6 pb-7 ">
                <div className="py-5 border-b-[1px]  border-[#dee0e2]">
                  <div className="mb-2 flex gap-3 ">
                    <span>Sao chép đường dẫn</span>
                  </div>
                  <div className="text-[#4d5965] font-normal"></div>
                </div>
                <div className="py-5 ">
                  <div className="mb-2 flex gap-3 ">
                    <span>Chia sẻ qua mạng xã hội</span>
                  </div>
                  <div className="text-[#4d5965] font-normal"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
