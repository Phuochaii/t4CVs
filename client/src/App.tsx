import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import routes from "./routes";
import EmptyLayout from "./layouts/EmptyLayout";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
