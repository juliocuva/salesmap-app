import React, { useState } from 'react';
import { compatibilityRules, categories } from '../../../data/mockData';
import { Target, CheckCircle2, Coffee, IceCream, Dog, Pill, Utensils, Gem } from 'lucide-react';

const iconMap = {
  "Coffee": Coffee,
  "IceCream": IceCream,
  "Dog": Dog,
  "Pill": Pill,
  "Utensils": Utensils,
  "Gem": Gem
};

const categoryColors = {
  "cafeteria": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "heladeria": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "petshop": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "drogueria": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "restaurante": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "joyeria": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' }
};

export default function CompatibilityTab({ onShowVision }) {
  const [selectedType, setSelectedType] = useState('');

  const result = selectedType ? compatibilityRules[selectedType] : null;

  return (
    <div className="animate-fade-in flex-col gap-2 flex">
      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map(cat => {
          const Icon = iconMap[cat.icon] || Target;
          const isActive = selectedType === cat.id;
          const colors = categoryColors[cat.id] || { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
          
          return (
            <button 
              key={cat.id}
              onClick={() => {
                setSelectedType(cat.id);
                onShowVision(cat.id);
              }}
              className="flex items-center justify-center p-1.5 transition-all"
              style={{
                background: colors.bg,
                color: colors.text,
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                minHeight: '36px'
              }}
            >
              <div className="flex items-center justify-center flex-row gap-2 opacity-90 w-full">
                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-bold" style={{ fontSize: '11px' }}>{cat.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '12px' }}>
        {result ? (
          <div className="animate-fade-in flex flex-col gap-3 w-full">
            
            {/* Card 1: Probabilidad */}
            <div 
              className="p-3 flex justify-between items-center shadow-sm"
              style={{ background: '#d2f0f4', borderRadius: '12px' }}
            >
              <span className="font-semibold opacity-90" style={{ color: '#23545b', fontSize: '12px' }}>Probabilidad de Éxito Estimada:</span>
              <div 
                className="font-bold tracking-tight"
                style={{ 
                  fontSize: '24px', 
                  lineHeight: '1',
                  color: '#23545b'
                }}
              >
                {result.score}%
              </div>
            </div>
            
            {/* Card 2: Variables y Explicación */}
            <div className="bg-[#f8fafc] p-3 border border-[#e2e8f0] shadow-sm w-full text-left" style={{ borderRadius: '12px' }}>
              <p className="text-dark-secondary w-full text-left mb-3 leading-relaxed" style={{ fontSize: '12px' }}>
                Existe una {result.score > 85 ? 'alta' : 'moderada'} posibilidad de excelente aceptación por parte del público en este sector.
              </p>
              
              <h4 className="font-bold mb-3 opacity-90 text-dark-primary text-left" style={{ fontSize: '13px' }}>Variables a favor:</h4>
              <ul className="space-y-3 w-full" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start justify-start gap-2 opacity-90 text-dark-secondary leading-relaxed text-left m-0 p-0" style={{ fontSize: '12px' }}>
                    <CheckCircle2 size={14} className="mt-[3px] flex-shrink-0" style={{ color: '#47939e' }} strokeWidth={2.5} />
                    <span className="text-left flex-1">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        ) : (
          <div className="text-center p-4 opacity-70 flex flex-col items-center gap-2" style={{ fontSize: '12px' }}>
            <Target size={24} className="text-dark-secondary opacity-50" />
            <p>Selecciona una categoría arriba para iniciar la simulación del modelo de negocio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
