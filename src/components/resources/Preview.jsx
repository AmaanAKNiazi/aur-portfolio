import React from 'react';
import mediaAssets from '../../data/mediaAssets.json';

const Preview = () => {
  const { resources } = mediaAssets;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {resources.intro.backgroundImage ? (
          <div className="relative w-full h-full">
            <img
              src={resources.intro.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Fallback background if image fails */}
            <div 
              className={`absolute inset-0 w-full h-full ${resources.intro.fallbackBackground}`}
              style={{ display: 'none' }}
            ></div>
          </div>
        ) : (
          <div className={`w-full h-full ${resources.intro.fallbackBackground}`}></div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: resources.intro.title }}
              />
              
              <h2 
                className="text-lg md:text-xl lg:text-2xl font-semibold text-blue-100 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: resources.intro.subtitle }}
              />
              
              <div 
                className="text-base md:text-lg text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: resources.intro.description }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7 7 7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;