import { createBrowserRouter } from "react-router-dom";
import Navigation from "./pages/demo-page/demo-navigation/page";
import DemoLayout from "./pages/demo-page/DemoLayout";
import HomePage from "./pages/home-page/page";
import Module from "./pages/demo-page/demo-module/page";
import LoginPage from "./pages/login";
import AdminPage from "./pages/Admin";
import SignUpPage from "./pages/SignUp";

import DashBoardPage from "./pages/dashBoard";
import UpLoad from "./pages/upLoadFile";
import NewDashBoardPage from "./pages/newdashBoard";
import SplashPage from "./pages/splash-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "demo",
    element: <DemoLayout />,
    children: [
      {
        path: "demo-navigation",
        element: <Navigation />,
      },
      {
        path: "demo-module",
        element: <Module />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign_up",
    element: <SignUpPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "DashBoard",
    element: <DashBoardPage />,
  },
  {
    path: "UpLoad",
    element: <UpLoad />,
  },
  {
    path: "NewDashBoard",
    element: <NewDashBoardPage />,
  },
]);

export default router;
