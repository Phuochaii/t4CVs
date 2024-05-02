import { SetStateAction, useEffect, useState } from "react";
// import Switch from "../../shared/components/CustomSwitch";
import { Link, useNavigate } from "react-router-dom";
import { Campaign } from "../types/Campaign.type";
import { getUserById } from "../utils/helper";
import { UserFromServer } from "../types/User.type";

export interface CampaignTableProps {
  data: Campaign[];
  setData: React.Dispatch<SetStateAction<Campaign[]>>;
}
export const CampaignTableHeaders = () => {
  return (
    <thead>
      <tr>
        <td className="px-2 py-1 font-bold border">
          Chiến dịch tuyển dụng
        </td>
        <td className="px-2 py-1 font-bold border">Tối ưu</td>
        <td className="px-2 py-1 font-bold border">Tin tuyển dụng</td>
        <td className="px-2 py-1 font-bold border">CV từ hệ thống</td>
        <td className="px-2 py-1 font-bold border">Lọc CV</td>
        <td className="px-2 py-1 font-bold border">
          Dịch vụ đang chạy
        </td>
      </tr>
    </thead>
  );
};

interface CampaignTableRowProps {
  data: Campaign;
}

export const CampaignTableRow = ({ data }: CampaignTableRowProps) => {
  const navigation = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [applicants, setApplicants] = useState<
    (UserFromServer | null)[]
  >([]);
  const campaign = data;
  console.log("campaign", campaign);
  useEffect(() => {
    async function getUsers() {
      const applicantPromises = campaign.applications.map(
        async (application) => {
          const applicant = await getUserById(application.userId);
          return applicant;
        }
      );
      setApplicants(await Promise.all(applicantPromises));
    }
    console.log("LOL");
    getUsers();
  }, []);
  return (
    <tr
      onClick={() => {
        navigation(`/hr/manage-cv/${data.campaignId}`);
      }}
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
            <h3 className="font-bold">{campaign.campaignName}</h3>
            <span className="font-bold text-slate-400">
              {applicants.length === 0 ? (
                "Chưa có CV nào"
              ) : (
                <div className="flex items-center gap-1">
                  {applicants.slice(0, 5).map((candidate, item) => {
                    return (
                      <img
                        key={item}
                        src={
                          candidate?.image ||
                          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                        }
                        className="object-cover rounded-full w-9 h-9"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80")
                        }
                      />
                    );
                  })}
                  {applicants.length > 5 ? (
                    <span className="p-1 font-normal text-green-500 bg-green-100 rounded-full">{`+${
                      applicants.length - 5
                    } hồ sơ khác`}</span>
                  ) : null}
                </div>
              )}
            </span>
            <span className="font-bold bg-slate-200 text-zinc-400">
              {`#${campaign.campaignId}`}
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
        <div className="p-2 font-bold text-blue-500">{`${69}%`}</div>
      </td>
      <td className="border max-w-[180px]">
        {campaign.recruitment ? (
          <div className="flex flex-col gap-2 p-2">
            <h3 className="font-bold capitalize">
              {campaign.recruitment.titleRecruitment}
            </h3>
            <div className="flex gap-2">
              <span className="font-bold bg-slate-200 text-slate-400">
                {`#${campaign.recruitment.id}`}
              </span>
              <span className="font-bold text-slate-400">
                {campaign.recruitment.status}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                isHovered ? "visible" : "invisible"
              }`}
            >
              <Link
                className="font-bold text-green-500"
                to={`/hr/campaign-edit/${campaign.recruitment.id}`}
                state={campaign}
              >
                Chỉnh sửa
              </Link>
              <button> Yêu cầu hiển thị </button>
            </div>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigation(
                `/hr/post-compaign/data/${campaign.campaignId}`
              );
            }}
            className="p-2 rounded-sm bg-slate-200 hover:bg-slate-100"
          >
            Thêm tin tuyển dụng
          </button>
        )}
      </td>
      <td className="border">
        <div className="flex flex-col items-start gap-2 p-2">
          <h3 className="font-bold">Scout AI</h3>
          {/* <h3 className="text-slate-500">
            {!campaign.isCampaignActive
              ? "Chiến dịch đang tắt"
              : campaign.isCVSystemActive
              ? "Đã kích hoạt"
              : "Chưa kích hoạt Scout AI"}
          </h3> */}
          <button
            className={`${isHovered ? "visible" : "invisible"}`}
          >
            Xem chi tiết
          </button>
        </div>
      </td>
      <td className="border">
        <div className="flex flex-col items-start justify-start gap-1 p-2">
          <span className="px-[3px] text-yellow-400 border border-yellow-400 rounded-sm">
            {`${15} CP`}
          </span>
          <span className="px-2 py-1 font-bold text-green-500 rounded-sm bg-slate-100">
            Tìm CV
          </span>
        </div>
      </td>
      <td className="border">
        <div className="p-2">
          <span className="px-2 py-1 font-bold text-green-500 rounded-sm bg-slate-100">
            Thêm
          </span>
        </div>
      </td>
    </tr>
  );
};

export const CampaignTable = ({ data }: CampaignTableProps) => {
  return (
    <table className="w-full text-sm bg-white">
      <CampaignTableHeaders />
      <tbody>
        {data.map((item, index) => (
          <CampaignTableRow data={item} key={index} />
        ))}
      </tbody>
    </table>
  );
};
