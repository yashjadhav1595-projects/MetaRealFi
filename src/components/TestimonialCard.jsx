import React from 'react';

const TestimonialCard = ({ quote, name, role, delay }) => {
  return (
    <div 
      className="glass-card hover-lift p-6 rounded-xl relative overflow-hidden group content-visible"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="text-indigo-400 text-4xl mb-4 text-glow-strong">"</div>
      <p className="text-indigo-100 mb-6 relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mr-4"></div>
        <div>
          <h4 className="font-semibold text-glow-strong">{name}</h4>
          <p className="text-indigo-300">{role}</p>
        </div>
      </div>
      <div className="absolute inset-0 animate-shimmer group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
    </div>
  );
};

export default TestimonialCard;