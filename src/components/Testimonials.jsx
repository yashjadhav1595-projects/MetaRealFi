import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/homeData';

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-transparent to-indigo-950/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold cyber-text mb-4">
            Investor Success Stories
          </h2>
          <p className="text-xl text-indigo-200 neo-text max-w-2xl mx-auto">
            Discover how our platform is transforming real estate investment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-morphism p-8 rounded-xl relative group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-[2px]">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-xl cyber-text">{testimonial.name}</h4>
                  <p className="text-indigo-300 neo-text">{testimonial.role}</p>
                  {testimonial.investmentYears && (
                    <span className="text-sm text-indigo-400">
                      {testimonial.investmentYears} experience
                    </span>
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-indigo-400 text-4xl mb-4">"</div>
                <p className="text-indigo-200 mb-6 neo-text leading-relaxed">
                  {testimonial.quote}
                </p>
                
                {testimonial.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                )}
                
                {testimonial.portfolioGrowth && (
                  <div className="inline-block cyber-badge bg-green-500/20 backdrop-blur-sm">
                    {testimonial.portfolioGrowth} Growth
                  </div>
                )}
                
                {testimonial.location && (
                  <div className="inline-block cyber-badge bg-blue-500/20 backdrop-blur-sm ml-2">
                    {testimonial.location}
                  </div>
                )}
              </div>
              
              <div className="absolute -right-4 top-4 w-32 h-32 bg-circuit-pattern opacity-20 rounded-full animate-spin-slow"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;