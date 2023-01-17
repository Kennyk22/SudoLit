
import { User } from "@auth0/auth0-react"
import { stat } from "fs"
import nodeTest from "node:test"
import { NodeChange, EdgeChange, Connection, applyEdgeChanges, applyNodeChanges, addEdge, Node } from "reactflow"
import { Flowchart, action, Title } from "./Types"

// Initial Nodes for Testing
const initFlow: Flowchart = {
  title: '',
  nodes: [],
  edges: []
}

//Helper Function Creates ID and Checks if ID is Taken, rarely necassary but good future proofing
const generateId = (state: Node[]) => {
  let Id = JSON.stringify(Math.floor(Math.random() * 1000))
  console.log(state)
  if (state.length) {
    state.forEach((e) => {
      if (Id === e.id) {
        Id = generateId(state)
      }
    })
  }
  return Id
}

const nodeReducer = (state: Flowchart = initFlow, action:action) => {
  switch (action.type) {
    //Handle All node/edge movement
    case 'NODE_CHANGE':   
      return {...state, nodes: applyNodeChanges(action.payload as NodeChange[], state.nodes)}
    case 'EDGE_CHANGE':   
      return {...state, edges: applyEdgeChanges(action.payload as EdgeChange[], state.edges)}
    case 'CONNECT':   
      return {...state, edges: addEdge({...action.payload as Connection, type: 'deleteEdge'} , state.edges)}

    //Handles the selecting and editing of conentents of node  
    case 'EDIT' :
      return {...state, nodes: state.nodes.map((e) => {
        e.data.isEdit = e.id === action.id ? !e.data.isEdit : e.data.isEdit
        return {...e} 
      })}
    case 'NEW_TEXT' :
      return {...state, nodes: state.nodes.map((e) => {
        e.data.label = e.id === action.id ? action.payload : e.data.label
        return {...e} 
      })}
    case 'ADD_IMG' :
      return {...state, nodes: state.nodes.map((e) => {
        e.data.newImg = e.id === action.id ? !e.data.newImg : e.data.newImg
        return {...e} 
      })}
    case 'NEW_IMG' :
      console.log(action.payload)
      return {...state, nodes: state.nodes.map((e) => {
        e.data.img = e.id === action.id ? action.payload : e.data.img
        return {...e} 
      })}
    case 'EDIT_TITLE' :
      return {...state, changeTitle: (state.changeTitle === undefined) ? true : !state.changeTitle}
    case 'NEW_TITLE' :
      return {...state, title: action.payload as string}
    //creates new node and adds it to the nodes in the state
    case 'NEW_NODE' :
      console.log(state)
      const NewNode = {
        id: generateId(state.nodes), 
        type: 'storyNodes',
        data: {label: 'Add Text', isEdit:false, newImg: false, img: ''},
        position: {x: 600, y: 200}
      }
      return {...state, nodes: [...state.nodes, NewNode]}
    // used for taking flow from api and replacing current flow
    case 'DISPLAY_FLOW':
      return {...action.payload as Flowchart}
    case 'DELETE':
      return {...state,
        nodes: state.nodes.filter(e => e.id !== action.id), 
        edges: state.edges.filter(e => e.source !== action.id || e.target !== action.id)
      }
    case 'DELETE_EDGE':
      return {
        ...state,
        edges: state.edges.filter((e) => e.id !== action.id)
      }
    case 'ADD_USER':
      return {...state, user: action.payload as string} 
    case 'MAKE_FLOWLIST' :
      return {...state, flowList: action.payload as Title[]}
    default:
      return state
  }
  //gets a flowchart from database
}



export default nodeReducer