import RoundedButton from "./RoundedButton";
import {
  Bookmark,
  Pencil,
  MessageCircle,
  Bell,
  ShoppingCart,
  ChevronDown,
  Menu,
  LineChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function Header({
  collapedSidebar,
}: {
  collapedSidebar: () => void;
}) {
  const list_btn = [
    {
      name: "HR Insider",
      link: "",
      icon: Bookmark,
    },
    {
      name: "Đăng tin",
      link: "/hr/post-compaign",
      icon: Pencil,
    },
    {
      name: "Tìm CV",
      link: "",
      icon: Pencil,
    },
    {
      name: "Connect",
      link: "",
      icon: MessageCircle,
    },

    {
      name: "",
      link: "",
      icon: Bell,
      iconSize: 20,
    },
    {
      name: "Giỏ hàng",
      link: "",
      icon: ShoppingCart,
      iconSize: 20,
      numberNoti: 1,
    },
    {
      name: "",
      link: "",
      icon: ChevronDown,
      iconSize: 20,
      image:
        "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
    },
  ];
  const navigation = useNavigate();
  return (
    <div
      className="text-white "
      id="hr-header"
      style={{ padding: "16px 20px", backgroundColor: "#212F3F" }}
    >
      <div className="flex items-center">
        <div className="flex items-center flex-grow">
          <Menu
            size={18}
            className="ml-1"
            strokeWidth={1.65}
            onClick={collapedSidebar}
          />

          <div
            style={{
              marginLeft: "23px",
              marginRight: "20px",
              marginTop: "4px",
            }}
          >
            <img
              src="https://tuyendung.topcv.vn/app/_nuxt/img/logo_topcv_dark.ee0b56e.png"
              style={{ width: "56px" }}
              alt="logo"
            />
          </div>
        </div>
        <div className="flex items-center">
          <RoundedButton
            icon={LineChart}
            isFillIcon={false}
            iconColor="#00B14F"
            iconSize={20}
            iconStrokeWidth={2.2}
            border="2px solid green"
            text="Tải báo cáo thị trường 2023-2024"
            backgroundImage="linear-gradient(90deg, #213142 .62%, #0a9c4b 99.38%)"
          />
          {list_btn.map((btn, index) => (
            <RoundedButton
              key={index}
              text={btn.name}
              icon={btn.icon}
              image={btn.image}
              iconSize={btn.iconSize}
              numberNoti={btn.numberNoti}
              onClick={() => {
                navigation(btn.link);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
