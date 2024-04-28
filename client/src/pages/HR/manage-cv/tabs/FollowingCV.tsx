import {
  BriefcaseBusiness,
  Clock,
  MapPin,
  GraduationCap,
  Info,
  Eye,
  Contact,
  Phone,
  Mail,
} from "lucide-react";
function FollowingCV() {
  const listCV = [
    {
      name: "Nguyễn Thị Lụa",
      campaign: {
        name: "Tuyển nhân viên Tester",
        id: "#407764",
      },
      email: "haiyyen123@gmail.com",
      phone: "0223092551",
      insight: {
        descript: "Tìm CV",
        time: "07/04/2024 09:22",
      },
      status: "Đã xem",
    },
  ];
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
              {listCV.map((item, index) => (
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
                      <p className=" text-lg font-bold">{item.name}</p>

                      <span className="text-sm flex">
                        <Info
                          size={15}
                          strokeWidth={2.3}
                          style={{ marginRight: "5px" }}
                        />
                        {item.status}
                      </span>
                      <button className="bg-green-400 text-white my-2 p-2">
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
                      {item.insight.descript}
                    </p>
                    <p className="flex">
                      <Clock
                        size={15}
                        color="#38A34D"
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.time}
                    </p>
                  </td>
                  <td>
                    <div className="rounded-full bg-orange-100 text-orange-400 px-3">
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FollowingCV;
