import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/material';
import moment from 'moment';

function RelatedJobComponent() {
  const [jobResults, setJobResults] = useState<any>([]);

  useEffect(() => {
    const fetchJobResults = async () => {
      try {
        const response = await fetch('http://localhost:3000/job/all?limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setJobResults(result.data);
        console.log(jobResults);
      } catch (error) {
        console.log('Error fetching data. Please try again.');
      }
    };

    fetchJobResults();
  }, []);

  return (
    <div className="related-job">
      <h2 className="related-job-item__title border-l-4 border-green-500 pl-4 my-4 text-2xl font-bold">
        Việc làm liên quan
      </h2>
      <div className="related-job-item__job-list flex flex-col gap-5">
        {jobResults
          ? jobResults.map((job: any, index: number) => (
              <div
                className="job-item-search-result max-h-40 bg-slate-100 p-3 border border-transparent rounded-lg shadow-md flex items-center gap-3 hover:border-green-400 cursor-pointer"
                key={index}
              >
                <div className="job-logo-company w-32 h-32 min-w-32 bg-white flex items-center border rounded-lg">
                  <img
                    src={
                      job?.company
                        ? job?.company?.image
                          ? job?.company?.image
                          : ''
                        : ''
                    }
                  />
                </div>
                <div className="job-detail w-full h-full grid grid-rows-4 grid-cols-4 grid-flow-col">
                  <span className="job-title text-black font-semibold col-span-2">
                    {job?.titleRecruitment ? job?.titleRecruitment : ''}
                  </span>
                  <span className="job-company-name text-slate-600 text-sm col-span-3">
                    {job?.company
                      ? job?.company?.name
                        ? job?.company?.name
                        : ''
                      : ''}
                  </span>
                  <span className="row-start-3 job-sub-detail job-location text-xs flex items-center">
                    {job?.locations[0]
                      ? job?.locations[0]?.name
                        ? job?.locations[0]?.name
                        : ''
                      : ''}
                  </span>
                  <span className="row-start-4 col-span-3 flex items-center">
                    <span className="job-sub-detail job-remaining-application-days text-xs">
                      Còn&nbsp;
                      <strong>
                        {job?.expiredDate
                          ? moment
                              .utc(job?.expiredDate)
                              .diff(moment.utc(), 'days')
                          : ''}
                      </strong>
                      &nbsp;ngày để ứng tuyển
                    </span>
                    <span className="job-sub-detail job-update-time text-xs">
                      Cập nhật ngày:&nbsp;
                      <strong>
                        {moment
                          .utc(job?.updateAt ? job?.updateAt : '')
                          .format('DD/MM/YYYY')}
                      </strong>
                    </span>
                  </span>
                  <div className="job-salary col-start-3 col-span-2 flex items-center justify-end">
                    <CurrencyDollarIcon className="w-5 mr-2" />
                    <strong className="salary-count">
                      {job.salaryMin == 0 && job.salaryMax == 0
                        ? 'Thoả thuận'
                        : `${job.salaryMin} - ${job.salaryMax} ${job.currency.name}`}{' '}
                    </strong>
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
            ))
          : 'Error to fetch jobResults'}
      </div>
    </div>
  );
}

export default RelatedJobComponent;
