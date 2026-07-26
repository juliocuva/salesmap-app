import React, { useState } from 'react';
import { X, Building, Map, Activity, Store, Maximize2, MapPin, Sun, Eye } from 'lucide-react';
import EnvironmentTab from './Tabs/EnvironmentTab';
import CommercialExplorerTab from './Tabs/CommercialExplorerTab';
import CompatibilityTab from './Tabs/CompatibilityTab';
import LeadForm from '../LeadCapture/LeadForm';

export default function LocalCard({ local, onClose, onShowVision }) {
  const [activeTab, setActiveTab] = useState('basic');

  if (!local) return null;

  return (
    <div className="sidebar flat-panel animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-flat flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-dark-primary">{local.name}</h2>
          <p className="text-sm text-dark-secondary">
            {local.area} m² • <span className={local.status === 'disponible' ? 'text-success' : 'text-warning'}>
              {local.status.charAt(0).toUpperCase() + local.status.slice(1)}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          {local.id.startsWith('local_47') && (
            <button 
              onClick={() => onShowVision('accesorios')}
              className="btn flex items-center justify-center gap-1" 
              style={{ padding: '0.5rem 0.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
              title="Ver Render de Accesorios"
            >
              <Eye size={16} /> Render
            </button>
          )}
          <button onClick={onClose} className="btn" style={{ padding: '0.5rem', color: '#1e293b', border: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: '8px', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 pb-0">
        <div className="tabs-container border-flat">
          <button 
            className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
            style={{ color: activeTab === 'basic' ? '#3b82f6' : '#64748b' }}
          >
            Ficha y Entorno
          </button>
          <button 
            className={`tab-btn ${activeTab === 'comercio' ? 'active' : ''}`}
            onClick={() => setActiveTab('comercio')}
            style={{ color: activeTab === 'comercio' ? '#3b82f6' : '#64748b' }}
          >
            Comercio
          </button>
          <button 
            className={`tab-btn ${activeTab === 'compatibilidad' ? 'active' : ''}`}
            onClick={() => setActiveTab('compatibilidad')}
            style={{ color: activeTab === 'compatibilidad' ? '#3b82f6' : '#64748b' }}
          >
            Afinidad
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contacto' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacto')}
            style={{ color: activeTab === 'contacto' ? '#3b82f6' : '#64748b' }}
          >
            Me Interesa
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pb-8 overflow-y-auto" style={{ flex: 1, color: '#334155' }}>
        {activeTab === 'basic' && (
          <div className="animate-fade-in flex-col gap-3 flex">
            {/* Widgets Container */}
            <div className="grid grid-cols-2 gap-3">
              {/* Green Widget - Area */}
              <div className="widget-green p-4 flex flex-col justify-between" style={{ minHeight: '110px' }}>
                <div className="flex items-center gap-2 mb-2 text-sm font-semibold opacity-90">
                  <Building size={16}/> Área Total
                </div>
                <div className="text-xl font-bold mb-3">{local.area} m²</div>
                <div className="flex items-center justify-between text-xs mb-1 opacity-80">
                  <span>Espacio útil</span>
                  <span>100%</span>
                </div>
                <div className="widget-green-bar">
                  <div className="widget-green-bar-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Blue Widget - Habitantes */}
              <div className="widget-blue p-4 flex flex-col justify-between" style={{ minHeight: '110px' }}>
                <div className="flex items-center gap-2 mb-2 text-sm font-semibold opacity-90">
                  <Activity size={16}/> Habitantes
                </div>
                <div className="text-xl font-bold mb-3">18.000</div>
                <div className="flex items-center justify-between text-xs mb-1 opacity-80">
                  <span>Radio 1.5km</span>
                  <span>+12%</span>
                </div>
                <div className="widget-blue-bar">
                  <div className="widget-blue-bar-fill" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* Specifications Details */}
            <div className="widget-yellow p-4">
              <h3 className="font-semibold mb-3 text-sm opacity-90 flex items-center gap-2">
                <Store size={16} /> Detalles Físicos
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.05)] pb-2">
                  <div className="flex items-center gap-2 opacity-80 text-sm">
                    <Maximize2 size={14} />
                    <span>Frente comercial</span>
                  </div>
                  <span className="font-bold">{local.front} m</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.05)] pb-2">
                  <div className="flex items-center gap-2 opacity-80 text-sm">
                    <MapPin size={14} />
                    <span>Ubicación</span>
                  </div>
                  <span className="font-bold">{local.corner ? 'Esquina' : 'Pasillo'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 opacity-80 text-sm">
                    <Sun size={14} />
                    <span>Terraza / Expansión</span>
                  </div>
                  <span className="font-bold">{local.terrace ? 'Sí' : 'No'}</span>
                </div>
              </div>
            </div>
            
            {/* Contenido de Entorno embebido en Ficha */}
            <EnvironmentTab />
          </div>
        )}

        {activeTab === 'comercio' && <CommercialExplorerTab />}
        {activeTab === 'compatibilidad' && <CompatibilityTab onShowVision={onShowVision} />}
        {activeTab === 'contacto' && <LeadForm localId={local.id} localName={local.name} />}
      </div>
    </div>
  );
}
