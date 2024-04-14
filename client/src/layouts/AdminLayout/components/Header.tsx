import { Bell } from "lucide-react";

import SearchBar from "./SearchBar";

function Header() {
  return (
    <div className="flex justify-between items-center h-[10vh] gap-6">
      <div className="flex-1 h-full">
        <img
          src="/topcv-logo-6.webp"
          className="object-contain h-full"
        ></img>
      </div>
      <SearchBar placeholder="Search e.g card" />

      <Bell className="mx-2 text-slate-500" />
    </div>
  );
}

export default Header;
