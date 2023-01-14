import { Node, Edge, NodeChange, EdgeChange, Connection } from "reactflow"

//All current types
export type NodeData = {
  data: {
    isEdit: boolean,
    newImg: boolean,
    img?: string,
    label:string
  }
}

export type Flowchart = {
  nodes : Node[]
  edges : Edge[]
}

export type action = {
  type: string,
  payload?: NodeChange[] | EdgeChange[] | Connection | string
  id? : string
}

