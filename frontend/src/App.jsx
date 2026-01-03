import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import ChurnPrediction from './pages/ChurnPrediction';
import PersonalizedAction from './pages/PersonalizedAction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/predict" element={<ChurnPrediction />} />
        <Route path="/action" element={<PersonalizedAction />} />
        {/* Redirect unknown routes to dashboard if logged in (mock logic) or login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
