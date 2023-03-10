
import { User } from '@auth0/auth0-react'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Services from '../APIservices/APIservice'
import { Flowchart } from '../Types'

function NodeButton({loginWithRedirect, logout, user, isAuthenticated}: any) {
  
  const stateLocal: Flowchart = useSelector(state => state) as Flowchart
  const dispatch = useDispatch()

  const makeFlowList = async (user:User) => {
    const rawList = await Services.getFlowlist(user)
    const flowList = rawList.map((e:Flowchart) => {return {title : e.title, _id : e._id}})
    dispatch({type: 'MAKE_FLOWLIST', payload: flowList})
  }

  useEffect(()=>{
    if (isAuthenticated ) {
      (async () => {
      await makeFlowList(user)})()
    }
  }, [isAuthenticated, user])

  
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, flow:Flowchart) => {
    event.preventDefault()
    if (stateLocal._id) {
      await Services.saveFlow(flow)
        .then(newFlow => dispatch({type:"DISPLAY_FLOW", payload: newFlow}))
    } else {
      await Services.postFlow(flow)
        .then(newFlow => dispatch({type:"DISPLAY_FLOW", payload: newFlow as Flowchart}))
    }
    makeFlowList(user)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, type:string) => {
    event.preventDefault();
    dispatch({type: type})
  }

  const handleFlowFromList = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement;
    const newFlow = await Services.getFlow(target.flows.value)
    console.log(newFlow)
    dispatch({type: 'DISPLAY_FLOW', payload: newFlow})
    makeFlowList(user)
  }

  return (
    <div className='TopBar'>
        <button className='newNodeButton' onClick={() => dispatch({type:"NEW_NODE"})}>Add Node</button>
        {isAuthenticated ?
          <Fragment>
            <button className='saveButton' onClick={(e) => handleSave(e, stateLocal)}>SAVE</button>
            <button className='log' onClick={() => logout({returnTo: window.location.origin})}>Log Out</button>
            {(stateLocal.changeTitle === undefined || !stateLocal.changeTitle) ? 
              <button className='Titlebutton' onClick={()=>{dispatch({type:'EDIT_TITLE'})}}>
                Title: {stateLocal.title ? stateLocal.title : 'New Flow'}
              </button> :
              <form className='TitleForm' onSubmit={(event) => handleSubmit(event, 'EDIT_TITLE')}>
                <label htmlFor="newTitle">New Title: </label>
                <input type="text" id='newTitle' defaultValue={stateLocal.title} onChange={event => dispatch({type: 'NEW_TITLE', payload: event.target.value})}/>
                <button className='TitleSubmit' type='submit'>Save</button>
              </form>
            }
            <form className='flowListForm' onSubmit={handleFlowFromList}>
                <select title='flows' name='flows' className='flowsList' id='flowsList'>
                  {stateLocal.flowList?.map((e)=>{
                    console.log(e.title, "list thing")
                    return <option value={e._id} key={e._id}>{e.title}</option>
                  })}
                </select>
                <button type='submit'>Switch to Chart</button>
            </form>
            <button className='clearBoard' onClick={() => dispatch({type: 'DISPLAY_FLOW', payload: { title: '', user: user.email, nodes: [], edges: [], flowList: stateLocal.flowList}})}>Start Fresh</button>
          </Fragment> :
          <button className='log' onClick={() => loginWithRedirect()}>Log In</button>}
    </div>
  )
}



export default NodeButton