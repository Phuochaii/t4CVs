import React from "react";
import Header from "./components/Header";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  return (
    <>
      <Header />
      {React.cloneElement(children as React.ReactElement<any>)}
    </>
  );
}

export default HRLayout;
