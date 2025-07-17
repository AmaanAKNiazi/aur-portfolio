// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/home/Hero';
import Map from '../components/home/Map';
import Video from '../components/home/Video';

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