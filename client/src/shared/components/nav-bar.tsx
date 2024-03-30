import { useTranslation } from "react-i18next";
import NavTab from "./nav-tab";

function NavBar<T>({
  tabs,
  selectedTab,
  getTabLabel,
  onSelectTab,
}: {
  tabs: T[];
  getTabLabel: (tab: T) => string;
  selectedTab: T;
  onSelectTab: (tab: T) => void;
}) {
  const { t } = useTranslation();

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-black text-black p-4">
      <div className="flex items-center">
        <img
          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
          alt="Company Logo"
          className="h-20 mr-2"
        />
        <div className="flex">
          {tabs.map((tab) => {
            const tabLabel = getTabLabel(tab);
            return (
              <NavTab
                key={tabLabel}
                label={tabLabel}
                isSelected={selectedTab === tab}
                onSelect={() => onSelectTab(tab)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center">
        <button className="text-green-600 border hover:bg-green-50 border-green-600 hover:bg-light-green font-bold py-2 px-4 rounded mr-2 dark:hover:bg-green-600 dark:hover:text-gray-800">
          {t("Login")}
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
          {t("Register")}
        </button>
        <button className="bg-gray-800 text-white py-2 px-4 rounded">
          {t("Recruitment & Find Profiles")}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
