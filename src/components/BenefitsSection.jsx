import React from 'react';
import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { benefits } from '../data/homeData';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-transparent to-indigo-950/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl lg:text-5xl font-bold cyber-text">
            Why Choose MetaRealFi?
          </h2>
          <p className="text-xl text-indigo-200 neo-text max-w-2xl mx-auto">
            Experience the future of real estate investment with our cutting-edge platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;