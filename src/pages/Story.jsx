// src/pages/Story.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Story = () => {
  const { storySlug } = useParams();
  const navigate = useNavigate();
  const { stories } = mediaAssets;

  // Find the specific story
  const story = stories?.find(s => s.slug === storySlug);

  const handleBackToStories = () => {
    navigate('/stories');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the story you're looking for.</p>
          <button
            onClick={handleBackToStories}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Story Details
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Community Stories
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBackToStories}
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Back to Stories
              </button>
              <button
                onClick={handleBackHome}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Story Header */}
          <div className="px-12 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              {story.title}
            </h1>

            {/* Featured Image */}


            {/* Story Content */}
            <div className="prose prose-xl max-w-none">
              {story.content?.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.type === 'paragraph' && (
                    <p 
                      className="text-gray-700 text-lg leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                  
                  {section.type === 'image' && (
                    <div className="my-10">
                      <div className="relative w-full h-80 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={section.src}
                          alt={section.alt || story.title}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback */}
                        <div 
                          className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center"
                          style={{ display: 'none' }}
                        >
                          <div className="text-center text-gray-500">
                            <div className="text-4xl mb-2">📷</div>
                            <div className="text-sm">Image</div>
                          </div>
                        </div>
                      </div>
                      {section.caption && (
                        <p 
                          className="text-gray-600 text-sm mt-3 italic text-center"
                          dangerouslySetInnerHTML={{ __html: section.caption }}
                        />
                      )}
                    </div>
                  )}

                  {section.type === 'images' && (
                    <div className="my-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative h-64 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={image}
                              alt={`${story.title} ${imgIndex + 1}`}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            {/* Fallback */}
                            <div 
                              className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center text-gray-500">
                                <div className="text-3xl mb-2">📷</div>
                                <div className="text-xs">Image</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {section.caption && (
                        <p 
                          className="text-gray-600 text-sm mt-3 italic text-center"
                          dangerouslySetInnerHTML={{ __html: section.caption }}
                        />
                      )}
                    </div>
                  )}

                  {section.type === 'heading' && (
                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                      {section.text}
                    </h2>
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Navigation to Other Stories */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Other Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories
              ?.filter(s => s.slug !== story.slug)
              .slice(0, 3)
              .map((otherStory) => (
                <div
                  key={otherStory.id}
                  onClick={() => navigate(`/story/${otherStory.slug}`)}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        {otherStory.title}
                      </h4>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                        Click to read this story
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;