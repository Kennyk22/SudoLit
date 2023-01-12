import React, { useCallback } from 'react'
import { Handle, Position } from 'reactflow'

type NodeData = {
  data: {
    label:string
  }
}
 
function StoryNodes({ data } : NodeData) {

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
      console.log(data)
      console.log(evt.target.value)
    }, [data])

  return (
    <div className='story-node'>
      <Handle type="source" position={Position.Top}  id="a"/>
      <Handle type="source" position={Position.Right} id="b" />
      <div>
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Left} id="c" />
      <Handle type="source" position={Position.Bottom} id="d"/>
      
    </div>
  )
}

export default StoryNodes