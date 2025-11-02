import { useState } from 'react';

export default function FetchDemo() {
  const [url, setUrl] = useState('http://localhost:8000/api/json/data');
  const [apiKey, setApiKey] = useState('my-secret-api-key-12345');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const parseResponse = async (res) => {
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  };

  const handleGet = async () => {
    setLoading(true);
    setStatus('loading');
    setError(null);
    setData(null);
    try {
      const res = await fetch(url, { headers: { 'x-api-key': apiKey } });
      const body = await parseResponse(res);
      if (!res.ok) throw new Error(`Request failed (${res.status} ${res.statusText}): ${typeof body === 'string' ? body : JSON.stringify(body)}`);
      setData(body);
      setStatus('success');
    } catch (e) {
      setError(e);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    setStatus('loading');
    setError(null);
    setData(null);
    try {
      const res = await fetch('http://localhost:8000/api/json/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          name: 'Student',
          email: 'student@example.com',
          age: 21,
          at: new Date().toISOString(),
        }),
      });
      const body = await parseResponse(res);
      if (!res.ok) throw new Error(`Request failed (${res.status} ${res.statusText}): ${typeof body === 'string' ? body : JSON.stringify(body)}`);
      setData(body);
      setStatus('success');
    } catch (e) {
      setError(e);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h2>Fetch demo (simple): loading and error states</h2>

      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          URL (GET)
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/data"
            style={{ padding: 10, border: '1px solid #ddd', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          API Key (x-api-key)
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="your-api-key"
            style={{ padding: 10, border: '1px solid #ddd', borderRadius: 6 }}
          />
        </label>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={handleGet} disabled={loading} style={{ padding: '10px 14px' }}>GET</button>
          <button onClick={handlePost} disabled={loading} style={{ padding: '10px 14px' }}>POST (to /api/json/users)</button>
          <span>Status: <strong>{status}</strong></span>
          {loading && <span style={{ color: '#FF9800' }}>Loading…</span>}
        </div>
      </div>

      {error && (
        <div style={{ color: 'crimson', whiteSpace: 'pre-wrap', marginBottom: 12 }}>
          Error: {error.message}
        </div>
      )}

      {data && (
        <pre style={{ background: '#111', color: '#eee', padding: 12, borderRadius: 6, overflowX: 'auto' }}>
          {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
        </pre>
      )}

      <p style={{ marginTop: 12, color: '#666' }}>
        Tip: 404 errors that contain <code>&lt;!DOCTYPE html</code> usually mean the request went to the wrong route (like the dev server) — double-check the URL and method.
      </p>
    </div>
  );
}
