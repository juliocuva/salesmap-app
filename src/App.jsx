import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapApp from './pages/MapApp';

function App() {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Detectamos si la página se está cargando dentro de un iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isInIframe ? <MapApp /> : <LandingPage />} />
        
        {/* Rutas explícitas */}
        <Route path="/map" element={<MapApp />} />
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Ruta dinámica para Multi-tenant */}
        <Route path="/:projectId" element={<MapApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
