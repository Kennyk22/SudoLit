import { User } from "@auth0/auth0-react"
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
  changeTitle?: Boolean
  title: string
  _id?: string
  user?: string
  nodes : Node[]
  edges : Edge[]
  flowList?: Title[]
}

export type Title = {
  _id: string,
  title: string,
}

export type action = {
  type: string,
  payload?: NodeChange[] | EdgeChange[] | Connection | string | [] | Flowchart | any
  id? : string
}

