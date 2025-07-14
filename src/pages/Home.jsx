// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Map from '../components/Map';
import Video from '../components/Video';

const Home = () => {
  return (
    <div>
      <Hero />
      <Map />
      <Video />
      {/* Add more sections here as you create them */}
    </div>
  );
};

export default Home;