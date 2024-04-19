import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  return (
    <>
      <Header />
      <div className="flex items-center w-screen">
        <Sidebar />
        {React.cloneElement(children as React.ReactElement<any>)}
      </div>
    </>
  );
}

export default HRLayout;
