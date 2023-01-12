
import React, { Fragment, useCallback, useState } from 'react'
import ReactFlow, {Controls, Background, Node, Edge, applyEdgeChanges, EdgeChange, Connection, addEdge, NodeChange, applyNodeChanges, ConnectionMode} from 'reactflow'
import 'reactflow/dist/style.css'
import StoryNodes from '../Nodes/StoryNodes'

const initNodes: Node[] = [
  {
    id: '1',
    type: 'storyNodes',
    data: {label: 'wow'},
    position: {x: 400, y: 400}
  },
  {
    id: '2',
    type: 'storyNodes',
    data: {label: 'wew'},
    position: {x: 600, y: 400}
  }
]

const nodeTypes = {storyNodes: StoryNodes};

const initEdges: Edge[] = [{id:'a1-2', source:'1', target:'2', sourceHandle: 'b', targetHandle: 'c'}];



function Flow() {

    const [nodes, setNodes] = useState(initNodes)
    const [edges, setEdges] = useState(initEdges)
    
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds)=>applyNodeChanges(changes, nds)), [setNodes]
    )

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
      (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges]
    );

  return (
    <Fragment>
        <ReactFlow 
        nodes={nodes} 
        edges = {edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{hideAttribution:true}}
        connectionMode= {ConnectionMode.Loose}
        >
            <Background/>
            <Controls/>
        </ReactFlow>
    </Fragment>
  )
}

export default Flow