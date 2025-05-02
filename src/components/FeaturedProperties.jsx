import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { properties } from "../data/homeData";
import { Icons } from "../utils/icons";

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const filters = [
    { id: 'all', label: 'All Properties', icon: Icons.filter },
    { id: 'luxury', label: 'Luxury', icon: Icons.luxury },
    { id: 'smart', label: 'Smart Homes', icon: Icons.smart },
    { id: 'sustainable', label: 'Sustainable', icon: Icons.sustainability },
    { id: 'investment', label: 'Best ROI', icon: Icons.roi }
  ];

  useEffect(() => {
    const filterProperties = () => {
      if (activeFilter === 'all') return properties;
      if (activeFilter === 'investment') {
        return [...properties].sort((a, b) => 
          parseFloat(b.roi) - parseFloat(a.roi)
        ).slice(0, 6);
      }
      return properties.filter(property => 
        property.details.category === activeFilter
      );
    };
    setFilteredProperties(filterProperties());
  }, [activeFilter]);

  return (
    <section id="properties" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-transparent to-indigo-950/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {Icons.filter}    
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* {Icons.luxury} */}
            <h2 className="text-4xl lg:text-5xl font-bold cyber-text">
              Featured Properties
            </h2>
          </div>
          <p className="text-xl text-indigo-200 neo-text max-w-2xl mx-auto">
            Explore our curated selection of premium tokenized properties
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`cyber-button-secondary px-6 py-3 flex items-center gap-3 ${
                activeFilter === filter.id ? 'active glow-strong' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-5 h-5">{filter.icon}</span>
              <span className="font-medium">{filter.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedProperties;