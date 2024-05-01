// // thuc

// import { useState } from "react";
// import SearchBar from "../../layouts/AdminLayout/components/SearchBar";
// import { MoreHorizontal } from "lucide-react";

// const columns = [
//   "Status",
//   "Company Name",
//   "Experience Level",
//   "Job",
//   "Action",
// ];

// function Campaign() {
//   const [openDialog, setOpenDialog] = useState(-1);
//   const [mockUsers, setMockUsers] = useState([
//     {
//       status: "accepted",
//       imageUrl:
//         "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
//       companyName: "Meta",
//       experienceLevel: "Junior",
//       job: "Quality Assurance",
//     },
//     {
//       status: "declined",
//       imageUrl:
//         "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
//       companyName: "Apple",
//       experienceLevel: "Senior",
//       job: "Software Engineer",
//     },
//     {
//       status: "pending",
//       imageUrl:
//         "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
//       companyName: "Netflix",
//       experienceLevel: "Mid-level",
//       job: "Software Tester",
//     },
//   ]);

//   return (
//     <div
//       className="z-0 flex-grow px-10 py-4 bg-slate-100"
//       onClick={(event) => {
//         event.preventDefault();
//         setOpenDialog(-1);
//       }}
//     >
//       <div className="flex justify-between w-full gap-12 my-4">
//         <h1 className="text-2xl font-bold text-slate-500">
//           Campaign
//         </h1>
//         <div className="">
//           <SearchBar placeholder="Search Campaign" />
//         </div>
//       </div>

//       {/* Table */}
//       <table className="flex flex-col w-full gap-10 px-10 py-12 bg-white border-slate-500 rounded-2xl">
//         <thead className="w-full">
//           <tr className="flex text-center justify-evenly">
//             {columns.map((item, index) => {
//               return (
//                 <td
//                   key={"header-" + index}
//                   className="flex items-center justify-center w-1/5 p-12 font-bold text-slate-500"
//                 >
//                   {item}
//                 </td>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody className="flex flex-col w-full gap-10 bg-white border-slate-500 rounded-2xl">
//           {mockUsers.map((user, index) => {
//             return (
//               <tr
//                 className="flex items-center py-4 justify-evenly text-slate-500 border-slate-300 rounded-[24rem] border"
//                 key={"row-" + index}
//               >
//                 <td
//                   className={`flex justify-center  capitalize font-bold text-white w-1/5`}
//                 >
//                   <span
//                     className={`rounded-[24rem] px-4 py-2 ${
//                       user.status === "accepted"
//                         ? "bg-green-500"
//                         : user.status === "pending"
//                         ? "bg-gradient-to-b from-green-500 to-blue-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="flex items-center justify-center w-1/5 gap-6">
//                   <img
//                     src={user.imageUrl}
//                     alt="User image"
//                     className="object-cover object-left-top w-16 h-16 rounded-[24rem]"
//                   />
//                   {user.companyName}
//                 </td>
//                 <td className="flex justify-center w-1/5">
//                   {user.experienceLevel}
//                 </td>
//                 <td className="flex justify-center w-1/5">
//                   {user.job}
//                 </td>
//                 <td className="relative flex justify-center w-1/5">
//                   <MoreHorizontal
//                     className="hover:bg-slate-400 rounded-[24rem] hover:text-white hover:cursor-pointer"
//                     onClick={(event) => {
//                       event.preventDefault();
//                       event.stopPropagation();
//                       setOpenDialog(index);
//                     }}
//                   />
//                   {openDialog === index && (
//                     <div className="absolute flex flex-col translate-x-16 translate-y-2 bg-white">
//                       <div
//                         className="flex items-center justify-center px-4 py-2 border-t border-l border-r rounded-t-lg hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
//                         onClick={() => {
//                           const newUser = {
//                             ...user,
//                             status: "accepted",
//                           };
//                           const newMockUsers = [...mockUsers];
//                           newMockUsers[index] = newUser;
//                           setMockUsers(newMockUsers);
//                         }}
//                       >
//                         Accept
//                       </div>
//                       <div
//                         className="flex items-center justify-center px-4 py-2 border-b border-l border-r rounded-b-lg hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
//                         onClick={() => {
//                           const newUser = {
//                             ...user,
//                             status: "declined",
//                           };
//                           const newMockUsers = [...mockUsers];
//                           newMockUsers[index] = newUser;
//                           setMockUsers(newMockUsers);
//                         }}
//                       >
//                         Decline
//                       </div>
//                       <div className="flex flex-col items-center justify-center py-2 border rounded-xl border-slate-200 hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white">
//                         Details
//                       </div>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Campaign;

import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import { ChevronDown, Search } from "lucide-react";

import { SetStateAction, useEffect, useState } from "react";
import { Campaign as CampaignType } from "../../shared/types/Campaign.type";
import { Link } from "react-router-dom";
import Switch from "../../shared/components/CustomSwitch";
import axios from "axios";

interface CompaignTableProps {
  data: CampaignType[];
  setData: React.Dispatch<SetStateAction<CampaignType[]>>;
}

interface CompaignFromServer {
  id: number;
  employerId: number;
  name: string;
  createdAt: string;
}

const CompanyCompaignTableHeader = () => {
  return (
    <thead>
      <tr>
        <td className="px-2 py-1 font-bold border">
          Chiến dịch tuyển dụng
        </td>
        <td className="px-2 py-1 font-bold border">Công ty</td>
        <td className="px-2 py-1 font-bold border">Ngày đăng</td>
        <td className="px-2 py-1 font-bold border">Tin tuyển dụng</td>
        <td className="px-2 py-1 font-bold border">
          Dịch vụ đang chạy
        </td>
      </tr>
    </thead>
  );
};

interface CompanyCompaignTableRowProps {
  data: CampaignType;
}

const CompanyCompaignTableRow = ({
  data,
}: CompanyCompaignTableRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [compaign, setCompaign] = useState<CampaignType>(data);
  return (
    <tr
      className="align-top hover:bg-green-100 bg-slate-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="border">
        <div className="flex items-start gap-2 p-2">
          <Switch
            checked={compaign.isCompaignActive}
            onClick={() => {
              setCompaign({
                ...compaign,
                isCompaignActive: !compaign.isCompaignActive,
              });
            }}
          />
          <div className="flex flex-col items-start gap-2 mb-12">
            <h3 className="font-bold">{compaign.compaignName}</h3>
            <span className="font-bold text-slate-400">
              {compaign.cvs.length === 0 ? (
                "Chưa có CV nào"
              ) : (
                <div className="flex items-center gap-1">
                  {compaign.cvs.slice(0, 5).map((candidate, item) => {
                    return (
                      <img
                        key={item}
                        src={candidate.candidateImage}
                        className="w-8 h-8 rounded-full"
                      />
                    );
                  })}
                  {compaign.cvs.length > 5 ? (
                    <span className="p-1 font-normal text-green-500 bg-green-100 rounded-full">{`+${
                      compaign.cvs.length - 5
                    } hồ sơ khác`}</span>
                  ) : null}
                </div>
              )}
            </span>
            <span className="font-bold bg-slate-200 text-zinc-400">
              {`#${compaign.compaignId}`}
            </span>
            {
              <div
                className={`flex items-center gap-2 font-bold ${
                  isHovered ? "visible" : "invisible"
                }`}
              >
                <a href="#">Sửa chiến dịch</a>
                <a href="#">Xem báo cáo</a>
              </div>
            }
          </div>
        </div>
      </td>
      <td className="border">
        <div className="p-2 font-bold text-blue-500">{`${compaign.company}`}</div>
      </td>
      <td className="border">
        <div className="p-2 font-bold text-blue-500">{`${compaign.postDate?.toLocaleDateString(
          "vi-VN"
        )}`}</div>
      </td>
      <td className="border max-w-[180px]">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-bold capitalize">
            {compaign.recruitment}
          </h3>
          <div className="flex gap-2">
            <span className="font-bold bg-slate-200 text-slate-400">
              {`#${compaign.recruimentId}`}
            </span>
            <span className="font-bold text-slate-400">
              {compaign.recruitmentStatus}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              isHovered ? "visible" : "invisible"
            }`}
          >
            <Link
              className="font-bold text-green-500"
              to={`/hr/compaign-edit/${compaign.recruimentId}`}
              state={compaign}
            >
              Chỉnh sửa
            </Link>
            <button> Yêu cầu hiển thị </button>
          </div>
        </div>
      </td>

      <td className="border">
        <div className="p-2">
          {compaign.isCompaignActive ? (
            <span className="px-2 py-1 font-bold text-green-500 rounded-sm bg-slate-100">
              Thêm
            </span>
          ) : (
            <>Chiến dịch đang tắt</>
          )}
        </div>
      </td>
    </tr>
  );
};

const CompanyCompaignTable = ({ data }: CompaignTableProps) => {
  return (
    <table className="w-full text-sm bg-white">
      <CompanyCompaignTableHeader />
      <tbody>
        {data.map((item, index) => (
          <CompanyCompaignTableRow data={item} key={index} />
        ))}
      </tbody>
    </table>
  );
};

interface CompanyFromServer {
  id: number;
  field: number;
  taxCode: string;
  name: string;
  website: string;
  image: string;
  address: "88 Kingsford Junction";
  phone: string;
  companySize: number;
  description: string;
  status: boolean;
}

interface EmployerFromServer {
  id: number;
  fullname: string;
  gender: string;
  skype: string;
  companyId: number;
  license: string;
  phoneNumber: string;
  licenseStatus: boolean;
  phoneNumberStatus: boolean;
  image: string;
}

function Campaign() {
  const [campaigns, setCompaigns] = useState<CampaignType[]>([]);

  useEffect(() => {
    const getAllCompaigns = async () => {
      const response = await axios.get(
        "http://localhost:3000/company/campaign/all"
      );
      const responseCompany = await axios.get(
        "http://localhost:3000/company/all"
      );
      const responseEmployer = await axios.get(
        "http://localhost:3000/employer/all"
      );

      const rawEmployers: EmployerFromServer[] =
        responseEmployer.data.data;

      const rawsCompanies: CompanyFromServer[] =
        responseCompany.data.data;

      const data = response.data.data;
      const rawCompaigns = data.map((item: CompaignFromServer) => {
        const employer = rawEmployers.find(
          (employer) => employer.id === item.employerId
        );
        const company = rawsCompanies.find(
          (company) => company.id === employer?.companyId
        );

        const rawCompaign: CampaignType = {
          compaignName: item.name,
          compaignId: item.id,
          recruimentId: item.id,
          recruitment: item.name,
          cvs: [],
          recruitmentStatus: "Dừng hiển thị",
          isCompaignActive: true,
          cvSystem: "Scout AI",
          isCVSystemActive: false,
          cvFiltered: 0,
          runningServices: [],
          company: company?.name,
          postDate: new Date(item.createdAt),
        };
        return rawCompaign;
      });
      setCompaigns(rawCompaigns);
    };
    getAllCompaigns();
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý chiến dịch tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 py-8 w-[90%]">
        <div className="flex items-center justify-between w-full gap-2">
          <button className="flex items-center h-full gap-2 px-4 py-2 text-white bg-green-600 rounded-sm">
            <Briefcase stroke="white" /> Chiến dịch mới
          </button>
          <div className="flex items-center flex-grow divide-x-2">
            <div className="flex items-center justify-between h-full p-2 text-sm bg-white">
              <span className="text-gray-400">Tất cả chiến dịch</span>
              <ChevronDown stroke="#9ca3af" size={16} />
            </div>
            <div className="flex items-center justify-between flex-grow p-2 text-sm bg-white ">
              <span className="text-gray-400">
                Tìm chiến dịch (Nhấn enter để tìm kiếm)
              </span>
              <Search stroke="#9ca3af" size={16} />
            </div>
          </div>
        </div>
        <CompanyCompaignTable
          data={campaigns}
          setData={setCompaigns}
        />
      </div>
    </div>
  );
}

export default Campaign;
