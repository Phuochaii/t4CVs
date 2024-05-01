import * as React from "react";
import { Mail, Phone, Clock } from "lucide-react";
import { DefaultPagination } from "../../../../shared/components/default-pagination";
import * as HRModule from "../../../../modules/hr-module";

function Application({
  compaignId,
  hrId,
}: {
  compaignId: string;
  hrId: string;
}) {
  // const compaignId = "1";

  const [listCV, setListCV] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);

  const fetchApplication = async () => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: compaignId,
      hrId: hrId,
      page: page,
    }).then((res) => {
      // console.log(res);
      setListCV(res.applications);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication();
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
      <table className="p-5" style={{ width: "100%" }}>
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
        <tbody className="bg-[#F8F8F8C9]">
          {listCV != undefined &&
            listCV.map((item: any, index: number) => (
              <tr
                key={index}
                className="font-medium my-5 mx-3"
                style={{ fontSize: "13px" }}
              >
                <td>
                  <p className="font-semibold">{item.fullname}</p>
                </td>
                <td>
                  <p>fgvdfhujvhdfuicv</p>
                  <span>#{item.campaignId}</span>
                </td>
                <td>
                  <p className="flex">
                    <Mail
                      size={15}
                      color="#38A34D"
                      style={{ marginRight: "5px" }}
                    />
                    {item.email}
                  </p>
                  <p className="flex">
                    <Phone
                      color="#38A34D"
                      size={18}
                      style={{ marginRight: "5px" }}
                    />
                    {item.phone}
                  </p>
                </td>
                <td>
                  <p className="flex">
                    <Mail
                      size={15}
                      color="#38A34D"
                      style={{ marginRight: "5px" }}
                    />
                    Tìm việc
                  </p>
                  <p className="flex">
                    <Clock
                      size={15}
                      color="#38A34D"
                      style={{ marginRight: "5px" }}
                    />
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
                      console.log(item);
                      HRModule.updateApplicationStatus({
                        applicationId: item.id,
                      });

                      fetchApplication();
                      await HRModule.getCVByApplicationID({
                        applicationId: 3,
                      }).then((res) => {
                        window.open(res.link, "_blank", "noopener");
                      });
                    }}
                    className="btn px-3 py-1 text-white rounded-md ml-5 bg-[#5EE199] hover:bg-green-500 transition ease-out duration-100"
                  >
                    {/* <Ellipsis size={18} /> */}
                    Xem CV
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
