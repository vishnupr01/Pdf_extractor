import app from  './app.js'; // Use the correct relative path
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
  
})
