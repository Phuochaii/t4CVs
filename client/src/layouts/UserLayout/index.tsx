import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function UserLayout({ children }: LayoutProp) {
  console.log(456456);
  
  return (
    <>
      <Header />
      <div className="mt-20">
        {React.cloneElement(children as React.ReactElement<any>)}
      </div>
      <Footer />
    </>
  );
}

export default UserLayout;
