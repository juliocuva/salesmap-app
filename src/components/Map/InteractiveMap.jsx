import React, { useState, useEffect } from 'react';
import { mockLocals } from '../../data/mockData';
import MapSvgOverlay from './MapSvgOverlay';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plus, Minus, Search, Home, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InteractiveMap({ selectedLocal, onSelectLocal, visionMode, onCloseVision, onSelectVision }) {
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
      return ['/restaurante1.png', '/restaurante2.png', '/restaurante3.png', '/restaurante4.png', '/restaurante5.png'];
    }
    if (visionMode === 'drogueria') {
      return ['/drogueria1.png', '/drogueria2.png'];
    }
    if (visionMode === 'petshop') {
      return ['/petshop1.png', '/petshop2.png'];
    }
    if (visionMode === 'camera1') {
      return ['/Img_7523_.png'];
    }
    if (visionMode === 'camera2') {
      return ['/Img_7520.png'];
    }
    return ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'];
  };

  const images = getImages();

  const [currentFloor, setCurrentFloor] = useState('piso_1');
  const [filterType, setFilterType] = useState('todos'); // 'todos', 'venta', 'alquiler'
  const [filterDelivery, setFilterDelivery] = useState('todos'); // 'todos', '2026', '2027-1', '2027-2'

  // Definir imágenes de fondo por piso
  const getBackgroundImage = () => {
    switch(currentFloor) {
      case 'sotano_1': return '/plano_sotano_1.jpg';
      case 'sotano_2': return '/plano_sotano_2.jpg';
      case 'sotano_3': return '/plano_sotano_3.jpg';
      default: return '/plano.jpg';
    }
  };

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
    <div className="map-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#f4f7f6' }}>
      {/* Botones de Filtro (Top Center) */}
      <div 
        style={{
          position: 'absolute',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999
        }}
      >
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.9)', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <button 
            onClick={() => { setFilterType('todos'); setFilterDelivery('todos'); }} 
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: filterType === 'todos' ? '#334155' : 'transparent', color: filterType === 'todos' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
          >
            Todos
          </button>
          <button 
            onClick={() => { setFilterType('venta'); setFilterDelivery('todos'); }} 
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: filterType === 'venta' ? '#3b82f6' : 'transparent', color: filterType === 'venta' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
          >
            En Venta
          </button>
          <button 
            onClick={() => { setFilterType('alquiler'); setFilterDelivery('todos'); }} 
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: filterType === 'alquiler' ? '#f97316' : 'transparent', color: filterType === 'alquiler' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
          >
            En Alquiler
          </button>
        </div>
        
        {filterType === 'venta' && (
          <div className="animate-fade-in" style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.9)', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setFilterDelivery('todos')} 
              style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', background: filterDelivery === 'todos' ? '#e2e8f0' : 'transparent', color: filterDelivery === 'todos' ? '#334155' : '#64748b', transition: 'all 0.2s ease' }}
            >
              Cualquier Entrega
            </button>
            <button 
              onClick={() => setFilterDelivery('2026')} 
              style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', background: filterDelivery === '2026' ? '#23AED8' : 'transparent', color: filterDelivery === '2026' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
            >
              2026
            </button>
            <button 
              onClick={() => setFilterDelivery('2027-1')} 
              style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', background: filterDelivery === '2027-1' ? '#22c55e' : 'transparent', color: filterDelivery === '2027-1' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
            >
              2027-1
            </button>
            <button 
              onClick={() => setFilterDelivery('2027-2')} 
              style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', background: filterDelivery === '2027-2' ? '#D3AA26' : 'transparent', color: filterDelivery === '2027-2' ? '#fff' : '#64748b', transition: 'all 0.2s ease' }}
            >
              2027-2
            </button>
          </div>
        )}
      </div>

      {/* Controles de Piso */}
      <div 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          position: 'absolute', 
          right: selectedLocal ? '420px' : '150px', 
          top: '40px', 
          zIndex: 9999, // Asegurar que quede por encima de todo
          transition: 'right 0.3s ease'
        }}
      >
        {[
          { id: 'piso_1', label: 'Primer Piso' },
          { id: 'sotano_1', label: 'Sótano 1' },
          { id: 'sotano_2', label: 'Sótano 2' },
          { id: 'sotano_3', label: 'Sótano 3' }
        ].map(floor => (
          <button 
            key={floor.id}
            onClick={() => setCurrentFloor(floor.id)} 
            style={{ 
              padding: '12px 20px', 
              background: currentFloor === floor.id ? '#3b82f6' : '#ffffff', 
              color: currentFloor === floor.id ? '#ffffff' : '#334155', 
              border: '2px solid #e2e8f0', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              transition: 'all 0.3s ease', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
            }}
          >
            {floor.label}
          </button>
        ))}
      </div>

      <TransformWrapper
        initialScale={1.1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={1.1}
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
                {/* Fallback color when image is loading or missing */}
                <div style={{ backgroundColor: '#ccc', minWidth: '100vw', minHeight: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }}></div>
                <img 
                  src={getBackgroundImage()} 
                  alt={`Plano ${currentFloor}`} 
                  style={{ maxWidth: '100vw', maxHeight: '100vh', display: 'block', pointerEvents: 'none', minWidth: '800px', minHeight: '600px' }} 
                  onError={(e) => {
                    // Si no existe la imagen del sótano, mostrar un placeholder o mantener el tamaño para que no colapse
                    e.target.style.opacity = '0';
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                />
                <MapSvgOverlay 
                  selectedLocal={selectedLocal} 
                  onSelectLocal={onSelectLocal} 
                  localsData={mockLocals} 
                  zoomToElement={zoomToElement}
                  currentFloor={currentFloor}
                  filterType={filterType}
                  filterDelivery={filterDelivery}
                  onSelectVision={onSelectVision}
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
