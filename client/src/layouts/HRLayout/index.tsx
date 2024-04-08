import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  return (
    <div style={{ backgroundColor: "#E8EDF2" }}>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow">
          {React.cloneElement(children as React.ReactElement<any>)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HRLayout;
