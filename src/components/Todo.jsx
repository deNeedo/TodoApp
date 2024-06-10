import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './style/Todo.css'
import { db } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default function Todo({todo})
{
    const [newTitle, setNewTitle] = React.useState(todo.title)
    const [newDescription, setNewDescription] = React.useState(todo.description)

    const handleEdit = async (todo, title, description) => {
        await updateDoc(doc(db, "todos", todo.id), {title: title, description: description})
    }
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {completed: !todo.completed})
    }
    const handleDelete = async (id) => {
        let response = window.confirm("Are you sure?")
        if (response) {await deleteDoc(doc(db, "todos", id))}
    }

    const handleTitleChange = (e) => {
        e.preventDefault()
        todo.title = ''
        setNewTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        e.preventDefault()
        todo.description = ''
        setNewDescription(e.target.value)
    }

    return (
        <div id={todo.completed === true ? "complete" : "incomplete"}>
            <div> <input type='text' value={todo.title === "" ? newTitle : todo.title} onChange={handleTitleChange}/> </div>
            <div> <input type='text' value={todo.description === "" ? newDescription : todo.description} onChange={handleDescriptionChange}/> </div>
            <div>
                <button onClick={() => toggleComplete(todo)}> Toggle state </button>
                <button onClick={() => handleEdit(todo, newTitle, newDescription)}> Edit </button>
                <button onClick={() => handleDelete(todo.id)}> Delete </button>
            </div>
        </div>
    )
}