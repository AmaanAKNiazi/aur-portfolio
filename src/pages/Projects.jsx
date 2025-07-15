// src/pages/Projects.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Projects = () => {
  const navigate = useNavigate();
  const { projects } = mediaAssets;

  const handleBackHome = () => {
    navigate('/');
  };

  // Function to determine if background is dark and needs white text
  const isDarkBackground = (background) => {
    const darkBackgrounds = [
      'bg-gray-900', 'bg-gray-800', 'bg-black', 'bg-blue-900', 'bg-blue-800',
      'bg-purple-900', 'bg-purple-800', 'bg-green-900', 'bg-green-800',
      'bg-red-900', 'bg-red-800', 'bg-indigo-900', 'bg-indigo-800',
      'bg-slate-900', 'bg-slate-800', 'bg-zinc-900', 'bg-zinc-800'
    ];
    
    // Check if background contains dark gradient classes
    const hasDarkGradient = background.includes('from-gray-900') || 
                           background.includes('from-black') ||
                           background.includes('to-gray-900') ||
                           background.includes('to-black') ||
                           background.includes('from-blue-900') ||
                           background.includes('to-blue-900') ||
                           background.includes('from-purple-900') ||
                           background.includes('to-purple-900');
    
    return darkBackgrounds.some(dark => background.includes(dark)) || hasDarkGradient;
  };

  // Get text color classes based on background
  const getTextClasses = (background) => {
    const isDark = isDarkBackground(background);
    return {
      heading: isDark ? 'text-white' : 'text-gray-900',
      paragraph: isDark ? 'text-gray-100' : 'text-gray-700',
      accent: isDark ? 'text-gray-300' : 'text-gray-600'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Projects
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Initiatives and campaigns for urban rights and community development
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

      {/* Projects Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects && projects.length > 0 ? (
          <div className="space-y-8">
            {projects.map((project, index) => {
              const textClasses = getTextClasses(project.background);
              
              return (
                <div
                  key={index}
                  className={`rounded-2xl shadow-lg overflow-hidden ${project.background}`}
                >
                  <div className="p-8 lg:p-12">
                    {/* Project Header */}
                    <div className="mb-8">
                      <h2 className={`text-3xl md:text-4xl font-bold ${textClasses.heading} mb-6`}>
                        {project.title}
                      </h2>
                      
                      {/* Project Description */}
                      <div className="space-y-6">
                        {project.description.map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className={`text-lg leading-relaxed ${textClasses.paragraph}`}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Project Images */}
                    {project.images && project.images.length > 0 && (
                      <div className="mt-8">
                        <div className={`grid ${
                          project.images.length === 1 ? 'grid-cols-1' :
                          'grid-cols-1 md:grid-cols-2'
                        } gap-8`}>
                          {project.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              className="relative group"
                            >
                              <div className="relative h-80 bg-black bg-opacity-10 rounded-lg overflow-hidden">
                                <img
                                  src={image.src}
                                  alt={image.alt || `${project.title} image ${imageIndex + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                {/* Fallback */}
                                <div 
                                  className="w-full h-full bg-black bg-opacity-20 flex items-center justify-center"
                                  style={{ display: 'none' }}
                                >
                                  <div className={`text-center ${textClasses.accent}`}>
                                    <div className="text-4xl mb-2">📷</div>
                                    <div className="text-sm">Image</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Image Caption */}
                              {image.caption && (
                                <p
                                  className={`text-sm mt-4 italic ${textClasses.accent}`}
                                  dangerouslySetInnerHTML={{ __html: image.caption }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Meta Information */}
                    {(project.status || project.year || project.partner) && (
                      <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                        <div className="flex flex-wrap gap-6">
                          {project.status && (
                            <div>
                              <span className={`text-sm font-semibold ${textClasses.accent} block`}>
                                Status
                              </span>
                              <span className={`text-base ${textClasses.paragraph}`}>
                                {project.status}
                              </span>
                            </div>
                          )}
                          {project.year && (
                            <div>
                              <span className={`text-sm font-semibold ${textClasses.accent} block`}>
                                Year
                              </span>
                              <span className={`text-base ${textClasses.paragraph}`}>
                                {project.year}
                              </span>
                            </div>
                          )}
                          {project.partner && (
                            <div>
                              <span className={`text-sm font-semibold ${textClasses.accent} block`}>
                                Partner
                              </span>
                              <span className={`text-base ${textClasses.paragraph}`}>
                                {project.partner}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Projects Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working on documenting our various projects and initiatives. 
              Check back soon for updates on our community development work!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;