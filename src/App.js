import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Page_1 from './pages/Page_1/Page_1';
import Page_2 from './pages/Page_2/Page_2';
import Page_3 from './pages/Page_3/Page_3';
import Page_4 from './pages/Page_4/Page_4';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-brand">Finance-y App</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/page_1">Page 1</Link>
            <Link to="/page_2">Page 2</Link>
            <Link to="/page_3">Page 3</Link>
            <Link to="/page_4">Page 4</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page_1" element={<Page_1 />} />
          <Route path="/page_2" element={<Page_2 />} />
          <Route path="/page_3" element={<Page_3 />} />
          <Route path="/page_4" element={<Page_4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
