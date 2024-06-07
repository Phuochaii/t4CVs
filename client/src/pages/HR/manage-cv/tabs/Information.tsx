import * as React from 'react';

function Information({ compaignId }: { compaignId: string }) {
  const [jobData, setJobData] = React.useState<any>();
  const fetchJobData = async () => {
    try {
      const response = await fetch(`
      http://localhost:3000/job?campaignId=${compaignId}`);

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
      <div className="information text-black grid grid-cols-3 gap-3 px-5 py-3">
        <div className="left-info col-span-1 flex flex-col gap-2">
          <div className="title-recruitment">
            <div className="label text-2xl font-bold text-green-600">
              Vị trí tuyển dụng
            </div>
            <div className="value text-lg font-medium">
              {jobData?.titleRecruitment ? jobData?.titleRecruitment : ''}
            </div>
          </div>
          <div className="salary-range">
            <div className="label text-2xl font-bold text-green-600">
              Mức lương
            </div>
            <div className="value text-lg font-medium">
              {jobData?.salaryMin && jobData?.salaryMax
                ? ` ${jobData?.salaryMin} - ${jobData?.salaryMax} ${jobData?.currency?.name}`
                : 'Thỏa thuận'}
            </div>
          </div>
          <div className="company-info flex flex-col gap-1">
            <h1 className="main-label text-2xl font-bold text-green-600">
              Thông tin công ty
            </h1>
            <div className="company-name flex flex-col gap-1">
              <span className="label text-xl font-semibold">Tên công ty:</span>
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
              <span className="label text-xl font-semibold">Địa chỉ:</span>
              <span className="value text-lg font-medium">
                {jobData?.company
                  ? jobData?.company?.address
                    ? jobData?.company?.address
                    : ''
                  : ''}
              </span>
            </div>
            <div className="company-phone flex flex-col gap-1">
              <span className="label text-xl font-semibold">
                Số điện thoại:
              </span>
              <span className="value text-lg font-medium">
                {jobData?.company
                  ? jobData?.company?.phone
                    ? jobData?.company?.phone
                    : ''
                  : ''}
              </span>
            </div>
            <div className="company-size flex flex-col gap-1">
              <span className="label text-xl font-semibold">
                Đội ngũ nhân viên:
              </span>
              <span className="value text-lg font-medium">
                {jobData?.company
                  ? jobData?.company?.companySize
                    ? jobData?.company?.companySize
                    : ''
                  : ''}{' '}
                nhân viên
              </span>
            </div>
            <div className="company-field flex flex-col gap-1">
              <span className="label text-xl font-semibold">
                Loại hình công ty:
              </span>
              <span className="value text-lg font-medium">
                {jobData?.company
                  ? jobData?.company?.fieldName
                    ? jobData?.company?.fieldName
                    : ''
                  : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="right-info col-span-2 flex items-center justify-center">
          {/* <div className="company-employers">
            <span className="label text-2xl font-semibold text-green-600">
              Danh sách nhà tuyển dụng:
            </span>
            <span className="value text-lg font-medium">
              {jobData?.company
                ? jobData?.company?.employers[0]
                  ? jobData?.company?.employers[0]
                  : ''
                : ''}
            </span>
          </div> */}
          <img
            className="w-3/4 h-3/4"
            src="../../images/campaign_information--banner.png"
          />
        </div>
      </div>
    </>
  );
}

export default Information;
