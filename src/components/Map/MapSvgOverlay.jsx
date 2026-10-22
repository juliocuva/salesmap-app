import React from 'react';
import { svgPaths } from '../../projects/bahiaguacamayas/svgPaths';

const areas = svgPaths.piso_1;

// Calcula el centro geométrico aproximado (bounding box) de un path SVG
function getPathCenter(d) {
  if (!d) return { x: 0, y: 0 };
  const commands = d.match(/[a-df-z][^a-df-z]*/ig) || [];
  let cx = 0, cy = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  const addPoint = (x, y) => {
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  };

  for (const cmd of commands) {
    const type = cmd[0];
    const nums = (cmd.slice(1).match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    if (type === 'M' || type === 'L') {
      for (let i = 0; i < nums.length; i += 2) {
        cx = nums[i];
        cy = nums[i + 1];
        addPoint(cx, cy);
      }
    } else if (type === 'm' || type === 'l') {
      for (let i = 0; i < nums.length; i += 2) {
        cx += nums[i];
        cy += nums[i + 1];
        addPoint(cx, cy);
      }
    } else if (type === 'H') {
      for (const n of nums) { cx = n; addPoint(cx, cy); }
    } else if (type === 'h') {
      for (const n of nums) { cx += n; addPoint(cx, cy); }
    } else if (type === 'V') {
      for (const n of nums) { cy = n; addPoint(cx, cy); }
    } else if (type === 'v') {
      for (const n of nums) { cy += n; addPoint(cx, cy); }
    }
  }

  if (minX === Infinity) return { x: 0, y: 0 };
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

export default function MapSvgOverlay({ selectedLocal, onSelectLocal, localsData, zoomToElement, currentFloor = 'piso_1', filterType = 'todos', filterDelivery = 'todos', onSelectVision }) {
  return (
    <svg 
      viewBox="0 0 2822.08 1774.98" 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {areas.map((area) => {
        const localInfo = localsData.find(l => l.id === area.id);
        
        // Determinar a quÃ© piso pertenece el local (por defecto piso_1)
        let localFloor = localInfo?.floor || 'piso_1';
        if (area.id === 'local_sotano_1') localFloor = 'sotano_1';
        if (area.id === 'local_sotano_2') localFloor = 'sotano_2';
        if (area.id === 'local_sotano_3') localFloor = 'sotano_3';
        
        // Si no pertenece al piso actual, no lo dibujamos
        if (localFloor !== currentFloor) return null;

        const isSelected = selectedLocal?.id === area.id;
        
        // LÃ³gica de desvanecimiento (filtros)
        let isFaded = false;
        if (filterType === 'venta') {
          // Todo lo que no sea 'disponible' o 'vendido' se apaga
          if (localInfo?.status !== 'disponible' && localInfo?.status !== 'vendido') {
            isFaded = true;
          }
          // Si hay filtro de etapa y no coincide, se apaga
          if (filterDelivery !== 'todos' && localInfo?.delivery !== filterDelivery) {
            isFaded = true;
          }
        } else if (filterType === 'alquiler') {
          if (localInfo?.status !== 'alquiler') {
            isFaded = true;
          }
        }

        let statusClass = 'upcoming';
        if (localInfo) {
          statusClass = localInfo.status === 'vendido' ? 'sold' : 'available';
          if (localInfo.status === 'alquiler') {
            statusClass = 'rent';
          } else if (localInfo.status === 'disponible' && localInfo.delivery) {
            statusClass += ` delivery-${localInfo.delivery}`;
          }
        }

        if (isFaded) statusClass += ' faded';

        return (
          <React.Fragment key={area.id}>
            <g 
              id={area.id}
              className={`local-polygon pointer-events-auto cursor-pointer transition-all duration-300 ${statusClass} ${isSelected ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                
                if (localInfo && localInfo.status !== 'vendido') {
                  onSelectLocal(localInfo);
                  
                  // Hacemos el zoom de forma segura, capturando cualquier error interno de la librería
                  if (zoomToElement) {
                    try {
                      zoomToElement(area.id, 2.5, 400);
                    } catch (err) {
                      console.error("Zoom failed", err);
                    }
                  }
                }
              }}
            >
              <path d={area.d} />
            </g>
            
            {/* Ícono automático para locales vendidos o con logo personalizado */}
            {localInfo && (localInfo.logo || localInfo.status === 'vendido') && !area.id.startsWith('local_sotano') && (() => {
              const center = getPathCenter(area.d);
              const iconHref = localInfo.logo || '/icono-vendido.svg';
              return (
                <image 
                  href={iconHref}
                  x={center.x - 30}
                  y={center.y - 30}
                  width="60"
                  height="60"
                  style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.35))' }}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            })()}
          </React.Fragment>
        );
      })}
      {/* CÃ¡maras interactivas */}
      {currentFloor === 'piso_1' && (
        <>
          <g 
            id="camera_1"
            className="pointer-events-auto cursor-pointer transition-all duration-300"
            style={{ transformOrigin: '1205px 908px', pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectVision) onSelectVision('camera1');
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.fill = '#e11d48'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.fill = '#1e293b'; }}
          >
            {/* Ãrea extendida invisible para que sea muy fÃ¡cil darle clic */}
            <circle cx="1205" cy="908" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <path 
              fill="#1e293b" 
              style={{ transition: 'fill 0.3s', pointerEvents: 'auto', cursor: 'pointer' }}
              d="M1211.8,908.3c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8c-1.6-1.6-3.5-2.4-5.8-2.4c-2.3,0-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C1207.6,907.5,1209.5,908.3,1211.8,908.3z M1211.8,904.6c-1.3,0-2.4-0.4-3.2-1.3c-0.9-0.9-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2c0.9-0.9,2-1.3,3.2-1.3s2.4,0.4,3.2,1.3c0.9,0.9,1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2C1214.2,904.2,1213.1,904.6,1211.8,904.6z M1197.2,914.7c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6V911c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1H1197.2z M1197.2,911h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7h-7.4V911z" 
            />
          </g>

          <g 
            id="camera_2"
            className="pointer-events-auto cursor-pointer transition-all duration-300"
            style={{ transformOrigin: '856px 983px', pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectVision) onSelectVision('camera2');
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.fill = '#e11d48'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.fill = '#1e293b'; }}
          >
            {/* Ãrea extendida invisible para que sea muy fÃ¡cil darle clic */}
            <circle cx="856" cy="983" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <path 
              fill="#1e293b" 
              style={{ transition: 'fill 0.3s', pointerEvents: 'auto', cursor: 'pointer' }}
              d="M863.6,983.3c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8c-1.6-1.6-3.5-2.4-5.8-2.4s-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C859.4,982.5,861.3,983.3,863.6,983.3z M863.6,979.6c-1.3,0-2.4-0.4-3.2-1.3s-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2s2-1.3,3.2-1.3s2.4,0.4,3.2,1.3s1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2S864.9,979.6,863.6,979.6z M849,989.7c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6V986c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1H849z M849,986h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7H849V986z" 
            />
          </g>
          <g 
            id="camera_3"
            className="pointer-events-auto cursor-pointer transition-all duration-300"
            style={{ transformOrigin: '1050px 226px', pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectVision) onSelectVision('camera3');
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.fill = '#e11d48'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.fill = '#1e293b'; }}
          >
            {/* Ãrea extendida invisible para que sea muy fÃ¡cil darle clic */}
            <circle cx="1050" cy="226" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <path 
              fill="#1e293b" 
              style={{ transition: 'fill 0.3s', pointerEvents: 'auto', cursor: 'pointer' }}
              d="M1050.5,226.6c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8s-3.5-2.4-5.8-2.4s-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C1046.3,225.8,1048.2,226.6,1050.5,226.6z M1050.5,222.9c-1.3,0-2.4-0.4-3.2-1.3c-0.9-0.9-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2c0.9-0.9,2-1.3,3.2-1.3s2.4,0.4,3.2,1.3c0.9,0.9,1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2C1052.9,222.5,1051.8,222.9,1050.5,222.9z M1035.9,233c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6v21.9c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1L1035.9,233L1035.9,233z M1035.9,229.3h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7h-7.4L1035.9,229.3L1035.9,229.3z" 
            />
          </g>

          <g 
            id="camera_4"
            className="pointer-events-auto cursor-pointer transition-all duration-300"
            style={{ transformOrigin: '950px 555px', pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectVision) onSelectVision('camera4');
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.fill = '#e11d48'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.fill = '#1e293b'; }}
          >
            {/* Ãrea extendida invisible para que sea muy fÃ¡cil darle clic */}
            <circle cx="950" cy="555" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <g style={{ transform: 'translate(-100px, 329px)', pointerEvents: 'auto', cursor: 'pointer' }}>
              <path 
                fill="#1e293b" 
                style={{ transition: 'fill 0.3s' }}
                d="M1050.5,226.6c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8s-3.5-2.4-5.8-2.4s-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C1046.3,225.8,1048.2,226.6,1050.5,226.6z M1050.5,222.9c-1.3,0-2.4-0.4-3.2-1.3c-0.9-0.9-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2c0.9-0.9,2-1.3,3.2-1.3s2.4,0.4,3.2,1.3c0.9,0.9,1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2C1052.9,222.5,1051.8,222.9,1050.5,222.9z M1035.9,233c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6v21.9c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1L1035.9,233L1035.9,233z M1035.9,229.3h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7h-7.4L1035.9,229.3L1035.9,229.3z" 
              />
            </g>
          </g>

          <g 
            id="camera_5"
            className="pointer-events-auto cursor-pointer transition-all duration-300"
            style={{ transformOrigin: '780px 660px', pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectVision) onSelectVision('camera5');
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.fill = '#e11d48'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.fill = '#1e293b'; }}
          >
            {/* Ãrea extendida invisible para que sea muy fÃ¡cil darle clic */}
            <circle cx="780" cy="660" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <g style={{ transform: 'translate(-270px, 434px)', pointerEvents: 'auto', cursor: 'pointer' }}>
              <path 
                fill="#1e293b" 
                style={{ transition: 'fill 0.3s' }}
                d="M1050.5,226.6c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8s-3.5-2.4-5.8-2.4s-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C1046.3,225.8,1048.2,226.6,1050.5,226.6z M1050.5,222.9c-1.3,0-2.4-0.4-3.2-1.3c-0.9-0.9-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2c0.9-0.9,2-1.3,3.2-1.3s2.4,0.4,3.2,1.3c0.9,0.9,1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2C1052.9,222.5,1051.8,222.9,1050.5,222.9z M1035.9,233c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6v21.9c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1L1035.9,233L1035.9,233z M1035.9,229.3h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7h-7.4L1035.9,229.3L1035.9,229.3z" 
              />
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
