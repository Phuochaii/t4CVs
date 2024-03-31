import ChangeLanguagePage from "../demo_w1/pages/change-language-page";
import ChangeThemePage from "../demo_w1/pages/change-theme-page";
import CvPage from "../demo_w1/pages/cv-page";
import JobsPage from "../demo_w1/pages/job-page";

function useNavTabs() {
  const tabs = [
    {
      label: "Job Search",
      Component: JobsPage,
      path: "/",
    },
    {
      label: "Profile & CV",
      Component: CvPage,
      path: "/about",
    },
    {
      label: "Languages",
      Component: ChangeLanguagePage,
      path: "/about",
    },
    {
      label: "Themes",
      Component: ChangeThemePage,
      path: "/about",
    },
  ];

  return { tabs };
}

export default useNavTabs;
