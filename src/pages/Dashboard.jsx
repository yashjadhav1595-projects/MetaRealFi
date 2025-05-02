import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import DashboardPortfolio from '../components/dashboard/DashboardPortfolio';
import DashboardMarketplace from '../components/dashboard/DashboardMarketplace';
import DashboardAnalytics from '../components/dashboard/DashboardAnalytics';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import '../index.css';

function Dashboard() {
  const { logout, currentUser } = useAuth() || {};
  const [user, setUser] = useState(currentUser || null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If useAuth is not available, get user from authService
    if (!currentUser && authService.isAuthenticated()) {
      setUser(authService.getCurrentUser());
    }
  }, [currentUser]);
  
  const handleLogout = () => {
    try {
      // First clear the token using authService
      authService.logout();
      
      // Then call the context logout if available
      if (logout) {
        logout();
      }
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Test JWT Authentication function
  const testAuthStatus = async () => {
    try {
      const token = localStorage.getItem('metarealfi_token');
      console.log('JWT Token exists:', !!token);
      
      if (token) {
        // Decode token
        const userData = authService.getCurrentUser();
        console.log('Current user from token:', userData);
        
        // Check if token is expired
        if (userData && userData.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (userData.exp < currentTime) {
            console.error('Token is expired');
            alert('Your authentication token has expired. Please log in again.');
            handleLogout();
            return;
          }
        }
        
        // Test protected endpoint using authService.api instead of fetch
        try {
          const response = await authService.api.get('/dashboard/data');
          console.log('Dashboard data API response:', response.data);
          alert('JWT Authentication is working! Check console for details.');
        } catch (error) {
          console.error('API request error:', error);
          
          if (error.response) {
            console.error('Error response:', error.response.data);
            alert(`JWT Authentication failed: ${error.response.data.message || 'Unknown error'}`);
          } else if (error.request) {
            console.error('No response received:', error.request);
            alert('No response received from server. Check if backend is running.');
          } else {
            console.error('Error setting up request:', error.message);
            alert(`Error: ${error.message}`);
          }
        }
      } else {
        alert('No JWT token found. Authentication not working.');
      }
    } catch (error) {
      console.error('Auth test error:', error);
      alert('Error testing authentication. Check console for details.');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-indigo-950/95">
      {/* Fixed header at the top */}
      <DashboardHeader onLogout={handleLogout} user={user} />
      
      {/* Main content with proper spacing from header */}
      <div className="flex-1 pt-16"> {/* pt-16 adds padding top to account for fixed header height */}
        <div className="container mx-auto px-4 py-6">
          {/* Test button */}
          <div className="mb-6">
            <button 
              onClick={testAuthStatus}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Test JWT Authentication
            </button>
          </div>
          
          {/* Dashboard content */}
          <main className="bg-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl border border-indigo-500/20 overflow-hidden">
            <div className="p-6">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="portfolio" element={<DashboardPortfolio />} />
                <Route path="marketplace" element={<DashboardMarketplace />} />
                <Route path="analytics" element={<DashboardAnalytics />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;