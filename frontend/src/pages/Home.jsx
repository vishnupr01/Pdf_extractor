import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MainContent from '../components/MainPage';
import SelectedPages from '../components/SelectedPages';
import Header from '../components/Header';
import { uploadPdf } from '../api/pdfApi';

const PDFConverter = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [showSelectedPages, setShowSelectedPages] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  useEffect(() => {
    const storedFile = null
    if (storedFile) {
      // If you have stored the file as a base64 string or just use the file name
      const file = JSON.parse(storedFile);
      console.log("existing file",file);
      
      if(file){
        uploadFile(file);
      }
    }
  }, []);

  const uploadFile = async (file) => {
    try {
      const response = await uploadPdf(file);
      console.log("uploaded response",response)
      if (response.data.status === "success") {
        setUploadedFileName(response.data.fileName); 
        toast.success("Select pages");
        setShowSelectedPages(true); // Set this to true after successful upload
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Please upload a valid PDF file");
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      localStorage.setItem('pdfFile', JSON.stringify(file.name)); // Store file name or handle file appropriately
      await uploadFile(file);
    } else {
      toast.error('Please upload a valid PDF file');
    }
  };

  const resetFileSelection = () => {
    localStorage.removeItem('pdfFile');
    setPdfFile(null);
    setShowSelectedPages(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {showSelectedPages ? (
        <SelectedPages uploadedFileName={uploadedFileName} setPdfFile={resetFileSelection} />
      ) : (
        <MainContent handleFileChange={handleFileChange} />
      )}
    </div>
  );
};

export default PDFConverter;
