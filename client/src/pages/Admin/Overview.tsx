import { CalendarCheck } from 'lucide-react';
import GradientIcon from '../../layouts/AdminLayout/components/GradientIcon';
import OverviewCard from '../../layouts/AdminLayout/components/OverviewCard';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllEmployer, getJobsStat } from '../../modules/admin-module';
import { EmployerFromServer } from '../../shared/types/Employer.type';
import { useProfileContext } from '../../shared/services/authen/domain/context';

function Overview() {
  const [totalEmployer, setTotalEmployer] = useState(0);
  const [jobStats, setJobStats] = useState({
    isActive: 0,
    total: 0,
    isNotActive: 0,
  });
  const [percentOfRecruitment, setPercentOfRecruitment] = useState(0);
  const { token } = useProfileContext();

  useEffect(() => {
    async function getData() {
      const {
        // allEmployers,
        total,
        // totalPages,
      }: {
        allEmployers: EmployerFromServer[];
        total: number;
        totalPages: number;
      } = await getAllEmployer(token, 1, 0);
      setTotalEmployer(total);
    }

    const getJobStats = async () => {
      const stats = await getJobsStat(token);
      setJobStats(stats);
    };

    const getRoundedPercentage = (isActiveNum: number, totalNum: number) => {
      if (totalNum === 0) {
        return 0;
      }
      const percentage = (isActiveNum / totalNum) * 100;
      return percentage;
    };
    setPercentOfRecruitment(
      getRoundedPercentage(jobStats.isActive, jobStats.total),
    );
    getJobStats();
    getData();
  }, [jobStats.isActive, jobStats.total, token]);

  return (
    <div className="flex flex-col flex-grow gap-8 px-12 py-8 bg-slate-100">
      <div className="flex items-center justify-between font-bold text-slate-500">
        <h3>Admin Management System Overview</h3>
        <div className="flex gap-2">
          <h3 className="">Accounts: Admin123</h3>
        </div>
      </div>
      <div className="flex items-center justify-between font-bold text-slate-500">
        <h2>Overview</h2>
        <GradientIcon icon={CalendarCheck} />
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <OverviewCard
          title="Total Number of Employers"
          number={totalEmployer}
          percent={100}
        />
        <OverviewCard
          title="Total Number of Approved Recruitment"
          number={jobStats.isActive}
          percent={Math.round(percentOfRecruitment)}
        />
        <OverviewCard
          title="Total Number of Unappproved Recruitment"
          number={jobStats.isNotActive}
          percent={100 - Math.round(percentOfRecruitment)}
        />
      </div>

      {/* <div className="flex flex-col gap-4 p-12 bg-white rounded-lg">
        <div className="relative flex items-center justify-between my-8 font-bold text-slate-500">
          <h2>Statistics</h2>
          <MoreHorizontal
            className=" hover:text-slate-600"
            onClick={() => {}}
          ></MoreHorizontal>
        </div>

        <div className="flex items-center gap-24">
          {data.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-bold text-green-500">{item.title}</h3>
                {item.rows.map((row, index) => {
                  return (
                    <div
                      key={'row-' + index}
                      className="flex items-center justify-between gap-12 text-slate-400"
                    >
                      <div>{row.title}</div>
                      <div>{row.number}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default Overview;
