import express from 'express'
import path from 'path'
import cors from 'cors'
import pdfRoutes from  './routes/pdfRoutes.js'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000', // specify your front-end URL
  credentials: true, // allow credentials
};

app.use(cors(corsOptions));
app.use(express.json())


app.use('/api',pdfRoutes)
export default app