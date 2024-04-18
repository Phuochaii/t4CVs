import {
  Menu,
  WandSparkles,
  Bookmark,
  Pencil,
  MessageCircle,
  Bell,
  ChevronDown,
} from "lucide-react";

const QuestionMarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="white"
      stroke="#1e293b"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {/* <circle cx="12" cy="12" r="10" /> */}
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
};

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
        <QuestionMarkIcon />
      </div>
    ),
    title: "Trợ giúp",
  },
];

function Header() {
  return (
    <nav className="flex items-center gap-2 p-4 text-sm text-white bg-slate-800">
      <Menu
        className="p-[2px] rounded-sm text-slate-400 bg-slate-600"
        size={24}
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
