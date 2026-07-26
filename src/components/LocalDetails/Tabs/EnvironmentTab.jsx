import React from 'react';
import { environmentData } from '../../../data/mockData';
import * as Icons from 'lucide-react';

export default function EnvironmentTab() {
  return (
    <div className="flex flex-col gap-2">
      <div className="widget-purple p-4 animate-fade-in">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm opacity-90">
          <Icons.Map size={16}/> Entorno (15km)
        </h3>
        
        <div className="flex flex-col gap-2">
          {environmentData.map((item, idx) => {
            const Icon = Icons[item.icon] || Icons.MapPin;
            return (
              <div key={idx} className="flex justify-between items-center text-sm border-b border-[rgba(0,0,0,0.1)] pb-2 last:border-0 last:pb-0">
                <span className="opacity-90 flex items-center gap-2">
                  <Icon size={14} className="opacity-70" />
                  {item.label}
                </span>
                <span className="font-bold">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
