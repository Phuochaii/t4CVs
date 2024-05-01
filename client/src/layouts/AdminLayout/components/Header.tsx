import { Bell, ChevronDown } from "lucide-react";
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../HRLayout/components/RoundedButton";
const accountButton = {
  name: "",
  link: "",
  icon: ChevronDown,
  iconSize: 20,
  image:
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
};

function Header() {
  const navigation = useNavigate();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("admin") as string).role);
    if (localStorage.getItem("admin") === null) {
      navigation("/admin-login");
    }
  }, []);
  const [displayAccountTab, setDisplayAccountTab] = React.useState(false);

  return (
    <div className="px-4 flex justify-between items-center h-[10vh] gap-6">
      <div className="flex-1 h-full">
        <img src="/topcv-logo-6.webp" className="object-contain h-full"></img>
      </div>
      <SearchBar placeholder="Search e.g card" />

      <Bell className="mx-2 text-slate-500" />
      <li className="relative list-none">
        <a
          className="text-center inline-flex items-center bg-transparent"
          onClick={() => setDisplayAccountTab(!displayAccountTab)}
        >
          <RoundedButton
            text={accountButton.name}
            icon={accountButton.icon}
            image={accountButton.image}
            iconSize={accountButton.iconSize}
            onClick={() => {
              navigation(accountButton.link);
            }}
          />
        </a>
        {/* <!-- Dropdown menu --> */}
        {displayAccountTab ? (
          <div className="pt-3 absolute top-8 right-0 z-50">
            <ul
              className="max-h-[320px] overflow-y-scroll dropdown  hover:text-green-500 w-56 z-50font-semibold text-base bg-white border border-slate-100 rounded-lg py-2 flex flex-col gap-3 shadow-lg"
              aria-labelledby="dropdownDividerButton"
            >
              <li
                className={`px-4 py-2 m-0 border-b-gray-200 border`}
                onClick={() => {
                  navigation("/admin");
                  localStorage.removeItem("admin");
                }}
              >
                <span className="cursor-pointer text-black hover:text-green-500">
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </li>
    </div>
  );
}

export default Header;
