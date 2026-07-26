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
  "cafeteria": { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
  "heladeria": { bg: '#e2f4cd', text: '#3b5a22', border: '#b2d58a' },
  "petshop": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "drogueria": { bg: '#fce7f3', text: '#9d174d', border: '#fbcfe8' },
  "restaurante": { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' },
  "joyeria": { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' }
};

export default function CompatibilityTab({ onShowVision }) {
  const [selectedType, setSelectedType] = useState('');

  const result = selectedType ? compatibilityRules[selectedType] : null;

  return (
    <div className="animate-fade-in flex-col gap-3 flex">
      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3">
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
              className="flex items-center justify-center p-2 transition-all"
              style={{
                background: colors.bg,
                color: colors.text,
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                minHeight: '48px'
              }}
            >
              <div className="flex items-center justify-center flex-row gap-2 text-sm font-semibold opacity-90 w-full">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[12px] font-bold">{cat.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '40px' }}>
        {result ? (
          <div className="animate-fade-in flex flex-col gap-3 w-full">
            
            {/* Card 1: Probabilidad */}
            <div 
              className="p-4 flex justify-between items-center shadow-sm"
              style={{ background: '#d2f0f4', borderRadius: '16px' }}
            >
              <span className="font-semibold text-sm opacity-90" style={{ color: '#23545b' }}>Probabilidad de Éxito Estimada:</span>
              <div 
                className="font-bold tracking-tight"
                style={{ 
                  fontSize: '36px', 
                  lineHeight: '1',
                  color: '#23545b'
                }}
              >
                {result.score}%
              </div>
            </div>
            
            {/* Card 2: Variables y Explicación */}
            <div className="bg-[#f8fafc] p-4 border border-[#e2e8f0] shadow-sm w-full text-left" style={{ borderRadius: '16px' }}>
              <p className="text-xs text-dark-secondary w-full text-left mb-4 leading-relaxed">
                Existe una {result.score > 85 ? 'alta' : 'moderada'} posibilidad de excelente aceptación por parte del público en este sector.
              </p>
              
              <h4 className="text-sm font-bold mb-3 opacity-90 text-dark-primary text-left">Variables a favor:</h4>
              <ul className="space-y-3 w-full" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="text-xs flex items-start justify-start gap-2 opacity-90 text-dark-secondary leading-tight text-left m-0 p-0">
                    <CheckCircle2 size={16} className="text-success mt-[1px] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-left flex-1">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        ) : (
          <div className="text-center text-sm p-4 opacity-70 flex flex-col items-center gap-3">
            <Target size={32} className="text-dark-secondary opacity-50" />
            <p>Selecciona una categoría arriba para iniciar la simulación del modelo de negocio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
