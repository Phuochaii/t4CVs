import { BriefcaseBusiness, Clock, Mail, Phone, Ellipsis } from "lucide-react";

function Tab1() {
  const listCV = [
    {
      name: "Nguyễn Thị Lụa",
      statusView: "Đã xem",
      campaign: {
        name: "Tuyển nhân viên Tester",
        id: "#407764",
      },
      email: "haiyyen123@gmail.com",
      phone: "0223092551",
      insight: {
        descript: "Tìm CV",
        time: "07/04/2024 09:22",
        job: "Chuyên viên nhân sự tổng hợp",
      },
      status: "Phù hợp",
    },
  ];
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
          />
          Hiển thị tất cả CV
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            name="read-mode"
            style={{ transform: "translateY(2px)" }}
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
            <tbody style={{ backgroundColor: "#F8F8F8" }}>
              {listCV.map((item, index) => (
                <tr
                  key={index}
                  className="font-medium my-5 mx-3"
                  style={{ fontSize: "13px" }}
                >
                  <td>
                    <p className="font-semibold">{item.name}</p>
                    <span className="text-sm">{item.statusView}</span>
                  </td>
                  <td>
                    <p>{item.campaign.name}</p>
                    <span>{item.campaign.id}</span>
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
                    <p className="flex">
                      <BriefcaseBusiness
                        size={15}
                        color="#38A34D"
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.job}
                    </p>
                  </td>
                  <td>
                    <div className="rounded-full bg-orange-100 text-orange-400 px-3">
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn px-3 rounded-md ml-5"
                      style={{ backgroundColor: "#EAEAEA" }}
                    >
                      <Ellipsis size={18} />
                    </button>
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

export default Tab1;
