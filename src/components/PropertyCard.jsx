import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from '../utils/icons';

const PropertyCard = ({ image, title, description, price, roi, details }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('amenities');

  const tabs = [
    { id: 'amenities', label: 'Amenities', icon: Icons.amenities },
    { id: 'tokenization', label: 'Investment', icon: Icons.tokenization },
    { id: 'sustainability', label: 'Green', icon: Icons.sustainability }
  ];

  return (
    <motion.div 
      className="glass-morphism p-6 rounded-xl relative overflow-hidden group bg-indigo-900/30"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-lg mb-6">
          <motion.img 
            src={image} 
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="cyber-badge bg-black/50 backdrop-blur-sm text-white flex items-center gap-2">
              {Icons.size}
              <span>{details.size}</span>
            </div>
            <div className="cyber-badge bg-black/50 backdrop-blur-sm text-white flex items-center gap-2">
              {Icons.year}
              <span>Built {details.yearBuilt}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-2xl font-semibold cyber-text text-white">
            {title}
          </h4>
          <p className="text-indigo-200 neo-text text-base leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="cyber-stats text-white">
              <div className="flex items-center gap-2">
                {Icons.bed}
                <span>{details.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                {Icons.bath}
                <span>{details.bathrooms} Bathrooms</span>
              </div>
            </div>
            <div className="cyber-stats text-white">
              <div className="flex items-center gap-2">
                {Icons.location}
                <span>{details.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {Icons.price}
                <span className="font-semibold">{price}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex gap-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowDetails(true);
                  }}
                  className={`cyber-tab flex items-center gap-2 ${
                    activeTab === tab.id ? 'active text-white' : 'text-indigo-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {showDetails && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="cyber-details-box bg-indigo-900/40 text-white p-4"
                >
                  {activeTab === 'amenities' && (
                    <div className="grid grid-cols-2 gap-2">
                      {details.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {Icons.amenities}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'tokenization' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {Icons.tokenization}
                          <span>Token Price:</span>
                        </div>
                        <span>{details.tokenization.pricePerToken}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {Icons.investment}
                          <span>Min Investment:</span>
                        </div>
                        <span>{details.tokenization.minInvestment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {Icons.roi}
                          <span>Projected Yield:</span>
                        </div>
                        <span className="text-green-400">{details.tokenization.projectedYield}</span>
                      </div>
                    </div>
                  )}
                  {activeTab === 'sustainability' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {Icons.sustainability}
                          <span>Energy Rating:</span>
                        </div>
                        <span>{details.sustainability.energyRating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {Icons.smart}
                          <span>Certification:</span>
                        </div>
                        <span>{details.sustainability.greenCertification}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-4 right-4">
            <div className="cyber-badge bg-green-500/40 backdrop-blur-sm text-white font-semibold flex items-center gap-2">
              {Icons.roi}
              <span>{roi}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;