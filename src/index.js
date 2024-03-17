import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Instead of using ReactDOM.render, use createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
