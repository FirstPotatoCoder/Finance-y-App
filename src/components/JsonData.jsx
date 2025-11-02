import '../JsonData.css';

export default function JsonDataComponent() {
    const API_KEY = 'my-secret-api-key-12345';

    const handlePostRequest = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const jsonData = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: parseInt(formData.get('age'))
        };

        console.log('Sending JSON data:', jsonData);

        fetch('http://localhost:8000/api/json/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('User created! Check console for details.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating user. Check console.');
        });
    };

    const handleGetRequest = () => {
        console.log('Fetching data with API key...');

        fetch('http://localhost:8000/api/json/data', {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Data retrieved! Check console for details.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching data. Check console.');
        });
    };

    return (
        <div className="json-container">
            <h2>JSON Request with API Key</h2>
            <p className="api-key-display">🔑 API Key: <code>{API_KEY}</code></p>

            <div className="section">
                <h3>POST Request (Create User)</h3>
                <form onSubmit={handlePostRequest}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" required />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required />
                    </div>

                    <div>
                        <label>Age:</label>
                        <input type="number" name="age" required min="1" />
                    </div>

                    <button type="submit">Send JSON POST</button>
                </form>
            </div>

            <div className="section">
                <h3>GET Request (Fetch Data)</h3>
                <p>Click the button to fetch data from the API with authorization.</p>
                <button onClick={handleGetRequest} className="get-button">
                    Send JSON GET
                </button>
            </div>

            <div className="info-section">
                <h4>📝 Key Differences from FormData:</h4>
                <ul>
                    <li><strong>Content-Type:</strong> <code>application/json</code> instead of <code>multipart/form-data</code></li>
                    <li><strong>Body:</strong> JSON string created with <code>JSON.stringify()</code></li>
                    <li><strong>Authorization:</strong> API key sent in <code>x-api-key</code> header</li>
                    <li><strong>No file uploads:</strong> JSON is for structured data only</li>
                </ul>
            </div>
        </div>
    );
}
