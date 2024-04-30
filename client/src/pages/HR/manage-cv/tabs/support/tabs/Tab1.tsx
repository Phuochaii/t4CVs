import * as React from "react";

import { Clock, Mail, Phone } from "lucide-react";
import * as HRModule from "../../../../../../modules/hr-module";
import { DefaultPagination } from "../../../../../../shared/components/default-pagination";

function Tab1() {
  const hrId = "1";

  const [listCV, setListCV] = React.useState([]);
  const [statusMode, setStatusMode] = React.useState<boolean | undefined>(
    undefined
  );
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);

  const fetchApplication = async (hrId: string) => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: "3",
      hrId: hrId,
      status: statusMode,
      page: page,
    }).then((res) => {
      console.log(res);
      setListCV(res.applications);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication(hrId);
  }, []);
  React.useEffect(() => {
    fetchApplication(hrId);
  }, [statusMode, page]);
  return (
    <div>
      <div className="flex justify-end px-4">
        <label className="mr-3">
          <input
            className="mr-2 "
            type="radio"
            defaultChecked
            name="read-mode"
            style={{ transform: "translateY(2px)" }}
            onClick={() => setStatusMode(undefined)}
          />
          Hiển thị tất cả CV
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            name="read-mode"
            style={{ transform: "translateY(2px)" }}
            onClick={() => setStatusMode(false)}
          />
          Chỉ hiện thị CV chưa xem
        </label>
      </div>
      {listCV.length == 0 ? (
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

                          fetchApplication(hrId);
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
      )}
    </div>
  );
}

export default Tab1;
