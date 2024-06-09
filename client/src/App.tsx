import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import routes from './routes';
import EmptyLayout from './layouts/EmptyLayout';
import React, { createContext } from 'react';
import { accountList } from './shared/utils/constant';

export const MyContext = createContext({});

function App() {
  return (
    <MyContext.Provider value={{ accountList: accountList }}>
      <Router>
        <div>
          <Routes>
            {routes.map((route, index) => {
              const Layout = route.layout || EmptyLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/*  */}
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<Navigate to="/error-path" />} /> */}
            {/* <Route path="*" element={<Navigate to="/quan-ly-cv" />} /> */}
          </Routes>
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
