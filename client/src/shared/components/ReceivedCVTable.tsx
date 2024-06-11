import { ApplicationFromServer } from '../../shared/types/Application.type';
import { Mail, Phone, Clock } from 'lucide-react';
import * as HRModule from '../../modules/hr-module';
import moment from 'moment';
import { useProfileContext } from '../services/authen/domain/context';

interface ApplicationProps {
  data: ApplicationFromServer[];
  compaigns?: NameValue[];
  hasCampaignColumn: boolean;
}

function TableHeader({ hasCampaignColumn }: { hasCampaignColumn: boolean }) {
  return (
    <thead>
      <tr>
        <th className="text-left">Ứng viên</th>
        {hasCampaignColumn && <th className="text-left">Chiến dịch</th>}
        <th className="text-left">Thông tin liên hệ</th>
        <th className="text-left">Insighs</th>
        <th className="text-left">Trạng thái</th>
        <th className="text-left"></th>
      </tr>
    </thead>
  );
}

function TableBody({ data, compaigns, hasCampaignColumn }: ApplicationProps) {
  function getCompaignName(id: string | number) {
    return compaigns?.filter((item) => item.value == id)[0].name;
  }
  const {token} = useProfileContext();
  return (
    <tbody className="bg-[#F8F8F8C9]">
      {data.map((item: ApplicationFromServer, index: number) => (
        <tr
          key={index}
          className="font-medium py-5 mx-3"
          style={{ fontSize: '13px' }}
        >
          <td>
            <p className="font-semibold">{item.fullname}</p>
          </td>
          {hasCampaignColumn && (
            <td>
              <p>{getCompaignName(item.campaignId)}</p>
              <span>#{item.campaignId}</span>
            </td>
          )}
          <td>
            <p className="flex">
              <Mail size={15} color="#38A34D" style={{ marginRight: '5px' }} />
              {item.email}
            </p>
            <p className="flex">
              <Phone color="#38A34D" size={18} style={{ marginRight: '5px' }} />
              {item.phone}
            </p>
          </td>
          <td>
            <p className="flex">
              <Mail size={15} color="#38A34D" style={{ marginRight: '5px' }} />
              Tìm việc
            </p>
            <p className="flex">
              <Clock size={15} color="#38A34D" style={{ marginRight: '5px' }} />
              {/* {item.updateAt} */}
              {moment(new Date(item.updateAt)).format('DD-MM-YY HH:mm')}
            </p>
          </td>
          <td>
            <div
              className={`rounded-full ${item.status ? 'bg-orange-100 text-orange-400' : 'bg-blue-200 text-blue-500'} px-3 min-w-[90px]`}
            >
              {item.status ? 'Đã xem' : 'Chưa xem'}
            </div>
          </td>
          <td>
            <button
              onClick={async () => {
                // fetchApplication(hrId);
                HRModule.getCVByApplicationID({
                  applicationId: item.id,
                  token: token!,
                }).then((res) => {
                  HRModule.updateApplicationStatus({
                    applicationId: item.id,
                    token: token!,
                  });
                  window.open(res.link, '_blank', 'noopener');
                });
              }}
              className="btn min-w-[80px] px-3 py-1 text-white rounded-md ml-5 bg-[#5EE199] hover:bg-green-500 transition ease-out duration-100"
            >
              Xem CV
            </button>
          </td>
        </tr>
      )
      
      )}
    </tbody>
  );
}

interface ReceivedCVTableProps {
  data: ApplicationFromServer[];
  compaigns?: NameValue[];
  hasCampaignColumn?: boolean;
}

function ReceivedCVTable({
  data,
  compaigns,
  hasCampaignColumn = true,
}: ReceivedCVTableProps) {
  return (
    <table
      className="p-5 border-spacing-y-3 border-separate"
      style={{ width: '100%' }}
    >
      <TableHeader hasCampaignColumn={hasCampaignColumn} />
      <TableBody
        hasCampaignColumn={hasCampaignColumn}
        data={data}
        compaigns={compaigns}
      />
    </table>
  );
}

export default ReceivedCVTable;
