import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import List from './List';
import Register from './Register'; // Import the Register component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
