import {
  Menu,
  WandSparkles,
  Bookmark,
  Pencil,
  MessageCircle,
  Bell,
  ChevronDown,
} from "lucide-react";

import { QuestionMarkIcon } from "./Icons";
import { SetStateAction } from "react";

interface HeaderProp {
  className: string;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
}

const headerButtons = [
  {
    icon: (
      <div className="flex items-center bg-white">
        <Bookmark fill="#1e293b" size={12} />
      </div>
    ),
    title: "HR Insider",
  },
  {
    icon: (
      <div className="bg-white rounded-2xl">
        <Pencil fill="#1e293b" size={16} className="p-[2px]" />
      </div>
    ),
    title: "Đăng tin",
  },
  {
    icon: (
      <div className="bg-white rounded-2xl">
        <Pencil fill="#1e293b" size={16} className="p-[2px]" />
      </div>
    ),
    title: "Tìm CV",
  },
  {
    icon: <MessageCircle size={16} fill="white" />,
    title: "Connect",
  },
  {
    icon: (
      <div className="bg-white rounded-2xl">
        <QuestionMarkIcon stroke="#1e293b" />
      </div>
    ),
    title: "Trợ giúp",
  },
];

function Header({
  className,
  openSidebar,
  setOpenSidebar,
}: HeaderProp) {
  return (
    <nav
      className={[
        "flex items-center gap-2 p-4 text-sm text-white bg-slate-800",
        className,
      ].join(" ")}
    >
      <Menu
        className="p-[2px] rounded-sm text-slate-400 bg-slate-600 cursor-pointer"
        size={24}
        onClick={() => {
          console.log("Clicked");
          setOpenSidebar(!openSidebar);
        }}
      />
      <div className="flex items-start flex-grow gap-2">
        <img src="/logo_topcv_dark.webp" className="w-16" />
        <span>for Business</span>
      </div>

      <div className="flex items-center gap-2">
        {headerButtons.map((item, key) => {
          return (
            <button
              key={key}
              className="flex items-center gap-2 px-3 py-1 rounded-2xl bg-slate-600"
            >
              {item.icon}
              {item.title}
            </button>
          );
        })}
      </div>

      <button className="gap-2 p-1 rounded-2xl bg-slate-600">
        <Bell size={16} fill="white" />
      </button>

      <button className="flex items-center gap-2 p-1 px-2 rounded-2xl bg-slate-600">
        <img src="/temp-avatar.jpg" className="w-6 h-6 rounded-2xl" />

        <ChevronDown size={16} />
      </button>

      <button className="flex items-center gap-2 px-4 py-1 bg-green-600 rounded-2xl">
        <WandSparkles size={16} />
        Báo giá dịch vụ
      </button>
    </nav>
  );
}

export default Header;
