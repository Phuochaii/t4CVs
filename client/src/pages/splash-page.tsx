import { useTranslation } from "react-i18next";
import NavBar from "../components/nav-bar";
import useIndex from "../hooks/useIndex";
import useLazyNavTabs from "../hooks/useLazyNavTabs";

function SplashPage() {
  const { tabs } = useLazyNavTabs();
  const { index, setIndex } = useIndex();
  const { t } = useTranslation();
  const selectedTab = tabs[index];

  return (
    <>
      <NavBar
        tabs={tabs}
        getTabLabel={(tab) => t(tab.label)}
        selectedTab={selectedTab}
        onSelectTab={(tab) => {
          const tabIndex = tabs.findIndex((t) => t === tab);
          setIndex(tabIndex);
        }}
      />
      {selectedTab.Component}
    </>
  );
}

export default SplashPage;
