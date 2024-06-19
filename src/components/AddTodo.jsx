import React, { useState } from 'react'
import { db } from '../firebase.js'
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore'
import '../components/css/AddTodo.css' // Add a dedicated CSS file for AddTodo styling

export default function AddTodo({ user, project, updateProjects, updateTodos, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState(0);

    const generateID = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let m = 0; m < 20; m++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (project === undefined) {
            await addDoc(collection(db, 'todos'), {user: user, title: title, description: description, date: date, completed: false, priority: priority, labels: []});
            setTitle(''); setDescription(''); setDate(''); setPriority(0); updateTodos();
        } else {
            let id = generateID();
            let todo = {id: id, user: user, title: title, description: description, date: date, completed: false, priority: priority, labels: []};
            project.todos.push(todo);
            await updateDoc(doc(db, "projects", project.id), {todos: project.todos});
            setTitle(''); setDescription(''); setDate(''); setPriority(0);
            updateProjects(); updateTodos();
        }
        onClose(); // Close the modal after adding the todo
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type='text' id="title" className="add-todo-input" placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type='text' id="description" className="add-todo-input" placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type='datetime-local' id="date" className="add-todo-input" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <input type='number' min='0' id="priority" className="add-todo-input" placeholder='Priority...' value={priority} onChange={(e) => setPriority(e.target.value)}/>
            </div>
            <div>
                <button className="add-todo-button"> Add Todo </button>
            </div>
        </form>
    )
}
