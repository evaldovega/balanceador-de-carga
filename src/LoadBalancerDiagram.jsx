import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode } from './CustomNode';

const nodeTypes = { custom: CustomNode };

export default function LoadBalancerDiagram({L,servidores}) {


  const { nodes, edges } = useMemo(() => {
    // 1. Calcular capacidad total
    //const capacidadTotal = servidores.reduce((acc, s) => acc + s.capacidad, 0);

    // 2. Definir Nodo Cliente
    const nodesList = [
      {
        id: 'client',
        type: 'custom',
        position: { x: 50, y: 180 },
        data: {
          label: 'Estudiantes de la IUB',
          type: 'client',
          peticiones: L,
        },
      },
      // 3. Definir Nodo Balanceador
      {
        id: 'balancer',
        type: 'custom',
        position: { x: 350, y: 180 },
        data: {
          label: 'Balanceador de Carga',
          type: 'balancer',
          totalRequests: L,
        },
      },
    ];

    const edgesList = [
      {
        id: 'e-client-balancer',
        source: 'client',
        target: 'balancer',
        animated: true,
        label: `${L} req`,
        style: { stroke: '#6cb6ff', strokeWidth: 2 },
      },
    ];

    // 4. Distribuir dinámicamente las peticiones a los servidores
    servidores.forEach((srv, index) => {
      // Cálculo proporcional ponderado
      //const asignadas = Math.round((srv.capacidad / capacidadTotal) * L);
      const nodeId = `server-${index + 1}`;

      nodesList.push({
        id: nodeId,
        type: 'custom',
        position: { x: 700, y: index * 130 + 50 },
        data: {
          label: srv.nombre,
          capacidad: srv.capacidad,
          assignedRequests: srv.asignadas,
          isEndNode: true,
        },
      });

      edgesList.push({
        id: `e-balancer-${nodeId}`,
        source: 'balancer',
        target: nodeId,
        animated: true,
        label: `${srv.asignadas} req`,
        style: { stroke: '#a6e3a1', strokeWidth: 2 },
      });
    });

    return { nodes: nodesList, edges: edgesList };
  }, [L, servidores]);

  return (
   <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background color="#d2d0c7" gap={16} />
      </ReactFlow>
    </div>
  );
}