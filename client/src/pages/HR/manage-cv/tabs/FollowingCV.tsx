import {
  BriefcaseBusiness,
  Clock,
  MapPin,
  GraduationCap,
  Info,
  Eye,
  Contact,
} from "lucide-react";
function FollowingCV() {
  const listCV = [
    {
      name: "Nguyễn Thị Lụa",
      statusView: "Đã xem",
      email: "haiyyen123@gmail.com",
      phone: "0223092551",
      experience: "Phục vụ cà phê và nhà hàng",
      education: "Đại học Công nghệ",
      target: "Apply vị trí chuyên viên nhân sự tổng hợp tại Thừa Thiên Huế",
      insight: {
        descript: "Tìm CV",
        time: "Cập nhật 1 tháng trước",
        job: "Chuyên viên nhân sự tổng hợp",
        view: 1,
        openTime: 1,
        location: "Thừa Thiên Huế",
      },
      status: "Phù hợp",
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
                <th className="text-left capitalize">Thông tin CV</th>
                <th className="text-left capitalize">Insighs</th>
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
                        <BriefcaseBusiness
                          size={15}
                          strokeWidth={2.3}
                          style={{ marginRight: "5px" }}
                        />
                        {item.insight.job}
                      </span>
                      <span className="text-sm flex">
                        <Info
                          size={15}
                          strokeWidth={2.3}
                          style={{ marginRight: "5px" }}
                        />
                        {item.statusView}
                      </span>
                    </div>
                  </td>

                  <td className="mr-8" style={{ maxWidth: "450px" }}>
                    <div className="mb-3">
                      <b>Kinh nghiệm</b>
                      <p className="flex">
                        <BriefcaseBusiness
                          size={15}
                          strokeWidth={2.3}
                          style={{ marginRight: "5px" }}
                        />
                        {item.experience}
                      </p>
                    </div>
                    <div className="mb-3">
                      <b>Học vấn</b>
                      <p className="flex">
                        <GraduationCap
                          size={15}
                          strokeWidth={2.3}
                          style={{ marginRight: "5px" }}
                        />
                        {item.education}
                      </p>
                    </div>
                    <b>Mục tiêu sự nghiệp</b>
                    <p className=" bg-gray-100 p-3">{item.target} /</p>
                  </td>
                  <td>
                    <p className="flex">
                      <Clock
                        size={15}
                        strokeWidth={2.3}
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.time}
                    </p>
                    <p className="flex">
                      <Eye
                        size={15}
                        strokeWidth={2.3}
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.view} lượt xem
                    </p>
                    <p className="flex">
                      <Contact
                        size={15}
                        strokeWidth={2.3}
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.openTime} lượt mở liên hệ
                    </p>
                    <p className="flex">
                      <MapPin
                        size={15}
                        strokeWidth={2.3}
                        style={{ marginRight: "5px" }}
                      />
                      {item.insight.location}
                    </p>
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
