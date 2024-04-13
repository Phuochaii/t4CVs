import CustomSelectOption from "../../layouts/HRLayout/components/CustomSelectOption";
import {
  ChevronRight,
  Ellipsis,
  Mail,
  Phone,
  BriefcaseBusiness,
  Clock,
  Search,
} from "lucide-react";

function ReceiveCV() {
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
  const recruitmentCampaign = [
    { title: "Chiến dịch 1", value: "1" },
    { title: "Chiến dịch 2", value: "2" },
    { title: "Chiến dịch 3", value: "3" },
    { title: "Chiến dịch 4", value: "4" },
  ];
  const cvState = [
    { title: "CV tiếp nhận", value: "1" },
    { title: "Phù hợp", value: "2" },
    { title: "Hẹn phỏng vấn", value: "3" },
    { title: "Gửi đề nghị", value: "4" },
    { title: "Nhận việc", value: "5" },
    { title: "Từ chối", value: "6" },
  ];
  const cvSource = [
    { title: "Ứng tuyển", value: "1" },
    { title: "Tìm CV", value: "2" },
    { title: "Việc làm siêu tốc", value: "3" },
    { title: "Exclusive CV", value: "4" },
    { title: "CV đề xuất", value: "5" },
  ];
  const cvLabel = [
    { title: "Chưa gắn nhãn", value: "1" },
    { title: "Ưu tiên", value: "2" },
    { title: "Ít tiềm năng", value: "3" },
  ];
  const cvSeeMode = [
    {
      title: "Hiển thị tất cả CV",
      value: "1",
    },
    { title: "Chỉ hiện thị CV chưa xem", value: "2" },
  ];
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <div
        className="bg-white w-full"
        style={{ marginLeft: "1px", paddingLeft: "20px" }}
      >
        <p style={{ padding: "20px 15px", fontSize: "16px", fontWeight: "500" }}>
          Quản lý CV ứng viên
        </p>
        <div className="flex py-2  flex-wrap">
          <div
            className="flex  mx-3.5 justify-between bg-white border border-gray-200"
            style={{ width: "280px" }}
          >
            <input
              type="search"
              id="search-dropdown"
              className="flex-grow pl-2.5 z-20 focus:outline-none"
              style={{ fontSize: "14px" }}
              placeholder="Tìm kiếm tên, email, số điện thoại"
              required
            />
            <button
              type="submit"
              className=" top-0 end-0 p-1.5 text-sm h-full text-black bg-white mr-1"
            >
              <Search color="#959494" size={16} />
            </button>
          </div>
          <CustomSelectOption
            label=" Chọn chiến dịch tuyển dụng"
            list={recruitmentCampaign}
          />
          <CustomSelectOption label="Nhập trạng thái" list={cvState} />
          <CustomSelectOption label="Nhập nguồn CV" list={cvSource} />
          <CustomSelectOption label="Tất cả nhãn" list={cvLabel} />
        </div>
      </div>
      <div style={{ maxWidth: "1206px" }}>
        <div
          className="mt-6 mx-6 flex items-center rounded-lg"
          style={{
            border: "1px solid green",
            background:
              "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(239,251,238,1) 28%, rgba(233,245,231,1) 48%, rgba(229,255,226,1) 60%, rgba(216,254,212,1) 100%)",
          }}
        >
          <img
            src="https://tuyendung.topcv.vn/app/_nuxt/img/icon.051fe1d.png"
            alt=""
            width="104px"
          />
          <p className="flex-grow mx-2">
            Đồng bộ hồ sơ ứng viên từ các website tuyển dụng, gửi email tự động,
            đặt lịch phỏng vấn, lập báo cáo hiệu quả tuyển dụng với{" "}
            <span className="text-green-500 font-bold">SHring.ai</span>
          </p>
          <button
            className="pl-3 pr-8 text-green-600 bg-white flex"
            style={{ borderLeft: "1px solid green " }}
          >
            <span style={{ fontSize: "13px" }} className="hover:text-green-900">Đăng ký ngay</span>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="mt-6 mx-6 items-center rounded-lg bg-white">
          <div className="flex justify-between" style={{ padding: "15.96px" }}>
            <p className="flex-grow">
              Tìm thấy <span className="text-green-500 font-bold">0</span> ứng
              viên
            </p>
            <CustomSelectOption
              label="Hiển thị tất cả"
              labelColor="#000"
              list={cvSeeMode}
              width="240px"
            />
            <label style={{ transform: "translateY(5px)" }}>
              <input type="checkbox" style={{ color: "pink" }} />
              Chỉ xem ứng viên Pro
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
      </div>
    </div>
  );
}

export default ReceiveCV;
2;
