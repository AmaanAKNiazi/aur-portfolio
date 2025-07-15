// src/pages/Announcements.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Announcements = () => {
  const { eventSlug } = useParams(); // FIXED: Changed from eventId to eventSlug
  const navigate = useNavigate();
  const { timeline_events } = mediaAssets;

  // FIXED: Find the specific event by slug instead of id
  const event = timeline_events.find(e => e.slug === eventSlug);

  const handleBackToTimeline = () => {
    navigate('/timeline');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Page Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the event you're looking for.</p>
          <button
            onClick={handleBackToTimeline}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Timeline
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
                Announcement Details
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Learn more about this milestone in our journey
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBackToTimeline}
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Back to Timeline
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

      {/* Event Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Event Header */}
          <div className="px-12 py-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-semibold text-lg">{event.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {event.heading}
            </h1>

            {/* Large Event Image */}
            <div className="relative w-full h-[500px] bg-gray-200 rounded-xl overflow-hidden mb-8">
              <img
                src={event.image}
                alt={event.heading}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback background */}
              <div 
                className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center"
                style={{ display: 'none' }}
              >
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-4">📸</div>
                  <div className="text-xl font-medium">{event.heading}</div>
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="prose prose-xl max-w-none">
              <div 
                className="text-gray-700 text-xl leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: event.preview }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-10 border-t border-gray-200">
              {event.news_link && (
                <button
                  onClick={() => window.open(event.news_link, '_blank')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Read Original News Article
                </button>
              )}
              
              <button
                onClick={() => navigate('/stories')}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Related Stories
              </button>
            </div>
          </div>
        </article>

        {/* Navigation to Other Events */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Other Timeline Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timeline_events
              .filter(e => e.slug !== event.slug) // FIXED: Filter by slug instead of id
              .slice(0, 4)
              .map((otherEvent) => (
                <div
                  key={otherEvent.id}
                  onClick={() => navigate(`/announcements/${otherEvent.slug}`)} // FIXED: Navigate using slug
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        {otherEvent.heading}
                      </h4>
                      <p className="text-sm text-blue-600 mt-1">
                        {otherEvent.date}
                      </p>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                        {otherEvent.preview}
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

export default Announcements;