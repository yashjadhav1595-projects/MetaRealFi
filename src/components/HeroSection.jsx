import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

const HeroSection = () => {
  const glowAnimation = useSpring({
    from: { opacity: 0.5, scale: 1 },
    to: async (next) => {
      while (true) {
        await next({ opacity: 0.8, scale: 1.05 });
        await next({ opacity: 0.5, scale: 1 });
      }
    },
    config: { duration: 2000 }
  });

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center h-[90vh]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left space-y-4 relative"
          >
            <div className="absolute -left-20 top-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold hero-gradient-text leading-tight">
              Transform
              <span className="block mt-1 cyber-glitch" data-text="Your Future">Your Future</span>
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">in Real Estate</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 leading-relaxed neo-text pl-4 border-l-2 border-indigo-500/30">
              Experience the next evolution of property investment through cutting-edge blockchain technology. 
              <span className="block mt-1 text-purple-300">Own a piece of tomorrow, today.</span>
            </p>
            
            {/* CTA Section */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* <animated.button 
                style={glowAnimation}
                className="cyber-button-primary text-base relative group py-3 px-6"
              >
                <span className="relative z-10">Begin Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <span className="button-glow"></span>
              </animated.button> */}
              <button className="cyber-button-secondary text-base relative overflow-hidden py-3 px-6">
                <span className="relative z-10">Explore Properties</span>
                <span className="button-glow"></span>
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          
              {/* Image content remains the same */}
            {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[50vh] lg:h-[65vh] w-full perspective-container"
          >
            <div className="relative h-full w-full transform rotate-y-12 preserve-3d">
              <img 
                src="public/assets/future-city.jpg" 
                alt="Futuristic Real Estate"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl hero-image"
              />
              <div className="absolute inset-0 image-overlay rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl mix-blend-overlay"></div>
              <animated.div 
                style={glowAnimation}
                className="absolute inset-0 rounded-2xl glow-overlay"
              ></animated.div>
              <div className="absolute -right-4 top-4 w-32 h-32 bg-circuit-pattern opacity-50 rounded-full animate-spin-slow"></div>
              <div className="absolute -left-4 bottom-4 w-24 h-24 bg-circuit-pattern opacity-50 rounded-full animate-spin-slow-reverse"></div>
            </div>
          </motion.div>
              
            
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;