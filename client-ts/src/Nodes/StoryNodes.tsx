
import { Handle, Position } from 'reactflow'

import DisplayContents from './NodeComponents/DisplayContents'

//custom node with four connection points(the Handles)

function StoryNodes({ id } : any) {

  
  return (
    <div className='story-node'>
      <Handle type="source" position={Position.Top}  id="a"/>
      <Handle type="source" position={Position.Right} id="b" />
      <div className='contents'>
        <DisplayContents id = {id}/>
      </div>
      <Handle type="source" position={Position.Left} id="c" />
      <Handle type="source" position={Position.Bottom} id="d"/>
    </div>
  )
}

export default StoryNodes