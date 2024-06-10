import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase.js'
import { collection, addDoc } from 'firebase/firestore'

export default function AddTodo({user}) {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title !== "") {
            await addDoc(collection(db, "todos"), {user: user, title: title, description: description, completed: false})
            setTitle(""); setDescription("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div> <input type='test' placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)}/> </div>
            <div> <input type='test' placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)}/> </div>
            <div> <button> Add Todo </button> </div>
        </form>
    ) 
}