// Update the DashboardHeader component to display user info
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const DashboardHeader = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: 'home' },
    { name: 'Portfolio', path: '/dashboard/portfolio', icon: 'briefcase' },
    { name: 'Marketplace', path: '/dashboard/marketplace', icon: 'building' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: 'chart-line' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    
    // Call the onLogout function passed from parent
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-indigo-900/95 backdrop-blur-lg border-b border-indigo-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <a 
              onClick={() => navigate('/dashboard')} 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:from-purple-400 hover:to-indigo-500 transition-all duration-300"
            >
              MetaRealFi
            </a>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 
                    ${isActive 
                      ? 'bg-indigo-600/50 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-indigo-200 hover:text-white hover:bg-indigo-800/40'}`
                  }
                >
                  <i className={`fas fa-${item.icon} text-xs`}></i>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg text-indigo-200 hover:text-white bg-indigo-900/30 hover:bg-indigo-800/40 transition-all duration-300 relative">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 rounded-lg text-indigo-200 hover:text-white bg-indigo-900/30 hover:bg-indigo-800/40 transition-all duration-300 flex items-center space-x-3"
              >
                // Update the user avatar section to handle Google photos
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-indigo-500/30 transition-all duration-200"
                    src={user?.picture || user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt="User avatar"
                    onError={(e) => {
                      e.target.src = "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-indigo-900"></div>
                </div>
                <span className="hidden md:inline">{user?.name || user?.email || "User"}</span>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              <div className={`absolute right-0 mt-2 w-48 py-2 bg-indigo-950/95 backdrop-blur-lg border border-indigo-500/20 rounded-lg shadow-xl transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <button 
                  onClick={() => navigate('/dashboard/settings')}
                  className="w-full px-4 py-2 text-left text-indigo-200 hover:text-white hover:bg-indigo-500/10 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-cog w-4"></i>
                  <span>Settings</span>
                </button>
                <div className="border-t border-indigo-500/20 my-1"></div>
                <button 
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-2 text-left text-indigo-200 hover:text-white hover:bg-indigo-500/10 transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-sign-out-alt w-4"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;