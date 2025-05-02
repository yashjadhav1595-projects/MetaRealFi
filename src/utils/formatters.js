/**
 * Utility functions for formatting values in the dashboard
 */

/**
 * Format a number as currency
 * @param {number} value - The value to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a number as a percentage
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Format a date to a relative time string (e.g., "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

/**
 * Format a number with thousands separators
 * @param {number} value - The value to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, locale = 'en-US') => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a number as a compact representation (e.g., 1.2K, 5.3M)
 * @param {number} value - The value to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted compact number
 */
export const formatCompactNumber = (value, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
};

/**
 * Format a number as a ROI value with color indicator
 * @param {number} value - The ROI value
 * @returns {Object} Object with formatted value and color class
 */
export const formatROI = (value) => {
  const formatted = formatPercentage(value);
  let colorClass = 'text-yellow-400';
  
  if (value >= 10) {
    colorClass = 'text-green-400';
  } else if (value < 5) {
    colorClass = 'text-red-400';
  }
  
  return { value: formatted, colorClass };
};

/**
 * Format a property address to a readable format
 * @param {Object} property - The property object
 * @returns {string} Formatted address
 */
export const formatPropertyAddress = (property) => {
  if (!property) return '';
  return `${property.name}, ${property.location}`;
};

/**
 * Calculate and format time remaining until a date
 * @param {string|Date} targetDate - The target date
 * @returns {string} Formatted time remaining
 */
export const formatTimeRemaining = (targetDate) => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  if (now > target) return 'Expired';
  
  const diffInSeconds = Math.floor((target - now) / 1000);
  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  }
  
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  
  return `${minutes}m remaining`;
};