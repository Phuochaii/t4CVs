import { Link, useLocation } from "react-router-dom";
import { MapPin, Eye, CreditCard } from "lucide-react";
import GradientIcon from "./GradientIcon";

const links = [
  {
    name: "Overview",
    path: "",
    icon: Eye,
    iconComponent: <Eye className="text-white" />,
  },
  {
    name: "Compaign",
    path: "/admin/compaign",
    icon: CreditCard,
    iconComponent: <CreditCard className="text-white" />,
  },
  {
    name: "Agents",
    path: "/admin/agents",
    icon: MapPin,
    iconComponent: <MapPin className="text-white" />,
  },
];

function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="w-[10vw] sticky overflow-hidden min-h-[94vh] flex flex-col pt-4 gap-8 mr-4">
      {links.map((item, index) => {
        return (
          <Link
            to={item.path}
            key={index}
            className={`flex gap-2  px-2 py-3  ${
              pathname == item.path
                ? "bg-gradient-to-r from-green-500 to-blue-500 rounded-r-[4rem]"
                : ""
            }`}
          >
            {pathname == item.path ? (
              item.iconComponent
            ) : (
              <GradientIcon icon={item.icon} />
            )}{" "}
            <span
              className={
                pathname == item.path ? "text-white" : "text-slate-500"
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
