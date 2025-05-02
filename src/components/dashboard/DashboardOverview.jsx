import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData, transactionsData, analyticsData } from '../../data/dashboardData';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const DashboardOverview = () => {
  const { summary } = portfolioData;
  const { recent } = transactionsData;

  // Helper function to format currency if not already imported
  const formatCurrencyFallback = (value) => {
    return typeof formatCurrency === 'function' 
      ? formatCurrency(value) 
      : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  // Helper function to format percentage if not already imported
  const formatPercentageFallback = (value) => {
    return typeof formatPercentage === 'function'
      ? formatPercentage(value)
      : `${value.toFixed(1)}%`;
  };

  return (
    <div className="py-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <motion.h1 
          className="text-2xl font-bold text-white mb-4 lg:mb-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Dashboard Overview
        </motion.h1>
        
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <button className="px-4 py-2 bg-indigo-600/40 hover:bg-indigo-600/60 text-white rounded-lg transition-colors">
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
          <button className="px-4 py-2 bg-purple-600/40 hover:bg-purple-600/60 text-white rounded-lg transition-colors">
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: "Portfolio Value", 
            value: formatCurrencyFallback(summary.totalValue), 
            change: formatPercentageFallback(summary.changePercentage), 
            icon: "chart-line", 
            color: "from-blue-500 to-indigo-600" 
          },
          { 
            title: "Total Properties", 
            value: summary.totalProperties, 
            change: "+2", 
            icon: "building", 
            color: "from-purple-500 to-pink-600" 
          },
          { 
            title: "Monthly Income", 
            value: formatCurrencyFallback(summary.monthlyIncome), 
            change: formatPercentageFallback(summary.changePercentage), 
            icon: "coins", 
            color: "from-green-500 to-teal-600" 
          },
          { 
            title: "ROI", 
            value: formatPercentageFallback(summary.roi), 
            change: "+2.4%", 
            icon: "chart-pie", 
            color: "from-orange-500 to-red-600" 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-300 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                <p className="text-green-400 text-sm mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <i className={`fas fa-${stat.icon} text-white`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Growth Chart */}
      <motion.div
        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Portfolio Growth</h2>
        <div className="h-64 w-full">
          {/* Chart would go here - using placeholder for now */}
          <div className="h-full w-full flex items-end justify-between gap-2">
            {analyticsData.portfolioGrowth.map((item, index) => (
              <div key={item.month} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-sm" 
                  style={{ 
                    height: `${(item.value / 1300000) * 100}%`, 
                    width: '30px' 
                  }}
                ></div>
                <span className="text-indigo-300 text-xs mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recent.map((activity, index) => {
            // Determine icon and color based on transaction type
            let icon = "exchange-alt";
            let iconColor = "bg-purple-500";
            
            if (activity.type === "purchase") {
              icon = "shopping-cart";
              iconColor = "bg-green-500";
            } else if (activity.type === "dividend") {
              icon = "money-bill-wave";
              iconColor = "bg-blue-500";
            } else if (activity.type === "sale") {
              icon = "exchange-alt";
              iconColor = "bg-purple-500";
            }
            
            // Format date
            const date = new Date(activity.date);
            const timeAgo = new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
              Math.floor((date - new Date()) / (1000 * 60 * 60 * 24)), 'day'
            );
            
            return (
              <div key={activity.id} className="flex items-center p-3 hover:bg-indigo-800/20 rounded-lg transition-colors">
                <div className={`${iconColor} p-3 rounded-lg mr-4`}>
                  <i className={`fas fa-${icon} text-white`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium capitalize">{activity.type}</span> {activity.property}
                  </p>
                  <p className="text-indigo-300 text-sm">{timeAgo}</p>
                </div>
                <div className="text-white font-medium">{formatCurrencyFallback(activity.amount)}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;