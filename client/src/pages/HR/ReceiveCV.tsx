import CustomSelectOption from "../../layouts/HRLayout/components/CustomSelectOption";

function ReceiveCV() {
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
  return (
    <>
      <div
        className="bg-white"
        style={{ marginLeft: "1px", paddingLeft: "20px" }}
      >
        <p style={{ padding: "20px 0", fontSize: "16px", fontWeight: "500" }}>
          Quản lý CV ứng viên
        </p>
        <div className="flex py-2">
          <div
            className="flex justify-between bg-white border border-gray-200"
            style={{ width: "280px" }}
          >
            <input
              type="search"
              id="search-dropdown"
              className="flex-grow pl-2.5 z-20"
              style={{ fontSize: "14px" }}
              placeholder="Tìm kiếm tên, email, số điện thoại"
              required
            />
            <button
              type="submit"
              className=" top-0 end-0 p-1.5 text-sm h-full text-black bg-white mr-1"
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "14px", marginTop: "2px" }}
              ></i>
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
      <div
        className="mt-6 mx-6 flex items-center rounded-lg"
        style={{ border: "1px solid green", backgroundColor: "#F2FFF7" }}
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
          className="pl-3 pr-8 text-green-500 bg-white font-medium"
          style={{ borderLeft: "1px solid green " }}
        >
          Đăng ký ngay
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div className="mt-6 mx-6 items-center rounded-lg bg-white">
        <div className="flex p-6 justify-between">
          <p className="flex-grow">
            Tìm thấy <span className="text-green-500 font-bold">0</span> ứng
            viên
          </p>
          <CustomSelectOption label="Hiển thị tất cả" />
          <label>
            <input type="checkbox" checked={true} />
            Chỉ xem ứng viên Pro
          </label>
        </div>
      </div>
    </>
  );
}

export default ReceiveCV;
