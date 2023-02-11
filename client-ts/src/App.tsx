
import React, { useCallback, useEffect } from 'react'
import ReactFlow, {Controls, Background, EdgeChange, Connection, NodeChange, ConnectionMode, EdgeTypes, MarkerType} from 'reactflow'
import './App.css'
import 'reactflow/dist/style.css'
import { Flowchart } from './Types'
import { connect } from 'react-redux'
import StoryNodes  from './Nodes/StoryNodes'
import NodeButton from './Components/NodeButton'
import Services from './APIservices/APIservice'
import { useAuth0, User } from '@auth0/auth0-react'
import DeleteEdge from './Edges/DeleteEdge'


const nodeTypes = {
  storyNodes: StoryNodes
};


const edgeTypes = {
  deleteEdge : DeleteEdge
} 

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  markerEnd: {
    type: MarkerType.Arrow,
    color: 'black',
  },
}

function App({nodes, edges, NodesChange, EdgesChange, Connector, DisplayFlow, AddUserToState, _id}: any) {

  const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0()
  
  

  useEffect(() => {
    if (isAuthenticated) {
      AddUserToState(user?.email)
      Services.getFlow(_id).then(response => {
        return response ? DisplayFlow(response) : DisplayFlow({ title: '', user: user?.email, nodes:[], edges:[]} as Flowchart)
      })
    }
  }, [DisplayFlow, isAuthenticated, AddUserToState, user, _id]);

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
    <div className='app'>
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
        defaultEdgeOptions = {defaultEdgeOptions}
        >
            <Background color='black'/>
            <Controls/>
            <NodeButton  loginWithRedirect = {loginWithRedirect} logout = {logout}  user={user} isAuthenticated = {isAuthenticated} />
        </ReactFlow>
        
    </div>
  )
}
const mapStateToProps = (state: Flowchart) => {
  return {
    nodes: state.nodes,
    edges: state.edges,
    _id: state._id
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    NodesChange: (changes: NodeChange[]) => dispatch({type: 'NODE_CHANGE', payload: changes}),
    EdgesChange: (changes: EdgeChange[]) => dispatch({type: 'EDGE_CHANGE', payload: changes}),
    Connector: (connection: Connection) => dispatch({type: 'CONNECT', payload: connection}),
    DisplayFlow: (flow:Flowchart) => dispatch({type:'DISPLAY_FLOW', payload: flow}),
    AddUserToState: (User: User) => dispatch({type: 'ADD_USER', payload: User})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);