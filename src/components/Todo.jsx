import React, { useState } from 'react'
import './style/Todo.css'
import { db } from '../firebase.js'
import { doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'

export default function Todo({todo, className})
{
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDescription, setNewDescription] = useState(todo.description)
    const [newDate, setNewDate] = useState(todo.date)
    const [newPriority, setNewPriority] = useState(todo.priority)

    const handleEdit = async (todo, title, description, date, priority) => {
        await updateDoc(doc(db, "todos", todo.id), {title: title, description: description, date: date, priority: priority})
    }
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {completed: !todo.completed})
    }
    const addLabel = async (todo) => {
        let unique = true
        function findIndex(elem) {
            if (response === elem) {
                unique = false
            }
        }
        let response = window.prompt("Enter new label: ")
        if (response !== null & response !== '') {
            todo.labels.forEach(findIndex)
            if (unique) {
                todo.labels.push(response)
                await updateDoc(doc(db, "todos", todo.id), {labels: todo.labels})
            }
        }
    }
    const deleteLabel = async (todo, label) => {
        let index
        function findIndex(elem, pos) {
            if (label === elem) {
                index = pos
            }
        }
        todo.labels.forEach(findIndex)
        todo.labels.splice(index, 1)
        await updateDoc(doc(db, "todos", todo.id), {labels: todo.labels})
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
    const handleDateChange = (e) => {
        e.preventDefault()
        todo.date = ''
        setNewDate(e.target.value)
    }
    const handlePriorityChange = (e) => {
        e.preventDefault()
        todo.priority = 0
        if (e.target.value >= 0) {
            setNewPriority(e.target.value)
        }
    }

    return (
        <div className={className}>
            <div> <input type='text' value={todo.title === "" ? newTitle : todo.title} onChange={handleTitleChange}/> </div>
            <div> <input type='text' value={todo.description === "" ? newDescription : todo.description} onChange={handleDescriptionChange}/> </div>
            <div> <input type='datetime-local' value={todo.date === "" ? newDate : todo.date} onChange={handleDateChange}/> </div>
            <div> <input type='number' min='0' value={todo.priority === 0 ? newPriority : todo.priority} onChange={handlePriorityChange}/> </div>
            <div> {todo.labels.map((label) => (
                <button key={Math.random()} onClick={() => deleteLabel(todo, label)}> {label} </button>
            ))}
            </div>
            <div>
                <button onClick={() => toggleComplete(todo)}> Toggle state </button>
                <button onClick={() => handleEdit(todo, newTitle, newDescription, newDate, newPriority)}> Edit </button>
                <button onClick={() => addLabel(todo)}> Add label </button>
                <button onClick={() => handleDelete(todo.id)}> Delete </button>
            </div>
        </div>
    )
}