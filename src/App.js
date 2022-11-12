import React from 'react';
import Login from './pages/Login';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';
import useToken from './utils/useToken';

function App() {
  const { token, setToken } = useToken();
  console.log('token', token)
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/preferences" element={<Preferences />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
