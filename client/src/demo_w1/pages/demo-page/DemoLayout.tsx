import { Outlet, useOutletContext } from 'react-router-dom';
import BasicMenu from './demo-components/BasicMenu';

const DemoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <header>
        <div>Demo Header</div>
        <BasicMenu />
      </header>

      <main>
        <Outlet context={useOutletContext()}></Outlet>
      </main>
      <footer> Demo Footer</footer>
    </div>
  );
};
export default DemoLayout;
