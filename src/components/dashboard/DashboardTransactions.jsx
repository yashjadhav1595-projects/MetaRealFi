import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { transactionsData } from '../../data/dashboardData';
 
const DashboardTransactions = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [filterType, setFilterType] = useState('all');
  
  // Get transaction data
  const { recent, history, summary } = transactionsData;
  const allTransactions = [...recent, ...history];
  
  // Filter transactions based on type
  const filteredTransactions = filterType === 'all' 
    ? allTransactions 
    : allTransactions.filter(tx => tx.type === filterType);
  
  // Display transactions based on active tab
  const displayTransactions = activeTab === 'recent' 
    ? filteredTransactions.slice(0, 5) 
    : filteredTransactions;
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get transaction icon based on type
  const getTransactionIcon = (type) => {
    switch(type) {
      case 'purchase': return 'shopping-cart';
      case 'sale': return 'hand-holding-usd';
      case 'dividend': return 'coins';
      default: return 'exchange-alt';
    }
  };
  
  // Get transaction color based on type
  const getTransactionColor = (type) => {
    switch(type) {
      case 'purchase': return 'text-blue-400';
      case 'sale': return 'text-green-400';
      case 'dividend': return 'text-purple-400';
      default: return 'text-indigo-400';
    }
  };

  return (
    <div className="py-6">
      <motion.h1 
        className="text-2xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Transactions
      </motion.h1>
      
      {/* Transaction Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Total Transactions</p>
          <h3 className="text-2xl font-bold text-white mt-1">{summary.totalTransactions}</h3>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Total Purchased</p>
          <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.totalPurchased)}</h3>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Total Dividends</p>
          <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.totalDividends)}</h3>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <p className="text-indigo-300 text-sm">Average ROI</p>
          <h3 className="text-2xl font-bold text-white mt-1">{summary.averageROI}%</h3>
        </div>
      </motion.div>
      
      {/* Transaction History */}
      <motion.div
        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">Transaction History</h2>
          
          <div className="flex space-x-3">
            <div className="flex bg-indigo-900/30 rounded-lg overflow-hidden">
              <button 
                className={`px-4 py-2 ${activeTab === 'recent' ? 'bg-indigo-600/60 text-white' : 'text-indigo-300 hover:text-white'} transition-colors`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
              <button 
                className={`px-4 py-2 ${activeTab === 'all' ? 'bg-indigo-600/60 text-white' : 'text-indigo-300 hover:text-white'} transition-colors`}
                onClick={() => setActiveTab('all')}
              >
                All History
              </button>
            </div>
            
            <select 
              className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="purchase">Purchases</option>
              <option value="sale">Sales</option>
              <option value="dividend">Dividends</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-indigo-300 text-sm border-b border-indigo-500/20">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Property</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayTransactions.length > 0 ? (
                displayTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-indigo-500/10 text-white">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg ${getTransactionColor(tx.type)} bg-opacity-20 flex items-center justify-center mr-3`}>
                          <i className={`fas fa-${getTransactionIcon(tx.type)} ${getTransactionColor(tx.type)}`}></i>
                        </div>
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4">{tx.property}</td>
                    <td className="py-4">{formatCurrency(tx.amount)}</td>
                    <td className="py-4 text-sm text-indigo-300">{formatDate(tx.date)}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="p-2 text-indigo-300 hover:text-white transition-colors">
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-indigo-300">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Transaction Analytics */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="relative pt-1">
                <p className="text-indigo-300 text-sm mb-1">Purchases ({summary.purchasePercentage}%)</p>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-900/50">
                  <div style={{ width: `${summary.purchasePercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                </div>
                <p className="text-indigo-300 text-sm mb-1">Sales ({summary.salePercentage}%)</p>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-900/50">
                  <div style={{ width: `${summary.salePercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
                <p className="text-indigo-300 text-sm mb-1">Dividends ({summary.dividendPercentage}%)</p>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-900/50">
                  <div style={{ width: `${summary.dividendPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Transaction Volume</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-indigo-300">Chart visualization will be implemented here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardTransactions;