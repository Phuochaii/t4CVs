import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import routes from "./routes";
import EmptyLayout from "./layouts/EmptyLayout";
import React, { createContext } from "react";

export const MyContext = createContext({
  accountList: [
    { role: "admin", email: "admin@gmail.com", password: "123456" },
    { role: "hr", email: "hr@gmail.com", password: "123456" },
    { role: "user", email: "user@gmail.com", password: "123456" },
  ],
});

function App() {
  const accountList = [
    { role: "admin", id: "", email: "admin@gmail.com", password: "123456" },
    { role: "hr", id: "2", email: "hr@gmail.com", password: "123456" },
    { role: "user", id: "1", email: "user@gmail.com", password: "123456" },
  ];

  console.log(accountList);

  return (
    <MyContext.Provider value={{ accountList: accountList }}>
      <Router>
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
          <Route path="*" element={<Navigate to="/error-path" />} />
          <Route path="*" element={<Navigate to="/quan-ly-cv" />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
