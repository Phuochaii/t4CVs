import React, { useState } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function HRLayout({ children }: LayoutProp) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const toggleCollopsedSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  return (
    <div style={{ backgroundColor: '#E8EDF2' }}>
      <Header collapedSidebar={toggleCollopsedSidebar} />
      <div className="flex" style={{ height: 'calc(100vh - 63px)' }}>
        <SideBar isCollapsed={collapsedSidebar} />
        <div className="flex-grow overflow-y-scroll">
          {React.cloneElement(children as React.ReactElement<any>)}
        </div>
      </div>
    </div>
  );
}

export default HRLayout;
