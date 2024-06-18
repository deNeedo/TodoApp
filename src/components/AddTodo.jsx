import React, { useState } from 'react'
import { db } from '../firebase.js'
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore'

export default function AddTodo({ user, project, updateProjects, updateTodos, onClose }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    const generateID = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let m = 0; m < 20; m++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (project === undefined) {
            await addDoc(collection(db, 'todos'), {user: user, title: title, description: description, date: date, completed: false, priority: 0, labels: []})
            setTitle(''); setDescription(''); setDate(''); updateTodos()
        } else {
            let id = generateID()
            let todo = {id: id, user: user, title: title, description: description, date: date, completed: false, priority: 0, labels: []}
            project.todos.push(todo)
            await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
            setTitle(''); setDescription(''); setDate('');
            updateProjects(); updateTodos()
        }
        onClose(); // Close the modal after adding the todo
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
