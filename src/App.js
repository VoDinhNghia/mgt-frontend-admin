import React from "react";
import LoginPage from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import { routes } from "./constants/constant";
import { NotificationContainer } from "react-notifications";
import HomePage from "./pages/home";
import ProtectedRouter from "./utils/PrivateRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route
          path={routes.home}
          element={
            <ProtectedRouter>
              <HomePage />
            </ProtectedRouter>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationContainer />
    </Router>
  );
}

export default App;
