
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-indigo-1000/210 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a onClick={() => scrollToSection('hero')} className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
            MetaRealFi
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a onClick={() => scrollToSection('benefits')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Benefits</a>
            <a onClick={() => scrollToSection('properties')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Properties</a>
            <a onClick={() => scrollToSection('testimonials')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Testimonials</a>
            <a onClick={() => scrollToSection('contact')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Contact</a>
            <Link 
              to="/login" 
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-medium transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a onClick={() => scrollToSection('benefits')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Benefits</a>
              <a onClick={() => scrollToSection('properties')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Properties</a>
              <a onClick={() => scrollToSection('testimonials')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Testimonials</a>
              <a onClick={() => scrollToSection('contact')} className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Contact</a>
              <Link 
                to="/login" 
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-medium text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;