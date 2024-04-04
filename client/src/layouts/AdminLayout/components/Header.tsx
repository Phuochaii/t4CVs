import { Bell, Bitcoin } from "lucide-react";
import GradientIcon from "./GradientIcon";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <div className="flex justify-between items-center h-[6vh] gap-6">
      <div className="flex-1 h-full">
        <img
          src="/topcv-logo-6.webp"
          className="object-contain h-full"
        ></img>
      </div>
      <SearchBar placeholder="Search e.g card" />
      <div className="flex items-center gap-2">
        <GradientIcon icon={Bitcoin} size={18} />
        <span className="text-slate-500">CoinBase</span>
      </div>
      <Bell className="mx-2 text-slate-500" />
    </div>
  );
}

export default Header;
