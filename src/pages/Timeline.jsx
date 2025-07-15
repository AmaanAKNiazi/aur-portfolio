// src/pages/Timeline.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mediaAssets from '../data/mediaAssets.json';

const Timeline = () => {
  const navigate = useNavigate();
  const [activeEventId, setActiveEventId] = useState(1);
  const [lineProgress, setLineProgress] = useState(0);
  const timelineRef = useRef(null);
  const eventRefs = useRef({});
  const { timeline_events } = mediaAssets;

  // Function to truncate preview text to 50 words
  const truncatePreview = (htmlText, wordLimit = 50) => {
    if (!htmlText) return '';
    
    // Remove HTML tags for word counting
    const textOnly = htmlText.replace(/<[^>]*>/g, '');
    const words = textOnly.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length <= wordLimit) {
      return htmlText; // Return original if under limit
    }
    
    // Truncate to word limit and add ellipsis
    const truncatedText = words.slice(0, wordLimit).join(' ');
    return truncatedText + '...';
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleReadMore = (eventSlug) => {
    navigate(`/announcements/${eventSlug}`);
  };

  // Get color classes for each event based on its color property
  const getEventColor = (color, isActive = false) => {
    const colors = {
      red: {
        dot: isActive ? 'bg-red-600' : 'bg-red-400',
        line: 'from-red-500 to-red-600'
      },
      green: {
        dot: isActive ? 'bg-green-600' : 'bg-green-400', 
        line: 'from-green-500 to-green-600'
      },
      black: {
        dot: isActive ? 'bg-gray-900' : 'bg-gray-600',
        line: 'from-gray-700 to-gray-900'
      }
    };
    return colors[color] || colors.black;
  };

  // Create a gradient for the animated line based on event colors
  const getLineGradient = () => {
    const activeEvent = timeline_events.find(event => event.id === activeEventId);
    if (activeEvent) {
      const colorConfig = getEventColor(activeEvent.color);
      return `bg-gradient-to-b ${colorConfig.line}`;
    }
    return 'bg-gradient-to-b from-blue-500 to-purple-600'; // fallback
  };

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const eventId = parseInt(entry.target.dataset.eventId);
          setActiveEventId(eventId);
          
          // Calculate line progress based on active event
          const eventIndex = timeline_events.findIndex(event => event.id === eventId);
          const progress = ((eventIndex + 1) / timeline_events.length) * 100;
          setLineProgress(progress);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all event elements
    Object.values(eventRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [timeline_events]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Timeline
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                A decade of transforming communities through urban rights advocacy
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

      {/* Animated Timeline */}
      <div className="relative py-16" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-16 bottom-16">
            {/* Background line */}
            <div className="w-1 h-full bg-gray-200 rounded-full"></div>
            {/* Animated progress line with changing colors */}
            <div 
              className={`absolute top-0 left-0 w-1 rounded-full transition-all duration-700 ease-out ${getLineGradient()}`}
              style={{ height: `${lineProgress}%` }}
            ></div>
          </div>

          {/* Timeline Events */}
          <div className="relative space-y-8 lg:space-y-12">
            {timeline_events.map((event, index) => (
              <div
                key={event.id}
                data-event-id={event.id}
                ref={(el) => (eventRefs.current[event.id] = el)}
                className={`relative flex items-center ${
                  event.side === 'left' 
                    ? 'lg:justify-start' 
                    : 'lg:justify-end'
                } justify-start`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${
                      activeEventId === event.id
                        ? `${getEventColor(event.color, true).dot} scale-125`
                        : `${getEventColor(event.color, false).dot} scale-100`
                    }`}
                  ></div>
                </div>

                {/* Event Content */}
                <div
                  className={`w-full lg:w-[48%] ${
                    event.side === 'left' 
                      ? 'lg:pr-12' 
                      : 'lg:pl-12'
                  } pl-16 lg:pl-0`}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-lg p-8 lg:p-10 transition-all duration-500 ${
                      activeEventId === event.id
                        ? 'scale-105 shadow-xl border-2 border-blue-200'
                        : 'scale-100 shadow-lg'
                    }`}
                  >
                    {/* Event Header */}
                    <div className="mb-6 lg:mb-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                        {event.heading}
                      </h3>
                      <p className="text-blue-600 font-semibold text-base lg:text-lg">
                        {event.date}
                      </p>
                    </div>

                    {/* Event Image - Conditional Rendering */}
                    {event.image && (
                      <div className="mb-6 lg:mb-8">
                        <div className="relative w-full h-52 lg:h-64 bg-gray-200 rounded-lg overflow-hidden">
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
                              <div className="text-3xl mb-2">📸</div>
                              <div className="text-sm">{event.heading}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Event Preview with Embedded Link - Truncated */}
                    <div 
                      className={`text-gray-700 leading-relaxed text-base lg:text-lg ${event.image ? 'mb-6 lg:mb-8' : 'mb-8 lg:mb-10'}`}
                      dangerouslySetInnerHTML={{ __html: truncatePreview(event.preview) }}
                    />

                    {/* Read More Button */}
                    <button
                      onClick={() => handleReadMore(event.slug)}
                      className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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

export default Timeline;