import React, { useState } from 'react'
import { db } from '../firebase.js'
import { collection, addDoc, updateDoc } from 'firebase/firestore'

export default function AddTodo({ user, project, updateTodos }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (project === undefined) {
            await addDoc(collection(db, 'todos'), {user: user, title: title, description: description, date: date, completed: false, priority: 0, labels: []})
            setTitle(''); setDescription(''); setDate(''); updateTodos()
        } else {
            
            await updateDoc((db, 'projects'), {})
            setTitle(''); setDescription(''); setDate(''); updateTodos()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div> <input type='text' placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} required/> </div>
            <div> <input type='text' placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)}/> </div>
            <div> <input type='datetime-local' value={date} onChange={(e) => setDate(e.target.value)}/> </div>
            <div> <button> Add Todo </button> </div>
        </form>
    ) 
}