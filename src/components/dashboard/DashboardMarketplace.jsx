import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { marketplaceData } from '../../data/dashboardData';

const DashboardMarketplace = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [filterType, setFilterType] = useState('All');
  
  // Get marketplace data
  const { featured, newListings, recommended } = marketplaceData;
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format token price
  const formatTokenPrice = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Get properties based on active tab
  const getProperties = () => {
    switch(activeTab) {
      case 'featured': return featured;
      case 'new': return newListings;
      case 'recommended': return recommended;
      default: return featured;
    }
  };
  
  // Filter properties by type
  const filteredProperties = filterType === 'All' 
    ? getProperties() 
    : getProperties().filter(property => property.type === filterType);
  
  return (
    <div className="py-6">
      <motion.h1 
        className="text-2xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Marketplace
      </motion.h1>
      
      {/* Marketplace Tabs */}
      <motion.div
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'featured' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('featured')}
        >
          <i className="fas fa-star mr-2"></i>Featured
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'new' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('new')}
        >
          <i className="fas fa-bolt mr-2"></i>New Listings
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'recommended' ? 'bg-indigo-600 text-white' : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 hover:text-white'} transition-colors`}
          onClick={() => setActiveTab('recommended')}
        >
          <i className="fas fa-thumbs-up mr-2"></i>Recommended
        </button>
        
        <div className="ml-auto">
          <select 
            className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </motion.div>
      
      {/* Property Listings */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {filteredProperties.map((property) => (
          <div 
            key={property.id} 
            className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-indigo-600/80 text-white text-xs rounded-lg">
                    {property.type}
                  </span>
                  {property.trending && (
                    <span className="px-2 py-1 bg-purple-600/80 text-white text-xs rounded-lg">
                      <i className="fas fa-fire mr-1"></i>Trending
                    </span>
                  )}
                </div>
              </div>
              {property.aiRecommendation && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-600/80 flex items-center justify-center mr-2">
                      <i className="fas fa-robot text-white text-xs"></i>
                    </div>
                    <span className="text-white text-sm">AI Score: {property.aiRecommendation.score}/10</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">{property.name}</h3>
              <p className="text-indigo-300 mb-4">{property.location}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-indigo-300 text-sm">Price</p>
                  <p className="text-white font-semibold">{formatCurrency(property.price)}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm">Token Price</p>
                  <p className="text-white font-semibold">{formatTokenPrice(property.tokenPrice)}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm">Monthly Income</p>
                  <p className="text-white font-semibold">{formatCurrency(property.monthlyIncome)}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-sm">Projected ROI</p>
                  <p className="text-white font-semibold">{property.projectedRoi}%</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-indigo-300 text-sm mb-2">Available Tokens</p>
                <div className="w-full bg-indigo-900/50 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: `${(property.availableTokens / property.totalTokens) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-indigo-300 text-xs">{property.availableTokens} available</p>
                  <p className="text-indigo-300 text-xs">{property.totalTokens} total</p>
                </div>
              </div>
              
              {property.yourTokens > 0 && (
                <div className="mb-4 p-3 bg-indigo-600/20 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-wallet text-indigo-400 mr-2"></i>
                    <p className="text-indigo-300 text-sm">You own <span className="text-white font-semibold">{property.yourTokens}</span> tokens</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  Buy Tokens
                </button>
                <button className="px-3 py-2 bg-indigo-900/50 hover:bg-indigo-800 text-white rounded-lg transition-colors">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardMarketplace;