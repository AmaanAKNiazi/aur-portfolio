import React from 'react';
import Preview from '../components/resources/Preview';
import Report from '../components/resources/Report';
import Details from '../components/resources/Details';
import Summary from '../components/resources/Summary';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Section 1: Preview Section */}
      <Preview />

      {/* Section 2: Report Section */}
      <Report />

      {/* Section 3: Details Section */}
      <Details />

      {/* Section 4: Summary Section */}
      <Summary />
    </div>
  );
};

export default Resources;