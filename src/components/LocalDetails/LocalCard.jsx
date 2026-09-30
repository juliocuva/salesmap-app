import React, { useState } from 'react';
import { X, Building, Activity, Eye } from 'lucide-react';
import EnvironmentTab from './Tabs/EnvironmentTab';
import CompatibilityTab from './Tabs/CompatibilityTab';
import LeadForm from '../LeadCapture/LeadForm';

export default function LocalCard({ local, onClose, onShowVision }) {
  const [activeTab, setActiveTab] = useState('basic');

  if (!local) return null;

  return (
    <div className="sidebar animate-fade-in" style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
      {/* Header */}
      <div className="p-4 border-b border-flat flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-dark-primary">{local.name}</h2>
          <p className="text-xs text-dark-secondary">
            <span style={{ color: '#3b82f6', fontWeight: '600' }}>
              {local.status.charAt(0).toUpperCase() + local.status.slice(1)}
            </span>
            {local.delivery && (
              <span className="opacity-70 ml-2 border-l border-gray-300 pl-2 font-medium">
                Entrega {local.delivery}
              </span>
            )}
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
          <button onClick={onClose} className="btn" style={{ padding: '0.5rem', color: '#ffffff', border: 'none', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', cursor: 'pointer' }}>
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
            style={{ color: activeTab === 'basic' ? '#3b82f6' : '#0f172a' }}
          >Ficha Técnica</button>
          
          <button 
            className={`tab-btn ${activeTab === 'compatibilidad' ? 'active' : ''}`}
            onClick={() => setActiveTab('compatibilidad')}
            style={{ color: activeTab === 'compatibilidad' ? '#3b82f6' : '#0f172a' }}
          >
            Afinidad
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contacto' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacto')}
            style={{ color: activeTab === 'contacto' ? '#3b82f6' : '#0f172a' }}
          >
            Me Interesa
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pb-6 overflow-y-auto" style={{ flex: 1, minHeight: 0, color: '#0f172a' }}>
        {activeTab === 'basic' && (
          <div className="animate-fade-in flex-col gap-3 flex">
            {/* Widgets Container */}
            <div className="flex flex-col gap-3">
              {/* Blue Widget - Area */}
              <div className="widget-blue p-4 flex flex-row justify-between items-center" style={{ minHeight: '60px' }}>
                <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
                  <Building size={16}/> Área Total
                </div>
                <div className="text-xl font-bold">{local.area} m²</div>
              </div>
            </div>
            {/* Contenido de Entorno embebido en Ficha */}
            <EnvironmentTab />
          </div>
        )}

        {activeTab === 'compatibilidad' && <CompatibilityTab localArea={local.area} onShowVision={onShowVision} />}
        {activeTab === 'contacto' && <LeadForm localId={local.id} localName={local.name} />}
      </div>
    </div>
  );
}
