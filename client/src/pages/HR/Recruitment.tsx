import clsx from "clsx";
import {
  ArrowUp,
  ChevronLeftCircle,
  ChevronRightCircle,
  Pause,
  Pencil,
  Search,
  Settings,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statusColor } from "../../shared/types/RecruitmentStatus.type";
import { RecruitmentJobPost } from "../../shared/types/Recruitment.type";
import {
  getAllJobs,
  getCampaignById,
  getJobByCampaignId,
  getJobsStat,
} from "../../modules/helper";
import { useProfileContext } from "../../shared/services/authen/domain/context";
import { getAllCompaignByHrId } from "../../modules/hr-module";
import moment from "moment";
// import Switch from "../../shared/components/CustomSwitch";

interface RecruitmentTableProps {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  data: any[];
}

function RecruitmentTable({
  // refresh,
  // setRefresh,
  data,
}: RecruitmentTableProps) {
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
          <td className="font-bold border">Công ty</td>
          <td className="font-bold border">Ngày tạo</td>
        </tr>
      </thead>
      <tbody>
        {data.map((jobPost: any, key: number) => {
          console.log(jobPost)
          return (
            <tr key={key}>
              <td className="border max-w-[240px] ">
                <div className="flex flex-col items-start gap-1">
                  <div>
                    <span
                      className={clsx(
                        "p-1 font-semibold",
                        statusColor[
                          jobPost.job.status
                            ? "Đang hiển thị"
                            : "Dừng hiển thị"
                        ].bg,
                        statusColor[
                          jobPost.job.status
                            ? "Đang hiển thị"
                            : "Dừng hiển thị"
                        ].text
                      )}
                    >
                      {jobPost.job.status
                        ? "Đang hiển thị"
                        : "Dừng hiển thị"}
                    </span>{" "}
                    <span className="font-bold capitalize">
                      {jobPost.job.titleRecruitment}
                    </span>{" "}
                    <span className="text-slate-500">{`#${jobPost.campaign.id}`}</span>
                  </div>
                  <span>
                    Chiến dịch tuyển dụng: {jobPost.campaign.name}
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
                    to={`/hr/compaign-edit/${jobPost.campaign.id}`}
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
              <td className="border w-[360px]">
                {jobPost.job.company?.name}
              </td>
              <td className="border">
                {moment(new Date(jobPost.createdAt)).format(
                    'DD-MM-YYYY HH:mm A',
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const filteredStatuses = ["Tất cả", "Đang hiển thị", "Dừng hiển thị"];

function Recruitment() {
  const [data, setData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobStats, setJobStats] = useState({
    isActive: 0,
    total: 0,
    isNotActive: 0,
  });
  const [refresh, setRefresh] = useState(false);
  const {token} = useProfileContext();
  useEffect(() => {
    const getAllRecruitments = async () => {
      const { allCampaigns, totalPages } = await getAllCompaignByHrId({token: token!});
      console.log(allCampaigns)
      // const stats = await getJobsStat();
      // setJobStats(stats);
      const rawRecruitments = allCampaigns.map(async (item:any) => {
        console.log(item)
        const job = await getJobByCampaignId(token!, item.id);
        console.log(job)
        const rawRecruitment = {
          ...item,
          job: job,
          campaign: item,
        };
        return rawRecruitment;
      });
      console.log(await Promise.all(rawRecruitments))
      setData(await Promise.all(rawRecruitments));
      setTotalPages(totalPages);
    };
    getAllRecruitments();
  }, [page, refresh]);

  return (
    <div className="flex-grow">
      <h1 className="p-4 text-xl font-bold text-black bg-white">
        Quản lý Tin tuyển dụng
      </h1>
      <div className="flex flex-col items-start justify-center gap-8 p-4">
        <div className="flex items-start w-full gap-4">
          {filteredStatuses.map((status, key) => {
            return (
              <div
                className={clsx(
                  "px-2 py-1 rounded-full items-center text-[12px] cursor-pointer flex gap-[4px]",
                  selectedStatus === key
                    ? "bg-green-500 text-white"
                    : "bg-slate-300"
                )}
                key={key}
                onClick={() => setSelectedStatus(key)}
              >
                {status}
                <span className="flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full">
                  {status === "Tất cả"
                    ? jobStats.total
                    : status === "Đang hiển thị"
                    ? jobStats.isActive
                    : jobStats.isNotActive}
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
          refresh={refresh}
          setRefresh={setRefresh}
          data={data
            .filter(
              (jobPost) =>
                (jobPost.job.status
                  ? "Đang hiển thị"
                  : "Dừng hiển thị") ===
                  filteredStatuses[selectedStatus] ||
                (filteredStatuses[selectedStatus] === "Tất cả" &&
                  jobPost)
            )
            .filter(
              (jobPost) =>
                jobPost.job.titleRecruitment.includes(filterKeyword))
             }
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

export default Recruitment;
