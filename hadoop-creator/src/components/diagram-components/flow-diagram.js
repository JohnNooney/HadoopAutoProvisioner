import React, { useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

function FlowDiagram(props) {
    const initialElements = [
        {
          id: 'edges-1',
          type: 'input',
          data: { label: 'Input 1' },
          position: { x: 250, y: 0 },
        },
        { id: 'edges-2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
        { id: 'edges-2a', data: { label: 'Node 2a' }, position: { x: 0, y: 180 } },
        { id: 'edges-3', data: { label: 'Node 3' }, position: { x: 250, y: 200 } },
        {
          id: 'edges-e1-2',
          source: 'edges-1',
          target: 'edges-2',
          label: 'bezier edge (default)',
          className: 'normal-edge',
        },
        {
          id: 'edges-e2-2a',
          source: 'edges-2',
          target: 'edges-2a',
          type: 'smoothstep',
          label: 'smoothstep edge',
        },
        {
          id: 'edges-e2-3',
          source: 'edges-2',
          target: 'edges-3',
          type: 'step',
          label: 'step edge',
        }
    ];

    const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
    const onNodeDragStop = (event, node) => console.log('drag stop', node);
    const onElementClick = (event, element) => console.log('click', element);
    
    const [elements, setElements] = useState(initialElements);
    
    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    
    return (
    <div className="flow">
        <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onLoad={onLoad}
        snapToGrid={true}
        key="edges"
        >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>

    </div>
    );
}

export default FlowDiagram;