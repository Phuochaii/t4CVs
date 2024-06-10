import * as React from 'react';
import moment from 'moment';
import { useProfileContext } from '../../../../shared/services/authen/domain/context';

function Information({ compaignId }: { compaignId: string }) {
  const [jobData, setJobData] = React.useState<any>();
  const {token} = useProfileContext()
  const fetchJobData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/job?campaignId=${compaignId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Optional, based on server requirements
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      console.log(data);
      setJobData(data);
    } catch (error) {
      console.log('Error fetching data. Please try again.');
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobData();
  }, []);

  return (
    <>
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
                <p>
                  {jobData?.company
                    ? jobData?.company?.address
                      ? jobData?.company?.address
                      : ''
                    : ''}
                </p>
              </div>
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

        <div className="company-info flex flex-col gap-3">
          <h1 className="main-label text-2xl font-bold">Thông tin công ty</h1>
          <div className="company-name flex flex-col gap-1">
            <span className="label text-base font-bold">Tên công ty:</span>
            <a
              className="value text-lg font-medium underline text-green-500 max-w-fit"
              href={jobData?.company.website}
            >
              {jobData?.company
                ? jobData?.company?.name
                  ? jobData?.company?.name
                  : ''
                : ''}
            </a>
          </div>
          <div className="company-address flex flex-col gap-1">
            <span className="label text-base font-bold">Địa chỉ:</span>
            <span className="value">
              {jobData?.company
                ? jobData?.company?.address
                  ? jobData?.company?.address
                  : ''
                : ''}
            </span>
          </div>
          <div className="company-phone flex flex-col gap-1">
            <span className="label text-base font-bold">Số điện thoại:</span>
            <span className="value">
              {jobData?.company
                ? jobData?.company?.phone
                  ? jobData?.company?.phone
                  : ''
                : ''}
            </span>
          </div>
          <div className="company-size flex flex-col gap-1">
            <span className="label text-base font-bold">
              Đội ngũ nhân viên:
            </span>
            <span className="value">
              {jobData?.company
                ? jobData?.company?.companySize
                  ? jobData?.company?.companySize
                  : ''
                : ''}{' '}
              nhân viên
            </span>
          </div>
          <div className="company-field flex flex-col gap-1">
            <span className="label text-base font-bold">
              Loại hình công ty:
            </span>
            <span className="value">
              {jobData?.company
                ? jobData?.company?.fieldName
                  ? jobData?.company?.fieldName
                  : ''
                : ''}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Information;
