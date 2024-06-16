import * as React from 'react';
import { DefaultPagination } from '../../../../shared/components/default-pagination';
import * as HRModule from '../../../../modules/hr-module';
import FollowingCVTable from '../../../../shared/components/FollowingCVTable';
import { ApplicationFromServer } from '../../../../shared/types/Application.type';
import { useProfileContext } from '../../../../shared/services/authen/domain/context';

function FollowingCV({ compaignId }: { compaignId: string }) {
  // const hrId = "1";

  const [listCV, setListCV] = React.useState<ApplicationFromServer[]>([]);
  const { token } = useProfileContext();
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const setRefreshData = () => {
    setRefresh(!refresh);
  };

  const fetchApplication = async () => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: compaignId,
      token: token!,
      page: page,
    }).then((res) => {
      // console.log(res);
      setListCV(res.applications || []);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication();
  }, []);

  React.useEffect(() => {
    fetchApplication();
  }, [page, refresh]);

  return (
    <div>
      {listCV.length == 0 ? (
        <div className="flex justify-center items-center flex-col p-5">
          <img src="https://tuyendung.topcv.vn/app/_nuxt/img/empty.73d75f4.png" />
          Bạn không có CV
        </div>
      ) : (
        <div className="p-5">
          <FollowingCVTable data={listCV} setRefreshData={setRefreshData}/>
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
  );
}

export default FollowingCV;
