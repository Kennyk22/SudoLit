import { useCallback } from "react"
import { ReactFlow, Node, Edge, NodeChange, EdgeChange, Connection, applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow"
export type Flowchart = {
  nodes : Node[]
  edges : Edge[]
}

const initFlow: Flowchart = {
  nodes: [
    {
      id: '4',
      type: 'storyNodes',
      data: {label: 'wow'},
      position: {x: 400, y: 400}
    },
    {
      id: '5',
      type: 'storyNodes',
      data: {label: 'wew'},
      position: {x: 600, y: 400}
    }
  ],
  edges: [{id:'a1-2', source:'1', target:'2', sourceHandle: 'b', targetHandle: 'c'}]
}

type action = {
  type: string,
  payload?: NodeChange[] | EdgeChange[] | Connection
}

const nodeReducer = (state: Flowchart = initFlow, action:action) => {
  switch (action.type) {
    case 'NODE_CHANGE':   
      return {...state, nodes: applyNodeChanges(action.payload as NodeChange[], state.nodes)}
    case 'EDGE_CHANGE':   
      return {...state, edges: applyEdgeChanges(action.payload as EdgeChange[], state.edges)}
    case 'CONNECT':   
      return {...state, edges: addEdge(action.payload as Connection, state.edges)}
    default:
      return state
  }
}



export default nodeReducer