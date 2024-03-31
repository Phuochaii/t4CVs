import { LazyExoticComponent, Suspense, lazy } from 'react';

const CvPage = lazy(() => import('../../demo_w1/pages/cv-page'));
const JobsPage = lazy(() => import('../../demo_w1/pages/job-page'));
const ChangeLanguagePage = lazy(
  () => import('../../demo_w1/pages/change-language-page')
);
const ChangeThemePage = lazy(
  () => import('../../demo_w1/pages/change-theme-page')
);

function suspensePage(Page: LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

function useLazyNavTabs() {
  const tabs = [
    {
      label: 'Job Search',
      Component: suspensePage(JobsPage),
      path: '/',
    },
    {
      label: 'Profile & CV',
      Component: suspensePage(CvPage),
      path: '/about',
    },
    {
      label: 'Languages',
      Component: suspensePage(ChangeLanguagePage),
      path: '/about',
    },
    {
      label: 'Themes',
      Component: suspensePage(ChangeThemePage),
      path: '/about',
    },
  ];

  return { tabs };
}

export default useLazyNavTabs;
