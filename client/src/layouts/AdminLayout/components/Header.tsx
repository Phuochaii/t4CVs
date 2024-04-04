import { Bell, Bitcoin } from "lucide-react";
import GradientIcon from "./GradientIcon";

function Header() {
  return (
    <div className="flex justify-between items-center h-[6vh] gap-6">
      <div className="flex-1 h-full">
        <img
          src="/topcv-logo-6.webp"
          className="object-contain h-full"
        ></img>
      </div>
      <div className="bg-gradient-to-r flex-1 from-pink-500 to-purple-500 p-4 rounded-[1.5rem] px-[.1rem] py-[.1rem] flex items-center">
        <textarea
          rows={1}
          className="w-full h-full border-none resize-none active:border-none focus:border-none active:outline-none focus:outline-none rounded-[1.5rem] px-4 py-2"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <GradientIcon icon={Bitcoin} size={18} />
        <span className="text-slate-500">CoinBase</span>
      </div>
      <Bell className="mx-2 text-slate-500" />
    </div>
  );
}

export default Header;
