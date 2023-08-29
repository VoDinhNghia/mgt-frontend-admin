import React from 'react';
import LoginPage from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFound';
import { routes } from './constants/constant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
