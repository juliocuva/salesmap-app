import React, { useState, useEffect } from 'react';
import { mockLocals } from '../../data/mockData';
import MapSvgOverlay from './MapSvgOverlay';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plus, Minus, Search, Home, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InteractiveMap({ selectedLocal, onSelectLocal, visionMode, onCloseVision }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reiniciar el índice de la imagen cuando cambia el modo de visión o se cierra
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [visionMode]);

  const handleMapClick = (e) => {
    // Si se hizo clic en un hotspot, ignorar
    if (e.target.classList.contains('local-hotspot')) return;
  };

  // Definir las imágenes según el modo
  const getImages = () => {
    if (visionMode === 'cafeteria') {
      return ['/cafeteria1.png', '/cafeteria2.png'];
    }
    if (visionMode === 'heladeria') {
      return ['/heladeria1.png', '/heladeria2.png'];
    }
    if (visionMode === 'joyeria') {
      return ['/joyeria1.png', '/joyeria2.png'];
    }
    if (visionMode === 'accesorios') {
      return ['/accesorios1.png'];
    }
    if (visionMode === 'restaurante') {
      return ['/restaurante1.png', '/restaurante2.png', '/restaurante3.png'];
    }
    if (visionMode === 'drogueria') {
      return ['/drogueria1.png', '/drogueria2.png'];
    }
    if (visionMode === 'petshop') {
      return ['/petshop1.png', '/petshop2.png'];
    }
    return ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'];
  };

  const images = getImages();

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="map-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#f4f7f6' }}>
      <TransformWrapper
        initialScale={1.5}
        initialPositionX={0}
        initialPositionY={-250}
        minScale={1.5}
        maxScale={4}
        limitToBounds={true}
        wheel={{ step: 0.03, smoothStep: 0.005 }}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement }) => (
          <>
            {/* Controles de Zoom a la izquierda */}
            <div 
              className="flex flex-col gap-4"
              style={{ 
                position: 'absolute', 
                left: '2rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 100
              }}
            >
              <button 
                onClick={() => window.location.reload()} 
                title="Inicio (Recargar)"
                style={{ width: '56px', height: '56px', background: '#ffffff', color: '#64748b', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#3b82f6'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#64748b'; }}
              >
                <Home size={24} strokeWidth={2.5} />
              </button>
              
              <button 
                onClick={() => zoomIn()} 
                title="Acercar"
                style={{ width: '56px', height: '56px', background: '#ffffff', color: '#64748b', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#3b82f6'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#64748b'; }}
              >
                <Plus size={24} strokeWidth={2.5} />
              </button>
              
              <button 
                onClick={() => zoomOut()} 
                title="Alejar"
                style={{ width: '56px', height: '56px', background: '#ffffff', color: '#64748b', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#3b82f6'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#64748b'; }}
              >
                <Minus size={24} strokeWidth={2.5} />
              </button>
            </div>
            
            <TransformComponent wrapperClass="map-transform-wrapper" contentClass="map-transform-content">
              <div 
                className="map-wrapper" 
                style={{ position: 'relative', display: 'inline-block' }}
                onClick={handleMapClick}
              >
                <img 
                  src="/plano.jpg" 
                  alt="Plano" 
                  style={{ maxWidth: '100vw', maxHeight: '100vh', display: 'block', pointerEvents: 'none' }} 
                />
                <MapSvgOverlay 
                  selectedLocal={selectedLocal} 
                  onSelectLocal={onSelectLocal} 
                  localsData={mockLocals} 
                  zoomToElement={zoomToElement}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {visionMode && (
        <div 
          className="pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            borderRadius: '5px'
          }}
        >
          <img 
            src={images[currentImageIndex]} 
            alt="Render"
            style={{
              width: '70vh',
              height: '70vh',
              objectFit: 'cover',
              borderRadius: '5px',
              outline: '5px solid white'
            }}
          />
          
          {images.length > 1 && (
            <>
              {/* Botón Anterior */}
              <button 
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  color: '#1e293b',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={28} />
              </button>
              
              {/* Botón Siguiente */}
              <button 
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  color: '#1e293b',
                  zIndex: 10
                }}
              >
                <ChevronRight size={28} />
              </button>

              {/* Indicadores (Puntos) */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 10
                }}
              >
                {images.map((_, idx) => (
                  <div 
                    key={idx}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: currentImageIndex === idx ? 'white' : 'rgba(255,255,255,0.4)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCloseVision(); }}
            className="absolute bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-transform hover:scale-110"
            style={{ width: '40px', height: '40px', top: '-20px', right: '-20px', border: '3px solid white', zIndex: 10 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
