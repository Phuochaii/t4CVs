import { Link, useLocation } from "react-router-dom";
import { Briefcase, QuestionMarkIcon } from "./Icons";
import { FileText } from "lucide-react";

interface SidebarProp {
  className: string;
  openSidebar: boolean;
}

const sidebarLinks = [
  {
    icon: <Briefcase />,
    selectedIcon: <Briefcase fill="#22c55e" stroke="white" />,
    title: "Chiến dịch tuyển dụng",
    page: "/hr/compaign",
  },
  {
    icon: <FileText size={16} />,
    selectedIcon: (
      <FileText size={16} fill="#22c55e" stroke="white" />
    ),
    title: "Tin tuyển dụng",
    page: "/hr/recruitment",
  },
];

function Sidebar({ className, openSidebar }: SidebarProp) {
  const location = useLocation();
  return (
    <div
      className={[
        "sticky",
        className,
        openSidebar ? "flex flex-col item-start" : "hidden",
      ].join(" ")}
    >
      {/* User Info */}
      <div className="flex items-center gap-2 p-2 text-sm border-b-2">
        <img
          src="/temp-avatar.jpg"
          className="w-10 h-10 rounded-[50%]"
        />

        <div className="flex flex-col gap-1">
          <h3 className="font-bold">Nguyễn Admin</h3>
          <span className="text-xs">Diamond</span>
          <div className="flex items-center gap-2 text-xs">
            Tài khoản xác thực
            <span className="text-green-600">Cấp 3/5</span>
            <div className="bg-gray-500 rounded-[50%]">
              <QuestionMarkIcon stroke="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 p-2">
        {sidebarLinks.map((item, key) => {
          return (
            <Link
              key={key}
              to={item.page}
              className={`flex items-center justify-start gap-2 ${
                location.pathname == item.page ? "text-green-500" : ""
              }`}
            >
              <div
                className={`p-1 ${
                  location.pathname == item.page
                    ? "bg-slate-200 rounded-[50%]"
                    : ""
                }`}
              >
                {location.pathname == item.page
                  ? item.selectedIcon
                  : item.icon}
              </div>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
