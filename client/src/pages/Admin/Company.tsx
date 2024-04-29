import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import { ChevronDown, Search } from "lucide-react";

import { SetStateAction, useEffect, useState } from "react";
import {
  Compaign,
  Compaign as CompaignType,
} from "../../shared/types/Compaign.type";
import { Link } from "react-router-dom";
import Switch from "../../shared/components/CustomSwitch";
import axios from "axios";

interface CompaignTableProps {
  data: Compaign[];
  setData: React.Dispatch<SetStateAction<Compaign[]>>;
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
  data: Compaign;
}

const CompanyCompaignTableRow = ({
  data,
}: CompanyCompaignTableRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [compaign, setCompaign] = useState<Compaign>(data);
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

function Company() {
  const [campaigns, setCompaigns] = useState<CompaignType[]>([]);

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

        const rawCompaign: CompaignType = {
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

export default Company;
