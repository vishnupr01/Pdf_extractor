import React from 'react';

const PDFConverter = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-500">pdfFiller</h1>

          {/* Navigation */}
          {/* <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">Solutions</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Developers</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
          </nav> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Convert PDF to Fillable - Sejda For Free</h1>
          <p className="text-gray-600 mt-4">
            Use pdfFiller instead of Sejda to fill out forms and edit PDF documents online. Get a comprehensive PDF toolkit at the most competitive price.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-gray-600">Drag and drop document here to upload</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Select from device
            </button>
          </div>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Up to 100 MB for PDF and up to 25 MB for DOC, DOCX, RTF, PPT, PPTX, JPEG, PNG, or TXT
          </p>
        </div>
      </main>
    </div>
  );
};

export default PDFConverter;
