import '../FormData.css';

export default function FormDataComponent() {
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData object
        const form = new FormData(e.target);
        
        // Log what we're sending
        console.log('Sending form data:');
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }

        // Send to backend
        fetch('http://localhost:8000/api/form-data-with-file', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Form submitted successfully! Check console for details.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form. Check console.');
        });
    };

    return (
        <div className="form-container">
            <h2>FormData Upload Example</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>

                <div>
                    <label>File:</label>
                    <input type="file" name="file" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}