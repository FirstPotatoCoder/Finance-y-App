const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8000;

// Configure multer for handling form data with file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable CORS for React frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple form data endpoint (no file upload)
app.post('/api/form-data', (req, res) => {
  console.log('Received form data:', req.body);
  
  res.json({
    success: true,
    message: 'Form data received successfully',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Form data endpoint with file upload
app.post('/api/form-data-with-file', upload.single('file'), (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Received file:', req.file);
  
  res.json({
    success: true,
    message: 'Form data and file received successfully',
    data: req.body,
    file: req.file ? {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    } : null,
    timestamp: new Date().toISOString()
  });
});

// Multiple files upload endpoint
app.post('/api/form-data-multiple-files', upload.array('files', 10), (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Received files:', req.files);
  
  res.json({
    success: true,
    message: 'Form data and files received successfully',
    data: req.body,
    files: req.files ? req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    })) : [],
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ===== JSON API ENDPOINTS WITH AUTHORIZATION =====

// Middleware to verify API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  console.log('Checking API key:', apiKey);
  
  // Simple API key validation (in production, use secure keys)
  if (apiKey === 'my-secret-api-key-12345') {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    });
  }
};

// JSON endpoint - Create user (with API key)
app.post('/api/json/users', verifyApiKey, (req, res) => {
  console.log('Received JSON data:', req.body);
  
  const { name, email, age } = req.body;
  
  // Simulate creating a user
  res.json({
    success: true,
    message: 'User created successfully',
    user: {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      age,
      createdAt: new Date().toISOString()
    }
  });
});

// JSON endpoint - Get data (with API key)
app.get('/api/json/data', verifyApiKey, (req, res) => {
  console.log('GET request with API key');
  
  res.json({
    success: true,
    message: 'Data retrieved successfully',
    data: {
      items: [
        { id: 1, name: 'Item 1', value: 100 },
        { id: 2, name: 'Item 2', value: 200 },
        { id: 3, name: 'Item 3', value: 300 }
      ],
      timestamp: new Date().toISOString()
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`\n--- Form Data Endpoints ---`);
  console.log(`   - POST http://localhost:${PORT}/api/form-data`);
  console.log(`   - POST http://localhost:${PORT}/api/form-data-with-file`);
  console.log(`   - POST http://localhost:${PORT}/api/form-data-multiple-files`);
  console.log(`\n--- JSON Endpoints (Require API Key) ---`);
  console.log(`   - POST http://localhost:${PORT}/api/json/users`);
  console.log(`   - GET  http://localhost:${PORT}/api/json/data`);
  console.log(`\n--- Other ---`);
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`\n🔑 API Key: my-secret-api-key-12345`);
});
