import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFConverter from '../pages/Home';

function UserRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PDFConverter/>} />
      </Routes>
    </Router>
  );
}

export default UserRoutes;
