import * as Authentication from "../pages/Authentication";
import * as User from "../pages/User";
import * as Admin from "../pages/Admin";
import * as HR from "../pages/HR";
import * as Error from "../pages/Error";

import { UserLayout, AdminLayout, HRLayout, EmptyLayout } from "../layouts";

const routes = [
  // AUTHENTICATION PAGES - Tiến
  {path: 'admin-login', component:Authentication.AdminLogIn, layout: EmptyLayout},
  {path: 'hr-login', component:Authentication.HRLogIn, layout: EmptyLayout},
  {path: 'hr-signup', component:Authentication.HRSignUp, layout: EmptyLayout},
  {path: 'user-login', component:Authentication.UserLogIn, layout: EmptyLayout},
  {path: 'user-signup', component:Authentication.UserSignUp, layout: EmptyLayout},
  // khuc nay tien them vo nha

  // USER PAGES - Nguyên , Khoa, Hùng
  { path: "/", component: User.Home, layout: UserLayout },
  { path: "/results", component: User.SearchJob, layout: UserLayout },
  {
    path: "/your-application",
    component: User.YourApplications,
    layout: UserLayout,
  },
  { path: "/apply", component: User.ApplyCV, layout: UserLayout },
  { path: "/create-cv", component: User.CreateCV, layout: UserLayout },
  { path: "/edit-cv", component: User.EditCV, layout: UserLayout },
  { path: "/manage-cv", component: User.ManageCV, layout: UserLayout },
  {path: "/list-cv", component: User.ListCV, layout: UserLayout},

  // ADMIN PAGES - Thức
  { path: "/admin/agents", component: Admin.Agents, layout: AdminLayout },
  { path: "/admin/compaign", component: Admin.Compaign, layout: AdminLayout },

  // HR PAGES - Yến , Thịnh
  { path: "/hr/post-job", component: HR.PostJob, layout: HRLayout },
  { path: "/hr/approve", component: HR.ReceiveCV, layout: HRLayout },

  // ERROR PAGES
  { path: "error-path", component: Error.ErrorPath, layout: EmptyLayout },
];

export default routes;
