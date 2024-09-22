// MainContent.js
import React from 'react';


const MainContent = ({ handleFileChange }) => {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Filter And Arrange Pdf - pdfExtractor For Free</h1>
        <p className="text-gray-600 mt-4">
          Use pdfExtractor to get Your filterd PDF and Make Your Own Order
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdfUpload"
        />
        <label htmlFor="pdfUpload" className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
          <p className="text-gray-600">Drag and drop document here to upload</p>
          <span className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Select from device
          </span>
        </label>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Up to 100 MB for PDF files.
        </p>
      </div>
    </main>
  );
};

export default MainContent;
