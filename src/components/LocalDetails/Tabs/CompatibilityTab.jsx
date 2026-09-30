import React, { useState } from 'react';
import { categories } from '../../../data/mockData';
import { Target, Coffee, IceCream, Dog, Pill, Utensils, Gem, Image as ImageIcon } from 'lucide-react';

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

export default function CompatibilityTab({ localArea, onShowVision }) {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="animate-fade-in flex-col gap-2 flex">
      {/* Category Grid */}
      <div className="flex flex-col gap-2 mb-2">
        {categories.map(cat => {
          const Icon = iconMap[cat.icon] || Target;
          const isActive = selectedType === cat.id;
          const colors = categoryColors[cat.id] || { bg: '#f1f5f9', text: '#0f172a', border: '#e2e8f0' };
          
          return (
            <button 
              key={cat.id}
              onClick={() => {
                setSelectedType(cat.id);
                onShowVision(cat.id);
              }}
              className="flex items-center justify-center p-1.5 transition-all w-4/5 mx-auto cursor-pointer"
              style={{
                background: isActive ? 'rgba(0,0,0,0.02)' : 'transparent',
                color: '#0f172a',
                borderRadius: '0',
                border: 'none',
                borderBottom: isActive ? '2px solid ' + colors.text : '1px solid rgba(0,0,0,0.1)',
                outline: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                minHeight: '36px'
              }}
            >
              <div className="flex items-center justify-center flex-row gap-2 opacity-90 w-full">
                <Icon size={14} strokeWidth={1.5} />
                <span className="uppercase tracking-widest font-normal" style={{ fontSize: "10px" }}>{cat.label}</span>
              </div>
            </button>
          );
        })}
    </div>
    </div>
  );
}
