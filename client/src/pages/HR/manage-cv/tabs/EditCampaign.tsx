import { useParams, useNavigate } from 'react-router-dom';
import { deleteCampaign } from '../../../../modules/hr-module';
import { useProfileContext } from '../../../../shared/services/authen/domain/context';

function EditCampaign() {
  const navigation = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useProfileContext();
  const handleDeleteCampaign = () => {
    console.log(id);
    const res = deleteCampaign({ id: id!, token: token! })
      .then((res) => {
        alert(res.data);
        navigation('/hr/campaign');
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
  };
  return (
    <div className="edit-campaign-tab py-10 flex flex-col gap-3 items-center text-black">
      <div className="banner max-w-[300px] bg-blue-300 p-10 rounded-full">
        <img
          src="../../images/campaign_information--delete-button.png"
          alt=""
        />
      </div>
      <div className="text font-semibold text-xl">Bạn muốn xóa chiến dịch?</div>
      <div
        onClick={handleDeleteCampaign}
        className="action py-2 px-4 text-white font-bold text-xl bg-red-400 rounded-lg cursor-pointer hover:bg-red-500"
      >
        Xóa chiến dịch
      </div>
    </div>
  );
}

export default EditCampaign;
