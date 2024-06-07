import React from 'react';

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

function EmptyLayout({ children }: LayoutProp) {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {React.cloneElement(children as React.ReactElement<any>)}
    </div>
  );
}

export default EmptyLayout;