import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('metarealfi_email');
    const savedRememberMe = localStorage.getItem('metarealfi_remember') === 'true';
    
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Validate Google email
  const isGoogleEmail = (email) => {
    const googleEmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return googleEmailRegex.test(email);
  };

  // Validate password strength
  const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!isGoogleEmail(email)) {
      setError('Only Google email addresses (@gmail.com) are allowed');
      return;
    }
    
    // Password validation
    if (!password) {
      setError('Password is required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('metarealfi_email', email);
        localStorage.setItem('metarealfi_remember', 'true');
      } else {
        localStorage.removeItem('metarealfi_email');
        localStorage.setItem('metarealfi_remember', 'false');
      }
      
      // For demo/development without a backend
      if (import.meta.env.VITE_MOCK_AUTH === 'true') {
        // Use the existing simple auth for development
        onLogin();
        navigate('/dashboard');
        return;
      }
      
      // Real JWT authentication
      const data = await authService.login(email, password);
      if (data) {
        // Call the original onLogin to maintain compatibility
        if (onLogin) onLogin();
        
        // Get the redirect path if available
        const from = location.state?.from || '/dashboard';
        navigate(from);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError('');
      
      const data = await authService.loginWithGoogle(credentialResponse.credential);
      if (data) {
        if (onLogin) onLogin();
        const from = location.state?.from || '/dashboard';
        navigate(from);
      }
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-transparent to-indigo-950/50"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-morphism p-8 rounded-xl w-full max-w-md z-10 relative"
      >
        <Link to="/" className="absolute top-4 right-4 text-indigo-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cyber-text text-white mb-2">Welcome Back</h2>
          <p className="text-indigo-300">Sign in to access your dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-indigo-200 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your Gmail address"
            />
            <p className="text-xs text-indigo-300 mt-1">Only Google email addresses (@gmail.com) are allowed</p>
          </div>
          
          <div>
            <label className="block text-indigo-200 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2" 
              />
              <label htmlFor="remember" className="text-indigo-200">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-indigo-300 hover:text-white transition-colors">Forgot password?</Link>
          </div>
          
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-indigo-500/30 flex-grow"></div>
            <span className="mx-4 text-indigo-300">or</span>
            <div className="border-t border-indigo-500/30 flex-grow"></div>
          </div>
          
          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed. Please try again.')}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="pill"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-indigo-300">Don't have an account?</p>
          <Link 
            to="/signup" 
            className="block mt-3 px-6 py-2.5 border border-indigo-500/50 text-white font-medium rounded-lg hover:bg-indigo-800/30 transition-colors duration-300"
          >
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;