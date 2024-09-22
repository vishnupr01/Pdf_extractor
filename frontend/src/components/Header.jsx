import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">pdfExtractor</h1>
        {/* Navigation can be added here */}
      </div>
    </header>
  );
};

export default Header;
