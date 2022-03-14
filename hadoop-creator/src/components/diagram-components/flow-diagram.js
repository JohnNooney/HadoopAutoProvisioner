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
        { id: 'namenode', type: 'input', data: { label: 'Name Node' }, position: { x: 180, y: 0 } },
        { id: 'resourcemanager', data: { label: 'Resource Manager' }, position: { x: 180, y: 100 } },
        { id: 'nodemanager-1', data: { label: 'Node Manager 1' }, position: { x: 30, y: 200 } },
        { id: 'nodemanager-2', data: { label: 'Node Manager 2' }, position: { x: 330, y: 200 } },
        { id: 'datanode-1', data: { label: 'Data Node 1' }, position: { x: 30, y: 300 } },
        { id: 'datanode-2', data: { label: 'Data Node 2' }, position: { x: 330, y: 300 } },
        { id: 'spark', data: { label: 'Spark' }, position: { x: 430, y: 100 } },
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
        {
            id: 'edges-s-rm',
            source: 'spark',
            target: 'resourcemanager',
            type: 'smoothstep',
        },
    ];
    const [elements, setElements] = useState(initialElements);

    function buildDiagram(){
        let list = [];

        //build namenode
        if(props.clusterData){
            console.log("adding name node to diagram list...");
            var namenode = {id: 'namenode', type: 'input', data: { label: 'Name Node' }, position: { x: 180, y: 0 }};
            list.push(namenode);
        }
        

        //build resource manager
        if(props.clusterData.yarn_resource_manager){
            console.log("adding resource manager to diagram list...");
            var resourcemanager = {id: 'resourcemanager', data: { label: 'Resource Manager' }, position: { x: 180, y: 100 }};
            list.push(resourcemanager);

            // create edge from name node to resource manager
        }
        

        //build node managers (this will only work with a max of 3 nodes)
        if(props.clusterData.yarn_node_managers){
            let nodeManagers = parseInt(props.clusterData.yarn_node_managers);
            let spacingFactor = 90*(nodeManagers-1);
            let startingX = 180 - spacingFactor;
            for (let i = 0; i < nodeManagers; i++) {
                console.log("adding resource manager ", i+1 ," to diagram list...");
                
                var nodemanager = {id: 'nodemanager-'+String(i+1), data: { label: 'Node Manager '+ String(i+1)}, position: { x: startingX, y: 200 }};
                list.push(nodemanager);

                // create edge from resource manager (if exists) to datanode otherwise name node to DataNode

                startingX+=180;
            }
        }

        //build data nodes (this will only work with a max of 3 nodes)
        if(props.clusterData.data_node_workers){
            let dataNodes = parseInt(props.clusterData.data_node_workers)
            let spacingFactor = 90*(dataNodes-1);
            let startingX = 180 - spacingFactor;
            let startingY = props.clusterData.yarn_node_managers ? 300 : 200;

            for (let i = 0; i < dataNodes; i++) {
                console.log("adding data node ", i+1 ," to diagram list...");
               
                var datanode = {id: 'datanode-'+String(i+1), data: { label: 'Data Node '+ String(i+1)}, position: { x: startingX, y: startingY }};
                list.push(datanode);

                // create edge from node managers (if exists) to datanode otherwise from name node

                startingX+=180;
            }
        }

        //build spark
        if(props.clusterData.extras_spark){
            console.log("adding spark to diagram list...");
            var spark = {id: 'spark', data: { label: 'Spark' }, position: { x: 430, y: 100 }};
            list.push(spark);

            // create edge from spark to resource manager
        }
        
        console.log("diagram list: ", list);
        return list;
    }

    function onLoad(reactFlowInstance){
        buildDiagram();
        //setElements(buildDiagram());
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