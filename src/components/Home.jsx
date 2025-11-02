import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Web API Examples</h1>
            <p className="subtitle">Learn different ways to handle data in web applications</p>

            <div className="cards-container">
                <Link to="/formdata" className="card">
                    <div className="card-icon">📤</div>
                    <h2>Form Data</h2>
                    <p>Upload files and form data using multipart/form-data</p>
                    <ul>
                        <li>File uploads</li>
                        <li>Form submissions</li>
                        <li>Multipart encoding</li>
                    </ul>
                </Link>

                <Link to="/jsondata" className="card">
                    <div className="card-icon">🔐</div>
                    <h2>JSON + API Key</h2>
                    <p>Send JSON data with authorization headers</p>
                    <ul>
                        <li>JSON payloads</li>
                        <li>API key authentication</li>
                        <li>GET & POST requests</li>
                    </ul>
                </Link>

                <Link to="/localstorage" className="card">
                    <div className="card-icon">💾</div>
                    <h2>LocalStorage</h2>
                    <p>Store and retrieve data in the browser</p>
                    <ul>
                        <li>Persistent storage</li>
                        <li>Save/get/delete data</li>
                        <li>Works offline</li>
                    </ul>
                </Link>

                <Link to="/renderprops" className="card">
                    <div className="card-icon">🔄</div>
                    <h2>Render Props</h2>
                    <p>Reusable components with conditional rendering</p>
                    <ul>
                        <li>Component composition</li>
                        <li>Conditional rendering</li>
                        <li>Empty state handling</li>
                    </ul>
                </Link>

                <Link to="/virtualscroll" className="card">
                    <div className="card-icon">📜</div>
                    <h2>Virtual Scrolling</h2>
                    <p>Infinite scroll with react-window and faker data</p>
                    <ul>
                        <li>Load data on scroll</li>
                        <li>Performance optimization</li>
                        <li>Large dataset handling</li>
                    </ul>
                </Link>

                <Link to="/fetch" className="card">
                    <div className="card-icon">🌐</div>
                    <h2>Fetch Hook</h2>
                    <p>Learn loading and error states while fetching</p>
                    <ul>
                        <li>GET / POST examples</li>
                        <li>Abort in-flight requests</li>
                        <li>API key headers</li>
                    </ul>
                </Link>
            </div>

            <div className="info-box">
                <h3>🚀 Backend Server</h3>
                <p>Make sure the backend is running on <code>http://localhost:8000</code></p>
                <p>Run: <code>cd server && npm start</code></p>
                <p className="note">Note: LocalStorage works without backend</p>
            </div>
        </div>
    );
}
