import * as Authentication from "../pages/Authentication";
import * as User from "../pages/User";
import * as Admin from "../pages/Admin";
import * as HR from "../pages/HR";
import * as Error from "../pages/Error";

import { UserLayout, AdminLayout, HRLayout, EmptyLayout } from "../layouts";


const routes = [
  // 1st UI 
  // AUTHENTICATION PAGES - Tiến
  {path: 'admin-login', component:Authentication.AdminLogIn, layout: EmptyLayout},
  {path: 'hr-login', component:Authentication.HRLogIn, layout: EmptyLayout},
  {path: 'hr-signup', component:Authentication.HRSignUp, layout: EmptyLayout},
  {path: 'user-login', component:Authentication.UserLogIn, layout: EmptyLayout},
  {path: 'user-signup', component:Authentication.UserSignUp, layout: EmptyLayout},

  // USER PAGES - Nguyên , Khoa, Hùng
  { path: "/", component: User.Home, layout: UserLayout }, //khoa - > tiến
  { path: "/results", component: User.SearchJob, layout: UserLayout }, // khoa -> tiến
  {
    path: "/your-application",
    component: User.YourApplications,
    layout: UserLayout,
  },// hùng
  { path: "/detail-job", component: User.ApplyCV, layout: UserLayout },//khoa -> tiến
  { path: "/create-cv", component: User.CreateCV, layout: UserLayout },//
  { path: "/edit-cv", component: User.EditCV, layout: UserLayout },//
  { path: "/template-cv", component: User.TemplateCV, layout: UserLayout }, //nguyên
  {path: "/list-cv", component: User.ListCV, layout: UserLayout}, // nguyên

  // ADMIN PAGES - Thức
  { path: "/admin", component: Admin.Overview, layout: AdminLayout },


  // HR PAGES - Yến , Thịnh
  { path: "/hr/approve", component: HR.ReceiveCV, layout: HRLayout }, // yến
  // ERROR PAGES
  { path: "error-path", component: Error.ErrorPath, layout: EmptyLayout },

//-------------------------------------------------------------------------------------
// 2nd UI
  // USER
  { path: "/cv", component: User.CV, layout: UserLayout },//hung
  { path: "/companies/:id", component: User.Company, layout: UserLayout },//thinh
  { path: "/companies/", component: User.Companies, layout: UserLayout },// thinh
  
  // ADMIN
  { path: "/admin/company", component: Admin.Company, layout: AdminLayout }, // thuc
  {path: "/admin/compaign",component: Admin.Compaign,layout: AdminLayout,}, // thuc


  // HR
  { path: "/hr/news", component: HR.News, layout: HRLayout }, //khoa

  { path: "/hr/post-compaign", component: HR.PostJob, layout: HRLayout }, // thinh
  { path: "/hr/post-compaign/data", component: HR.PostCompaign, layout: HRLayout }, // khoa + hùng


  { path: "/hr/verify-account/1", component: HR.VerifyAccount.Page1, layout: HRLayout }, // thinh
  { path: "/hr/verify-account/2", component: HR.VerifyAccount.Page2, layout: HRLayout }, // thinh

  { path: "/hr/compaign", component: HR.Compaign, layout: HRLayout }, // thuc

  { path: "/hr/compain-edit/:id", component: HR.CompaignEdit, layout: HRLayout }, // thuc

  { path: "/hr/recruitment", component: HR.Recuitment, layout: HRLayout }, // thuc

  { path: "/hr/manage-cv", component: HR.ManageCV, layout: HRLayout }, // yen


  { path: "/hr/help", component: HR.Support, layout: EmptyLayout }, // thinh

];

export default routes;
