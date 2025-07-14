// src/components/Video.jsx
import React, { useState } from 'react';
import mediaAssets from '../data/mediaAssets.json';

const Video = () => {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { videos } = mediaAssets;
  const videoData = videos.hero_video;

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handlePlayPause = (videoElement) => {
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Heading */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {videoData.title}
            </h2>
          </div>

          {/* Video Container - Much Larger */}
          <div className="relative">
            <div className="relative w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
              {!videoError ? (
                <div className="relative w-full aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    poster={videoData.poster}
                    onError={handleVideoError}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={videoData.src} type="video/mp4" />
                    <source src={videoData.src.replace('.mp4', '.webm')} type="video/webm" />
                    <source src={videoData.src.replace('.mp4', '.ogv')} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Play Button Overlay (Optional) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="w-24 h-24 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      {isPlaying ? (
                        <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-10 h-10 text-gray-800 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0h6" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback Content */
                <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center text-gray-600 p-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-4">Video Coming Soon</h3>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                      We're preparing a video to share our story with you.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-xl leading-relaxed">
              {videoData.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;