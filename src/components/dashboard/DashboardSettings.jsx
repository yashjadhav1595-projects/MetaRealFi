import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userSettings } from '../../data/dashboardData';

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: userSettings.preferences.displayPreferences.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="py-6">
      <motion.h1 
        className="text-2xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Settings
      </motion.h1>
      
      {/* Settings Tabs */}
      <motion.div
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user mr-2"></i>Profile
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'preferences' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('preferences')}
        >
          <i className="fas fa-sliders-h mr-2"></i>Preferences
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'security' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('security')}
        >
          <i className="fas fa-shield-alt mr-2"></i>Security
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'payment' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('payment')}
        >
          <i className="fas fa-credit-card mr-2"></i>Payment Methods
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'wallets' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('wallets')}
        >
          <i className="fas fa-wallet mr-2"></i>Wallets
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('notifications')}
        >
          <i className="fas fa-bell mr-2"></i>Notifications
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'documents' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('documents')}
        >
          <i className="fas fa-file-alt mr-2"></i>Documents
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'api' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('api')}
        >
          <i className="fas fa-code mr-2"></i>API Access
        </button>
      </motion.div>
      
      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <motion.div
          className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-500/30">
                  <img 
                    src={userSettings.profile.avatar} 
                    alt={userSettings.profile.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{userSettings.profile.name}</h3>
                <p className="text-indigo-300 mb-4">{userSettings.profile.email}</p>
                <div className="px-4 py-2 bg-indigo-600/20 rounded-lg text-indigo-300 mb-4">
                  <span className="text-white font-medium">{userSettings.profile.investorLevel}</span> Investor
                </div>
                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Full Name</p>
                  <p className="text-white">{userSettings.profile.name}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Email</p>
                  <p className="text-white">{userSettings.profile.email}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Phone</p>
                  <p className="text-white">{userSettings.profile.phone}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Member Since</p>
                  <p className="text-white">{formatDate(userSettings.profile.joinDate)}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Verification Status</p>
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 mr-2">
                      {userSettings.profile.verificationStatus}
                    </span>
                    {userSettings.profile.twoFactorEnabled && (
                      <span className="px-2 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300">
                        2FA Enabled
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm mb-1">Referral Program</p>
                  <div className="flex items-center">
                    <p className="text-white mr-2">Code: <span className="font-mono">{userSettings.profile.referralCode}</span></p>
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                  <p className="text-indigo-300 text-sm mt-1">
                    {userSettings.profile.referralCount} referrals • {formatCurrency(userSettings.profile.referralBonus)} earned
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Preferences Settings */}
      {activeTab === 'preferences' && (
        <motion.div
          className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Display Preferences</h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Theme</p>
                <p className="text-indigo-300 text-sm">Choose your preferred interface theme</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="dark" selected={userSettings.preferences.displayPreferences.theme === 'dark'}>Dark</option>
                <option value="light" selected={userSettings.preferences.displayPreferences.theme === 'light'}>Light</option>
                <option value="system" selected={userSettings.preferences.displayPreferences.theme === 'system'}>System Default</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Language</p>
                <p className="text-indigo-300 text-sm">Select your preferred language</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="en-US" selected={userSettings.preferences.displayPreferences.language === 'en-US'}>English (US)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="zh-CN">Chinese</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Currency</p>
                <p className="text-indigo-300 text-sm">Display prices in your preferred currency</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="USD" selected={userSettings.preferences.displayPreferences.currency === 'USD'}>USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Date Format</p>
                <p className="text-indigo-300 text-sm">Choose your preferred date format</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="MM/DD/YYYY" selected={userSettings.preferences.displayPreferences.dateFormat === 'MM/DD/YYYY'}>MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Default Dashboard</p>
                <p className="text-indigo-300 text-sm">Choose which dashboard view to show by default</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="overview" selected={userSettings.preferences.displayPreferences.defaultDashboard === 'overview'}>Overview</option>
                <option value="portfolio">Portfolio</option>
                <option value="marketplace">Marketplace</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-6">Investment Preferences</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Property Types</p>
                <p className="text-indigo-300 text-sm">Select property types you're interested in</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Residential", "Commercial", "Industrial"].map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded border-indigo-500/30 bg-indigo-900/30"
                      checked={userSettings.preferences.investmentPreferences.propertyTypes.includes(type)}
                    />
                    <span className="ml-2 text-indigo-200">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Minimum ROI</p>
                <p className="text-indigo-300 text-sm">Minimum return on investment percentage</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  step="0.5"
                  value={userSettings.preferences.investmentPreferences.minROI}
                  className="w-40 h-2 bg-indigo-900/70 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-3 text-white font-medium">{userSettings.preferences.investmentPreferences.minROI}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Maximum Investment</p>
                <p className="text-indigo-300 text-sm">Maximum amount per investment</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={userSettings.preferences.investmentPreferences.maxInvestment}
                  className="w-32 bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Auto-Reinvest Dividends</p>
                <p className="text-indigo-300 text-sm">Automatically reinvest your dividend earnings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={userSettings.preferences.investmentPreferences.autoReinvest} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Risk Tolerance</p>
                <p className="text-indigo-300 text-sm">Your preferred level of investment risk</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="Conservative" selected={userSettings.preferences.investmentPreferences.riskTolerance === 'Conservative'}>Conservative</option>
                <option value="Moderate" selected={userSettings.preferences.investmentPreferences.riskTolerance === 'Moderate'}>Moderate</option>
                <option value="Aggressive" selected={userSettings.preferences.investmentPreferences.riskTolerance === 'Aggressive'}>Aggressive</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Investment Horizon</p>
                <p className="text-indigo-300 text-sm">Your investment time frame</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                <option value="Short-term" selected={userSettings.preferences.investmentPreferences.investmentHorizon === 'Short-term'}>Short-term (&lt; 1 year)</option>
                <option value="Medium-term" selected={userSettings.preferences.investmentPreferences.investmentHorizon === 'Medium-term'}>Medium-term (1-5 years)</option>
                <option value="Long-term" selected={userSettings.preferences.investmentPreferences.investmentHorizon === 'Long-term'}>Long-term (&gt; 5 years)</option>
              </select>
            </div>
            
            <div className="p-4 bg-indigo-900/50 rounded-lg">
              <p className="text-white font-medium mb-3">Preferred Locations</p>
              <div className="flex flex-wrap gap-2">
                {userSettings.preferences.investmentPreferences.preferredLocations.map(location => (
                  <span key={location} className="px-3 py-1 bg-indigo-600/30 text-indigo-200 rounded-full flex items-center">
                    {location}
                    <button className="ml-2 text-indigo-300 hover:text-white">
                      <i className="fas fa-times-circle"></i>
                    </button>
                  </span>
                ))}
                <button className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full hover:bg-indigo-600/30 hover:text-white">
                  <i className="fas fa-plus mr-1"></i> Add Location
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              Save Preferences
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Security Settings */}
      {activeTab === 'security' && (
        <motion.div
          className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Account Security</h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Password</p>
                <p className="text-indigo-300 text-sm">Last changed 30 days ago</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                Change Password
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-indigo-300 text-sm">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-xs mr-3 ${userSettings.profile.twoFactorEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {userSettings.profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <button className={`px-4 py-2 ${userSettings.profile.twoFactorEnabled ? 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} rounded-lg transition-colors`}>
                  {userSettings.profile.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Login History</p>
                <p className="text-indigo-300 text-sm">View your recent login activity</p>
              </div>
              <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                View History
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Active Sessions</p>
                <p className="text-indigo-300 text-sm">Manage devices currently logged into your account</p>
              </div>
              <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                Manage Sessions
              </button>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-6">Identity Verification</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">KYC Status</p>
                <p className="text-indigo-300 text-sm">Know Your Customer verification status</p>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 mr-3">
                  {userSettings.profile.verificationStatus}
                </span>
                <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Identity Documents</p>
                <p className="text-indigo-300 text-sm">Manage your submitted identification documents</p>
              </div>
              <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                Manage Documents
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Address Verification</p>
                <p className="text-indigo-300 text-sm">Verify your residential address</p>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 mr-3">
                  Verified
                </span>
                <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                  Update Address
                </button>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-6">Security Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Login Notifications</p>
                <p className="text-indigo-300 text-sm">Get notified when someone logs into your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={true} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Suspicious Activity Alerts</p>
                <p className="text-indigo-300 text-sm">Get notified about unusual account activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={true} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Transaction Confirmations</p>
                <p className="text-indigo-300 text-sm">Require email confirmation for transactions above $1,000</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={true} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">IP Whitelist</p>
                <p className="text-indigo-300 text-sm">Restrict account access to specific IP addresses</p>
              </div>
              <button className="px-4 py-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70 rounded-lg transition-colors">
                Manage IPs
              </button>
            </div>
          </div>
        </motion.div>
      )}
      

      {/* Payment Methods Settings */}
{activeTab === 'payment' && (
        <motion.div
          className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <i className="fas fa-plus mr-2"></i>Add New
            </button>
          </div>
          
          <div className="space-y-6">
            {userSettings.paymentMethods.map((method, index) => (
              <div key={method.id} className="p-4 bg-indigo-900/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-indigo-900/70 rounded-lg mr-4">
                      <i className={`fas ${method.type === 'credit_card' ? 'fa-credit-card' : 'fa-university'} text-2xl text-indigo-300`}></i>
                    </div>
                    <div>
                      <p className="text-white font-medium">{method.name}</p>
                      {method.expiryDate && (
                        <p className="text-indigo-300 text-sm">Expires: {method.expiryDate}</p>
                      )}
                      {method.isDefault && (
                        <span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 text-xs rounded-full mt-1 inline-block">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {!method.isDefault && (
                      <button className="text-indigo-300 hover:text-white mr-4">
                        Set Default
                      </button>
                    )}
                    <div className="relative">
                      <button className="text-indigo-300 hover:text-white">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-indigo-500/20">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button className="text-indigo-300 hover:text-white text-sm">
                        <i className="fas fa-pencil-alt mr-1"></i> Edit
                      </button>
                      <button className="text-indigo-300 hover:text-white text-sm">
                        <i className="fas fa-history mr-1"></i> Transaction History
                      </button>
                      <button className="text-red-400/70 hover:text-red-400 text-sm">
                        <i className="fas fa-trash-alt mr-1"></i> Remove
                      </button>
                    </div>
                    <div>
                      <button className="px-3 py-1.5 bg-indigo-900/70 text-indigo-300 hover:bg-indigo-900/90 hover:text-white rounded-lg transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-indigo-900/50 rounded-lg border border-dashed border-indigo-500/30">
              <div className="flex items-center justify-center py-6">
                <button className="flex items-center justify-center text-indigo-300 hover:text-white">
                  <i className="fas fa-plus-circle text-2xl mr-2"></i>
                  <span>Add a new payment method</span>
                </button>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-6">Billing Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-indigo-900/50 rounded-lg">
              <p className="text-white font-medium mb-1">Billing Address</p>
              <p className="text-indigo-300">123 Blockchain Avenue</p>
              <p className="text-indigo-300">Suite 456</p>
              <p className="text-indigo-300">New York, NY 10001</p>
              <p className="text-indigo-300">United States</p>
              <button className="mt-4 px-4 py-1.5 bg-indigo-900/70 text-indigo-300 hover:bg-indigo-900/90 hover:text-white rounded-lg transition-colors text-sm">
                Edit Address
              </button>
            </div>
            
            <div className="p-4 bg-indigo-900/50 rounded-lg">
              <p className="text-white font-medium mb-1">Billing Contact</p>
              <p className="text-indigo-300">{userSettings.profile.name}</p>
              <p className="text-indigo-300">{userSettings.profile.email}</p>
              <p className="text-indigo-300">{userSettings.profile.phone}</p>
              <button className="mt-4 px-4 py-1.5 bg-indigo-900/70 text-indigo-300 hover:bg-indigo-900/90 hover:text-white rounded-lg transition-colors text-sm">
                Edit Contact
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-900/50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <p className="text-white font-medium">Tax Information</p>
              <button className="px-3 py-1.5 bg-indigo-900/70 text-indigo-300 hover:bg-indigo-900/90 hover:text-white rounded-lg transition-colors text-sm">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-indigo-300 text-sm mb-1">Tax ID</p>
                <p className="text-white">••••••1234</p>
              </div>
              <div>
                <p className="text-indigo-300 text-sm mb-1">Business Type</p>
                <p className="text-white">Individual</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-6">Billing History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-indigo-300 border-b border-indigo-500/30">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-indigo-500/10 text-white">
                  <td className="py-4">May 15, 2023</td>
                  <td className="py-4">Premium Subscription</td>
                  <td className="py-4">{formatCurrency(49.99)}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <i className="fas fa-download mr-1"></i> PDF
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-indigo-500/10 text-white">
                  <td className="py-4">Apr 15, 2023</td>
                  <td className="py-4">Premium Subscription</td>
                  <td className="py-4">{formatCurrency(49.99)}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <i className="fas fa-download mr-1"></i> PDF
                    </button>
                  </td>
                </tr>
                <tr className="text-white">
                  <td className="py-4">Mar 15, 2023</td>
                  <td className="py-4">Premium Subscription</td>
                  <td className="py-4">{formatCurrency(49.99)}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <i className="fas fa-download mr-1"></i> PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-right">
            <button className="text-indigo-400 hover:text-indigo-300">
              View All Transactions <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
          
          <h3 className="text-xl font-semibold text-white mt-8 mb-6">Payment Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Auto-Renewal</p>
                <p className="text-indigo-300 text-sm">Automatically renew your subscription</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={true} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Payment Notifications</p>
                <p className="text-indigo-300 text-sm">Receive notifications about payments and invoices</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={true} />
                <div className="w-11 h-6 bg-indigo-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Default Payment Method</p>
                <p className="text-indigo-300 text-sm">Select your preferred payment method</p>
              </div>
              <select className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none">
                {userSettings.paymentMethods.map(method => (
                  <option key={method.id} value={method.id} selected={method.isDefault}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </motion.div>
      )}
      
      
    </div>
  );
};


      export default DashboardSettings;
