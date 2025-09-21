// src/components/Map.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Circle} from 'ol/style';
import KML from 'ol/format/KML';
import { extend, createEmpty } from 'ol/extent';
import 'ol/ol.css';
import mediaAssets from '../../data/mediaAssets.json';

const MapComponent = () => {
  const navigate = useNavigate();
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  const kmlLayersRef = useRef([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [kmlLoadingStatus, setKmlLoadingStatus] = useState({});
  const [kmlErrors, setKmlErrors] = useState({});
  const [kmlStatusVisible, setKmlStatusVisible] = useState({});
  const [totalKmlFiles, setTotalKmlFiles] = useState(0);
  const [loadedKmlFiles, setLoadedKmlFiles] = useState(0);
  const { home } = mediaAssets;

  const handleLocationClick = (locationId) => {
    navigate(`/stories?location=${locationId}`);
  };

  // Default center coordinates - Islamabad, Pakistan
  const defaultCenter = [73.0479, 33.6844];

  // Multiple KML file paths with titles - update this array with your KML files
  const kmlFilePaths = home.kml_files;

  // Color scheme for different KML files
  const kmlColors = [
    { fill: 'rgba(239, 68, 68, 0.3)', stroke: 'rgba(239, 68, 68, 0.8)', name: 'Red' },
    { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgba(59, 130, 246, 0.8)', name: 'Blue' },
    // { fill: 'rgba(34, 197, 94, 0.3)', stroke: 'rgba(34, 197, 94, 0.8)', name: 'Green' },
    // { fill: 'rgba(168, 85, 247, 0.3)', stroke: 'rgba(168, 85, 247, 0.8)', name: 'Purple' },
    // { fill: 'rgba(245, 158, 11, 0.3)', stroke: 'rgba(245, 158, 11, 0.8)', name: 'Orange' },
    // { fill: 'rgba(236, 72, 153, 0.3)', stroke: 'rgba(236, 72, 153, 0.8)', name: 'Pink' },
  ];

  // Function to refresh a failed KML file
  const refreshKmlFile = (index) => {
    if (!mapInstanceRef.current) return;
    
    setKmlErrors(prev => ({ ...prev, [index]: null }));
    setKmlLoadingStatus(prev => ({ ...prev, [index]: false }));
    setKmlStatusVisible(prev => ({ ...prev, [index]: true }));
    
    // Find and refresh the layer
    const layer = kmlLayersRef.current[index];
    if (layer) {
      const source = layer.getSource();
      source.refresh();
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    setTotalKmlFiles(kmlFilePaths.length);
    setLoadedKmlFiles(0);

    // Initialize loading status for each KML file
    const initialLoadingStatus = {};
    const initialErrors = {};
    const initialStatusVisible = {};
    kmlFilePaths.forEach((kmlFile, index) => {
      initialLoadingStatus[index] = false;
      initialErrors[index] = null;
      initialStatusVisible[index] = true;
    });
    setKmlLoadingStatus(initialLoadingStatus);
    setKmlErrors(initialErrors);
    setKmlStatusVisible(initialStatusVisible);

    // Create base layers array
    const baseLayers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];

    // Create KML layers for each file
    const kmlLayers = kmlFilePaths.map((kmlFile, index) => {
      const colorScheme = kmlColors[index % kmlColors.length];
      
      const kmlSource = new VectorSource({
        url: kmlFile.src,
        format: new KML({
          extractStyles: false, // Don't extract styles from KML - use our custom colors
          showPointNames: true,
        }),
      });

      const kmlLayer = new VectorLayer({
        source: kmlSource,
        style: new Style({
          fill: new Fill({
            color: colorScheme.fill,
          }),
          stroke: new Stroke({
            color: colorScheme.stroke,
            width: 2,
          }),
          image: new Circle({
            radius: 8,
            fill: new Fill({
              color: colorScheme.stroke,
            }),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        }),
      });

      // Handle individual KML loading
      kmlSource.on('addfeature', () => {
        setKmlLoadingStatus(prev => {
          const newStatus = { ...prev, [index]: true };
          return newStatus;
        });
        
        setLoadedKmlFiles(prev => {
          const newCount = prev + 1;
          
          // If this is the first loaded file, or if all files are now loaded, fit to extent
          if (newCount === 1 || newCount === kmlFilePaths.length) {
            setTimeout(() => fitToAllKMLData(), 500);
          }
          
          return newCount;
        });
        
        // Hide success status after 3 seconds
        setTimeout(() => {
          setKmlStatusVisible(prev => ({ ...prev, [index]: false }));
        }, 3000);
        
        console.log(`KML file ${index + 1} loaded successfully: ${kmlFile.src}`);
      });

      // Handle individual KML loading errors
      kmlSource.on('error', (event) => {
        setKmlErrors(prev => ({
          ...prev,
          [index]: `Failed to load ${kmlFile.alt}`
        }));
        
        // Show error for 2 seconds, then show refresh button
        setTimeout(() => {
          setKmlStatusVisible(prev => ({ ...prev, [index]: 'refresh' }));
        }, 2000);
        
        console.error(`KML loading error for file ${index + 1}:`, event);
      });

      // Store layer reference with metadata
      kmlLayer.set('kmlIndex', index);
      kmlLayer.set('kmlPath', kmlFile.src);
      kmlLayer.set('kmlTitle', kmlFile.alt);
      kmlLayer.set('kmlColor', colorScheme);

      return kmlLayer;
    });

    // Store KML layers reference
    kmlLayersRef.current = kmlLayers;

    // Create the map with all layers
    const map = new Map({
      target: mapRef.current,
      layers: [...baseLayers, ...kmlLayers],
      view: new View({
        center: fromLonLat(defaultCenter),
        zoom: 12,
      }),
    });

    // Function to fit map to all KML data
    const fitToAllKMLData = () => {
      if (!mapInstanceRef.current) return;
      
      let combinedExtent = createEmpty();
      let hasValidExtent = false;

      kmlLayers.forEach(layer => {
        const source = layer.getSource();
        const extent = source.getExtent();
        if (extent && extent.every(coord => isFinite(coord))) {
          extend(combinedExtent, extent);
          hasValidExtent = true;
        }
      });

      if (hasValidExtent) {
        mapInstanceRef.current.getView().fit(combinedExtent, {
          padding: [50, 50, 50, 50],
          maxZoom: 15,
        });
      }
    };

    // Store fit function for external access
    map.fitToAllKMLData = fitToAllKMLData;

    // Add click interaction for KML features
    map.on('click', (event) => {
      const features = [];
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (kmlLayers.includes(layer)) {
          const kmlIndex = layer.get('kmlIndex');
          const kmlColor = layer.get('kmlColor');
          const kmlTitle = layer.get('kmlTitle');
          features.push({ 
            feature, 
            layer, 
            kmlIndex,
            kmlColor: kmlColor.name,
            kmlTitle,
            filePath: layer.get('kmlPath')
          });
        }
      });

      if (features.length > 0) {
        const { feature, kmlColor, kmlTitle, filePath } = features[0];
        const properties = feature.getProperties();
        console.log(`KML Feature clicked from "${kmlTitle}" (${kmlColor}):`, {
          filePath,
          properties
        });
      } else {
        console.log('Map clicked at:', event.coordinate);
      }
    });

    // Enable all interactions
    map.getInteractions().forEach(interaction => {
      interaction.setActive(true);
    });

    mapInstanceRef.current = map;

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
  }, [kmlFilePaths]);

  // Handle location list item clicks
  const handleListLocationClick = (location) => {
    setSelectedLocation(location);
    handleLocationClick(location.id);
  };

  // Calculate loading progress
  const allFilesLoaded = loadedKmlFiles === totalKmlFiles && totalKmlFiles > 0;
  const hasErrors = Object.values(kmlErrors).some(error => error !== null);
  const isLoading = loadedKmlFiles < totalKmlFiles && !hasErrors;

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Heading, Map, and Legend (Takes 2/3 width) */}
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
                  
                  {allFilesLoaded && (
                    <button 
                      className="block w-8 h-8 bg-white hover:bg-gray-100 rounded border text-gray-600 hover:text-gray-800 transition-colors"
                      onClick={() => {
                        if (mapInstanceRef.current && mapInstanceRef.current.fitToAllKMLData) {
                          mapInstanceRef.current.fitToAllKMLData();
                        }
                      }}
                      title="Fit to All KML Data"
                    >
                      <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Status Indicators */}
                {hasErrors && (
                  <div className="absolute top-4 left-4 z-10 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm max-w-xs">
                    <div className="font-medium">Some KML files failed to load</div>
                    <div className="text-xs mt-1">
                      {Object.entries(kmlErrors)
                        .filter(([_, error]) => error !== null)
                        .map(([index, error]) => (
                          <div key={index}>{error}</div>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                {isLoading && (
                  <div className="absolute top-4 left-4 z-10 bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded-lg text-sm">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-700 mr-2"></div>
                      Loading KML files... ({loadedKmlFiles}/{totalKmlFiles})
                    </div>
                  </div>
                )}
                
                {allFilesLoaded && !hasErrors && (
                  <div className="absolute top-4 left-4 z-10 bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded-lg text-sm">
                    ✓ All KML files loaded ({loadedKmlFiles}/{totalKmlFiles})
                  </div>
                )}
              </div>
            </div>

            {/* KML Files Legend - Now underneath the map */}
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Map Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {kmlFilePaths.map((kmlFile, index) => {
                  const colorScheme = kmlColors[index % kmlColors.length];
                  const isLoaded = kmlLoadingStatus[index];
                  const hasError = kmlErrors[index];
                  const statusVisible = kmlStatusVisible[index];
                  
                  return (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: colorScheme.stroke }}
                        ></div>
                        <span className="text-xs text-gray-600 truncate">
                          {kmlFile.alt}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {hasError && statusVisible === true ? (
                          <span className="text-xs text-red-500">✗</span>
                        ) : hasError && statusVisible === 'refresh' ? (
                          <button
                            onClick={() => refreshKmlFile(index)}
                            className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                            title="Retry loading"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        ) : isLoaded && statusVisible === true ? (
                          <span className="text-xs text-green-500">✓</span>
                        ) : !isLoaded && !hasError ? (
                          <span className="text-xs text-gray-400">⟳</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Locations List Only (Takes 1/3 width) */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;