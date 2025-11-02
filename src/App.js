import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import FormDataComponent from './components/FormData';
import JsonDataComponent from './components/JsonData';
import LocalStorageComponent from './components/LocalStorage';
import RenderPropsComponent from './components/RenderProps';
import VirtualScrollComponent from './components/VirtualScroll';
import FetchDemo from './components/FetchDemo';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-brand">Web API Demo</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/formdata">Form Data</Link>
            <Link to="/jsondata">JSON Data</Link>
            <Link to="/localstorage">LocalStorage</Link>
            <Link to="/renderprops">Render Props</Link>
            <Link to="/virtualscroll">Virtual Scroll</Link>
            <Link to="/fetch">Fetch</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formdata" element={<FormDataComponent />} />
          <Route path="/jsondata" element={<JsonDataComponent />} />
          <Route path="/localstorage" element={<LocalStorageComponent />} />
          <Route path="/renderprops" element={<RenderPropsComponent />} />
          <Route path="/virtualscroll" element={<VirtualScrollComponent />} />
          <Route path="/fetch" element={<FetchDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
