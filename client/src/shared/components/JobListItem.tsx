import { useNavigate } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/material';
function JobListItem({ item }: { item: any }) {
  const navigation = useNavigate();
  return (
    <div
      key={item.id}
      onClick={() => {
        navigation(`/detail-job/${item.id}`);
      }}
      className="job-item-search-result max-h-60 bg-white px-3 py-3.5 mb-3 border border-transparent rounded-lg shadow-md flex gap-3"
    >
      <div className="job-logo-company w-32 h-32 min-w-32 flex items-center border rounded-lg">
        <img src={item.company?.image ? item.company?.image : 'no '} />
      </div>
      <div className="job-detail w-full h-full">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="job-title text-black font-semibold col-span-3 text-lg">
              {item.titleRecruitment}
            </span>
            <div className="job-salary col-start-4 flex items-center">
              <CurrencyDollarIcon className="w-5 mr-2" />
              <strong className="salary-count">
                {item.salaryMin == 0 && item.salaryMax == 0
                  ? 'Thoả thuận'
                  : `${item.salaryMin} - ${item.salaryMax} ${item.currency.name}`}{' '}
              </strong>
            </div>
          </div>
          <span className="job-company-name text-slate-600 text-sm col-span-3 mb-2">
            {item.company?.name ? item.company?.name : 'no name'}
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row">
            {item.fields.map((e: any, index: number) => (
              <div className="job-sub-detail job-location text-xs" key={index}>
                {e.name}
              </div>
            ))}
          </div>
          <div className="flex flex-row space-x-1">
            <span className="job-sub-detail job-remaining-application-days text-xs">
              Hạn nộp: {item.expiredDate.split('T')[0]}
            </span>
            <span className="job-sub-detail job-update-time text-xs">
              Cập nhật {item.updateAt.split('T')[0]}
            </span>
          </div>
        </div>

        <div className="job-actions row-start-4 flex items-center justify-end">
          <span className="btn-apply mr-2">Ứng tuyển</span>
          <span className="btn-save">
            <Tooltip title="Lưu" placement="top">
              <HeartIcon className="w-5" />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobListItem;
