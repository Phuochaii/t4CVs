import * as React from 'react';
import { DefaultPagination } from '../../../../shared/components/default-pagination';
import * as HRModule from '../../../../modules/hr-module';
import ReceivedCVTable from '../../../../shared/components/ReceivedCVTable';
import { CampaignFromServer } from '../../../../shared/types/Campaign.type';
import { ApplicationFromServer } from '../../../../shared/types/Application.type';
import { useProfileContext } from '../../../../shared/services/authen/domain/context';

function Application({ compaignId }: { compaignId: string }) {
  // const compaignId = "1";

  const [listCV, setListCV] = React.useState<ApplicationFromServer[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [campaign, setCampaign] = React.useState<CampaignFromServer | null>(
    null,
  );
  const { token } = useProfileContext();
  const fetchCompaign = async () => {
    HRModule.getCampaignById({ id: compaignId }).then((res) => {
      setCampaign(res);
    });
  };
  const fetchApplication = async () => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: compaignId,
      token: token!,
      page: page,
    }).then((res) => {
      setListCV(res.applications || []);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication();
    fetchCompaign();
  }, []);
  React.useEffect(() => {
    fetchApplication();
  }, [page]);

  return listCV.length == 0 ? (
    <div className="flex justify-center items-center flex-col p-5">
      <img src="https://tuyendung.topcv.vn/app/_nuxt/img/empty.73d75f4.png" />
      Bạn không có CV
    </div>
  ) : (
    <div className="p-5">
      {campaign == null ? (
        <></>
      ) : (
        <ReceivedCVTable
          data={listCV}
          hasCampaignColumn={false}
          // compaigns={[{ name: campaign.name, value: campaign.id }]}
        />
      )}
      <div className="flex justify-center mt-5">
        <DefaultPagination
          totalPage={totalPage}
          active={page}
          setActive={setPage}
        />
      </div>
    </div>
  );
}

export default Application;
