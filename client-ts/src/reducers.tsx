import { ReactFlow, Node, Edge } from "reactflow"
type Flowchart = {
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
  edges: []
}

export const NodeReducer = (state: Flowchart = initFlow, action:object) => {}