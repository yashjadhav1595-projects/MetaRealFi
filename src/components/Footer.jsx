import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord, FaTelegram, FaMediumM } from 'react-icons/fa';

const Footer = () => {
  const socialIcons = [
    { icon: <FaTwitter className="text-xl" />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn className="text-xl" />, href: "#", label: "LinkedIn" },
    { icon: <FaGithub className="text-xl" />, href: "#", label: "GitHub" },
    { icon: <FaDiscord className="text-xl" />, href: "#", label: "Discord" },
    { icon: <FaTelegram className="text-xl" />, href: "#", label: "Telegram" },
    { icon: <FaMediumM className="text-xl" />, href: "#", label: "Medium" }
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-indigo-950/70 to-transparent -z-10"></div>
      <div className="absolute inset-0 bg-circuit-pattern opacity-10 animate-circuit"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="neo-brutalism p-12 rounded-3xl mb-12">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="space-y-8 content-visible" data-aos="fade-right">
              <div className="space-y-4">
                <h4 className="text-3xl font-bold cyber-text">MetaRealFi</h4>
                <p className="text-indigo-200 leading-relaxed">Revolutionizing real estate through blockchain technology and Web3 innovation.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {socialIcons.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    className="social-icon-hover" 
                    aria-label={social.label}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6" data-aos="fade-up">
              <h5 className="text-xl font-semibold neon-text">Platform</h5>
              <ul className="space-y-4">
                {['Properties', 'Marketplace', 'How it Works', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link className="footer-link" to={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6" data-aos="fade-up">
              <h5 className="text-xl font-semibold neon-text">Company</h5>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                  <li key={item}>
                    <Link className="footer-link" to={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8" data-aos="fade-left">
              <div className="space-y-6">
                <h5 className="text-xl font-semibold neon-text">Stay Connected</h5>
                <p className="text-indigo-200">Join our newsletter for updates and exclusive offers.</p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="cyber-input w-full"
                  />
                  <button className="cyber-button w-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-800/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-indigo-300 text-sm">&copy; 2024 MetaRealFi. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link className="text-sm text-indigo-300 hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
              <Link className="text-sm text-indigo-300 hover:text-white transition-colors" to="/terms">Terms of Service</Link>
              <Link className="text-sm text-indigo-300 hover:text-white transition-colors" to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;