import * as React from "react";
import Icon from "../../../shared/components/regular-icon";
import {
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
    // subItems = [],
}: {
    _icon?: React.FC<LucideProps>;
    iconSize?: number;
    title: string;
    // subItems?: { icon?: string; title: string }[];
}) => {
    return (
        <li style={{ padding: " 12px 14px", margin: 0 }}>
            <a href="#" className="flex items-center space-x-2">
                {_icon && (
                    <div
                        style={{
                            // width: "32px",
                            textAlign: "center",
                            marginRight: "10px",
                            marginLeft: "10px",
                        }}
                    >
                        <Icon icon={_icon} size={iconSize} color="black" />
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
            </a>
        </li>
    );
};

const Sidebar: React.FC = () => {
    //
    const sidebar_items = [
        [
            { _icon: LayoutGrid, title: "Bảng tin" },
            {
                _icon: Gem,
                title: "TopCV Rewards",
            },
            { _icon: Gift, title: "Đổi quà" },
            {
                _icon: Bot,
                icon: "fa-solid fa-robot",
                title: "Toppy AI - Đề xuất",
            },
        ],

        [
            {
                _icon: BriefcaseBusiness,
                title: "Chiến dịch tuyển dụng",
            },
            { _icon: File, title: "Tin tuyển dụng" },
            {
                _icon: User,
                title: "Quản lí CV",
                sub_items: [{ icon: "", title: "Quản lí nhãn CV" }],
            },
            {
                _icon: LineChart,
                title: "Báo cáo tuyển dụng",
            },
        ],

        [
            {
                _icon: ShoppingCart,
                title: "Mua dịch vụ",
            },
            {
                _icon: WandSparkles,
                title: "Dịch vụ của tôi",
            },
            {
                _icon: BadgePercent,
                title: "Mã ưu đãi",
            },
            {
                _icon: File,
                icon: "fa-solid fa-file",
                title: "Theo dõi đơn hàng",
            },
        ],
        [
            {
                _icon: History,
                icon: "fa-solid fa-clock-rotate-left",
                title: "Lịch sử hoạt động",
            },
            {
                _icon: Settings,
                icon: "fa-solid fa-gear",
                title: "Cài đặt tài khoản",
            },
        ],
        [
            {
                _icon: Bell,
                icon: "fa-regular fa-bell",
                title: "Thông báo hệ thống",
            },
            {
                _icon: Mail,
                icon: "fa-regular fa-envelope",
                title: "Nộp thư hỗ trợ",
            },
        ],
    ];

    return (
        <div
            className="bg-white w-64 flex flex-col"
            style={{
                fontWeight: "500",
                minWidth: "260px",
                color: "#212F3FE4",
                height: "100vh",
                overflowY: "scroll",
            }}
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
                                    _icon={item._icon}
                                    title={item.title}
                                    key={index_1}

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
