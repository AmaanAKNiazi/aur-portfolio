import React from 'react';
import mediaAssets from '../../data/mediaAssets.json';

const Summary = () => {
  const { resources } = mediaAssets;

  // Section type rendering function for individual sections within a topic
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <div key={index} className="mb-6">
            <p 
              className="text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
      
      case 'numbered':
        return (
          <div key={index} className="mb-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {section.content.map((item, itemIndex) => (
                <li 
                  key={itemIndex} 
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ol>
          </div>
        );
      
      case 'bullets':
        return (
          <div key={index} className="mb-6">
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {section.content.map((item, itemIndex) => (
                <li 
                  key={itemIndex} 
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>
        );
      
      case 'images':
        return (
          <div key={index} className="mb-6">
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {section.content.map((image, imageIndex) => (
                  <div key={imageIndex} className="flex items-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                      style={{ 
                        width: `${image.width}px`, 
                        height: `${image.height}px`,
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Topic content rendering function that handles mixed sections
  const renderTopicContent = (topic) => {
    if (!topic.sections || topic.sections.length === 0) {
      return null;
    }

    return (
      <div className="space-y-0">
        {topic.sections.map((section, index) => renderSection(section, index))}
      </div>
    );
  };

  return (
    <div id="summary-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {resources.summary.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Topics */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {resources.summary.topics.map((topic, index) => (
              <div key={topic.id}>
                {/* Topic Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  {topic.title}
                </h3>
                
                {/* Topic Content - Mixed Sections */}
                <div className="mb-12">
                  {renderTopicContent(topic)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;