import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export const CustomNode = memo(({ data }) => {
  const isBalancer = data.type === 'balancer';
  const isClient = data.type === 'client';

  // Configuración de colores según el tipo de nodo
  const bgColor = isClient ? '#22272e' : isBalancer ? '#1f293d' : '#1e1e2e';
  const borderColor = isClient ? '#6cb6ff' : isBalancer ? '#f2cc60' : '#a6e3a1';

  return (
    <div style={{
      padding: '12px 18px',
      borderRadius: '10px',
      background: bgColor,
      color: '#adbac7',
      border: `2px solid ${borderColor}`,
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
      minWidth: '200px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Target handle para recibir conexiones */}
      {!isClient && (
        <Handle 
          type="target" 
          position={Position.Left} 
          style={{ background: borderColor, width: 10, height: 10 }} 
        />
      )}

      <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#cdd6f4', marginBottom: '6px' }}>
        {data.label}
      </div>

      {isClient && (
        <div style={{ fontSize: '13px', color: '#6cb6ff' }}>
          <strong>Peticiones salientes:</strong> {data.peticiones} req
        </div>
      )}

      {isBalancer && (
        <div style={{ fontSize: '12px', color: '#f2cc60' }}>
          <div><strong>Tráfico total:</strong> {data.totalRequests} req</div>
          <div><strong>Algoritmo:</strong> Lagrange</div>
        </div>
      )}

      {data.capacidad !== undefined && (
        <div style={{ fontSize: '12px', color: '#a6adc8', marginTop: '4px' }}>
          <div><strong>Capacidad:</strong> {data.capacidad}</div>
          <div><strong>Asignadas:</strong> <span style={{ color: '#a6e3a1', fontWeight: 'bold' }}>{data.assignedRequests} req</span></div>
        </div>
      )}

      {/* Source handle para emitir conexiones */}
      {!data.isEndNode && (
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ background: borderColor, width: 10, height: 10 }} 
        />
      )}
    </div>
  );
});