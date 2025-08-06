import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // si tu utilises font-awesome via npm

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Ajoute tes autres pages ici */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
