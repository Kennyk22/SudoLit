import React from 'react'
import { useDispatch } from 'react-redux'

function NodeButton() {
  //will contain the whale button dashboard eventually, for now just makes a new node
  const dispatch = useDispatch()

  return (
    <div className='newNodeDiv'>
        <button onClick={() => dispatch({type:"NEW_NODE"})}>Add Node</button>
    </div>
  )
}

export default NodeButton