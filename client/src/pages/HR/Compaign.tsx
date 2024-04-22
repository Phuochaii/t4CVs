import { Briefcase } from "../../layouts/HRLayout/components/Icons";
import { ChevronDown, Search } from "lucide-react";

import { useState } from "react";
import { CompaignTable } from "../../shared/components/compaign-table";

function Compaign() {
  const [campaigns, setCompaigns] = useState<Compaign[]>([
    {
      compaignName: "Tuyển Nhân viên Marketing",
      compaignId: 407767,
      cvs: 0,
      optimization: 54,
      recruitment: "Tin tuyển dụng nhân viên Marketing",
      recruimentId: 416527,
      recruitmentStatus: "Dừng hiển thị",
      isCompaignActive: false,
      cvSystem: "Scout AI",
      isCVSystemActive: false,
      cvFiltered: 15,
      runningServices: [],
    },
    {
      compaignName: "Tuyển Lập trình viên PHP",
      compaignId: 407766,
      cvs: 0,
      optimization: 36,
      recruitment: "Lập trình viên PHP",
      recruimentId: 416526,
      recruitmentStatus: "Dừng hiển thị",
      isCompaignActive: true,
      cvSystem: "Scout AI",
      isCVSystemActive: false,
      cvFiltered: null,
      runningServices: [],
    },
  ]);

  return (
    <div className="flex flex-col items-center flex-grow w-full bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý chiến dịch tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between w-4/5 gap-2 py-8">
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
