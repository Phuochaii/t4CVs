import * as Authentication from '../pages/Authentication';
import * as User from '../pages/User';
import * as Admin from '../pages/Admin';
import * as HR from '../pages/HR';
import * as Error from '../pages/Error';

import { UserLayout, AdminLayout, HRLayout, EmptyLayout } from '../layouts';
import { ReactElement } from 'react';
import { Role, Roles } from '../shared/services/authen/domain/context';

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

interface RouteItem {
  path: string;
  component: () => ReactElement;
  layout: ({ }:LayoutProp) => ReactElement;
  role?: Role;
}

const routes: RouteItem[] = [
  // HR INIT PAGES
  { path: 'hr', component: Authentication.HRInit, layout: EmptyLayout },

  // HR INIT PAGES
  { path: 'admin', component: Authentication.AdminInit, layout: EmptyLayout },

  // AUTHENTICATION PAGES - Tiến
  {
    path: 'admin-login',
    component: Authentication.AdminLogIn,
    layout: EmptyLayout,
  },
  { path: 'hr-login', component: Authentication.HRLogIn, layout: EmptyLayout },
  {
    path: 'hr-signup',
    component: Authentication.HRSignUp,
    layout: EmptyLayout,
  },
  {
    path: 'hr-profile-register',
    component: Authentication.HRProfileRegister,
    layout: EmptyLayout,
  },
  {
    path: 'user-login',
    component: Authentication.UserLogIn,
    layout: EmptyLayout,
  },
  {
    path: 'user-signup',
    component: Authentication.UserSignUp,
    layout: EmptyLayout,
  },

  // USER PAGES - Nguyên , Khoa, Hùng
  { path: '/', component: User.Home, layout: UserLayout }, //khoa - > tiến
  { path: '/results', component: User.SearchJob, layout: UserLayout }, // khoa -> tiến
  {
    path: '/your-application',
    component: User.YourApplications,
    layout: UserLayout,
  }, // hùng
  { path: '/detail-job/:id', component: User.ApplyCV, layout: UserLayout }, //khoa
  { path: '/create-cv', component: User.CreateCV, layout: UserLayout }, //
  { path: '/edit-cv', component: User.EditCV, layout: UserLayout }, //
  { path: '/template-cv', component: User.TemplateCV, layout: UserLayout }, //nguyên
  { path: '/list-cv', component: User.ListCV, layout: UserLayout }, // nguyên

  // ADMIN PAGES - Thức
  {
    path: '/admin/overview',
    component: Admin.Overview,
    layout: AdminLayout,
    role: Roles.ADMIN,
  },

  // HR PAGES - Yến, Thịnh, Thức
  { path: '/hr/approve', component: HR.ReceiveCV, layout: HRLayout }, // yến
  {
    path: '/hr/compaign-edit/:id',
    component: HR.CompaignEdit,
    layout: HRLayout,
  },
  { path: '/hr/recruitment', component: HR.Recruitment, layout: HRLayout },

  // ERROR PAGES
  { path: 'error-path', component: Error.ErrorPath, layout: EmptyLayout },

  //-------------------------------------------------------------------------------------
  // 2nd UI
  // USER
  { path: '/cv', component: User.CV, layout: UserLayout }, //hung
  { path: '/companies/:id', component: User.Company, layout: UserLayout }, //thinh
  { path: '/companies/', component: User.Companies, layout: UserLayout }, // thinh

  // ADMIN
  {
    path: '/admin/company',
    component: Admin.Company,
    layout: AdminLayout,
    role: Roles.ADMIN,
  }, // thuc
  {
    path: '/admin/campaign',
    component: Admin.Campaign,
    layout: AdminLayout,
    role: Roles.ADMIN,
  }, // thuc
  {
    path: '/admin/recruitment',
    component: Admin.Recruitment,
    layout: AdminLayout,
    role: Roles.ADMIN,
  }, // thuc
  {
    path: '/admin/employer',
    component: Admin.Employer,
    layout: AdminLayout,
    role: Roles.ADMIN,
  }, // thuc

  // HR
  { path: '/hr/news', component: HR.News, layout: HRLayout, role: Roles.HR }, //khoa

  { path: '/hr/post-compaign', component: HR.PostJob, layout: HRLayout }, // thinh
  {
    path: '/hr/post-compaign/data/:id',
    component: HR.PostCompaign,
    layout: HRLayout,
  }, // khoa + hùng
  {
    path: '/hr/verify-account/1',
    component: HR.VerifyAccount.Page1,
    layout: HRLayout,
  }, // thinh
  {
    path: '/hr/verify-account/2',
    component: HR.VerifyAccount.Page2,
    layout: HRLayout,
  }, // thinh
  {
    path: '/hr/campaign',
    component: HR.Campaign,
    layout: HRLayout,
  }, // thuc
  {
    path: '/hr/campain-edit/:id',
    component: HR.CompaignEdit,
    layout: HRLayout,
  }, // thuc

  { path: '/hr/recruitment', component: HR.Recruitment, layout: HRLayout },

  { path: '/hr/manage-cv/:id', component: HR.ManageCV, layout: HRLayout }, // yen

  { path: '/hr/help', component: HR.Support, layout: EmptyLayout }, // thinh

  { path: '/saved-jobs', component: User.SavedJobs, layout: UserLayout }, //khoa
  {
    path: '/hr/recruitment-reports',
    component: HR.RecruitmentReports,
    layout: HRLayout,
  }, //khoa
  {
    path: '/user-information',
    component: User.UserInformation,
    layout: UserLayout,
  }, //thuc

  { path: '/hr/settings', component: HR.Settings, layout: HRLayout }, //tien + hung

  {
    path: '/hr/account/activities',
    component: HR.Activities,
    layout: HRLayout,
  },
  // ------------------------------------
  {
    path: '/admin/company/:id',
    component: Admin.CompanyDetail,
    layout: AdminLayout,
    role: Roles.ADMIN,
  },
  {
    path: '/admin/employer/:id',
    component: Admin.EmployerDetail,
    layout: AdminLayout,
    role: Roles.ADMIN,
  },
];

export default routes;
