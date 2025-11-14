// components/Component_0/Component_0.jsx
import { Link } from 'react-router-dom';
import './Component_0.css';

export default function Component_0({ to, icon, title, description, items = [] }) {
  return (
    <Link to={to} className="card">
      <div className="card-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {items.length > 0 && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </Link>
  );
}