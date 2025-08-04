import React from 'react';
import mediaAssets from '../../data/mediaAssets.json';

const Report = () => {
  const { resources } = mediaAssets;

  const scrollToReport = () => {
    const reportSection = document.getElementById('report-download-section');
    if (reportSection) {
      reportSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToSummary = () => {
    const summarySection = document.getElementById('summary-section');
    if (summarySection) {
      summarySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Buttons */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-0 flex-1">
              {resources.report.title}
            </h2>
            
            {/* Navigation Buttons */}
            <div className="flex flex-col space-y-3 md:ml-8 flex-shrink-0">
              <button
                onClick={scrollToReport}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View the Report
              </button>
              
              <button
                onClick={scrollToSummary}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View the Report Summary
              </button>
            </div>
          </div>
        </div>

        {/* Report Introduction Paragraphs */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-6">
            {resources.report.description.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>

        {/* Featured Report Download Box */}
        <div id="report-download-section" className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image Section */}
              <div className="order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-xl shadow-lg mx-auto" style={{ width: '314px', height: '444px' }}>
                  <img
                    src={resources.report.featured.image}
                    alt={resources.report.featured.title}
                    className="w-full h-full object-cover"
                    style={{ width: '314px', height: '444px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback for missing image */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                    style={{ display: 'none', width: '314px', height: '444px' }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-xl font-semibold text-gray-700">Research Report</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {resources.report.featured.title}
                </h3>
                
                <div className="space-y-4 mb-8">
                  {resources.report.featured.description.map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>

                {/* Download Button */}
                <button
                  onClick={() => window.open(resources.report.featured.downloadLink, '_blank')}
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download the Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;