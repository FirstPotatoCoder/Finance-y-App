import { useState } from 'react';
import './FormDataDemo.css';

export default function FormDataDemo() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Example 1: Simple form data without file
  const handleSubmitSimple = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const form = new FormData();
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('message', formData.message);

    try {
      const res = await fetch('http://localhost:3001/api/form-data', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Form data with file
  const handleSubmitWithFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const form = new FormData();
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('message', formData.message);
    if (selectedFile) {
      form.append('file', selectedFile);
    }

    try {
      const res = await fetch('http://localhost:3001/api/form-data-with-file', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Form Data Demo</h1>
      <p className="subtitle">Demonstrating form data submission to Node.js backend</p>

      <div className="form-section">
        <h2>Enter Your Information</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter a message"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">File (optional):</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="file-info">Selected: {selectedFile.name}</p>
            )}
          </div>

          <div className="button-group">
            <button
              type="submit"
              onClick={handleSubmitSimple}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Sending...' : 'Submit Without File'}
            </button>

            <button
              type="submit"
              onClick={handleSubmitWithFile}
              disabled={loading}
              className="btn btn-secondary"
            >
              {loading ? 'Sending...' : 'Submit With File'}
            </button>
          </div>
        </form>
      </div>

      {response && (
        <div className={`response-section ${response.success ? 'success' : 'error'}`}>
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div className="info-section">
        <h3>💡 How It Works</h3>
        <ul>
          <li>The form data is sent as <code>multipart/form-data</code></li>
          <li>Backend runs on <code>http://localhost:3001</code></li>
          <li>Frontend runs on <code>http://localhost:3000</code></li>
          <li>CORS is enabled to allow cross-origin requests</li>
          <li>Files are stored in the <code>server/uploads/</code> directory</li>
        </ul>
      </div>
    </div>
  );
}
