import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import { ChevronDown, Search } from "lucide-react";

import { useState, useEffect } from "react";
import { CompaignTable } from "../../shared/components/compaign-table";
import { Compaign as CompaignType } from "../../shared/types/Compaign.type";
import axios from "axios";

interface CompaignFromServer {
  id: number;
  employerId: number;
  name: string;
  createdAt: string;
}

function Compaign() {
  const [campaigns, setCompaigns] = useState<CompaignType[]>([]);

  useEffect(() => {
    const getAllCompaigns = async () => {
      const response = await axios.get(
        "http://localhost:3000/company/campaign/all"
      );
      if (response.status === 200) {
        const data = response.data.data;
        const rawCompaigns = data.map((item: CompaignFromServer) => {
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
          };
          return rawCompaign;
        });
        setCompaigns(rawCompaigns);
      }
    };
    getAllCompaigns();
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow w-full bg-slate-200">
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
        <CompaignTable data={campaigns} setData={setCompaigns} />
      </div>
    </div>
  );
}

export default Compaign;
