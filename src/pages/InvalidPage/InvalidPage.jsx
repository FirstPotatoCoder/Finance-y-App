import React from "react";
import "./InvalidPage.css";

export default function InvalidPage() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Oops! Page not found.</p>
      <p className="notfound-text">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="notfound-button">
        ⬅ Back to Home
      </a>
    </div>
  );
}