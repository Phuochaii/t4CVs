import { Link, useLocation } from "react-router-dom";
import { Eye, CreditCard, File } from "lucide-react";
import GradientIcon from "./GradientIcon";
import clsx from "clsx";

interface SidebarProps {
  className: string;
}

const links = [
  {
    name: "Overview",
    path: "/admin/overview",
    icon: Eye,
    iconComponent: <Eye className="text-white" />,
  },
  {
    name: "Campaign",
    path: "/admin/campaign",
    icon: CreditCard,
    iconComponent: <CreditCard className="text-white" />,
  },
  {
    name: "Recruitment",
    path: "/admin/recruitment",
    icon: File,
    iconComponent: <File className="text-white" />,
  },
];

function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div
      className={clsx(
        className,
        "sticky overflow-hidden min-h-[90vh] w-[12vw] flex flex-col pt-4 gap-8 mr-4"
      )}
    >
      {links.map((item, index) => {
        return (
          <Link
            to={item.path}
            key={index}
            className={clsx(
              `flex w-full gap-2 px-2 py-3`,
              pathname == item.path
                ? "bg-gradient-to-b from-green-500 to-blue-500 rounded-r-[4rem]"
                : ""
            )}
          >
            {pathname == item.path ? (
              item.iconComponent
            ) : (
              <GradientIcon icon={item.icon} />
            )}{" "}
            <span
              className={
                pathname == item.path
                  ? "text-white"
                  : "text-slate-500"
              }
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
