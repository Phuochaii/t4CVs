const Item = ({
  icon,
  title,
  subItems = [],
}: {
  icon?: string;
  title: string;
  subItems?: { icon?: string; title: string }[];
}) => {
  return (
    <li style={{ padding: " 12px 14px", margin: 0 }}>
      <a href="#" className="flex items-center space-x-2">
        {icon && (
          <div
            style={{
              width: "32px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            <i
              className={icon}
              style={{
                fontSize: "16px",
              }}
            ></i>
          </div>
        )}

        <span>{title}</span>
        {subItems.length > 0 && (
          <div className="flex-grow flex justify-end">
            <i className="fa-solid fa-angle-right"></i>
          </div>
        )}
      </a>
    </li>
  );
};

const Sidebar: React.FC = () => {
  //
  const sidebar_items = [
    [
      { icon: "fa-solid fa-border-none", title: "Bảng tin" },
      { icon: "fa-regular fa-sharp fa-regular fa-gem", title: "TopCV Rewards" },
      { icon: "fa-solid fa-gift", title: "Đổi quà" },
      { icon: "fa-solid fa-robot", title: "Toppy AI - Đề xuất" },
    ],

    [
      { icon: "fa-solid fa-briefcase", title: "Chiến dịch tuyển dụng" },
      { icon: "fa-solid fa-file", title: "Tin tuyển dụng" },
      {
        icon: "fa-solid fa-user",
        title: "Quản lí CV",
        sub_items: [{ icon: "", title: "Quản lí nhãn CV" }],
      },
      { icon: "fa-solid fa-chart-line", title: "Báo cáo tuyển dụng" },
    ],

    [
      { icon: "fa-solid fa-cart-shopping", title: "Mua dịch vụ" },
      { icon: "fa-solid fa-wand-magic-sparkles", title: "Dịch vụ của tôi" },
      { icon: "fa-solid fa-percent", title: "Mã ưu đãi" },
      { icon: "fa-solid fa-file", title: "Theo dõi đơn hàng" },
    ],
    [
      { icon: "fa-solid fa-clock-rotate-left", title: "Lịch sử hoạt động" },
      { icon: "fa-solid fa-gear", title: "Cài đặt tài khoản" },
    ],
    [
      { icon: "fa-regular fa-bell", title: "Thông báo hệ thống" },
      { icon: "fa-regular fa-envelope", title: "Nộp thư hỗ trợ" },
    ],
  ];

  return (
    <div
      className="bg-white w-64 flex flex-col"
      style={{ fontWeight: "500", width: "260px", color: "#212F3FE4" }}
    >
      <div className="flex" style={{ padding: " 10px 14px", margin: 0 }}>
        <a href="#" className="flex items-center space-x-2">
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            className="rounded-full"
            style={{ width: "32px", marginRight: "10px" }}
            alt="Avatar"
          />

          <div>
            <p>Moira Vien</p>
            <p style={{ fontSize: "12px" }}>Employer</p>
            <p style={{ fontSize: "12px" }}>
              Tài khoản xác thực:{" "}
              <span className="text-green-600 mr-2">Cấp 1/5</span>
              <i
                className="fa-solid fa-circle-question"
                style={{ color: "#757575B9", fontSize: "16px" }}
              ></i>
            </p>
          </div>
        </a>
      </div>
      <button
        className="btn mx-4 text-sm py-1 rounded-full w-11/12"
        style={{
          backgroundColor: "#EBF3FF",
          color: "#2D7CF1",
          marginBottom: "15.96px",
        }}
      >
        <i
          className="fa-solid fa-shield-halved"
          style={{ fontSize: "14px" }}
        ></i>
        <span className="ml-2 mr-3">Xác nhận tài khoản điện tử</span>
        <i
          className="fa-solid fa-angles-right slide-animation"
          style={{ fontSize: "14px" }}
        ></i>
      </button>
      {sidebar_items.map((items, index) => {
        return (
          <ul
            className="space-y-2"
            key={index}
            style={{ borderBottom: "1px solid #75757556" }}
          >
            {items.map((item, index_1) => {
              return (
                <Item
                  icon={item.icon}
                  title={item.title}
                  key={index_1}
                  subItems={item.sub_items}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
export default Sidebar;
