// src/components/Map.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Map = () => {
  const navigate = useNavigate();
  const { images, map_locations } = mediaAssets;

  const handleLocationClick = (locationId) => {
    // Navigate to stories page with location parameter
    navigate(`/stories?location=${locationId}`);
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Heading and Map (Takes 2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Map of Kachi Abadi's
              </h2>
            </div>

            {/* Map Image - Larger */}
            <div className="relative">
              <div className="relative w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={images.map_section.main_map}
                  alt={images.map_section.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a simple map illustration if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback Map Illustration */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-center text-gray-600">
                    <div className="text-6xl mb-4">🗺️</div>
                    <div className="text-lg font-medium">Global Impact Map</div>
                    <div className="text-sm mt-2">Interactive map coming soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Locations List (Takes 1/3 width) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                Project list of Kachi Abadi Sites
              </h3>
            </div>

            {/* Simplified Locations List */}
            <div className="space-y-3">
              {map_locations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationClick(location.id)}
                  className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    {/* Location Name */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {location.name}
                      </h4>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;