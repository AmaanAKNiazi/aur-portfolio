// src/pages/Archives.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Archives = () => {
  const navigate = useNavigate();
  const { archives } = mediaAssets;

  const handleBackHome = () => {
    navigate('/');
  };

  const handleDocumentClick = (document) => {
    if (document.type === 'url') {
      window.open(document.link, '_blank');
    } else if (document.type === 'google_doc') {
      window.open(document.link, '_blank');
    } else if (document.type === 'google_drive_pdf' || document.type === 'google_drive_doc') {
      window.open(document.link, '_blank');
    } else if (document.type === 'pdf_viewer' || document.type === 'pdf') {
      window.open(document.file_path, '_blank');
    } else if (document.type === 'doc') {
      window.open(document.file_path, '_blank');
    } else if (document.type === 'image') {
      window.open(document.file_path, '_blank');
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf':
      case 'pdf_viewer':
        return '📄';
      case 'doc':
        return '📝';
      case 'google_doc':
        return '📄';
      case 'google_drive_pdf':
        return '📄';
      case 'google_drive_doc':
        return '📝';
      case 'image':
        return '🖼️';
      case 'url':
        return '🔗';
      default:
        return '📄';
    }
  };

  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case 'pdf':
      case 'pdf_viewer':
        return 'PDF Document';
      case 'doc':
        return 'Document';
      case 'google_doc':
        return 'Google Doc';
      case 'google_drive_pdf':
        return 'Google Drive PDF';
      case 'google_drive_doc':
        return 'Google Drive Doc';
      case 'image':
        return 'Image';
      case 'url':
        return 'Web Link';
      default:
        return 'Document';
    }
  };

const renderDocumentPreview = (document, docIndex) => {
  if (document.type === 'pdf_viewer' || document.type === 'pdf') {
    return (
      <div className="relative h-72 bg-gray-100 overflow-hidden">
        <iframe
          src={`${document.file_path}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="w-full h-full border-0"
          title={document.title}
          onError={(e) => {
            // If iframe fails, show fallback
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback if iframe fails */}
        <div 
          className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center cursor-pointer group"
          style={{ display: 'none' }}
          onClick={() => handleDocumentClick(document)}
        >
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📄</div>
            <div className="text-lg font-medium text-gray-700">PDF Document</div>
            <div className="text-sm text-gray-500 mt-2">Click to view</div>
          </div>
        </div>
      </div>
    );
  }

    // For PDF files - show a nice preview card instead of trying to render the PDF
    if (document.type === 'pdf_viewer' || document.type === 'pdf') {
      return (
        <div className="relative h-72 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center cursor-pointer group hover:from-red-100 hover:to-red-200 transition-colors duration-200"
             onClick={() => handleDocumentClick(document)}>
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
              📄
            </div>
            <div className="text-lg font-medium text-gray-700">PDF Document</div>
            <div className="text-sm text-gray-500 mt-2">Click to view</div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-red-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    if (document.preview_image) {
      return (
        <div className="relative h-72 bg-gray-100 overflow-hidden">
          <img
            src={document.preview_image}
            alt={document.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback for images */}
          <div 
            className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center cursor-pointer group"
            style={{ display: 'none' }}
            onClick={() => handleDocumentClick(document)}
          >
            <div className="text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                🖼️
              </div>
              <div className="text-lg font-medium text-gray-700">Image</div>
              <div className="text-sm text-gray-500 mt-2">Click to view</div>
            </div>
          </div>
        </div>
      );
    }

    // Default fallback preview
    return (
      <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center cursor-pointer group hover:from-gray-200 hover:to-gray-400 transition-colors duration-200"
           onClick={() => handleDocumentClick(document)}>
        <div className="text-center">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
            {getDocumentIcon(document.type)}
          </div>
          <div className="text-lg font-medium text-gray-700">{getDocumentTypeLabel(document.type)}</div>
          <div className="text-sm text-gray-500 mt-2">Click to view</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Archives
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Historical documents, research papers, and policy publications
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

      {/* Archives Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {archives && archives.length > 0 ? (
          <div className="space-y-12">
            {archives.map((topic, topicIndex) => (
              <div key={topicIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Topic Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {topic.title}
                  </h2>
                  {topic.description && (
                    <p className="text-gray-600 text-lg">
                      {topic.description}
                    </p>
                  )}
                </div>

                {/* Documents Grid */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {topic.documents.map((document, docIndex) => (
                      <div
                        key={docIndex}
                        className="group bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border hover:border-blue-200"
                      >
                        {/* Document Preview */}
                        <div className="relative overflow-hidden">
                          {renderDocumentPreview(document, docIndex)}
                          
                          {/* External Link Icon */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleDocumentClick(document)}
                              className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Document Info */}
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-3 text-lg">
                            {document.title}
                          </h3>
                          {document.date && (
                            <p className="text-sm text-gray-500 mb-3">
                              {document.date}
                            </p>
                          )}
                          {document.description && (
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                              {document.description}
                            </p>
                          )}
                          
                          {/* Document Type Badge */}
                          <div className="flex items-center mb-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {getDocumentTypeLabel(document.type)}
                            </span>
                          </div>
                          
                          {/* Open Document Button */}
                          <div className="flex items-center justify-center mt-4">
                            <button
                              onClick={() => handleDocumentClick(document)}
                              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50 w-full justify-center"
                            >
                              <span className="text-sm font-medium">
                                Open Document
                              </span>
                              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Archives Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're digitizing our historical documents and past initiatives. 
              This archive will showcase our legacy and evolution over time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archives;