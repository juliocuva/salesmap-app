import React from 'react';

const areas = [
  { id: 'local_2a', d: "M398,663.2l22,20.4c2,1.9,2.1,5.1,0.2,7.1l-23.4,24.6c-1.9,2-5.1,2.1-7.1,0.2l-21.8-21.1c-2-1.9-2-5.1-0.1-7.1 l23.2-24C392.9,661.4,396,661.4,398,663.2L398,663.2z" },
  { id: 'local_47a', d: "M470.9,403.8l39.3-37.1c2.1-2,5.4-1.8,7.2,0.4l45.5,53c1.7,2,1.6,5-0.3,6.9l-34.9,33.8c-2,1.9-5.1,1.9-7,0 l-50-49.6C468.8,409,468.8,405.7,470.9,403.8L470.9,403.8z" },
  { id: 'local_5', d: "M681.2,544.6l70.7,79.9c1.7,1.9,1.7,4.7,0,6.6l-60.1,69.7c-1.8,2.2-5.1,2.3-7.2,0.4l-80.7-75.4 c-2-1.9-2.1-5.1-0.2-7.1l70.2-74.2C675.8,542.3,679.2,542.4,681.2,544.6L681.2,544.6z" },
  { id: 'local_13', d: "M842.8,768.6l46.9-40c0.1-0.1,0.2-0.2,0.3-0.2l33-24.3c2.3-1.7,5.6-1.1,7.2,1.3l49.4,77.5 c1.5,2.3,0.8,5.3-1.4,6.8l-69.7,47.5c-2,1.4-4.7,1.1-6.4-0.6L842.4,776C840.4,773.8,840.6,770.5,842.8,768.6L842.8,768.6z" },
  { id: 'local_14a', d: "M833.7,660.3l50.8,62.8c1.7,2.1,1.4,5.2-0.7,7L840,767.2c-2,1.7-4.8,1.6-6.7-0.2l-56.9-54.6 c-2-1.9-2-5.1-0.1-7.1l27.2-27.7c0.2-0.2,0.3-0.3,0.5-0.5l22.8-17.6C828.9,657.9,832,658.2,833.7,660.3z" },
  { id: 'local_7', d: "M622.8,478.2l49.8,57.9c1.7,1.9,1.6,4.8-0.2,6.7l-70.9,75c-1.9,2-5,2.1-7,0.2l-57.8-53.3 c-2.1-1.9-2.2-5.2-0.2-7.2l78.9-79.6C617.5,475.8,620.9,476,622.8,478.2L622.8,478.2z" },
  { id: 'local_47b', d: "M468.7,413.4l50.3,49.3c2,1.9,2,5,0.2,7l-28.3,30.1c-1.9,2-5.1,2.1-7.1,0.2l-51-49.3c-2-1.9-2-5.1-0.1-7.1 l29-30.1C463.5,411.5,466.7,411.5,468.7,413.4L468.7,413.4z" },
  { id: 'local_47c', d: "M424.1,452.4l-29.8,31.4c-1.9,2-1.8,5.2,0.2,7.1l52.4,48.7c2,1.9,5.1,1.8,7-0.2l28.5-29.9c1.9-2,1.8-5.1-0.1-7 l-51.1-50.2C429.2,450.3,426,450.4,424.1,452.4L424.1,452.4z" },
  { id: 'local_2', d: "M390.5,652.2l-16.7-16.6c-1-1-2.4-1.5-3.9-1.4l-39,2.7c-1.3,0.1-2.5-0.3-3.5-1.1L288,603.7 c-2-1.6-4.9-1.5-6.7,0.4l-44.9,45.4c-1.9,2-1.9,5.2,0.1,7.1L344.3,762c2,1.9,5.2,1.9,7.1-0.1l36.1-37.3c1.9-2,1.9-5.1-0.1-7 L364,694.7c-1.9-1.9-2-5-0.1-7l26.7-28.5C392.4,657.3,392.4,654.2,390.5,652.2L390.5,652.2z" },
  { id: 'local_47d', d: "M393,493.1l52.7,48.7c2,1.8,2.2,5,0.4,7l-27.3,30.8c-1.9,2.1-5,2.3-7.1,0.4l-10.2-9.3c-0.6-0.5-1.3-0.9-2-1.1 l-14.7-4.1c-0.8-0.2-1.5-0.6-2.1-1.2l-29.8-28.4c-2-1.9-2.1-5-0.2-7l33.3-35.4C387.8,491.3,390.9,491.2,393,493.1L393,493.1z" },
  { id: 'local_14b', d: "M881.1,627l44.2,67.5c1.5,2.3,0.9,5.3-1.4,6.9c-9.9,6.8-34.6,23.7-35.1,24.5 c-0.6,0.9-40.7-52.3-52.4-67.7c-1.7-2.3-1.2-5.5,1.1-7.1l36.5-25.4C876.3,624.1,879.5,624.7,881.1,627z" },
  { id: 'local_9c', d: "M777.4,373l46.5,79.7c1.4,2.4,0.6,5.5-1.8,6.9l-39,22.2c-2.3,1.3-5.2,0.6-6.7-1.6l-50.2-77.4 c-1.6-2.4-0.8-5.6,1.7-7.1l42.7-24.5C773,369.8,776,370.7,777.4,373z" },
  { id: 'local_46', d: "M619.6,200.2l94.9-53.5c0.2-0.1,0.3-0.2,0.5-0.3l89.9-37.7c2.6-1.1,5.6,0.2,6.6,2.9 L860,242.1c0.9,2.5-0.3,5.3-2.8,6.4l-82.1,34.4c-0.2,0.1-0.3,0.2-0.5,0.2l-78.4,43.5c-2.3,1.3-5.3,0.5-6.7-1.8l-71.8-117.6 C616.3,204.8,617.1,201.6,619.6,200.2z" },
  { id: 'local_9b', d: "M725,403.7c-1.5-2.4-4.6-3.1-7-1.5c-9.1,6-31.2,21.5-40,27.8c-2.3,1.7-2.8,4.9-1,7.1 c11.1,14.1,46.8,61.6,57.3,75.3c1.7,2.2,4.7,2.6,6.9,1l32.9-25.4c2.1-1.6,2.6-4.4,1.3-6.7L725,403.7z" },
  { id: 'local_41', d: "M1740.4,376.7l84.3-110c1.7-2.3,1.2-5.5-1.1-7.1l-84.4-58.9c-2.3-1.6-5.6-1-7.1,1.4 l-74.8,117.7c-1.4,2.3-0.8,5.3,1.4,6.8l74.8,51.3C1735.8,379.3,1738.7,378.8,1740.4,376.7z" },
  { id: 'local_43', d: "M1568.9,274.5l78.6,44.9c2.3,1.3,5.3,0.6,6.7-1.7l73.3-119.5c1.5-2.5,0.6-5.7-1.9-7 l-93.8-49.2c-2.5-1.3-5.6-0.3-6.8,2.3l-58.1,123.8C1565.7,270.4,1566.6,273.2,1568.9,274.5z" },
  { id: 'local_25a', d: "M1437,295.5l59.1,20.8c2.7,0.9,4,3.9,3,6.6l-37.6,95c-1,2.5-3.8,3.8-6.4,2.9l-51.2-18.7 c-2.5-0.9-3.8-3.6-3.1-6.2l29.7-97.1C1431.4,296,1434.3,294.5,1437,295.5z" },
  { id: 'local_25b', d: "M1570.7,358l-46,90.6c-1.2,2.4-4.2,3.4-6.7,2.2l-51.7-25.4c-2.3-1.2-3.4-3.9-2.4-6.3 l37.7-94.1c1.1-2.7,4.2-3.9,6.8-2.6l60,28.9C1571,352.4,1572,355.5,1570.7,358z" },
  { id: 'local_24b', d: "M1478.3,535.5l40.8-75.9c1.3-2.5,0.3-5.6-2.2-6.9l-51.1-25c-2.6-1.3-5.7-0.1-6.8,2.5 l-33.8,78.7c-1,2.4,0,5.2,2.3,6.4l44.1,22.2C1474.1,538.9,1477,537.9,1478.3,535.5z" },
  { id: 'local_24a', d: "M1403.3,403.8l50.3,18.7c2.7,1,4,4.1,2.8,6.7l-34.3,78.7c-1.1,2.4-3.8,3.6-6.3,2.7 l-42.1-15.1c-2.5-0.9-3.9-3.7-3.1-6.2l26.1-82.3C1397.7,404.3,1400.7,402.8,1403.3,403.8z" },
  { id: 'local_29a', d: "M1810.5,821.9l-89.9-67.4c-2.2-1.7-5.4-1.2-7,1l-17.9,24.2c-1.6,2.2-4.6,2.7-6.8,1.2 l-33.3-22.8c-2.2-1.5-5.3-1-6.9,1.2l-44.1,61.8c-1.6,2.2-1.1,5.2,1,6.9l124.8,95.9c2.2,1.7,5.3,1.3,7-0.9l74.2-94 C1813.1,826.8,1812.7,823.6,1810.5,821.9z" },
  { id: 'local_30a', d: "M1736.6,711.7l-92.1-68.9c-2.2-1.7-2.7-4.8-1-7l22.6-30.2c1.6-2.2,4.8-2.7,7-1l93,68.6 c2.3,1.7,2.7,4.9,1,7.1l-23.5,30.5C1741.9,712.9,1738.8,713.3,1736.6,711.7z" },
  { id: 'local_30b', d: "M1766.8,670.8l-92.1-68.9c-2.2-1.7-2.7-4.8-1-7l22.6-30.2c1.6-2.2,4.8-2.7,7-1l93,68.6 c2.3,1.7,2.7,4.9,1,7.1l-23.5,30.5C1772.1,672.1,1769,672.5,1766.8,670.8z" },
  { id: 'local_30c', d: "M1797.4,630l-92.1-68.9c-2.2-1.7-2.7-4.8-1-7l22.6-30.2c1.6-2.2,4.8-2.7,7-1l93,68.6 c2.3,1.7,2.7,4.9,1,7.1l-23.5,30.5C1802.7,631.3,1799.6,631.7,1797.4,630z" },
  { id: 'local_30', d: "M1799.5,518.9l-20.6,28.3c-1.6,2.2-1.1,5.3,1,6.9l46.7,35c2.2,1.6,5.2,1.2,6.9-0.9l21.7-27 c1.8-2.2,1.4-5.4-0.9-7.1l-47.7-36.3C1804.3,516.2,1801.1,516.6,1799.5,518.9z" },
  { id: 'local_31', d: "M1764.3,475.8l35.9-48.2c1.7-2.2,4.8-2.7,7-1l192.5,144.8c2.2,1.7,2.7,4.8,1,7l-182.2,239.2 c-1.7,2.2-4.7,2.6-6.9,1l-89.7-65.6c-2.2-1.6-2.7-4.8-1-7l138.7-185c1.6-2.2,1.2-5.3-1-7l-93.2-71.3 C1763.1,481.1,1762.7,478,1764.3,475.8z" },
  { id: 'local_31a', d: "M1864.3,346.2l-22.1,30.4c-1.6,2.2-1.1,5.3,1.1,7l53,39c2.2,1.6,5.3,1.2,7-1l23.2-30.9 c1.7-2.2,1.2-5.4-1.1-7.1l-54.1-38.6C1869,343.5,1865.9,344,1864.3,346.2z" },
  { id: 'local_31b', d: "M2009.3,448.4l53.2,41.9c2.1,1.7,2.5,4.8,0.9,7l-54.9,72.1c-1.7,2.2-4.9,2.6-7.1,0.9 l-55-43.1c-2.2-1.7-2.6-4.9-0.8-7.1l56.7-70.8C2004,447.1,2007.1,446.7,2009.3,448.4z" },
  { id: 'local_9a', d: "M667,438.7l-40.4,29.7c-2.3,1.7-2.7,5.1-0.8,7.3l63.1,73.5c1.8,2.1,4.9,2.3,7,0.6l34.4-28.8 c2.1-1.7,2.4-4.8,0.8-6.9l-57.1-74.4C672.2,437.5,669.2,437.1,667,438.7z" },
  { id: 'local_11', d: "M813.5,416.8l64.2-31.6c0.1-0.1,0.3-0.1,0.5-0.2l65-24.3c2.7-1,5.7,0.4,6.5,3.2L968,422 c0.8,2.5-0.5,5.2-3,6.2l-64.1,24.2c-0.1,0.1-0.3,0.1-0.4,0.2l-53.7,26.1c-2.4,1.2-5.3,0.2-6.6-2.1l-29-52.8 C809.9,421.2,810.9,418.1,813.5,416.8z" },
  { id: 'local_10', d: "M972,434.8l17.5,57.1c0.8,2.5-0.5,5.2-3,6.1c-21.1,8-111.1,42-110.2,41.8 c0.8-0.2-21.2-38.3-29.1-51.8c-1.5-2.5-0.5-5.7,2.1-7l51.8-25.1c0.1-0.1,0.3-0.1,0.4-0.2l63.9-24.2 C968.2,430.6,971.2,432.1,972,434.8z" },
  
  // Sótanos (cubren toda la imagen para ser clickeables en cualquier parte)
  { id: 'local_sotano_1', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_2', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_3', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" }
];

export default function MapSvgOverlay({ selectedLocal, onSelectLocal, localsData, zoomToElement, currentFloor = 'piso_1', filterType = 'todos', filterDelivery = 'todos', onSelectVision }) {
  return (
    <svg 
      viewBox="0 0 2822.08 1774.98" 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {areas.map((area) => {
        const localInfo = localsData.find(l => l.id === area.id);
        
        // Determinar a qué piso pertenece el local (por defecto piso_1)
        const localFloor = localInfo?.floor || 'piso_1';
        
        // Si no pertenece al piso actual, no lo dibujamos
        if (localFloor !== currentFloor) return null;

        const isSelected = selectedLocal?.id === area.id;
        
        // Lógica de desvanecimiento (filtros)
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

        let statusClass = localInfo?.status === 'vendido' ? 'sold' : 'available';
        if (localInfo?.status === 'alquiler') {
          statusClass = 'rent';
        } else if (localInfo?.status === 'disponible' && localInfo?.delivery) {
          statusClass += ` delivery-${localInfo.delivery}`;
        }

        if (isFaded) statusClass += ' faded';

        return (
          <g 
            key={area.id} 
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
        );
      })}
      {/* Cámaras interactivas */}
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
            {/* Área extendida invisible para que sea muy fácil darle clic */}
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
            {/* Área extendida invisible para que sea muy fácil darle clic */}
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
            {/* Área extendida invisible para que sea muy fácil darle clic */}
            <circle cx="1050" cy="226" r="40" fill="transparent" style={{ pointerEvents: 'all' }} />
            <path 
              fill="#1e293b" 
              style={{ transition: 'fill 0.3s', pointerEvents: 'auto', cursor: 'pointer' }}
              d="M1050.5,226.6c2.3,0,4.2-0.8,5.8-2.4c1.6-1.6,2.4-3.5,2.4-5.8s-0.8-4.2-2.4-5.8s-3.5-2.4-5.8-2.4s-4.2,0.8-5.8,2.4c-1.6,1.6-2.4,3.5-2.4,5.8s0.8,4.2,2.4,5.8C1046.3,225.8,1048.2,226.6,1050.5,226.6z M1050.5,222.9c-1.3,0-2.4-0.4-3.2-1.3c-0.9-0.9-1.3-2-1.3-3.2s0.4-2.4,1.3-3.2c0.9-0.9,2-1.3,3.2-1.3s2.4,0.4,3.2,1.3c0.9,0.9,1.3,2,1.3,3.2s-0.4,2.4-1.3,3.2C1052.9,222.5,1051.8,222.9,1050.5,222.9z M1035.9,233c-1,0-1.9-0.4-2.6-1.1c-0.7-0.7-1.1-1.6-1.1-2.6v-21.9c0-1,0.4-1.9,1.1-2.6c0.7-0.7,1.6-1.1,2.6-1.1h5.8l3.4-3.7h11l3.4,3.7h5.8c1,0,1.9,0.4,2.6,1.1c0.7,0.7,1.1,1.6,1.1,2.6v21.9c0,1-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1L1035.9,233L1035.9,233z M1035.9,229.3h29.2v-21.9h-7.4l-3.3-3.7h-7.8l-3.3,3.7h-7.4L1035.9,229.3L1035.9,229.3z" 
            />
          </g>
        </>
      )}
    </svg>
  );
}
