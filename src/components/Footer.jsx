// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Copyright Section */}
          <div className="text-sm text-gray-600 font-medium">
            Copyright © 2025 AUR
          </div>

          {/* Powered By Section */}
          <div className="text-sm text-gray-600 font-medium">
            Powered by AUR
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;