import { useState, useEffect } from 'react';
import '../LocalStorage.css';

export default function LocalStorageComponent() {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [storageItems, setStorageItems] = useState([]);
    const [message, setMessage] = useState('');

    // Load all localStorage items on component mount
    useEffect(() => {
        loadStorageItems();
    }, []);

    const loadStorageItems = () => {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            items.push({
                key: storageKey,
                value: localStorage.getItem(storageKey)
            });
        }
        setStorageItems(items);
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (!key || !value) {
            setMessage('❌ Please enter both key and value');
            return;
        }

        // Save to localStorage
        localStorage.setItem(key, value);
        console.log(`Saved to localStorage: ${key} = ${value}`);
        
        setMessage(`✅ Saved: "${key}" = "${value}"`);
        setKey('');
        setValue('');
        loadStorageItems();
    };

    const handleGet = (e) => {
        e.preventDefault();
        
        if (!key) {
            setMessage('❌ Please enter a key to retrieve');
            return;
        }

        const retrievedValue = localStorage.getItem(key);
        
        if (retrievedValue !== null) {
            console.log(`Retrieved from localStorage: ${key} = ${retrievedValue}`);
            setMessage(`✅ Retrieved: "${key}" = "${retrievedValue}"`);
            setValue(retrievedValue);
        } else {
            setMessage(`❌ Key "${key}" not found in localStorage`);
        }
    };

    const handleDelete = (keyToDelete) => {
        localStorage.removeItem(keyToDelete);
        console.log(`Deleted from localStorage: ${keyToDelete}`);
        setMessage(`✅ Deleted: "${keyToDelete}"`);
        loadStorageItems();
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all localStorage data?')) {
            localStorage.clear();
            console.log('Cleared all localStorage');
            setMessage('✅ All localStorage data cleared');
            loadStorageItems();
        }
    };

    const handleSaveObject = () => {
        const user = {
            name: 'John Doe',
            email: 'john@example.com',
            age: 30,
            preferences: {
                theme: 'dark',
                notifications: true
            }
        };
        
        // Must stringify objects before saving to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Saved user object to localStorage:', user);
        setMessage('✅ Saved user object (check console and storage list)');
        loadStorageItems();
    };

    const handleGetObject = () => {
        const userString = localStorage.getItem('user');
        
        if (userString) {
            // Must parse JSON strings when retrieving objects
            const user = JSON.parse(userString);
            console.log('Retrieved user object:', user);
            setMessage(`✅ Retrieved user: ${user.name} (check console)`);
        } else {
            setMessage('❌ No user object found. Save one first!');
        }
    };

    return (
        <div className="storage-container">
            <h2>LocalStorage Example</h2>
            <p className="description">Store and retrieve data in the browser</p>

            {message && (
                <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <div className="section">
                <h3>Save Data</h3>
                <form onSubmit={handleSave}>
                    <div>
                        <label>Key:</label>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="e.g., username, theme, token"
                        />
                    </div>
                    <div>
                        <label>Value:</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="e.g., John, dark, abc123"
                        />
                    </div>
                    <button type="submit">💾 Save to LocalStorage</button>
                </form>
            </div>

            <div className="section">
                <h3>Get Data</h3>
                <form onSubmit={handleGet}>
                    <div>
                        <label>Key:</label>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Enter key to retrieve"
                        />
                    </div>
                    <button type="submit">🔍 Get from LocalStorage</button>
                </form>
            </div>

            <div className="section">
                <h3>Store/Retrieve Objects</h3>
                <p>Objects must be stringified with JSON.stringify()</p>
                <div className="button-group">
                    <button onClick={handleSaveObject} className="btn-object">
                        💾 Save User Object
                    </button>
                    <button onClick={handleGetObject} className="btn-object">
                        🔍 Get User Object
                    </button>
                </div>
            </div>

            <div className="section storage-list">
                <div className="section-header">
                    <h3>Current LocalStorage ({storageItems.length} items)</h3>
                    {storageItems.length > 0 && (
                        <button onClick={handleClearAll} className="btn-clear">
                            🗑️ Clear All
                        </button>
                    )}
                </div>
                
                {storageItems.length === 0 ? (
                    <p className="empty-state">No items in localStorage</p>
                ) : (
                    <div className="storage-items">
                        {storageItems.map((item, index) => (
                            <div key={index} className="storage-item">
                                <div className="item-content">
                                    <strong>{item.key}:</strong>
                                    <span>{item.value}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.key)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="info-section">
                <h4>📝 About LocalStorage:</h4>
                <ul>
                    <li><strong>Persistent:</strong> Data survives page refresh and browser restart</li>
                    <li><strong>String only:</strong> Can only store strings (use JSON.stringify/parse for objects)</li>
                    <li><strong>Size limit:</strong> ~5-10MB per domain</li>
                    <li><strong>Synchronous:</strong> Operations are blocking</li>
                    <li><strong>Same origin:</strong> Data is accessible only on the same domain</li>
                </ul>
                <h4>🔧 Common Methods:</h4>
                <ul>
                    <li><code>localStorage.setItem(key, value)</code> - Save data</li>
                    <li><code>localStorage.getItem(key)</code> - Retrieve data</li>
                    <li><code>localStorage.removeItem(key)</code> - Delete data</li>
                    <li><code>localStorage.clear()</code> - Delete all data</li>
                </ul>
            </div>
        </div>
    );
}
