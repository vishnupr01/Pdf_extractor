import express from 'express'
import { checkPdf, extractPages, upload, uploadPdf } from '../controllers/pdfController.js';

const router = express.Router()
router.post('/upload',upload.single('pdfFile'),uploadPdf)
router.get('/check', checkPdf);
router.post('/extract',extractPages)
export default router