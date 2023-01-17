import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { getBezierPath } from 'reactflow'

function DeleteEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }: any) {
    
    const dispatch = useDispatch()
    // code from ReactFLow, gets the path the edge will take from one node to the other, as well as the postion of the label at the center of the line
    const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    })
  //The path and  foreign object piece are also from the library docs
  return (
    <Fragment>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={80}
        height={40}
        x={labelX - 35 / 2}
        y={labelY - 25 / 2}
        className="DeleteEdge"
      >
        <div>
          <button title='edgeDelete' className="Deletebutton" onClick={() => dispatch({type: 'DELETE_EDGE', id: id})}>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
          </button>
        </div>
      </foreignObject>
    </Fragment>
  )
}

export default DeleteEdge