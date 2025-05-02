import React from 'react';

const BenefitCard = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="glass-card hover-lift p-6 rounded-xl text-center content-visible"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="text-4xl mb-4 animate-float">{icon}</div>
      <h4 className="text-xl font-semibold mb-2 text-glow-strong">{title}</h4>
      <p className="text-indigo-100">{description}</p>
    </div>
  );
};

export default BenefitCard;