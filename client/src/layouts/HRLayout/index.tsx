import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  const [collapsedSidebar, setCollapsedSidebar] = React.useState(false);
  const toggleCollopsedSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  return (
    <div style={{ backgroundColor: "#E8EDF2" }}>
      <Header collapedSidebar={toggleCollopsedSidebar} />
      <div className="flex">
        <SideBar isCollapsed={collapsedSidebar} />
        <div className="flex-grow">
          {React.cloneElement(children as React.ReactElement<any>)}
        </div>
      </div>
    </div>
  );
}

export default HRLayout;
