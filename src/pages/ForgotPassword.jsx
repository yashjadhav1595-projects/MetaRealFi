import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Validate Google email
  const isGoogleEmail = (email) => {
    const googleEmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return googleEmailRegex.test(email);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError('');
      
      const data = await authService.loginWithGoogle(credentialResponse.credential);
      if (data) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real application, you would call your API to send a password reset email
      // For now, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo/development without a backend
      if (import.meta.env.VITE_MOCK_AUTH === 'true') {
        setSuccess(true);
        return;
      }
      
      // Real password reset request
      await authService.requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
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
          <h2 className="text-3xl font-bold cyber-text text-white mb-2">Reset Password</h2>
          <p className="text-indigo-300">Enter your email to receive a password reset link</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded mb-6">
              Password reset instructions have been sent to your email.
            </div>
            <p className="text-indigo-300 mb-4">
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <Link 
              to="/login" 
              className="block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Return to Login
            </Link>
          </div>
        ) : (
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
            
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-indigo-500/30 flex-grow"></div>
              <span className="mx-4 text-indigo-300">or</span>
              <div className="border-t border-indigo-500/30 flex-grow"></div>
            </div>
            
            <div className="flex justify-center mb-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google authentication failed. Please try again.')}
                useOneTap
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="pill"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="text-center mt-4">
              <Link to="/login" className="text-indigo-300 hover:text-white transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;