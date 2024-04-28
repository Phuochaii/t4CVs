import React from "react";
import Header from "./components/Header";
import GradientFill from "./components/GradientFill";
import Sidebar from "./components/Sidebar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function AdminLayout({ children }: LayoutProp) {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <Sidebar className="w-[12%]" />
        <GradientFill />
        {React.cloneElement(children as React.ReactElement<any>)}
      </div>
    </div>
  );
}

export default AdminLayout;
