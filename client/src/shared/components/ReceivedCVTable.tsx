import { ApplicationFromServer } from "../../shared/types/Application.type";
import { Mail, Phone, Clock } from "lucide-react";
import * as HRModule from "../../modules/hr-module";

interface ApplicationProps {
  data: ApplicationFromServer[];
  compaigns: NameValue[];
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="text-left">Ứng viên</th>
        <th className="text-left">Chiến dịch</th>
        <th className="text-left">Thông tin liên hệ</th>
        <th className="text-left">Insighs</th>
        <th className="text-left">Trạng thái</th>
        <th className="text-left"></th>
      </tr>
    </thead>
  );
}

function TableBody({ data, compaigns }: ApplicationProps) {
  function getCompaignName(id: string | number) {
    // console.log(id);
    return compaigns.filter((item) => item.value == id)[0].name;
  }
  return (
    <tbody className="bg-[#F8F8F8C9]">
      {data.map((item: ApplicationFromServer, index: number) => (
        <tr
          key={index}
          className="font-medium py-5 mx-3"
          style={{ fontSize: "13px" }}
        >
          <td>
            <p className="font-semibold">{item.fullname}</p>
          </td>
          <td>
            <p>{getCompaignName(item.campaignId)}</p>
            <span>#{item.campaignId}</span>
          </td>
          <td>
            <p className="flex">
              <Mail size={15} color="#38A34D" style={{ marginRight: "5px" }} />
              {item.email}
            </p>
            <p className="flex">
              <Phone color="#38A34D" size={18} style={{ marginRight: "5px" }} />
              {item.phone}
            </p>
          </td>
          <td>
            <p className="flex">
              <Mail size={15} color="#38A34D" style={{ marginRight: "5px" }} />
              Tìm việc
            </p>
            <p className="flex">
              <Clock size={15} color="#38A34D" style={{ marginRight: "5px" }} />
              {item.updateAt}
            </p>
          </td>
          <td>
            <div
              className={`rounded-full ${item.status ? "bg-orange-100 text-orange-400" : "bg-blue-200 text-blue-500"} px-3`}
            >
              {item.status ? "Đã xem" : "Chưa xem"}
            </div>
          </td>
          <td>
            <button
              onClick={async () => {
                // fetchApplication(hrId);
                HRModule.getCVByApplicationID({
                  applicationId: item.id,
                }).then((res) => {
                  console.log(res);
                  window.open(res.link, "_blank", "noopener");
                });
              }}
              className="btn px-3 py-1 text-white rounded-md ml-5 bg-[#5EE199] hover:bg-green-500 transition ease-out duration-100"
            >
              Xem CV
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

interface ReceivedCVTableProps {
  data: ApplicationFromServer[];
  compaigns: NameValue[];
}

function ReceivedCVTable({ data, compaigns }: ReceivedCVTableProps) {
  return (
    <table
      className="p-5 border-spacing-y-3 border-separate"
      style={{ width: "100%" }}
    >
      <TableHeader />
      <TableBody data={data} compaigns={compaigns} />
    </table>
  );
}

export default ReceivedCVTable;
