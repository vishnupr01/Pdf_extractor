import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFConverter from '../pages/Home';
import SelectedPages from '../components/SelectedPages';

function UserRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PDFConverter/>} />
        <Route path='/selectedPages' element={<SelectedPages/>}/>
      </Routes>
    </Router>
  );
}

export default UserRoutes;
