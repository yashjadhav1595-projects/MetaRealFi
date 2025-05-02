import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, analyticsData } from '../../data/dashboardData';

const DashboardPortfolio = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('All');
  const { properties, summary } = portfolioData;

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  // Helper function to format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Filter properties by type
  const filteredProperties = filterType === 'All' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  return (
    <div className="py-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <motion.h1 
          className="text-2xl font-bold text-white mb-4 lg:mb-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          My Portfolio
        </motion.h1>
        
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex bg-indigo-900/30 rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-indigo-600/60 text-white' : 'text-indigo-300 hover:text-white'} transition-colors`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large mr-2"></i>
              Grid
            </button>
            <button 
              className={`px-4 py-2 ${viewMode === 'list' ? 'bg-indigo-600/60 text-white' : 'text-indigo-300 hover:text-white'} transition-colors`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list mr-2"></i>
              List
            </button>
          </div>
          
          <select 
            className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Properties</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </motion.div>
      </div>

      {/* Portfolio Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Total Value</p>
          <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.totalValue)}</h3>
          <p className="text-green-400 text-sm mt-1">+{formatPercentage(summary.changePercentage)} this month</p>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Properties</p>
          <h3 className="text-2xl font-bold text-white mt-1">{summary.totalProperties}</h3>
          <p className="text-green-400 text-sm mt-1">+2 this year</p>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Monthly Income</p>
          <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.monthlyIncome)}</h3>
          <p className="text-green-400 text-sm mt-1">+{formatPercentage(summary.changePercentage)} this month</p>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Average ROI</p>
          <h3 className="text-2xl font-bold text-white mt-1">{formatPercentage(summary.roi)}</h3>
          <p className="text-green-400 text-sm mt-1">+2.4% this year</p>
        </div>
      </motion.div>

      {/* Property Distribution */}
      <motion.div
        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">Property Distribution</h2>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 w-full max-w-3xl">
            {analyticsData.propertyTypeDistribution.map((item, index) => (
              <div key={item.name} className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4" 
                  style={{ 
                    background: index === 0 
                      ? 'linear-gradient(to right, #4f46e5, #7c3aed)' 
                      : index === 1 
                        ? 'linear-gradient(to right, #7c3aed, #db2777)' 
                        : 'linear-gradient(to right, #db2777, #ef4444)'
                  }}>
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                </div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-indigo-300 text-sm">
                  {Math.round((item.value / summary.totalProperties) * 100)}% of portfolio
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Properties List */}
      <motion.div
        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">Your Properties</h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <motion.div 
                key={property.id}
                className="bg-indigo-800/20 rounded-xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.2)' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-indigo-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
                  <p className="text-indigo-300 text-sm mb-4">{property.location}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-indigo-300 text-xs">Current Value</p>
                      <p className="text-white font-medium">{formatCurrency(property.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs">Monthly Income</p>
                      <p className="text-white font-medium">{formatCurrency(property.monthlyIncome)}</p>
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs">ROI</p>
                      <p className="text-green-400 font-medium">{formatPercentage(property.roi)}</p>
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs">Appreciation</p>
                      <p className="text-green-400 font-medium">{formatPercentage(property.appreciation)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-indigo-300">Tokens: </span>
                      <span className="text-white">{property.yourTokens}/{property.totalTokens}</span>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600/40 hover:bg-indigo-600/60 text-white rounded-lg transition-colors text-sm">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-indigo-500/20">
                  <th className="pb-3 text-indigo-300 font-medium">Property</th>
                  <th className="pb-3 text-indigo-300 font-medium">Location</th>
                  <th className="pb-3 text-indigo-300 font-medium">Type</th>
                  <th className="pb-3 text-indigo-300 font-medium">Value</th>
                  <th className="pb-3 text-indigo-300 font-medium">Income</th>
                  <th className="pb-3 text-indigo-300 font-medium">ROI</th>
                  <th className="pb-3 text-indigo-300 font-medium">Tokens</th>
                  <th className="pb-3 text-indigo-300 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="border-b border-indigo-500/10 hover:bg-indigo-800/20">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                          <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white">{property.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-indigo-300">{property.location}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-lg text-xs">
                        {property.type}
                      </span>
                    </td>
                    <td className="py-4 text-white">{formatCurrency(property.currentValue)}</td>
                    <td className="py-4 text-white">{formatCurrency(property.monthlyIncome)}</td>
                    <td className="py-4 text-green-400">{formatPercentage(property.roi)}</td>
                    <td className="py-4 text-white">{property.yourTokens}/{property.totalTokens}</td>
                    <td className="py-4">
                      <button className="px-3 py-1 bg-indigo-600/40 hover:bg-indigo-600/60 text-white rounded-lg transition-colors text-sm">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPortfolio;