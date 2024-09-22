import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { checkPdf, selected } from '../api/pdfApi';
import toast from 'react-hot-toast';

const SelectedPages = ({ uploadedFileName }) => {
  const navigate = useNavigate();
  const [pdfPages, setPdfPages] = useState([]);
  const [pageImages, setPageImages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [count, setCount] = useState(0)
  const [fileName, setFileName] = useState('')


  const base64ToBlob = async (base64, type = 'application/pdf') => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let temp = new Blob([byteNumbers], { type });
    console.log("temporary : ", temp);
    return temp;
  };

  const checkingPdf = async (fileName) => {
    try {
      const response = await checkPdf(fileName);
      const { buffer } = response.data.data;
      setFileName(response.data.fileName) // Ensure this is a valid base64 string
      console.log("Buffer:", buffer);
      console.log("fileName", response.data.fileName);


      if (buffer) {
        const blob = await base64ToBlob(buffer); // Convert to Blob
        console.log("blob in checkingPDF : ", blob);
        // console.log("setPdfFile : ",pdfFile);
        setPdfFile(blob);
      } else {
        console.error("Buffer is empty or not valid");
      }
    } catch (error) {
      console.error("Error checking PDF:", error);
    }
  };
  const loadPdfPages = async () => {
    // if (!pdfFile || !(pdfFile instanceof Blob)) {
    //   console.error("pdfFile is not a valid Blob");
    //   return;
    // }
    console.log("pdfv : ", pdfFile)
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result);
      try {
        const pdfjsDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const totalPages = pdfjsDoc.numPages;
        setPdfPages(Array.from({ length: totalPages }, (_, i) => i + 1));

        const images = [];
        for (let i = 1; i <= totalPages; i++) {
          const page = await pdfjsDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 }); // Smaller scale for smaller images
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          // Set the canvas dimensions
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Render the PDF page into the canvas context
          await page.render({ canvasContext: context, viewport }).promise;

          // Convert canvas to data URL
          images.push(canvas.toDataURL());
        }
        setPageImages(images);
      } catch (error) {
        console.error('Error while rendering PDF:', error);
      }
    };
    console.log("pdffile", pdfFile)
    fileReader.readAsArrayBuffer(pdfFile);




  };
  console.log("pdfFile state : ", pdfFile);
  console.count("pdfFile state : ");
  const multipleFun = async () => {
    try {
      console.log("checking pdf... : ", pdfFile);
      await checkingPdf(uploadedFileName);
      console.log("pdFile in multipleFun : ", pdfFile);
      // if (pdfFile) {
      //   (); // Call loadPdfPages directly
      // }
    } catch (error) {
      console.error("Error in multipleFun:", error);
    }
  };

  useEffect(() => {
    if (uploadedFileName) {
      multipleFun()
    }
  }, [count]);

  const handlePageSelect = (pageNumber) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((page) => page !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  if (pdfFile && pdfPages.length == 0) {
    loadPdfPages();
  }

  const backtoHome = () => {
    localStorage.removeItem('pdfFile');
    window.location.reload();
    setPdfFile(null); // Call the reset function passed as prop
    navigate('/'); // Navigate back to home
  };
  console.log("selectedPages:", selectedPages);
  const downloadSelectedPages = async () => {
    try {
      if (selectedPages.length === 0) {
        toast('Please select at least one page to download');
        return;
      }
  
      const response = await selected(selectedPages, fileName);
      console.log("Response from download:", response.data);
  
    
      const byteValues = Object.values(response.data); 
  
 
      const byteArray = new Uint8Array(byteValues);
  

      const blob = new Blob([byteArray], { type: 'application/pdf' });
  

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `extracted_${fileName}`;
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(link.href);
      
    } catch (error) {
      console.error("Error downloading selected pages:", error);
      toast('Failed to download the selected pages');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h2 className='text-2xl font-bold mb-4'>Select Pages to Extract</h2>
      <div className='border border-gray-300 rounded-lg p-4 bg-white shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {pdfPages.map((page, index) => (
            <div key={page} className='flex flex-col items-center p-2 border border-gray-200 rounded-md shadow-sm'>
              <input
                type="checkbox"
                id={`page-${page}`}
                checked={selectedPages.includes(page)}
                onChange={() => handlePageSelect(page)}
              />
              <label htmlFor={`page-${page}`} className='ml-2'>
                Page {page}
              </label>
              {pageImages[index] && (
                <img src={pageImages[index]} alt={`Page ${page}`} className='mt-2 max-w-[80%] h-auto border border-gray-300 rounded-md shadow-sm' />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between mt-4'>
        <button onClick={() => downloadSelectedPages()} className='px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
          Download Selected Pages
        </button>
        <button onClick={() => backtoHome()} className='ml-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>
          Select New PDF
        </button>
      </div>
    </div>
  );
};

export default SelectedPages;
