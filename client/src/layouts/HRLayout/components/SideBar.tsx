import * as React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../shared/components/regular-icon";
import {
  CircleHelp,
  ShieldCheck,
  ChevronsRight,
  LucideProps,
  LayoutGrid,
  Gem,
  Gift,
  Bot,
  BriefcaseBusiness,
  File,
  User,
  LineChart,
  ShoppingCart,
  WandSparkles,
  BadgePercent,
  History,
  Settings,
  Bell,
  Mail,
} from "lucide-react";
const Item = ({
  _icon,
  iconSize = 16,
  title,
  onClick = () => {},
  // subItems = [],
}: {
  _icon?: React.FC<LucideProps>;
  iconSize?: number;
  title: string;
  onClick?: () => void;

  // subItems?: { icon?: string; title: string }[];
}) => {
  return (
    <li
      onClick={onClick}
      className="hover:text-green-500 active:text-green-500 cursor-pointer flex items-center space-x-2"
      style={{
        padding: " 12px 14px",
        // color: "black",
        margin: 0,
      }}
    >
      {_icon && (
        <div
          style={{
            // width: "32px",
            textAlign: "center",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          <Icon icon={_icon} size={iconSize} />
          {/* <i
              className={icon}
              style={{
                fontSize: "16px",
              }}
            ></i> */}
        </div>
      )}

      <span>{title}</span>
      {/* {subItems.length > 0 && (
          <div className="flex-grow flex justify-end">
            <i className="fa-solid fa-angle-right"></i>
          </div>
        )} */}
    </li>
  );
};

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const navigation = useNavigate();

  React.useEffect(() => {}, [isCollapsed]);
  //
  const sidebar_items = [
    [
      { _icon: LayoutGrid, title: "Bảng tin", to: "/hr/news" },
      {
        _icon: Gem,
        to: "",
        title: "TopCV Rewards",
      },
      { _icon: Gift, to: "", title: "Đổi quà" },
      {
        _icon: Bot,
        icon: "fa-solid fa-robot",
        to: "",
        title: "Toppy AI - Đề xuất",
      },
    ],

    [
      {
        _icon: BriefcaseBusiness,
        to: "/hr/compaign",
        title: "Chiến dịch tuyển dụng",
      },
      { _icon: File, to: "", title: "Tin tuyển dụng" },
      {
        _icon: User,
        to: "/hr/approve",
        title: "Quản lí CV",
        sub_items: [{ icon: "", to: "", title: "Quản lí nhãn CV" }],
      },
      {
        _icon: LineChart,
        to: "",
        title: "Báo cáo tuyển dụng",
      },
    ],

    [
      {
        _icon: ShoppingCart,
        to: "",
        title: "Mua dịch vụ",
      },
      {
        _icon: WandSparkles,
        to: "",
        title: "Dịch vụ của tôi",
      },
      {
        _icon: BadgePercent,
        to: "",
        title: "Mã ưu đãi",
      },
      {
        _icon: File,
        icon: "fa-solid fa-file",
        to: "",
        title: "Theo dõi đơn hàng",
      },
    ],
    [
      {
        _icon: History,
        icon: "fa-solid fa-clock-rotate-left",
        to: "",
        title: "Lịch sử hoạt động",
      },
      {
        _icon: Settings,
        icon: "fa-solid fa-gear",
        to: "",
        title: "Cài đặt tài khoản",
      },
    ],
    [
      {
        _icon: Bell,
        icon: "fa-regular fa-bell",
        to: "",
        title: "Thông báo hệ thống",
      },
      {
        _icon: Mail,
        icon: "fa-regular fa-envelope",
        to: "",
        title: "Nộp thư hỗ trợ",
      },
    ],
  ];

  return (
    <div
      className="bg-white flex-shrink-0 overflow-y-scroll overflow-x-hidden"
      style={{
        fontWeight: "500",
        color: "#212F3FE4",
        // height: "100vh",
        width: isCollapsed ? "88px" : "300px ",
        transition: "width .2s ease",
      }}
    >
      <div className="flex" style={{ padding: " 10px 14px", margin: 0 }}>
        <div className="flex items-center space-x-2">
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            className="rounded-full"
            style={{ width: "32px", marginRight: "10px" }}
            alt="Avatar"
          />
          {!isCollapsed && (
            <div>
              <p>Moira Vien</p>
              <p style={{ fontSize: "12px" }}>Employer</p>
              <p style={{ fontSize: "12px" }} className="flex">
                Tài khoản xác thực:{" "}
                <span className="text-green-600 mr-2">Cấp 1/5</span>
                <CircleHelp color="#757575B9" size={14} />
              </p>
            </div>
          )}
        </div>
      </div>
      <button
        className={`btn ${!isCollapsed && "mx-4"} text-sm py-1 flex items-center justify-center rounded-full w-11/12`}
        style={{
          backgroundColor: "#EBF3FF",
          color: "#2D7CF1",
          marginBottom: "15.96px",
        }}
      >
        <ShieldCheck size={15} />
        {!isCollapsed && (
          <>
            <button
              onClick={() => {
                navigation("/hr/verify-account/1");
              }}
            >
              <span className="ml-1 mr-1">Xác nhận tài khoản điện tử</span>
            </button>
            <ChevronsRight className="slide-animation" />
          </>
        )}
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
                  _icon={item._icon}
                  title={isCollapsed ? "" : item.title}
                  key={index_1}
                  onClick={() => {
                    navigation(item.to);
                  }}

                  // subItems={item.sub_items}
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
