import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//This is all of the contnents of the node, should reall be split into 2-4 diffrenet components

export const DisplayContents = ({ id }: any) => {

  const dispatch = useDispatch()

  //makes sure the node updates when the state is updated
  const dataSel = useSelector((state: any) => state.nodes.find((element: any) => element.id===id))


  return (
    <Fragment>

      {/* Below this line checks if you are currently adding a new image, if you are it displays the textbox where a link can be added, if not it displays the image or a a hoverable clickable div*/}
        { dataSel.data.newImg ?
          <div className='addImageDiv'>
            <form onSubmit={() => dispatch({type: 'ADD_IMG', id: id })}>
              <label htmlFor="newImg">Edit</label>
              <input type="text" id='newImg' defaultValue={dataSel.data.img} onChange={event => dispatch({type: 'NEW_IMG', payload: event.target.value, id: id})}/>
              <button type='submit'>Save</button>
            </form>
          </div> :
          dataSel.data.img ? 
            <div className='imgdiv' onClick={() => dispatch({type: 'ADD_IMG', id: id })}>
              <img src={dataSel.data.img} alt="https://media.istockphoto.com/id/861275196/vector/x-red-cross-brush-paint-stroke.jpg?s=612x612&w=0&k=20&c=2E_I29EL_zX_jVLRSxIxN4AKYnB8tuzLVrbbvDJZ5EQ=" />
            </div> :
            <div className='addimage'onClick={() => dispatch({type: 'ADD_IMG', id: id })}>Click to add image</div>}

        {/* below this line does the same as the image ternary above but for the text of the image*/}
        {dataSel.data.isEdit ?
        <div className='newTextDiv'>
          <form onSubmit={() => dispatch({type: 'EDIT', id: id})}>
            <label htmlFor="newText">Edit</label>
            <input type="text" id='newText' defaultValue={dataSel.data.label} onChange={event => dispatch({type: 'NEW_TEXT', payload: event.target.value, id: id})}/>
            <button type='submit'>Save</button>
          </form>
        </div>: 
        <div className='textContent' onClick={() => dispatch({type: 'EDIT', id: id})}>{dataSel.data.label}</div> }
    </Fragment>
  )
}


export default DisplayContents