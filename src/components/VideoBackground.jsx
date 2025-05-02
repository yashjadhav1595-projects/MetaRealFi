import React from 'react';

const VideoBackground = () => {
  return (
    <div className="video-background fixed inset-0 z-0">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute w-full h-full object-cover scale-105 animate-float-bg brightness-50"
        style={{ playbackRate: 2.0 }}
        onLoadedMetadata={(e) => {
          e.target.playbackRate = 2.0;
        }}
      >
        <source src="/src/assets/4389377-uhd_2732_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-indigo-950/50 to-black/80 z-10"></div>
      <div className="absolute inset-0 bg-pattern opacity-30 z-20"></div>
    </div>
  );
};

export default VideoBackground;