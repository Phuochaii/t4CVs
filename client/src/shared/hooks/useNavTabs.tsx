import ChangeLanguagePage from '../../pages/change-language-page';
import ChangeThemePage from '../../pages/change-theme-page';
import CvPage from '../../pages/cv-page';
import JobsPage from '../../pages/job-page';

function useNavTabs() {
  const tabs = [
    {
      label: 'Job Search',
      Component: JobsPage,
      path: '/',
    },
    {
      label: 'Profile & CV',
      Component: CvPage,
      path: '/about',
    },
    {
      label: 'Languages',
      Component: ChangeLanguagePage,
      path: '/about',
    },
    {
      label: 'Themes',
      Component: ChangeThemePage,
      path: '/about',
    },
  ];

  return { tabs };
}

export default useNavTabs;
