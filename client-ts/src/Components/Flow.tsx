
import React, { Fragment, useCallback} from 'react'
import ReactFlow, {Controls, Background, EdgeChange, Connection, NodeChange, ConnectionMode} from 'reactflow'
import 'reactflow/dist/style.css'
import { Flowchart } from '../Types'
import { connect } from 'react-redux'
import { nodeTypes } from '../Nodes/StoryNodes'
import NodeButton from './NodeButton'

//all of this is the flowchart made using the REactFlow library

function Flow({nodes, edges, NodesChange, EdgesChange, Connector}: any) {
  
  //these three functions were suggested by the library dos to improve perfomance and im scared to delete them 
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => NodesChange(changes), [NodesChange]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => EdgesChange(changes), [EdgesChange]
  );

  const onConnect = useCallback(
    (connection: Connection) => Connector(connection), [Connector]
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
            <NodeButton/>
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
// not sure how to put the hooks in the useCallback functions and the updateArray at the end without breaking, so these will remain for now
const mapDispatchToProps = (dispatch: any) => {
  return {
    NodesChange: (changes: NodeChange[]) => dispatch({type: 'NODE_CHANGE', payload: changes}),
    EdgesChange: (changes: EdgeChange[]) => dispatch({type: 'EDGE_CHANGE', payload: changes}),
    Connector: (connection: Connection) => dispatch({type: 'CONNECT', payload: connection})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Flow);