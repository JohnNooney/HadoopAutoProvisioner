import React, { useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

function FlowDiagram(props) {
    //let clusterElements = [];
    const initialElements = [
        { id: 'namenode', type: 'input', data: { label: 'Name Node' }, position: { x: 150, y: 0 } },
        { id: 'resourcemanager', data: { label: 'Resource Manager' }, position: { x: 150, y: 100 } },
        { id: 'nodemanager-1', data: { label: 'Node Manager 1' }, position: { x: 0, y: 200 } },
        { id: 'nodemanager-2', data: { label: 'Node Manager 2' }, position: { x: 300, y: 200 } },
        { id: 'datanode-1', data: { label: 'Data Node 1' }, position: { x: 0, y: 300 } },
        { id: 'datanode-2', data: { label: 'Data Node 2' }, position: { x: 300, y: 300 } },
        {
          id: 'edges-nn-rm',
          source: 'namenode',
          target: 'resourcemanager',
          type: 'smoothstep',
        },
        {
          id: 'edges-rm-nm1',
          source: 'resourcemanager',
          target: 'nodemanager-1',
          type: 'smoothstep',
        },
        {
          id: 'edges-rm-nm2',
          source: 'resourcemanager',
          target: 'nodemanager-2',
          type: 'smoothstep',
        },
        {
          id: 'edges-nm1-dn1',
          source: 'nodemanager-1',
          target: 'datanode-1',
          type: 'smoothstep',
        },
        {
          id: 'edges-nm2-dn2',
          source: 'nodemanager-2',
          target: 'datanode-2',
          type: 'smoothstep',
        },
    ];
    const [elements, setElements] = useState(initialElements);

    function buildDiagram(list){

        //build namenode
        var namenode = {};
        list.push(namenode);

        //build resource manager
        var resourcemanager = {};
        list.push(resourcemanager);

        //build node managers
        var nodemanager = {};
        list.push(nodemanager);

        //build data nodes
        var datanode = {};
        list.push(datanode);

        //build spark
        var spark = {};
        list.push(spark);

        return list;
    }

    function onLoad(reactFlowInstance){
        //set buildDiagram()
        reactFlowInstance.fitView();
    }

    function onNodeDragStop(event, node){
        console.log('drag stop', node);
    }

    function onElementClick(event, element){
        console.log('click', element);
    }

    function onElementsRemove(elementsToRemove){
        setElements((els) => removeElements(elementsToRemove, els));
    }

    function onConnect(params){
        setElements((els) => addEdge(params, els));
    }
    
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