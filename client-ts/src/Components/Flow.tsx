
import React, { Fragment, useCallback, useEffect, useRef} from 'react'
import ReactFlow, {Controls, Background, EdgeChange, Connection, NodeChange, ConnectionMode, Node, Edge, updateEdge, EdgeTypes} from 'reactflow'
import 'reactflow/dist/style.css'
import { Flowchart } from '../Types'
import { connect } from 'react-redux'
import { nodeTypes } from '../Nodes/StoryNodes'
import NodeButton from './NodeButton'
import Services from '../APIservices/APservice'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteEdge from '../Edges/DeleteEdge'
//all of this is the flowchart made using the REactFlow library

const edgeTypes = {
  deleteEdge : DeleteEdge
} 

function Flow({nodes, edges, NodesChange, EdgesChange, Connector, DisplayFlow}: any) {

  const { loginWithRedirect, logout, user, } = useAuth0()

  useEffect(() => {
    Services.getFlow(user).then(response => {
      console.log(response)
      return response ? DisplayFlow(response) : DisplayFlow({ nodes:[], edges:[]} as Flowchart)
    })
  }, [DisplayFlow, user]);
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
        edgeTypes={edgeTypes as EdgeTypes}
        proOptions={{hideAttribution:true}}
        connectionMode= {ConnectionMode.Loose}

        >
            <Background/>
            <Controls/>
            <NodeButton  loginWithRedirect = {loginWithRedirect} logout = {logout}  user={user} />
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
    Connector: (connection: Connection) => dispatch({type: 'CONNECT', payload: connection}),
    DisplayFlow: (flow:Flowchart) => dispatch({type:'DISPLAY_FLOW', payload: flow})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Flow);