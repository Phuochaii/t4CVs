import { useState } from 'react';
import React from 'react';

import InterestedJobComponent from '../../layouts/UserLayout/components/InterestedJobComponent';
import JobListItem from '../../shared/components/JobListItem';
import { searchJob } from '../../modules/helper';

function SavedJobs() {
  const [jobResult, setJobResult] = useState([]);

  React.useEffect(() => {
    findJob();
  }, []);

  const findJob = () => {
    searchJob({
      page: 1,
      limit: 5,
      titleRecruitment: '',
      salaryMin: 0,
      salaryMax: 0,
      fieldId: 0,
      locationId: 0,
      expId: 0,
      majorId: 0,
      typeId: 0,
      levelId: 0,
    }).then((response) => {
      console.log(response);

      setJobResult(response.data);
    });
  };

  return (
    <>
      <div className="saved-jobs bg-slate-100">
        <div className="container">
          <div className="max-w-screen-lg mx-auto">
            <div className="list-saved-jobs grid grid-cols-3 gap-x-4 py-8">
              <div className="left-box col-span-2">
                <div className="left-box-body bg-white rounded-lg overflow-hidden">
                  <div className="left-box--banner py-10 px-6 h-44 text-white bg-cover bg-[url('../../images/saved-jobs_banner.png')]">
                    {/* <img src="../../images/saved-jobs_banner.png" /> */}
                    <h1 className="text-2xl font-bold">Việc làm đã lưu</h1>
                    <span className="max-w-lg">
                      Xem lại danh sách những việc làm mà bạn đã lưu trước đó.
                      <br />
                      Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho
                      bạn.
                    </span>
                  </div>
                  <div className="left-box--content job-list-search-result text-black">
                    <div className="saved-jobs-count text-lg p-4 border-b-2">
                      Danh sách
                      <strong> {jobResult.length} </strong>
                      việc làm đã lưu
                    </div>
                    <div className="saved-jobs-list p-4">
                      {jobResult.length > 0 ? (
                        jobResult.map((item: any) => {
                          return <JobListItem item={item} />;
                        })
                      ) : (
                        <div className="find-job-box flex flex-col items-center mx-auto gap-2 py-6">
                          <div className="find-job--icon max-w-fit">
                            <img src="../../images/saved-jobs_icon.png" />
                          </div>
                          <div className="find-job--text">
                            Bạn chưa lưu công việc nào!
                          </div>
                          <div className="find-job--action max-w-fit px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600">
                            Tìm việc ngay
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-box col-span-1 box-interested text-black">
                <div className="interested sticky top-24">
                  <InterestedJobComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedJobs;
