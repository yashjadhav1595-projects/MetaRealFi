import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-morphism p-8 lg:p-12 rounded-2xl"
        >
          <h2 className="text-4xl font-bold mb-8 cyber-text text-center">Connect With Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-indigo-200 mb-2 neo-text">Name</label>
                <input type="text" className="cyber-input w-full" />
              </div>
              <div>
                <label className="block text-indigo-200 mb-2 neo-text">Email</label>
                <input type="email" className="cyber-input w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-indigo-200 mb-2 neo-text">Message</label>
                <textarea className="cyber-input w-full h-32 resize-none"></textarea>
              </div>
              <button className="cyber-button-primary w-full">
                <span className="relative z-10">Send Message</span>
                <span className="button-glow"></span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;