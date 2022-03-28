import React, { useState } from 'react';

import {Modal } from 'antd';

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
            var startingY = props.clusterData.yarn_resource_manager ? 0 : 100;
            var namenode = {id: 'namenode', type: 'input', data: { label: 'Name Node' }, position: { x: 180, y: startingY }};
            list.push(namenode);
        }
        

        //build resource manager
        if(props.clusterData.yarn_resource_manager){
            console.log("adding resource manager to diagram list...");
            var resourcemanager = {id: 'resourcemanager', data: { label: 'Resource Manager' }, position: { x: 180, y: 100 }};
            list.push(resourcemanager);

            // create edge from name node to resource manager
            var resourcemanagerEdge = { id: 'edges-nn-rm', source: 'namenode', target: 'resourcemanager', type: 'smoothstep', };
            list.push(resourcemanagerEdge);
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
                var nodemanagerEdge = {id: 'edges-rm-nm'+String(i+1), source: 'resourcemanager', target: 'nodemanager-'+String(i+1), type: 'smoothstep' };
                list.push(nodemanagerEdge);

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
                var datanodeEdge = {};
                if(props.clusterData.yarn_node_managers){
                    datanodeEdge = { id: 'edges-nm'+String(i+1)+'-dn'+String(i+1), source: 'nodemanager-'+String(i+1), target: 'datanode-'+String(i+1), type: 'smoothstep' }
                }
                else{
                    datanodeEdge = { id: 'edges-nn-dn'+String(i+1), source: 'namenode', target: 'datanode-'+String(i+1), type: 'smoothstep' }
                }
                list.push(datanodeEdge);

                startingX+=180;
            }
        }

        //build spark
        if(props.clusterData.extras_spark){
            console.log("adding spark to diagram list...");
            var spark = {id: 'spark', data: { label: 'Spark' }, position: { x: 360, y: 100 }};
            list.push(spark);

            // create edge from spark to resource manager
            var sparkEdge = { id: 'edges-s-rm', source: 'spark', target: 'resourcemanager', type: 'smoothstep' }
            list.push(sparkEdge);
        }

        //build history server
        if(props.clusterData.extras_historyserver){
            console.log("adding history server to diagram list...");
            var history = {id: 'history', data: { label: 'History Server' }, position: { x: -90, y: 100 }};
            list.push(history);

            // create edge from spark to resource manager
            var historyEdge = { id: 'edges-h-rm', source: 'history', target: 'resourcemanager', type: 'smoothstep' }
            list.push(historyEdge);
        }
        
        console.log("diagram list: ", list);
        return list;
    }

    function onLoad(reactFlowInstance){
        setElements(buildDiagram());
        console.log("dynamic list has been set");
        reactFlowInstance.fitView();
    }

    function onNodeDragStop(event, node){
        console.log('drag stop', node);
    }

    // When a component is clicked show a modal which describes it
    function onElementClick(event, element){
        console.log('click', element);
        let component = element.id.split('-');
        displayModal(component[0]);
    }

    function displayModal(component)
    {
        const namenodeDesc = "The Name Node keeps track of all Data Nodes and replicates Data as necessary.";
        const datanodeDesc = "The Data Node stores fragments of data and performs an opertion on them that has been given to them either by the Name Node or Node Manager.";
        const resourcemanagerDesc = "The Resource Manager introduces YARN to the cluster. YARN has a more fine-grained approach to managing Data Nodes.";
        const nodemanagerDesc = "The Node Manager recieves instructions from the Resource Manager and passes it on to its corresponding Data Node.";
        const sparkDesc = "Spark uses RAM to execute jobs/programs faster. User's give the Spark container a job and it gets passed to the Resource Manager for a distributed execution across all the Data Nodes.";

        let message = "";
        switch(component){
            case "namenode":
                message = namenodeDesc;
                break;
            case "datanode":
                message = datanodeDesc;
                break;
            case "resourcemanager":
                message = resourcemanagerDesc;
                break;
            case "nodemanager":
                message = nodemanagerDesc;
                break;
            case "spark":
                message = sparkDesc;
                break;
            default:
                message = "component message not found..."
                break;
        }

        Modal.info({
            title: 'Here is some more information.',
            content: (
              <div>
                <br/>
                <p>{message}</p>
              </div>
            ),
            onOk() {},
          });
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