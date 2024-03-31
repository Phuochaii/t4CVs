import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function AdminLayout({ children }: LayoutProp) {
  return (
    <>
      <Header />
      {React.cloneElement(children as React.ReactElement<any>)}
      <Footer />
    </>
  );
}

export default AdminLayout;
