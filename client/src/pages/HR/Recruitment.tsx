import clsx from "clsx";
import {
  ArrowUp,
  Pause,
  Pencil,
  Search,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statusColor } from "../../shared/types/RecruitmentStatus.type";
import axios from "axios";

interface RecruitmentJobPost {
  recruitmentName: string;
  recruitmentStatus: string;
  recruitmentId: number;
  compaignName: string;
}

interface RecruitmentTableProps {
  data: RecruitmentJobPost[];
}

function RecruitmentTable({ data }: RecruitmentTableProps) {
  return (
    <table className="w-full bg-white">
      <thead>
        <tr>
          <td className="font-bold border">Tin tuyển dụng</td>
          <td className="p-2 font-bold text-center align-middle border ">
            <div className="flex items-center justify-center w-full h-full">
              <Settings size={16} />
            </div>
          </td>
          <td className="font-bold border">Top Jobs chạy gần đây</td>
          <td className="font-bold border">Đợt hiển thị gần nhất</td>
          <td className="font-bold border">
            Toàn bộ thời gian hiển thị
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((jobPost, key) => {
          return (
            <tr key={key}>
              <td className="border max-w-[240px] ">
                <div className="flex flex-col items-start gap-1">
                  <div>
                    {" "}
                    <span
                      className={clsx(
                        "p-1 font-semibold",
                        statusColor[jobPost.recruitmentStatus].bg,
                        statusColor[jobPost.recruitmentStatus].text
                      )}
                    >
                      {jobPost.recruitmentStatus}
                    </span>{" "}
                    <span className="font-bold capitalize">
                      {jobPost.recruitmentName}
                    </span>{" "}
                    <span className="text-slate-500">{`#${jobPost.recruitmentId}`}</span>
                  </div>
                  <span>
                    Chiến dịch tuyển dụng: {jobPost.compaignName}
                  </span>
                  <button className="p-2 font-bold text-green-500 bg-green-50">
                    Xem CV ứng tuyển
                  </button>
                </div>
              </td>
              <td className="p-2 border">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Link
                    className="p-2 rounded-full"
                    to={`/hr/compaign-edit/${jobPost.recruitmentId}`}
                    state={jobPost}
                  >
                    <Pencil
                      fill="black"
                      stroke="white"
                      strokeWidth={1}
                    />
                  </Link>
                  <button className="p-2 rounded-full">
                    <Pause fill="gray" stroke="transparent" />
                  </button>
                  <button className="p-2 rounded-full">
                    <ArrowUp stroke="gray" />
                  </button>
                </div>
              </td>
              <td className="border">Chưa kích hoạt dịch vụ</td>
              <td className="border">Tin chưa hiển thị</td>
              <td className="border">Tin chưa hiển thị</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const filteredStatuses = [
  "Tất cả",
  "Đang chạy Top Jobs",
  "Đang hiển thị",
  "Đang xét duyệt",
  "Bị từ chối",
  "Không công khai",
  "Hết hạn hiển thị",
  "Dừng hiển thị",
];

interface CompaignFromServer {
  id: number;
  employerId: number;
  name: string;
  createdAt: string;
}

interface RecruitmentFromServer {
  id: number;
  titleRecruitment: string;
  majorId: number;
  campaignId: number;
  typeId: number;
  currencyId: number;
  salaryMin: number;
  salaryMax: number;
  expId: number;
  expiredDate: string;
  createAt: string;
  updateAt: string;
  levelId: number;
  status: boolean;
  companyId: number;
  major: {
    id: number;
    name: string;
  };
  level: {
    id: number;
    name: string;
  };
  currency: {
    id: number;
    name: string;
  };
  fields: [
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    }
  ];
  exp: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  locations: [
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    }
  ];
}

function Recruitment() {
  const [data, setData] = useState<RecruitmentJobPost[]>([
    {
      recruitmentName: "Tin Tuyển dụng Nhân viên Marketing",
      recruitmentStatus: "Dừng hiển thị",
      recruitmentId: 416527,
      compaignName: "Tuyển dụng Nhân viên Marketing",
    },
    {
      recruitmentName: "Tuyển dụng Nhân viên Telesales",
      recruitmentStatus: "Đang xét duyệt",
      recruitmentId: 416524,
      compaignName: "Tuyển dụng Nhân viên Telesales",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => {
    const getAllRecruitments = async () => {
      const response = await axios.get(
        "http://localhost:3000/job/all"
      );
      const compaigns = await axios.get(
        "http://localhost:3000/company/campaign/all"
      );

      const rawCompaigns: CompaignFromServer[] = compaigns.data.data;
      const data = response.data.data;
      const recruitments: RecruitmentJobPost[] = data.map(
        (item: RecruitmentFromServer) => {
          const comapaign = rawCompaigns.find(
            (compaign) => compaign.id === item.campaignId
          );
          const recruitment: RecruitmentJobPost = {
            recruitmentName: item.titleRecruitment,
            recruitmentId: item.id,
            recruitmentStatus:
              item.status === false
                ? "Dừng hiển thị"
                : "Đang hiển thị",
            compaignName: comapaign
              ? comapaign.name
              : item.titleRecruitment,
          };
          return recruitment;
        }
      );
      setData(recruitments);
    };
    getAllRecruitments();
  }, []);
  return (
    <div>
      <h1 className="p-4 text-xl font-bold text-black bg-white">
        Quản lý Tin tuyển dụng
      </h1>
      <div className="flex flex-col items-start justify-center gap-8 p-12">
        <div className="flex justify-between gap-4">
          {filteredStatuses.map((status, key) => {
            return (
              <div
                className={clsx(
                  "px-4 py-1 rounded-full items-center text-sm cursor-pointer flex gap-2",
                  selectedStatus === key
                    ? "bg-green-500 text-white"
                    : "bg-slate-300"
                )}
                key={key}
                onClick={() => setSelectedStatus(key)}
              >
                {status}
                <span className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
                  {data.reduce(
                    (accumulator, currentJobPost) =>
                      (accumulator +=
                        currentJobPost.recruitmentStatus ===
                        filteredStatuses[key]
                          ? 1
                          : 0),
                    0
                  )}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative flex items-center w-2/5 bg-white">
          <input
            className="flex-grow p-4"
            placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề hoặc mã tin"
            onChange={(e) => {
              setFilterKeyword(e.currentTarget.value);
            }}
          ></input>
          <Search className="px-2" size={32} />
        </div>
        <RecruitmentTable
          data={data
            .filter(
              (jobPost) =>
                jobPost.recruitmentStatus ===
                  filteredStatuses[selectedStatus] ||
                (filteredStatuses[selectedStatus] === "Tất cả" &&
                  jobPost)
            )
            .filter(
              (jobPost) =>
                jobPost.recruitmentName.includes(filterKeyword) ||
                jobPost.compaignName.includes(filterKeyword)
            )}
        />
      </div>
    </div>
  );
}

export default Recruitment;
