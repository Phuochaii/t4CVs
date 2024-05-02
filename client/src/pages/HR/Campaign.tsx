import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import {
  ChevronDown,
  ChevronLeftCircle,
  ChevronRightCircle,
  Search,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignTable } from "../../shared/components/compaign-table";
import { Campaign as CampaignType } from "../../shared/types/Campaign.type";
import {
  getCampaignByHRId,
  getCompanyById,
  getEmployerById,
  getJobByCampaignId,
} from "../../shared/utils/helper";

function Campaign() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigate();

  useEffect(() => {
    const hrId = JSON.parse(localStorage.getItem("hr") as string).id;

    const getAllCompaigns = async () => {
      const { allCampaigns, totalPages } = await getCampaignByHRId(hrId, 1);
      setTotalPages(totalPages);
      const rawCampaigns = await allCampaigns.map(async (item) => {
        const employer = await getEmployerById(item.employerId);
        const company = employer.companyId
          ? await getCompanyById(employer.companyId)
          : null;
        const job = await getJobByCampaignId(item.id);
        console.log(job);
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
    };
    getAllCompaigns();
  }, [page]);

  return (
    <div className="flex flex-col items-center flex-grow w-full bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý chiến dịch tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 py-8 w-[90%]">
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={() => navigation("/hr/post-compaign")}
            className="flex items-center h-full gap-2 px-4 py-2 text-white bg-green-600 rounded-sm"
          >
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
        <CampaignTable data={campaigns} setData={setCampaigns} />
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
            onClick={() => setPage(page + 1 <= totalPages ? page + 1 : page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
