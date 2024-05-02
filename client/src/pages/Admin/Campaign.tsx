// import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import {
  ChevronDown,
  ChevronLeftCircle,
  ChevronRightCircle,
  Search,
} from "lucide-react";

import { SetStateAction, useEffect, useState } from "react";
import { Campaign as CampaignType } from "../../shared/types/Campaign.type";
import { Link } from "react-router-dom";
// import Switch from "../../shared/components/CustomSwitch";
import {
  getAllCampaigns,
  getCompanyById,
  getEmployerById,
  getJobByCampaignId,
} from "../../shared/utils/helper";

interface CampaignTableProps {
  data: CampaignType[];
  setData: React.Dispatch<SetStateAction<CampaignType[]>>;
}

const CompanyCampaignTableHeader = () => {
  return (
    <thead>
      <tr>
        <td className="px-2 py-1 font-bold border">
          Chiến dịch tuyển dụng
        </td>
        <td className="px-2 py-1 font-bold border">Người tạo</td>
        <td className="px-2 py-1 font-bold border">Ngày tạo</td>
        <td className="px-2 py-1 font-bold border">Công ty</td>
        <td className="px-2 py-1 font-bold border">Tin tuyển dụng</td>
        {/* <td className="px-2 py-1 font-bold border">
          Dịch vụ đang chạy
        </td> */}
      </tr>
    </thead>
  );
};

interface CompanyCampaignTableRowProps {
  data: CampaignType;
}

const CompanyCampaignTableRow = ({
  data,
}: CompanyCampaignTableRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <tr
      className="align-top hover:bg-green-100 bg-slate-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="border">
        <div className="flex items-start gap-2 p-2">
          {/* <Switch
            checked={campaign.isCampaignActive}
            onClick={() => {
              setCampaign({
                ...campaign,
                isCampaignActive: !campaign.isCampaignActive,
              });
            }}
          /> */}
          <div className="flex flex-col items-start gap-2 mb-12">
            <h3 className="font-bold">{data.campaignName}</h3>
            {/* <span className="font-bold text-slate-400">
              {campaign.cvs.length === 0 ? (
                "Chưa có CV nào"
              ) : (
                <div className="flex items-center gap-1">
                  {campaign.cvs.slice(0, 5).map((candidate, item) => {
                    return (
                      <img
                        key={item}
                        src={candidate.candidateImage}
                        className="w-8 h-8 rounded-full"
                      />
                    );
                  })}
                  {campaign.cvs.length > 5 ? (
                    <span className="p-1 font-normal text-green-500 bg-green-100 rounded-full">{`+${
                      campaign.cvs.length - 5
                    } hồ sơ khác`}</span>
                  ) : null}
                </div>
              )}
            </span> */}
            <span className="font-bold bg-slate-200 text-zinc-400">
              {`#${data.campaignId}`}
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
        <div className="p-2 font-bold text-blue-500">{`${data.employer.fullname}`}</div>
      </td>
      <td className="border">
        <div className="p-2 font-bold text-blue-500">{`${data.postDate?.toLocaleDateString(
          "vi-VN"
        )}`}</div>
      </td>
      <td className="border">
        <div className="p-2 font-bold text-blue-500">{`${
          data.company ? data.company.name : ""
        }`}</div>
      </td>
      <td className="border max-w-[180px]">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-bold capitalize">
            {data.recruitment.titleRecruitment}
          </h3>
          <div className="flex gap-2">
            <span className="font-bold bg-slate-200 text-slate-400">
              {`#${data.recruitment.id}`}
            </span>
            <span className="font-bold text-slate-400">
              {data.recruitment.status
                ? "Đang hiển thị"
                : "Dừng hiển thị"}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              isHovered ? "visible" : "invisible"
            }`}
          >
            <Link
              className="font-bold text-green-500"
              to={`/hr/campaign-edit/${data.recruitment.id}`}
              state={data}
            >
              Chỉnh sửa
            </Link>
            <button> Yêu cầu hiển thị </button>
          </div>
        </div>
      </td>

      {/* <td className="border">
        <div className="p-2">
          {campaign.isCampaignActive ? (
            <span className="px-2 py-1 font-bold text-green-500 rounded-sm bg-slate-100">
              Thêm
            </span>
          ) : (
            <>Chiến dịch đang tắt</>
          )}
        </div>
      </td> */}
    </tr>
  );
};

const CompanyCampaignTable = ({ data }: CampaignTableProps) => {
  console.log("New data", data);
  return (
    <table className="w-full text-sm bg-white">
      <CompanyCampaignTableHeader />
      <tbody>
        {data.map((item, index) => (
          <CompanyCampaignTableRow data={item} key={index} />
        ))}
      </tbody>
    </table>
  );
};

function Campaign() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getData() {
      const { allCampaigns, totalPages } = await getAllCampaigns(
        page
      );
      const rawCampaigns = await allCampaigns.map(async (item) => {
        const employer = await getEmployerById(item.employerId);
        const company = employer.companyId
          ? await getCompanyById(employer.companyId)
          : await null;
        const job = await getJobByCampaignId(item.id);
        const rawCampaign: CampaignType = {
          campaignName: item.name,
          campaignId: item.id,
          employer: employer,
          company: company,
          postDate: new Date(item.createdAt),
          recruitment: job,
          applications: [],
          applicants: [],
        };
        return rawCampaign;
      });
      setCampaigns(await Promise.all(rawCampaigns));
      setTotalPages(totalPages);
    }
    getData();
    console.log("GO");
  }, [page]);

  return (
    <div className="flex flex-col items-center flex-grow bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý chiến dịch tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 py-8 w-[90%]">
        <div className="flex items-center justify-between w-full gap-2">
          {/* <button className="flex items-center h-full gap-2 px-4 py-2 text-white bg-green-600 rounded-sm">
            <Briefcase stroke="white" /> Chiến dịch mới
          </button> */}
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
        <CompanyCampaignTable
          data={campaigns}
          setData={setCampaigns}
        />
        <div className="flex items-center self-center justify-center gap-2">
          <ChevronLeftCircle
            className="cursor-pointer"
            stroke="green"
            strokeWidth={1}
            onClick={() => {
              setPage(page - 1 > 0 ? page - 1 : page);
            }}
          />
          <span className="font-bold text-green-600">{page}</span>/
          <span>{totalPages}</span>
          <ChevronRightCircle
            stroke="green"
            className="cursor-pointer"
            strokeWidth={1}
            onClick={() =>
              setPage(page + 1 <= totalPages ? page + 1 : page)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
