import React, { useState } from 'react';
import { nearbyCommerce } from '../../../data/mockData';
import { Store, Coffee, IceCream, Dog, Pill } from 'lucide-react';

const categoryIcons = {
  "Cafetería": Coffee,
  "Heladería": IceCream,
  "Petshop": Dog,
  "Droguería": Pill
};

const categoryColors = {
  "Cafetería": { bg: '#fef3c7', text: '#92400e', border: '#fde68a' }, // yellow
  "Heladería": { bg: '#e2f4cd', text: '#3b5a22', border: '#b2d58a' }, // green
  "Petshop": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' }, // blue
  "Droguería": { bg: '#fce7f3', text: '#9d174d', border: '#fbcfe8' } // pink
};

export default function CommercialExplorerTab() {
  const uniqueCategories = [...new Set(nearbyCommerce.map(c => c.category))];
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);

  const filteredCommerce = nearbyCommerce.filter(c => c.category === selectedCategory);

  return (
    <div className="animate-fade-in flex-col gap-4 flex">
      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {uniqueCategories.map(cat => {
          const Icon = categoryIcons[cat] || Store;
          const isActive = selectedCategory === cat;
          const colors = categoryColors[cat] || { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
          
          // Count places in this category
          const count = nearbyCommerce.filter(c => c.category === cat).length;
          
          return (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex flex-col justify-between p-4 transition-all text-left"
              style={{
                background: colors.bg,
                color: colors.text,
                borderRadius: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                minHeight: '110px'
              }}
            >
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold opacity-90">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} /> {cat}s
              </div>
              <div className="text-xl font-bold mb-3 text-center w-full">{count} {count === 1 ? 'local' : 'locales'}</div>
              <div className="flex items-center justify-between text-xs mb-1 opacity-80 w-full">
                <span>Radio 1.5km</span>
                <span>Ver lista</span>
              </div>
              <div style={{ background: colors.border, height: '6px', borderRadius: '3px', width: '100%' }}>
                <div style={{ background: colors.text, height: '100%', borderRadius: '3px', width: isActive ? '100%' : '30%', transition: 'width 0.3s ease' }}></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flat-card p-2 flex flex-col gap-2 max-h-[280px] overflow-y-auto">
        {filteredCommerce.length === 0 ? (
          <p className="text-center text-sm text-dark-secondary p-4">No se encontraron comercios en esta categoría.</p>
        ) : (
          filteredCommerce.map((item) => (
            <div key={item.id} className="p-3 border-b border-flat last:border-0 hover:bg-[#f8fafc] transition-colors rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 text-dark-primary">
                    <Store size={14} style={{ color: '#3b82f6' }} /> {item.name}
                  </h4>
                  <p className="text-xs text-dark-secondary mt-1">Tipo: {item.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                    {item.category}
                  </span>
                  <p className="text-xs font-semibold mt-1 opacity-70" style={{ color: '#334155' }}>a {item.distance}m</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}
