import { SetStateAction, useState } from "react";
// import Switch from "../../shared/components/CustomSwitch";
import { Link, useNavigate } from "react-router-dom";
import { Compaign } from "../types/Compaign.type";

export interface CompaignTableProps {
  data: Compaign[];
  setData: React.Dispatch<SetStateAction<Compaign[]>>;
}
export const CompaignTableHeaders = () => {
  return (
    <thead>
      <tr>
        <td className="px-2 py-1 font-bold border">Chiến dịch tuyển dụng</td>
        <td className="px-2 py-1 font-bold border">Tối ưu</td>
        <td className="px-2 py-1 font-bold border">Tin tuyển dụng</td>
        <td className="px-2 py-1 font-bold border">CV từ hệ thống</td>
        <td className="px-2 py-1 font-bold border">Lọc CV</td>
        <td className="px-2 py-1 font-bold border">Dịch vụ đang chạy</td>
      </tr>
    </thead>
  );
};

interface CompaignTableRowProps {
  data: Compaign;
}

export const CompaignTableRow = ({ data }: CompaignTableRowProps) => {
  const navigation = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [compaign] = useState<Compaign>(data);
  return (
    <tr
      onClick={() => {
        console.log(data.compaignId);

        navigation(`/hr/manage-cv/${data.compaignId}`);
      }}
      className="align-top hover:bg-green-100 bg-slate-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="border">
        <div className="flex items-start gap-2 p-2">
          {/* <Switch
            checked={compaign.isCompaignActive}
            onClick={() => {
              setCompaign({
                ...compaign,
                isCompaignActive: !compaign.isCompaignActive,
              });
            }}
          /> */}
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
        <div className="p-2 font-bold text-blue-500">{`${
          compaign.optimization || 0
        }%`}</div>
      </td>
      <td className="border max-w-[180px]">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-bold capitalize">{compaign.recruitment}</h3>
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
        <div className="flex flex-col items-start gap-2 p-2">
          <h3 className="font-bold">{compaign.cvSystem}</h3>
          <h3 className="text-slate-500">
            {!compaign.isCompaignActive
              ? "Chiến dịch đang tắt"
              : compaign.isCVSystemActive
                ? "Đã kích hoạt"
                : "Chưa kích hoạt Scout AI"}
          </h3>
          <button className={`${isHovered ? "visible" : "invisible"}`}>
            Xem chi tiết
          </button>
        </div>
      </td>
      <td className="border">
        <div className="flex flex-col items-start justify-start gap-1 p-2">
          {compaign.cvFiltered && (
            <span className="px-[3px] text-yellow-400 border border-yellow-400 rounded-sm">
              {`${compaign.cvFiltered} CP`}
            </span>
          )}
          {compaign.isCompaignActive && (
            <span className="px-2 py-1 font-bold text-green-500 rounded-sm bg-slate-100">
              Tìm CV
            </span>
          )}
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

export const CompaignTable = ({ data }: CompaignTableProps) => {
  return (
    <table className="w-full text-sm bg-white">
      <CompaignTableHeaders />
      <tbody>
        {data.map((item, index) => (
          <CompaignTableRow data={item} key={index} />
        ))}
      </tbody>
    </table>
  );
};
