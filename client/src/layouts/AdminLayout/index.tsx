import React from 'react';
import Header from './components/Header';
// import GradientFill from './components/GradientFill';
import Sidebar from './components/SideBar';

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function AdminLayout({ children }: LayoutProp) {
  return (
    <div>
      <Header />
      <div className="flex mt-16" style={{ height: `calc(100vh - 63px)` }}>
        <Sidebar className="overflow-y-hidden" />
        {/* <GradientFill /> */}
        <div className="flex-grow overflow-y-scroll">
          {React.cloneElement(children as React.ReactElement<any>)}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
