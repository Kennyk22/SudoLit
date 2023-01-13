
import React, { Fragment, useCallback} from 'react'
import ReactFlow, {Controls, Background, Node, Edge, applyEdgeChanges, EdgeChange, Connection, addEdge, NodeChange, applyNodeChanges, ConnectionMode} from 'reactflow'
import 'reactflow/dist/style.css'
import StoryNodes from '../Nodes/StoryNodes'
import { Flowchart } from '../reducers'
import { connect } from 'react-redux'

const nodeTypes = {storyNodes: StoryNodes};

function Flow({nodes, edges, NodesChange, EdgesChange, Connecter}: any) {

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => NodesChange(changes), [NodesChange]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => EdgesChange(changes), [EdgesChange]
  );

  const onConnect = useCallback(
    (connection: Connection) => Connecter(connection), [Connecter]
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

const mapStateToProps = (state: Flowchart) => {
  return {
    nodes: state.nodes,
    edges: state.edges
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    NodesChange: (changes: NodeChange[]) => dispatch({type: 'NODE_CHANGE', payload: changes}),
    EdgesChange: (changes: EdgeChange[]) => dispatch({type: 'EDGE_CHANGE', payload: changes}),
    Connecter: (connection: Connection) => dispatch({type: 'CONNECT', payload: connection})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Flow);