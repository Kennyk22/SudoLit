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
  }) {
    
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
        x={labelX - 55 / 2}
        y={labelY - 20 / 2}
        className="DeleteEdge"
      >
        <div>
          <button className="Deletebutton" onClick={() => dispatch({type: 'DELETE_EDGE', id: id})}>
            Delete
          </button>
        </div>
      </foreignObject>
    </Fragment>
  )
}

export default DeleteEdge