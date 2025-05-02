import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'red'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  // Validate Google email
  const isGoogleEmail = (email) => {
    const googleEmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return googleEmailRegex.test(email);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';
    let color = 'red';

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        message = 'Very weak';
        color = 'red';
        break;
      case 2:
        message = 'Weak';
        color = 'orange';
        break;
      case 3:
        message = 'Medium';
        color = 'yellow';
        break;
      case 4:
        message = 'Strong';
        color = 'lightgreen';
        break;
      case 5:
        message = 'Very strong';
        color = 'green';
        break;
      default:
        message = '';
    }

    setPasswordStrength({ score, message, color });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate full name
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    // Validate email
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    
    if (!isGoogleEmail(formData.email)) {
      setError('Only Google email addresses (@gmail.com) are allowed');
      return;
    }
    
    // Validate password
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    
    if (passwordStrength.score < 4) {
      setError('Password is not strong enough. It must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate terms acceptance
    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions and Privacy Policy');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // For demo/development without a backend
      if (import.meta.env.VITE_MOCK_AUTH === 'true') {
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        return;
      }
      
      // Real registration
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      await authService.register(userData);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Google signup failed. Please try again.');
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
          <h2 className="text-3xl font-bold cyber-text text-white mb-2">Create Account</h2>
          <p className="text-indigo-300">Join MetaRealFi to start your journey</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-indigo-200 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-indigo-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your Gmail address"
            />
            <p className="text-xs text-indigo-300 mt-1">Only Google email addresses (@gmail.com) are allowed</p>
          </div>
          
          <div>
            <label className="block text-indigo-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a strong password"
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs" style={{ color: passwordStrength.color }}>
                    {passwordStrength.message}
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(passwordStrength.score / 5) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }}
                  ></div>
                </div>
                <ul className="text-xs text-indigo-300 mt-2 space-y-1">
                  <li className={formData.password.length >= 8 ? "text-green-400" : ""}>
                    • At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? "text-green-400" : ""}>
                    • At least one uppercase letter
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? "text-green-400" : ""}>
                    • At least one lowercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? "text-green-400" : ""}>
                    • At least one number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-400" : ""}>
                    • At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-indigo-200 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>
          
          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 mr-2"
            />
            <label htmlFor="terms" className="text-sm text-indigo-200">
              I agree to the <Link to="/terms" className="text-indigo-300 hover:text-white">Terms and Conditions</Link> and <Link to="/privacy" className="text-indigo-300 hover:text-white">Privacy Policy</Link>
            </label>
          </div>
          
          {/* Google login section - properly placed inside the form */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-indigo-500/30 flex-grow"></div>
            <span className="mx-4 text-indigo-300">or</span>
            <div className="border-t border-indigo-500/30 flex-grow"></div>
          </div>
          
          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google signup failed. Please try again.')}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signup_with"
              shape="pill"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-70"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-indigo-300">Already have an account?</p>
          <Link 
            to="/login" 
            className="block mt-3 px-6 py-2.5 border border-indigo-500/50 text-white font-medium rounded-lg hover:bg-indigo-800/30 transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;