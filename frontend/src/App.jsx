import axios from 'axios'
import React, { useEffect } from 'react'
import { useState} from 'react'



const App = () => {
  const [notes, setNotes] = useState([])


  function fechNotes(){

axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
 setNotes(res.data.notes)
})
}  

useEffect(()=>{
  fechNotes()
},[])

function handleSubmit(e){
  e.preventDefault()

  const {title, description} = e.target.elements
  console.log(title.value,description.value)

  axios.post("http://localhost:3000/api/notes",{
    title : title.value,
    description:description.value
  }).then((res)=>{
    console.log(res.data)
    fechNotes()
  })
  

}

function handleDelete(noteId){
axios.delete("http://localhost:3000/api/notes/"+noteId)
.then(res=>{
  console.log(res.data)
  fechNotes()
})


}

  return (
   <>
   <form className="note-create-form" onSubmit={handleSubmit} >
    <input  name="title" type='text' placeholder="enter your title"/>
     <input name="description"  type='text' placeholder="enter your description"/>
  <button>Create note</button>
   </form>
     <div className='notes'>{
   notes.map(note=>{
  return <div className='note'>
 <h1>{note.title}</h1>
 <p>{note.description}</p>
 <button onClick={()=>{handleDelete(note._id)}}>delete note</button>
    </div>
    })
    }
  </div>
   </>
  )
}

export default App