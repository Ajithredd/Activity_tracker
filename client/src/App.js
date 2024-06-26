import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Analysis from './Pages/Analysis';
import Categorise from './Pages/Categorise';
import Restrict from './Pages/Restrict';
import Limit from './Pages/Limit';
import Reports from './Pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/categorise" element={<Categorise />} />
          <Route path="/limit" element={<Limit />} />
          <Route path="/restrict" element={<Restrict />} />
          <Route path="/report" element={<Reports />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
