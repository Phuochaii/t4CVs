import React from "react";
import CustomSelectOption from "../../layouts/HRLayout/components/CustomSelectOption";
import { ChevronRight, Mail, Phone, Clock, Search } from "lucide-react";
import * as HRModule from "../../modules/hr-module";
import { DefaultPagination } from "../../shared/components/default-pagination";

function ReceiveCV() {
  const hrId = "1";

  const [campaign, setCampaign] = React.useState<any>();
  const [receivedCvState, setReceivedCvState] = React.useState<any>(undefined);
  // const [cvSourceState, setCvSourceState] = React.useState();
  const [cvLabelState, setCvLabelState] = React.useState();

  const [listCV, setListCV] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [compaignList, setCompaignList] = React.useState<any>([]);

  const fetchApplication = async (hrId: string) => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: campaign != undefined ? campaign.id : "",
      hrId: hrId,
      status: receivedCvState ? receivedCvState.value : undefined,
    }).then((res) => {
      setListCV(res.applications);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    const fetchAllCompaign = async () => {
      HRModule.getAllCompaignByHrId({ hrId: "1" }).then((res) => {
        console.log(res.data);
        setCompaignList([{ id: "", name: "Tất cả" }, ...res.data]);
      });
    };

    fetchAllCompaign();
    fetchApplication(hrId);
  }, []);

  React.useEffect(() => {
    fetchApplication(hrId);
  }, [campaign, receivedCvState]);

  const cvState = [
    { name: "Tất cả", value: undefined },
    { name: "Đã xem", value: true },
    { name: "Chưa xem", value: false },
  ];
  // const cvSource = [
  //   { name: "Ứng tuyển", value: "1" },
  //   { name: "Tìm CV", value: "2" },
  //   { name: "Việc làm siêu tốc", value: "3" },
  //   { name: "Exclusive CV", value: "4" },
  //   { name: "CV đề xuất", value: "5" },
  // ];
  const cvLabel = [
    { name: "Chưa gắn nhãn", value: "1" },
    { name: "Ưu tiên", value: "2" },
    { name: "Ít tiềm năng", value: "3" },
  ];
  const cvSeeMode = [
    {
      name: "Hiển thị tất cả CV",
      value: "1",
    },
    { name: "Chỉ hiện thị CV chưa xem", value: "2" },
  ];

  function getCompaignName(id: string) {
    // console.log(id);
    // console.log(compaignList);

    if (compaignList != undefined && id != "") {
      return compaignList.filter((item: any) => {
        return item.id == id;
      })[0].name;
    }
  }
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <div
        className="bg-white w-full"
        style={{ marginLeft: "1px", paddingLeft: "20px" }}
      >
        <p
          style={{ padding: "20px 15px", fontSize: "16px", fontWeight: "500" }}
        >
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
            value={campaign}
            width="200px"
            onChange={(e) => {
              setCampaign(e);
            }}
            list={compaignList}
          />
          <CustomSelectOption
            label="Nhập trạng thái"
            value={receivedCvState}
            onChange={(e) => {
              setReceivedCvState(e);
            }}
            list={cvState}
          />
          {/* <CustomSelectOption
            label="Nhập nguồn CV"
            value={cvSourceState}
            onChange={(e) => {
              setCvSourceState(e);
            }}
            list={cvSource}
          /> */}
          <CustomSelectOption
            label="Tất cả nhãn"
            value={cvLabelState}
            onChange={(e) => {
              setCvLabelState(e);
            }}
            list={cvLabel}
          />
        </div>
      </div>
      <div
      // style={{ maxWidth: "1206px" }}
      >
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
            <span style={{ fontSize: "13px" }} className="hover:text-green-900">
              Đăng ký ngay
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="mt-6 mx-6 items-center rounded-lg bg-white">
          <div className="flex justify-between" style={{ padding: "15.96px" }}>
            <p className="flex-grow">
              Tìm thấy <span className="text-green-500 font-bold">0</span> ứng
              viên
            </p>
            <label style={{ transform: "translateY(5px)" }}>
              <input
                type="checkbox"
                style={{ color: "pink" }}
                // checked={receivedCvState == cvState[2]}
                onChange={(e) => {
                  console.log(e.target.checked);
                  if (e.target.checked) {
                    setReceivedCvState(cvState[2]);
                  } else {
                    setReceivedCvState(undefined);
                  }
                }}
              />
              Chỉ hiện ứng viên chưa xem
            </label>
            <div className="mr-6"></div>
            <label style={{ transform: "translateY(5px)" }}>
              <input type="checkbox" style={{ color: "pink" }} />
              Chỉ xem ứng viên Pro
            </label>
          </div>
          {compaignList != undefined &&
          listCV != undefined &&
          listCV.length == 0 ? (
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
                          <p>{getCompaignName(item.campaignId)}</p>
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
      </div>
    </div>
  );
}

export default ReceiveCV;
2;
