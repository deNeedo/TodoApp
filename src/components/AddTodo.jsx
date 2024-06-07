import React from 'react'
import {db} from '../firebase.js'
import {collection, addDoc} from 'firebase/firestore'

export default function AddTodo() {
    const [title, setTitle] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title !== "") {
            await addDoc(collection(db, "todos"), {title, completed: false})
            setTitle("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type='test' placeholder='Enter Todo...' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <button> Add Todo </button>
            </div>
        </form>
    ) 
}