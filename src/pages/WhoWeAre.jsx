// src/pages/WhoWeAre.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const WhoWeAre = () => {
  const navigate = useNavigate();
  const { about_us } = mediaAssets;

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Who We Are
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Meet our team and learn about our mission
              </p>
            </div>
            <button
              onClick={handleBackHome}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {about_us ? (
          <div className="rounded-2xl shadow-sm overflow-hidden bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="p-8 lg:p-12">
              {/* About Us Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {about_us.title}
                </h2>
                
                {/* About Us Description */}
                <div className="space-y-6">
                  {about_us.description.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-lg leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>

              {/* About Us Images */}
              {about_us.images && about_us.images.length > 0 && (
                <div className="mt-8">
                  <div className="grid grid-cols-1 gap-8">
                    {about_us.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="relative group"
                      >
                        <div className="relative rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '768px' }}>
                          <img
                            src={image.src}
                            alt={image.alt || `About us image ${imageIndex + 1}`}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            style={{ maxWidth: '1024px', maxHeight: '768px' }}
                            onLoad={(e) => {
                              const img = e.target;
                              const container = img.parentElement;
                              
                              // Check if image is smaller than 1024x768
                              if (img.naturalWidth <= 1024 && img.naturalHeight <= 768) {
                                // Use original size
                                container.style.height = `${img.naturalHeight}px`;
                                img.style.width = `${img.naturalWidth}px`;
                                img.style.height = `${img.naturalHeight}px`;
                                img.style.maxWidth = 'none';
                                img.style.maxHeight = 'none';
                              } else {
                                // Use 1024x768 constraint
                                container.style.height = '768px';
                                img.style.maxWidth = '1024px';
                                img.style.maxHeight = '768px';
                              }
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Fallback */}
                          <div 
                            className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                            style={{ display: 'none' }}
                          >
                            <div className="text-center text-gray-600">
                              <div className="text-4xl mb-2">📷</div>
                              <div className="text-sm">Image</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Image Caption */}
                        {image.caption && (
                          <p
                            className="text-sm mt-4 italic text-gray-600"
                            dangerouslySetInnerHTML={{ __html: image.caption }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Us Meta Information */}
              {(about_us.founded || about_us.location || about_us.contact) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-6">
                    {about_us.founded && (
                      <div>
                        <span className="text-sm font-semibold text-gray-600 block">
                          Founded
                        </span>
                        <span className="text-base text-gray-700">
                          {about_us.founded}
                        </span>
                      </div>
                    )}
                    {about_us.location && (
                      <div>
                        <span className="text-sm font-semibold text-gray-600 block">
                          Location
                        </span>
                        <span className="text-base text-gray-700">
                          {about_us.location}
                        </span>
                      </div>
                    )}
                    {about_us.contact && (
                      <div>
                        <span className="text-sm font-semibold text-gray-600 block">
                          Contact
                        </span>
                        <span className="text-base text-gray-700">
                          {about_us.contact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-12 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About Us Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're preparing comprehensive information about our team, mission, and values. 
              Learn about the people behind Alliance for Urban Rights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoWeAre;