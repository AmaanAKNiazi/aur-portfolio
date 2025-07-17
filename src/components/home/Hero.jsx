// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import mediaAssets from '../../data/mediaAssets.json';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images, pdfs, external_links } = mediaAssets;
  const slideImages = images.hero_slideshow;

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slideImages.length]);

  const handleYouTubeClick = () => {
    window.open(external_links.youtube_channel, '_blank');
  };

  const handlePDFClick = (pdfKey) => {
    const pdfPath = pdfs[pdfKey];
    window.open(pdfPath, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                RESISTING EVICTION IN <br />KACHI ABADI'S <br /> IN ISLAMABAD
              </h1>
            </div>

            {/* Action Buttons - Vertical Layout */}
            <div className="flex flex-col space-y-4 w-full max-w-sm">
              {/* Red YouTube Button */}
              <button
                onClick={handleYouTubeClick}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                OUR YOUTUBE CHANNEL
              </button>

              {/* Black PDF Button */}
              <button
                onClick={() => handlePDFClick('resume')}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ANTI EVICTION TOOL KIT URDU
              </button>

              {/* Green PDF Button */}
              <button
                onClick={() => handlePDFClick('portfolio')}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ANTI EVICTION TOOL KIT ENGLISH
              </button>
            </div>
          </div>

          {/* Right Content - Image Slideshow */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden">
              <div className="relative w-full h-[600px] bg-gray-200 rounded-2xl overflow-hidden">
                {/* Slideshow Container */}
                <div className="relative w-full h-full">
                  {slideImages.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback gradient background */}
                      <div 
                        className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-white text-center">
                          <div className="text-lg font-medium">{slide.caption}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-1 transition-all duration-200 backdrop-blur-sm"
                    aria-label="Previous slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-1 transition-all duration-200 backdrop-blur-sm"
                    aria-label="Next slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;