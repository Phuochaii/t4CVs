import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main className="min-h-[100vh]">
      <Header
        className="h-[10vh]"
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <div className="flex w-screen min-h-[90vh]">
        <Sidebar className="w-[20%]" openSidebar={openSidebar} />
        {React.cloneElement(children as React.ReactElement<any>)}
      </div>
    </main>
  );
}

export default HRLayout;
