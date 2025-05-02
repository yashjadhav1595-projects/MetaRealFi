import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children, isAuthenticated: propIsAuthenticated }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If prop is provided, use it
    if (propIsAuthenticated !== undefined) {
      setIsAuth(propIsAuthenticated);
      setIsChecking(false);
      return;
    }

    // Otherwise check auth service
    const checkAuth = async () => {
      try {
        const isLoggedIn = authService.isAuthenticated();
        setIsAuth(isLoggedIn);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuth(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [propIsAuthenticated]);

  if (isChecking) {
    return <div className="loading">Checking authentication...</div>;
  }

  if (!isAuth) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;