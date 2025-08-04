// src/components/Map.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import mediaAssets from '../../data/mediaAssets.json';

const MapComponent = () => {
  const navigate = useNavigate();
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { home } = mediaAssets;

  const handleLocationClick = (locationId) => {
    navigate(`/stories?location=${locationId}`);
  };

  // Default center coordinates - Islamabad, Pakistan
  const defaultCenter = [73.0479, 33.6844]; // Islamabad, Pakistan coordinates

  useEffect(() => {
    if (!mapRef.current) return;

    // Create the map without location markers
    const map = new Map({
      target: mapRef.current,
      layers: [
        // Base layer (OpenStreetMap)
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(defaultCenter),
        zoom: 12, // Adjust zoom level as needed
      }),
    });

    // Enable all interactions (they should be enabled by default, but let's be explicit)
    map.getInteractions().forEach(interaction => {
      interaction.setActive(true);
    });

    mapInstanceRef.current = map;

    // Add a simple click handler to test if interactions work
    map.on('click', (event) => {
      console.log('Map clicked at:', event.coordinate);
    });

    // Log when map is ready
    map.on('rendercomplete', () => {
      console.log('Map render complete - should be interactive now');
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
      }
    };
  }, []);

  // Handle location list item clicks
  const handleListLocationClick = (location) => {
    setSelectedLocation(location);
    handleLocationClick(location.id);
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

            {/* OpenLayers Map Container */}
            <div className="relative">
              <div className="relative w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <div 
                  ref={mapRef} 
                  className="w-full h-full"
                  style={{ 
                    position: 'relative',
                    zIndex: 1,
                    pointerEvents: 'auto',
                    touchAction: 'none'
                  }}
                />
                
                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-2 space-y-2">
                  <button 
                    className="block w-8 h-8 bg-white hover:bg-gray-100 rounded border text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={() => {
                      if (mapInstanceRef.current) {
                        const view = mapInstanceRef.current.getView();
                        view.animate({
                          center: fromLonLat(defaultCenter),
                          zoom: 11,
                          duration: 1000,
                        });
                      }
                    }}
                    title="Reset View"
                  >
                    <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                    </svg>
                  </button>
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

            {/* Enhanced Locations List */}
            <div className="space-y-3">
              {home.map_locations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleListLocationClick(location)}
                  className={`group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-blue-200 ${
                    selectedLocation?.id === location.id 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Location Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-base font-medium transition-colors duration-200 ${
                        selectedLocation?.id === location.id 
                          ? 'text-blue-700' 
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {location.name}
                      </h4>
                      {location.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {location.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 ml-3">
                      <svg 
                        className={`w-4 h-4 transition-colors duration-200 ${
                          selectedLocation?.id === location.id 
                            ? 'text-blue-600' 
                            : 'text-gray-400 group-hover:text-blue-600'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Info */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Map Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Interactive Map View</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click and drag to explore the map. Use mouse wheel to zoom in/out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;