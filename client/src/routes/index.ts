import * as Authentication from "../pages/Authentication";
import * as User from "../pages/User";
import * as Admin from "../pages/Admin";
import * as HR from "../pages/HR";
import * as Error from "../pages/Error";

import {
  UserLayout,
  AdminLayout,
  HRLayout,
  EmptyLayout,
} from "../layouts";
import { ReactElement } from "react";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

interface RouteItem {
  path: string;
  component: () => ReactElement;
  layout: ({ }:LayoutProp) => ReactElement;
}

const routes: RouteItem[] = [
  // AUTHENTICATION PAGES - Tiến
  {path: 'admin-login', component:Authentication.AdminLogIn, layout: EmptyLayout},
  {path: 'hr-login', component:Authentication.HRLogIn, layout: EmptyLayout},
  {path: 'hr-signup', component:Authentication.HRSignUp, layout: EmptyLayout},
  {path: 'user-login', component:Authentication.UserLogIn, layout: EmptyLayout},
  {path: 'user-signup', component:Authentication.UserSignUp, layout: EmptyLayout},

  // USER PAGES - Nguyên , Khoa, Hùng
  { path: "/", component: User.Home, layout: UserLayout }, //khoa
  { path: "/results", component: User.SearchJob, layout: UserLayout }, // khoa
  {
    path: "/your-application",
    component: User.YourApplications,
    layout: UserLayout,
  },// hùng
  { path: "/apply", component: User.ApplyCV, layout: UserLayout },//khoa
  { path: "/create-cv", component: User.CreateCV, layout: UserLayout },//
  { path: "/edit-cv", component: User.EditCV, layout: UserLayout },//
  { path: "/template-cv", component: User.TemplateCV, layout: UserLayout }, //nguyên
  {path: "/list-cv", component: User.ListCV, layout: UserLayout}, // nguyên

  // ADMIN PAGES - Thức
  { path: "/admin", component: Admin.Overview, layout: AdminLayout },


  // HR PAGES - Yến, Thịnh, Thức
  { path: "/hr/approve", component: HR.ReceiveCV, layout: HRLayout }, // yến  { path:"/hr/compaign", component: HR.Compaign, layout: HRLayout},
  { path:"/hr/compaign-edit/:id", component: HR.CompaignEdit, layout: HRLayout},
  { path:"/hr/recruitment", component: HR.Recruitment, layout: HRLayout},

  // ERROR PAGES
  { path: "error-path", component: Error.ErrorPath, layout: EmptyLayout },

//-------------------------------------------------------------------------------------
// 2nd UI
  // USER
  { path: "/cv", component: User.CV, layout: UserLayout },
  { path: "/companies/:id", component: User.Company, layout: UserLayout },
  { path: "/companies/", component: User.Companies, layout: UserLayout },
  
  // ADMIN
  { path: "/admin/company", component: Admin.Company, layout: AdminLayout },
  {path: "/admin/compaign",component: Admin.Compaign,layout: AdminLayout,},


  // HR
  { path: "/hr/news", component: HR.News, layout: HRLayout },

  { path: "/hr/post-compaign", component: HR.PostJob, layout: HRLayout }, // thinh
  { path: "/hr/post-compaign/data", component: HR.PostCompaign, layout: HRLayout }, // khoa + hùng


  { path: "/hr/verify-account/1", component: HR.VerifyAccount.Page1, layout: HRLayout },
  { path: "/hr/verify-account/2", component: HR.VerifyAccount.Page2, layout: HRLayout },

  { path: "/hr/compaign", component: HR.Compaign, layout: HRLayout },

  { path: "/hr/compain-edit/:id", component: HR.CompaignEdit, layout: HRLayout },

  { path: "/hr/recruitment", component: HR.Recruitment, layout: HRLayout },

  { path: "/hr/manage-cv", component: HR.ManageCV, layout: HRLayout },


  { path: "/hr/help", component: HR.Support, layout: EmptyLayout },

];

export default routes;
