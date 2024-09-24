import express from 'express'
import path from 'path'
import cors from 'cors'
import pdfRoutes from  './routes/pdfRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const corsOptions = {
  origin: process.env.BACKEND_URL, // specify your front-end URL
  credentials: true, // allow credentials
};

app.use(cors(corsOptions));
app.use(express.json())


app.use('/api',pdfRoutes)
export default app