import * as React from 'react';
import moment from 'moment';
import { useProfileContext } from '../../../../shared/services/authen/domain/context';
import { getJobByCampaignId } from '../../../../modules/admin-module';

function Information({ compaignId }: { compaignId: string }) {
  const [jobData, setJobData] = React.useState<any>();
  const { token } = useProfileContext();
  const fetchJobData = async () => {
    try {
      const res = await getJobByCampaignId(token!, compaignId);
      console.log(res);
      setJobData(res);
    } catch (error) {
      console.log('Error fetching data. Please try again.');
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobData();
  }, []);

  return (
      jobData ==null ? 
      <p>Chưa có thông tin vị trí tuyển dụng</p> : 
      (<>
      <div className="information text-black flex flex-col gap-2 px-5 py-3">
        <div className="title-recruitment">
          <div className="label text-2xl font-bold">Vị trí tuyển dụng</div>
          <div className="value">
            {jobData?.titleRecruitment ? jobData?.titleRecruitment : ''}
          </div>
        </div>
        <div className="salary-range">
          <div className="label text-2xl font-bold">Mức lương</div>
          <div className="value">
            {jobData?.salaryMin && jobData?.salaryMax
              ? ` ${jobData?.salaryMin} - ${jobData?.salaryMax} ${jobData?.currency?.name}`
              : 'Thỏa thuận'}
          </div>
        </div>
        <h2 className="job-detail__information-detail--title text-2xl font-bold">
          Chi tiết tin tuyển dụng
        </h2>
        <div className="job-detail__information-detail--content">
          <div className="job-description flex flex-col gap-y-3">
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Yêu cầu ứng viên</h3>
              <div className="job-description__item--content flex flex-col gap-y-2">
                <p>
                  {jobData?.jobDetail
                    ? jobData?.jobDetail?.requirement
                      ? jobData?.jobDetail?.requirement
                      : ''
                    : ''}
                </p>
              </div>
            </div>
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Kỹ năng cần thiết</h3>
              <div className="job-description__item--content flex flex-col gap-y-2">
                {jobData?.jobDetail
                  ? jobData?.jobDetail?.skills
                    ? jobData?.jobDetail?.skills
                        .split(', ')
                        .map((skill: any, index: number) => (
                          <p key={index}>- {skill}</p>
                        ))
                    : ''
                  : ''}
              </div>
            </div>
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Mô tả công việc</h3>
              <div className="job-description__item--content flex flex-col gap-y-2">
                <p>
                  {jobData?.jobDetail
                    ? jobData?.jobDetail?.description
                      ? jobData?.jobDetail?.description
                      : ''
                    : ''}
                </p>
              </div>
            </div>
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Thời gian làm việc</h3>
              <div className="job-description__item--content flex flex-col gap-y-2">
                <p>
                  {jobData?.jobDetail
                    ? jobData?.jobDetail?.jobSchedule
                      ? jobData?.jobDetail?.jobSchedule
                      : ''
                    : ''}
                </p>
              </div>
            </div>
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Quyền lợi</h3>
              <div className="job-description__item--content flex flex-col gap-y-2">
                <p>
                  {jobData?.jobDetail
                    ? jobData?.jobDetail?.benefit
                      ? jobData?.jobDetail?.benefit
                      : ''
                    : ''}
                </p>
              </div>
            </div>
            <div className="job-description__item">
              <h3 className="text-base font-bold mb-2">Địa điểm làm việc</h3>
              <div className="job-description__item--content">
                {jobData?.locations
                  ? jobData?.locations.map((location: any) => (
                      <p className="" key={location.id}>
                        {location.name}
                      </p>
                    ))
                  : ''}
              </div>
            </div>
            <div className="job-description__item">
              <span className="text-base font-bold mb-2"> Kinh nghiệm </span>
              <strong className="job-description__item--content">
                {jobData?.exp
                  ? jobData?.exp?.name
                    ? jobData?.exp?.name
                    : ''
                  : ''}
              </strong>
            </div>
          </div>
        </div>
        <div className="job-detail__information-detail--actions flex flex-col gap-y-4">
          <div className="job-detail__information-detail--actions-label">
            Hạn nộp hồ sơ:{' '}
            {moment
              .utc(jobData?.expiredDate ? jobData?.expiredDate : '')
              .format('DD/MM/YYYY')}
          </div>
        </div>
      </div>
    </>));
}

export default Information;
