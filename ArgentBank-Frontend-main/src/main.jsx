import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import Layout from './components/Layout';

import './assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // si tu utilises font-awesome via npm

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}></Route>
        <Route path="/" element={<Home />} />
        {/* Ajoute tes autres pages ici */}
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
