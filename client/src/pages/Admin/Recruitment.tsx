import clsx from 'clsx';
import { ChevronLeftCircle, ChevronRightCircle, Search } from 'lucide-react';
import React, { SetStateAction, useEffect, useState } from 'react';
import { statusColor } from '../../shared/types/RecruitmentStatus.type';
import { RecruitmentJobPost } from '../../shared/types/Recruitment.type';
import { getCampaignById } from '../../modules/helper';
import Switch from '../../shared/components/CustomSwitch';
import { useProfileContext } from '../../shared/services/authen/domain/context';
import {
  getAllJobs,
  updateJobStatus,
  getJobsStat,
  getApplicationsByCampaignId,
  getEmployerById,
  findJobRecruitmentByName,
} from '../../modules/admin-module';
interface RecruitmentTableProps {
  data: RecruitmentJobPost[];
  setData: React.Dispatch<SetStateAction<RecruitmentJobPost[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

function RecruitmentTable({
  data,
  setData,
  refresh,
  setRefresh,
}: RecruitmentTableProps) {
  const { token } = useProfileContext();

  return (
    <table className="w-full bg-white">
      <thead>
        <tr>
          <td className="font-bold border">Tin tuyển dụng</td>
          {/* <td className="p-2 font-bold text-center align-middle border ">
            <div className="flex items-center justify-center w-full h-full">
              <Settings size={16} />
            </div>
          </td> */}
          <td className="font-bold border">Công ty</td>
          <td className="font-bold border">Ngày tạo</td>
        </tr>
      </thead>
      <tbody>
        {data.map((jobPost, key) => {
          return (
            <tr key={key}>
              <td className="border w-[360px] ">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-start">
                    <Switch
                      checked={jobPost.status}
                      onClick={async () => {
                        const newJobPost = {
                          ...jobPost,
                          status: !jobPost.status,
                        };
                        data[key] = newJobPost;
                        setData([...data]);
                        await updateJobStatus(
                          token,
                          newJobPost.id,
                          !jobPost.status,
                        );
                        setRefresh(!refresh);
                      }}
                    />
                    <div className="mt-1">
                      <div className="font-bold capitalize">
                        {jobPost.titleRecruitment}
                        {'    '}
                        <span
                          className={clsx(
                            'p-1 font-semibold',
                            statusColor[
                              jobPost.status ? 'Đang hiển thị' : 'Dừng hiển thị'
                            ].bg,
                            statusColor[
                              jobPost.status ? 'Đang hiển thị' : 'Dừng hiển thị'
                            ].text,
                          )}
                        >
                          {jobPost.status ? 'Đang hiển thị' : 'Dừng hiển thị'}
                        </span>
                      </div>
                      <span className="text-slate-500">{`#${jobPost.id}`}</span>
                    </div>
                  </div>
                  <div></div>
                  <span> Chiến dịch tuyển dụng: {jobPost.campaign.name} </span>
                  <div className="p-2 font-bold text-green-500 bg-green-50">
                    Đã có {jobPost.applications.length} người ứng tuyển
                  </div>
                </div>
              </td>
              {/* <td className="p-2 border w-[64px]">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Pencil fill="gray" stroke="white" strokeWidth={1} />
                  <button className="p-2 rounded-full">
                    <Pause fill="gray" stroke="transparent" />
                  </button>
                  <button className="p-2 rounded-full">
                    <ArrowUp stroke="gray" />
                  </button>
                </div>
              </td> */}
              <td className="border w-[360px]"> {jobPost.company?.name} </td>
              <td className="border">
                {jobPost.createdAt.toLocaleDateString('vi-VN')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const filteredStatuses = ['Tất cả', 'Đang hiển thị', 'Dừng hiển thị'];

function Recruitment() {
  const [data, setData] = useState<RecruitmentJobPost[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jobStats, setJobStats] = useState({
    isActive: 0,
    total: 0,
    isNotActive: 0,
  });
  const [refresh, setRefresh] = useState(false);
  const { token } = useProfileContext();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getAllRecruitments = async () => {
      const { allJobs, totalPages } =
        searchText == ''
          ? await getAllJobs(token, page)
          : await findJobRecruitmentByName(token, page, undefined, searchText);

      const stats = await getJobsStat(token);
      setJobStats(stats);
      const validJobs = allJobs.filter((item) => {
        return !!item.campaignId;
      });

      const rawRecruitments = validJobs.map(async (item) => {
        const campaign = await getCampaignById(item.campaignId);
        const employer = await getEmployerById(campaign.employerId);
        const { applications } = await getApplicationsByCampaignId(
          token,
          employer.id,
          page,
          5,
          item.campaignId,
        );
        const rawRecruitment = {
          ...item,
          createdAt: new Date(item.createAt),
          updatedAt: new Date(item.updateAt),
          expiredDate: new Date(item.expiredDate),
          campaign: campaign,
          applications: applications,
        };
        return rawRecruitment;
      });
      setData(await Promise.all(rawRecruitments));
      setTotalPages(totalPages);
    };
    getAllRecruitments();
  }, [page, refresh, searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-grow bg-slate-200">
      <h1 className="p-2 font-bold text-black bg-white">
        Quản lý Tin tuyển dụng
      </h1>
      <div className="flex flex-col items-start justify-center gap-8 p-12">
        <div className="flex items-start w-full gap-2">
          {filteredStatuses.map((status, key) => {
            return (
              <div
                className={clsx(
                  'px-2 py-1 rounded-full items-center text-[12px] cursor-pointer flex gap-[6px]',
                  selectedStatus === key
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300',
                )}
                key={key}
                onClick={() => setSelectedStatus(key)}
              >
                {status}
                <span className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
                  {status === 'Tất cả'
                    ? jobStats.total
                    : status === 'Đang hiển thị'
                      ? jobStats.isActive
                      : jobStats.isNotActive}
                </span>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-2/5 bg-white"
        >
          <input
            className="flex-grow p-4"
            placeholder="Nhập để tìm kiếm tin tuyển dụng theo tiêu đề"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <Search className="px-2" size={32} />
        </form>
        <RecruitmentTable
          refresh={refresh}
          setRefresh={setRefresh}
          setData={setData}
          data={data.filter(
            (jobPost) =>
              (jobPost.status ? 'Đang hiển thị' : 'Dừng hiển thị') ===
                filteredStatuses[selectedStatus] ||
              (filteredStatuses[selectedStatus] === 'Tất cả' && jobPost),
          )}
          // )
          // .filter(
          //   (jobPost) =>
          //     jobPost.titleRecruitment.includes(filterKeyword) ||
          //     jobPost.campaign.name.includes(filterKeyword),
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
            onClick={() => setPage(page + 1 <= totalPages ? page + 1 : page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
