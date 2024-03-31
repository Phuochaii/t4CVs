import React from "react";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function EmptyLayout({ children }: LayoutProp) {
  return <>{React.cloneElement(children as React.ReactElement<any>)}</>;
}

export default EmptyLayout;
