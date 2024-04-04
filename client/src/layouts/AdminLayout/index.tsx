import React from "react";
import Header from "./components/Header";
import GradientFill from "./components/GradientFill";
import Sidebar from "./components/Sidebar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function AdminLayout({ children }: LayoutProp) {
  return (
    <div className="w-screen">
      <GradientFill />
      <Header />
      <div className="flex">
        <Sidebar />
        {React.cloneElement(children as React.ReactElement<any>)}
      </div>
    </div>
  );
}

export default AdminLayout;
