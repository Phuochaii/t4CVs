// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import DashBoardPage from "./pages/dashBoard";
// import UpLoad from "./pages/upLoadFile";
// import NewDashBoardPage from "./pages/newdashBoard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashBoard" />} />
//         <Route path="/dashBoard" element={<DashBoardPage />} />
//         <Route path="/upload" element={<UpLoad />} />
//         <Route path="/newDashBoard" element={<NewDashBoardPage />} />
//       </Routes>
//     </Router>
//   );

// }

// export default App;

import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
