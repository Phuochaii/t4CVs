import { Clock, Info, Phone, Mail } from "lucide-react";
import * as React from "react";
import { DefaultPagination } from "../../../../shared/components/default-pagination";
import * as HRModule from "../../../../modules/hr-module";

function FollowingCV() {
  const hrId = "1";

  const [listCV, setListCV] = React.useState<any>([]);

  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);

  const fetchApplication = async (hrId: string) => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: "3",
      hrId: hrId,
      page: page,
    }).then((res) => {
      // console.log(res);
      setListCV(res.applications);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication(hrId);
  }, []);

  React.useEffect(() => {
    fetchApplication(hrId);
  }, [page]);

  return (
    <div>
      {listCV.length == 0 ? (
        <div className="flex justify-center items-center flex-col p-5">
          <img src="https://tuyendung.topcv.vn/app/_nuxt/img/empty.73d75f4.png" />
          Bạn không có CV
        </div>
      ) : (
        <div className="p-5">
          <table className="p-5" style={{ width: "100%" }}>
            <thead className="border-b-2 border-gray-100 capitalize pb-2">
              <tr>
                <th className="text-left capitalize">CV Ứng viên</th>
                <th className="text-left">Thông tin liên hệ</th>
                <th className="text-left">Insighs</th>
                <th className="text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="pt-2">
              {listCV.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="font-medium my-5 mx-3"
                  style={{ fontSize: "13px" }}
                >
                  <td
                    className="flex items-center"
                    style={{ maxWidth: "300px" }}
                  >
                    <div className="w-20 rounded-full inline-block mr-5 border-black border-2">
                      <img
                        className="w-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      />
                    </div>
                    <div className="h-full">
                      <p className=" text-lg font-bold">{item.fullname}</p>

                      <button className="bg-green-300 text-white my-2 px-2">
                        Xem CV
                      </button>
                    </div>
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

export default FollowingCV;
