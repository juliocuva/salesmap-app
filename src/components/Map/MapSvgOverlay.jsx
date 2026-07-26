import React from 'react';

const polygons = [
  { id: 'local_2a', points: "226.6,961.1 248,983.3 228.1,1005.3 205.4,983.2" },
  { id: 'local_47a', points: "272.3,703.7 313.8,665.3 361.7,718.4 324,755.2" },
  { id: 'local_5', points: "454.6,836.5 525.3,918.4 466.3,975.9 388.2,900.8" },
  { id: 'local_13', points: "606.8,1046.1 653,1006.5 681.3,986.1 730.3,1067.8 666.5,1106.4" },
  { id: 'local_14a', points: "593.7,944.7 638.2,1002.7 599.4,1036.9 547.8,986.4 572.8,961.6" },
  { id: 'local_7', points: "401,771.6 443.4,822.5 378,885.5 333.1,837.3" },
  { id: 'local_47b', points: "263.4,710.6 311.7,761.7 284.5,789.3 232.7,740" },
  { id: 'local_47c', points: "224.9,747.7 198,775.6 248.4,826 274.9,797.8" },
  { id: 'local_2', points: "182.7,930.2 161.2,908.7 130.3,908.7 98.3,876.7 53.3,925.1 148.3,1024.5 182.7,993.2 153.4,959.8" },
  { id: 'local_47d', points: "188.5,785.9 238.2,835.2 213.8,859 203.1,849.5 189.5,848.8 161.2,815.5" }
];

const getCentroid = (pointsStr) => {
  const coords = pointsStr.trim().split(/[\s,]+/);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < coords.length; i += 2) {
    const x = parseFloat(coords[i]);
    const y = parseFloat(coords[i+1]);
    if (!isNaN(x)) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
    if (!isNaN(y)) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
};

export default function MapSvgOverlay({ selectedLocal, onSelectLocal, localsData, zoomToElement }) {
  return (
    <svg 
      viewBox="0 0 2667 2000" 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {polygons.map((poly) => {
        const localInfo = localsData.find(l => l.id === poly.id);
        const isSelected = selectedLocal?.id === poly.id;
        const statusClass = localInfo?.status === 'vendido' ? 'sold' : 'available';
        const centroid = getCentroid(poly.points);

        return (
          <g 
            key={poly.id} 
            id={poly.id}
            className={`local-polygon pointer-events-auto cursor-pointer transition-all duration-300 ${statusClass} ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              
              if (localInfo && localInfo.status !== 'vendido') {
                onSelectLocal(localInfo);
                
                // Hacemos el zoom de forma segura, capturando cualquier error interno de la librería
                if (zoomToElement) {
                  try {
                    zoomToElement(poly.id, 2.5, 400);
                  } catch (err) {
                    console.error("Zoom failed", err);
                  }
                }
              }
            }}
          >
            <polygon points={poly.points} />
          </g>
        );
      })}
    </svg>
  );
}
