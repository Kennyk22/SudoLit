
import { NodeChange, EdgeChange, Connection, applyEdgeChanges, applyNodeChanges, addEdge, Node } from "reactflow"
import { NodesVisitor } from "typescript"
import { Flowchart, action } from "./Types"
// Initial Nodes for Testing
const initFlow: Flowchart = {
  nodes: [
    {
      id: '1',
      type: 'storyNodes',
      data: {label: `To be, or not to be, that is the question:
      Whether 'tis nobler in the mind to suffer
      The slings and arrows of outrageous fortune,
      Or to take arms against a sea of troubles
      And by opposing end them. To die—to sleep,
      No more; and by a sleep to say we end
      The heart-ache and the thousand natural shocks
      That flesh is heir to: 'tis a consummation
      Devoutly to be wish'd. To die, to sleep;
      To sleep, perchance to dream—ay, there's the rub:
      For in that sleep of death what dreams may come,
      When we have shuffled off this mortal coil,
      Must give us pause—there's the respect
      That makes calamity of so long life.
      For who would bear the whips and scorns of time,
      Th'oppressor's wrong, the proud man's contumely,
      The pangs of dispriz'd love, the law's delay,
      The insolence of office, and the spurns
      That patient merit of th'unworthy takes,
      When he himself might his quietus make
      With a bare bodkin? Who would fardels bear,
      To grunt and sweat under a weary life,
      But that the dread of something after death,
      The undiscovere'd country, from whose bourn
      No traveller returns, puzzles the will,
      And makes us rather bear those ills we have
      Than fly to others that we know not of?
      Thus conscience doth make cowards of us all,
      And thus the native hue of resolution
      Is sicklied o'er with the pale cast of thought,
      And enterprises of great pith and moment
      With this regard their currents turn awry
      And lose the name of action.`, isEdit:false, newImg: false, img: 'https://pbs.twimg.com/profile_images/1375853668306665476/F0M5HDhP_400x400.jpg'},
      position: {x: 800, y: 400}
    },
    {
      id: '2',
      type: 'storyNodes',
      data: {label: 'wew', isEdit:false, newImg: false, img: 'https://pbs.twimg.com/profile_images/1375853668306665476/F0M5HDhP_400x400.jpg'},
      position: {x: 0, y: 400}
    }
  ],
  edges: [{id:'a1-2', source:'1', target:'2', sourceHandle: 'b', targetHandle: 'c'}]
}

//Helper Function Creates ID and Checks if ID is Taken, rarely necassary but good future proofing
const generateId = (state: Node[]) => {
  let Id = JSON.stringify(Math.floor(Math.random() * 1000))
  state.forEach((e) => {
    if (Id === e.id) {
      Id = generateId(state)
    }
  })
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
      return {...state, edges: addEdge(action.payload as Connection, state.edges)}

    //Handles the selecting and editing of conentents of node  
    case 'EDIT' :
      return {...state, nodes: state.nodes.map((e) => {
        console.log(e.id, e.data.isEdit, !e.data.isEdit)
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
      return {...state, nodes: state.nodes.map((e) => {
        e.data.img = e.id === action.id ? action.payload: e.data.img
        return {...e} 
      })}

    //creates new node and adds it to the nodes in the state
    case 'NEW_NODE' :
      console.log('click')
      const NewNode = {
        id: generateId(state.nodes), 
        type: 'storyNodes',
        data: {label: 'Add Text', isEdit:false, newImg: false, img: ''},
        position: {x: 0, y: 0}
      }
      return {...state, nodes: [...state.nodes, NewNode]}
    default:
      return state
  }
}



export default nodeReducer