// src/pages/Stories.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Stories = () => {
  const navigate = useNavigate();
  const { stories } = mediaAssets;

  const handleBackHome = () => {
    navigate('/');
  };

  const handleStoryClick = (storySlug) => {
    navigate(`/story/${storySlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Stories
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Real stories from our communities and their experiences
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

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => handleStoryClick(story.slug)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {/* Story Image */}
              <div className="relative w-full h-64 overflow-hidden">
                {story.featured_image ? (
                  <img
                    src={story.featured_image}
                    alt={story.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={(e) => {
                      // Check if image is smaller than container
                      const img = e.target;
                      const container = img.parentElement;
                      if (img.naturalWidth < container.offsetWidth && img.naturalHeight < container.offsetHeight) {
                        img.style.width = 'auto';
                        img.style.height = 'auto';
                        img.style.maxWidth = '100%';
                        img.style.maxHeight = '100%';
                        img.style.objectFit = 'none';
                      }
                    }}
                  />
                ) : null}
                {/* Fallback background */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center"
                  style={{ display: story.featured_image ? 'none' : 'flex' }}
                >
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">📖</div>
                    <div className="text-sm font-medium">Story</div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {story.title}
                </h3>
                
                {/* Story Meta */}
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    <span className="text-sm font-medium">Read Story</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!stories || stories.length === 0) && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No Stories Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working hard to bring you inspiring stories from our communities. 
              Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;