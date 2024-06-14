import React from 'react';
import CustomSelectOption from '../../layouts/HRLayout/components/CustomSelectOption';
import { ChevronRight, Search } from 'lucide-react';
import * as HRModule from '../../modules/hr-module';
import { DefaultPagination } from '../../shared/components/default-pagination';
import { ApplicationFromServer } from '../../shared/types/Application.type';
import { cvState, cvLabel } from '../../shared/utils/constant';
import ReceivedCVTable from '../../shared/components/ReceivedCVTable';
import { useProfileContext } from '../../shared/services/authen/domain/context';

function ReceiveCV() {
  // const hrId = JSON.parse(localStorage.getItem('hr') as string).id;
  const token = useProfileContext();
  if(!token.token)
  {
    return;
  }
  const [campaign, setCampaign] = React.useState<any>();
  const [receivedCvState, setReceivedCvState] = React.useState<
    NameValue | undefined
  >(undefined);
  const [cvLabelState, setCvLabelState] = React.useState();
  const [listCV, setListCV] = React.useState<ApplicationFromServer[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [compaignList, setCompaignList] = React.useState<NameValue[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);

  const setRefreshData = () => {
    setRefresh(!refresh);
  };
  const fetchApplication = ( compaignId: string) => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: compaignId,
      token: token.token!,
      status:
        receivedCvState != undefined
          ? (receivedCvState.value as boolean)
          : undefined,
      page: page,
    }).then((res) => {
      console.log(res);
      setListCV(res.applications);
      setTotalPage(res.totalPage);
    });
  };
  const fetchAllCompaign = async () => {
    HRModule.getAllCompaignByHrId({ token:token.token! }).then((res) => {
      setCompaignList([
        { value: '', name: 'Tất cả' },
        ...res.allCampaigns
          .filter((item: any) => item.name != '')
          .map((item: any) => {
            return { value: item.id, name: item.name } as NameValue;
          }),
      ]);
    });
  };

  React.useEffect(() => {
    fetchAllCompaign();
    fetchApplication('');
  }, []);

  React.useEffect(() => {
    fetchApplication(!campaign ? '' : campaign.value);
  }, [campaign, receivedCvState, page, refresh]);

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <div
        className="bg-white w-full"
        style={{ marginLeft: '1px', paddingLeft: '20px' }}
      >
        <p
          style={{ padding: '20px 15px', fontSize: '16px', fontWeight: '500' }}
        >
          Quản lý CV ứng viên
        </p>
        <div className="flex py-2  flex-wrap">
          <div
            className="flex  mx-3.5 justify-between bg-white border border-gray-200"
            style={{ width: '280px' }}
          >
            <input
              type="search"
              id="search-dropdown"
              className="flex-grow pl-2.5 z-20 focus:outline-none"
              style={{ fontSize: '14px' }}
              placeholder="Tìm kiếm tên, email, số điện thoại"
              required
            />
            <button
              type="submit"
              className=" top-0 end-0 p-1.5 text-sm h-full text-black bg-white mr-1"
            >
              <Search color="#959494" size={16} />
            </button>
          </div>
          <CustomSelectOption
            label=" Chọn chiến dịch tuyển dụng"
            value={campaign}
            width="200px"
            onChange={(e) => {
              setCampaign(e);
            }}
            list={compaignList}
          />
          <CustomSelectOption
            label="Nhập trạng thái"
            value={receivedCvState}
            onChange={(e) => {
              setReceivedCvState(e);
            }}
            list={cvState}
          />

          <CustomSelectOption
            label="Tất cả nhãn"
            value={cvLabelState}
            onChange={(e) => {
              setCvLabelState(e);
            }}
            list={cvLabel}
          />
        </div>
      </div>
      <div>
        <div
          className="mt-6 mx-6 flex items-center rounded-lg"
          style={{
            border: '1px solid green',
            background:
              'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(239,251,238,1) 28%, rgba(233,245,231,1) 48%, rgba(229,255,226,1) 60%, rgba(216,254,212,1) 100%)',
          }}
        >
          <img
            src="https://tuyendung.topcv.vn/app/_nuxt/img/icon.051fe1d.png"
            alt=""
            width="104px"
          />
          <p className="flex-grow mx-2">
            Đồng bộ hồ sơ ứng viên từ các website tuyển dụng, gửi email tự động,
            đặt lịch phỏng vấn, lập báo cáo hiệu quả tuyển dụng với{' '}
            <span className="text-green-500 font-bold">SHring.ai</span>
          </p>
          <button
            className="pl-3 pr-8 text-green-600 bg-white flex"
            style={{ borderLeft: '1px solid green ' }}
          >
            <span style={{ fontSize: '13px' }} className="hover:text-green-900">
              Đăng ký ngay
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="mt-6 mx-6 items-center rounded-lg bg-white">
          <div className="flex justify-between" style={{ padding: '15.96px' }}>
            <p className="flex-grow">
              Tìm thấy <span className="text-green-500 font-bold">0</span> ứng
              viên
            </p>
            <label style={{ transform: 'translateY(5px)' }}>
              <input
                type="checkbox"
                style={{ color: 'pink' }}
                // checked={receivedCvState == cvState[2]}
                onChange={(e) => {
                  console.log(e.target.checked);
                  if (e.target.checked) {
                    setReceivedCvState(cvState[2] as NameValue);
                  } else {
                    setReceivedCvState(undefined);
                  }
                }}
              />
              Chỉ hiện ứng viên chưa xem
            </label>
            <div className="mr-6"></div>
            <label style={{ transform: 'translateY(5px)' }}>
              <input type="checkbox" style={{ color: 'pink' }} />
              Chỉ xem ứng viên Pro
            </label>
          </div>
          {compaignList != undefined &&
          listCV != undefined &&
          listCV.length == 0 ? (
            <div className="flex justify-center items-center flex-col p-5">
              <img src="https://tuyendung.topcv.vn/app/_nuxt/img/empty.73d75f4.png" />
              Bạn không có CV
            </div>
          ) : (
            <div className="p-5">
              <ReceivedCVTable
                data={listCV}
                compaigns={compaignList}
                setRefreshData={setRefreshData}
              />
              <div className="flex justify-center mt-5">
                <DefaultPagination
                  totalPage={totalPage}
                  active={page}
                  setActive={setPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReceiveCV;
2;
