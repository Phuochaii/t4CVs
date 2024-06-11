import { useState, useEffect } from 'react';
import JobListItem from '../../../shared/components/JobListItem';
import { getValidJobs } from '../../../modules/user-module';

function RelatedJobComponent({ setJobId }: { setJobId: (id: number) => void }) {
  const [jobResults, setJobResults] = useState<any>([]);

  useEffect(() => {
    const fetchJobResults = async () => {
      try {
        const response = getValidJobs(5);
        console.log(response);
        setJobResults(response);
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
        <div className="list-job">
          <div className="wrapper-content col-span-2">
            <div className="job-list-search-result">
              {/* job content */}
              {jobResults.length > 0 ? (
                jobResults.map((item: any) => {
                  return (
                    <div onClick={() => setJobId(item.id)}>
                      <JobListItem item={item} />
                    </div>
                  );
                })
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedJobComponent;
