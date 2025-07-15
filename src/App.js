// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Stories from './pages/Stories';
import Story from './pages/Story'; // Add this import
import Archives from './pages/Archives';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import WhoWeAre from './pages/WhoWeAre';
import Announcements from './pages/Announcements';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/story/:storySlug" element={<Story />} /> {/* Add this route */}
          <Route path="/archives" element={<Archives />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/announcements/:eventSlug" element={<Announcements />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;