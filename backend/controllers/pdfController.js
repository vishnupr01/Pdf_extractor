import { PDFDocument } from 'pdf-lib'
import fs from 'fs-extra'
import path from 'path'
import multer from 'multer'
import crypto from 'crypto'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.memoryStorage()
const upload = multer({ storage })
const uploadPdf = async (req, res) => {
  console.log("searching for", req.file);


  if (!req.file) {
    return res.status(400).send('No file Uploaded')
  }

  const hash = crypto.createHash('sha256')
  hash.update(req.file.buffer)
  const fileHash = hash.digest('hex')
  const filePath = path.join('./uploads', `${fileHash}.pdf`)
  try {
    await fs.access(filePath)
    return res.json({ status: 'success', fileName: `${fileHash}.pdf` })

  } catch (error) {
    await fs.writeFile(filePath, req.file.buffer)
    return res.json({ status: 'success', fileName: `${fileHash}.pdf` })
  }
}

const checkPdf = async (req, res) => {
  try {
    const { filename } = req.query;
    console.log("Requested filename:", filename);

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const filePath = path.join('C:\\PDF_EXTRACTOR\\backend\\uploads', filename);
    console.log("File path to check:", filePath);

    try {
      await fs.access(filePath);

      // Read the file buffer
      const fileBuffer = await fs.readFile(filePath);

      // Create a response object
      const responseData = {
        fieldname: 'pdfFile',
        originalname: filename,
        encoding: '7bit', // or appropriate encoding if needed
        mimetype: 'application/pdf',
        buffer: fileBuffer.toString('base64'), // Convert to Base64 for JSON
        size: fileBuffer.length,
      };

      // Send the response with the PDF structure
      return res.json({
        status: 'success',
        data: responseData,
        fileName: filename
      });

    } catch (error) {
      console.error("File access error:", error);
      return res.status(404).json({ status: 'error', message: 'File not found' });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
const extractPages = async (req, res) => {
  try {
    const { order, fileName } = req.body;
    if (!Array.isArray(order) || order.length === 0 || !fileName) {
      return res.status(400).json({ message: 'Invalid order or filename' });
    }

    const filePath = path.resolve(__dirname, '..', 'uploads', fileName);

    // Check file existence
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error("File does not exist:", filePath);
      return res.status(404).json({ message: 'File not found' });
    }

    // Read the PDF file
    const originalPdfBuffer = await fs.promises.readFile(filePath);
    console.log("Original PDF Buffer:", originalPdfBuffer);

    const originalPdfDoc = await PDFDocument.load(originalPdfBuffer);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNumber of order) {
      if (pageNumber > 0 && pageNumber <= originalPdfDoc.getPageCount()) {
        const [copiedPage] = await newPdfDoc.copyPages(originalPdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }
    }

    const newPdfBytes = await newPdfDoc.save();
    const newFilePath = path.join(__dirname, '..', 'uploads', `extracted_${fileName}`);
    await fs.promises.writeFile(newFilePath, newPdfBytes);
console.log(newPdfBytes);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="extracted_${fileName}"`,
    });
    res.send(newPdfBytes);

  } catch (error) {
    console.log("Error extracting pages:", error);
    res.status(500).json({ message: 'Failed to extract pages from PDF' });
  }
};



export { upload, uploadPdf, checkPdf, extractPages }