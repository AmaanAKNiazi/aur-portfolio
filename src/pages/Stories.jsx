// src/pages/Stories.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Stories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { map_locations } = mediaAssets;

  useEffect(() => {
    const locationId = searchParams.get('location');
    if (locationId) {
      const location = map_locations.find(loc => loc.id === parseInt(locationId));
      setSelectedLocation(location);
    }
  }, [searchParams, map_locations]);

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
                Community Stories
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Real stories from our communities around the world
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedLocation ? (
          /* Specific Location Stories */
          <div className="space-y-8">
            {/* Location Header */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedLocation.city}, {selectedLocation.country}</p>
                  <p className="text-gray-700 mt-3">{selectedLocation.description}</p>
                </div>
              </div>
            </div>

            {/* Stories Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Stories from {selectedLocation.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Story Cards Placeholder */}
                {[1, 2, 3, 4].map((story) => (
                  <div key={story} className="bg-gray-50 p-6 rounded-lg">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">Story Title {story}</h4>
                    <p className="text-gray-600 text-sm">
                      Stories from {selectedLocation.name} will be displayed here. This is a placeholder for future content.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      Coming soon...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* All Stories */
          <div className="space-y-8">
            {/* All Locations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {map_locations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {location.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {location.city}, {location.country}
                      </p>
                      <p className="text-gray-600 mt-2 text-sm">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon Message */}
            <div className="bg-white p-12 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Stories Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working hard to bring you inspiring stories from our communities around the world. 
                Check back soon for updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;