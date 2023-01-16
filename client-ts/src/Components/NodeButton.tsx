import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Services from '../APIservices/APservice'
import { Flowchart } from '../Types'

function NodeButton({loginWithRedirect, logout, user}: any) {
  
  const stateLocal: Flowchart = useSelector(state => state) as Flowchart
  //will contain the whale button dashboard eventually, for now just makes a new node
  const dispatch = useDispatch()

  const handleSave = async (flow:Flowchart) => {
    Services.saveFlow(flow, user)
      .then(newFlow => dispatch({type:"DISPLAY_FLOW", payload: newFlow}))
  } 
  const handlePost = async (flow:Flowchart) => {
    await Services.postFlow(flow, user)
      .then(newFlow => dispatch({type:"DISPLAY_FLOW", payload: newFlow}))
  }

  



  return (
    <div className='newNodeDiv'>
        <button onClick={() => dispatch({type:"NEW_NODE"})}>Add Node</button>
        {user ? <button onClick={() => handleSave(stateLocal)}>SAVE</button> : null}
        {user ? <button onClick={() => handlePost(stateLocal)}>POST</button> : null}
        {!user ? <button onClick={() => loginWithRedirect()}>Log In</button> :
        <button onClick={() => logout({returnTo: window.location.origin})}>Log Out</button>}
        <p>{JSON.stringify(user)}</p>
        
        
    </div>
  )
}



export default NodeButton