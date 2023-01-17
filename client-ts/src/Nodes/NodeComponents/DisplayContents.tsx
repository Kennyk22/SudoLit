import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readBuilderProgram } from 'typescript'
import Services from '../../APIservices/APservice'

//This is all of the contnents of the node, should reall be split into 2-4 diffrenet components

export const DisplayContents = ({ id }: any) => {

  const dispatch = useDispatch()

  //makes sure the node updates when the state is updated
  const dataSel = useSelector((state: any) => state.nodes.find((element: any) => element.id===id))

  const handleUpload = async (event: any) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image)
    reader.onloadend = async () => {
      const response = await Services.uploadImage(reader.result)
      console.log(response)
      dispatch({type: 'NEW_IMG', payload: response.url, id: id})
    }
  }


  return (
    <Fragment>

      {/* Below this line checks if you are currently adding a new image, if you are it displays the textbox where a link can be added, if not it displays the image or a a hoverable clickable div*/}
        { dataSel.data.newImg ?
          <div className='addImageDiv'>
            <form onSubmit={() => dispatch({type: 'ADD_IMG', id: id })}>
              <label htmlFor="newImg">Edit</label>
              <input type="file" id='newImg' onChange={event => handleUpload(event)}/>
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
            <input title='EditText' type="text" id='newText' defaultValue={dataSel.data.label} onChange={event => dispatch({type: 'NEW_TEXT', payload: event.target.value, id: id})}/>
            <br />
            <button type='submit'>Save</button>
          </form>
        </div>: 
        <div className='textContent' onClick={() => dispatch({type: 'EDIT', id: id})}>{dataSel.data.label}</div> }
        <button title='delete' className='deletebutton' onClick={() => dispatch({type: 'DELETE', id: id})}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        </button>
    </Fragment>
  )
}


export default DisplayContents