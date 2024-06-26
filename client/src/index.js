import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);