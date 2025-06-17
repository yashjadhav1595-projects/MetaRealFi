import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ No BrowserRouter here
import { GoogleOAuthProvider } from '@react-oauth/google';
import authService from './services/authService';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
