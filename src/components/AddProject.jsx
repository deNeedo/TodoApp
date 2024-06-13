import React, { useState } from 'react'
import { db } from '../firebase.js'
import { collection, addDoc } from 'firebase/firestore'

export default function AddProject({ user, updateProjects }) {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, 'projects'), {user: user, title: title, todos: []})
        setTitle(''); updateProjects()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div> <input type='text' placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} required/> </div>
            <div> <button> Add Project </button> </div>
        </form>
    ) 
}