# Form Data Backend Server

A simple Node.js/Express backend server for demonstrating form data handling.

## Installation

```bash
cd server
npm install
```

## Running the Server

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Available Endpoints

### 1. Simple Form Data (No Files)
- **URL**: `POST /api/form-data`
- **Description**: Accepts form data without file uploads
- **Example**:
  ```javascript
  const formData = new FormData();
  formData.append('username', 'john_doe');
  formData.append('email', 'john@example.com');
  
  fetch('http://localhost:3001/api/form-data', {
    method: 'POST',
    body: formData
  });
  ```

### 2. Form Data with Single File
- **URL**: `POST /api/form-data-with-file`
- **Description**: Accepts form data with a single file upload
- **Example**:
  ```javascript
  const formData = new FormData();
  formData.append('username', 'john_doe');
  formData.append('file', fileInput.files[0]);
  
  fetch('http://localhost:3001/api/form-data-with-file', {
    method: 'POST',
    body: formData
  });
  ```

### 3. Form Data with Multiple Files
- **URL**: `POST /api/form-data-multiple-files`
- **Description**: Accepts form data with multiple file uploads (max 10)
- **Example**:
  ```javascript
  const formData = new FormData();
  formData.append('username', 'john_doe');
  Array.from(fileInput.files).forEach(file => {
    formData.append('files', file);
  });
  
  fetch('http://localhost:3001/api/form-data-multiple-files', {
    method: 'POST',
    body: formData
  });
  ```

### 4. Health Check
- **URL**: `GET /api/health`
- **Description**: Check if server is running

## Features

- ✅ CORS enabled for frontend integration
- ✅ Handles multipart/form-data
- ✅ Single and multiple file uploads
- ✅ File storage with unique filenames
- ✅ Detailed response with uploaded file information

## File Storage

Uploaded files are stored in the `uploads/` directory with unique filenames.
