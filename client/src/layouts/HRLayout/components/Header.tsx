import RoundedButton from "./RoundedButton";
import {
  Bookmark,
  Pencil,
  MessageCircle,
  Bell,
  ShoppingCart,
  ChevronDown,
  Menu,
} from "lucide-react";
function Header({ collapedSidebar }: { collapedSidebar: () => void }) {
  const list_btn = [
    {
      name: "HR Insider",
      link: "",
      icon: Bookmark,
    },
    {
      name: "Đăng tin",
      link: "",
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
  return (
    <div
      className=" text-white"
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
          {list_btn.map((btn, index) => (
            <RoundedButton
              key={index}
              text={btn.name}
              icon={btn.icon}
              image={btn.image}
              iconSize={btn.iconSize}
              numberNoti={btn.numberNoti}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
