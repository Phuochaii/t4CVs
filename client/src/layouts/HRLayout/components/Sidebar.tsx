import { Link, useLocation } from "react-router-dom";
import { Briefcase, QuestionMarkIcon } from "./Icons";
import { BriefcaseBusiness, FileText } from "lucide-react";

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

function Sidebar() {
  const location = useLocation();
  return (
    <div className="flex flex-col p-2 w-1/10 item-start">
      {/* User Info */}
      <div className="flex items-center gap-2 py-2 text-sm border-b-2">
        <img
          src="/temp-avatar.jpg"
          className="w-10 h-10 rounded-[50%]"
        />

        <div className="flex flex-col">
          <h3 className="font-bold">Nguyễn Admin</h3>
          <span>Diamond</span>
          <div className="flex items-center gap-2">
            Tài khoản xác thực
            <span className="text-green-600">Cấp 3/5</span>
            <div className="bg-gray-500 rounded-[50%]">
              <QuestionMarkIcon stroke="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 py-2">
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
