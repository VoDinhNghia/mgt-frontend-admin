import React, { useState } from 'react';
import Login from './pages/Login';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Router>
    <Layout>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/Preferences" element={<Preferences />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
    </Router>
  );
}

export default App;
