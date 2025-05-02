import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import Header from '../components/Header';
import VideoBackground from '../components/VideoBackground';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import FeaturedProperties from '../components/FeaturedProperties';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });

    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="pt-20 relative z-10">
        <VideoBackground />
        <div className="relative z-20">
          <HeroSection />
          <BenefitsSection />
          <FeaturedProperties />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;