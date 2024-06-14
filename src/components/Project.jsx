import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default function Project({ projects, project, updateProjects }) {
    const navigate = useNavigate(); const location = useLocation()
    const [newTitle, setNewTitle] = useState(project.title)

    const todosRedirect = (project) => {navigate('/todos', {state: {user: location.state.user, projects: projects, project: project, todos: project.todos}})}

    const handleEdit = async (project, title) => {
        if (title !== '') {
            await updateDoc(doc(db, 'projects', project.id), {title: title})
            updateProjects()
        }
        else {
            console.log('You need to provide title for your project!')
        }
    }

    const handleDelete = async (id) => {
        let response = window.confirm('Are you sure?')
        if (response) {
            await deleteDoc(doc(db, 'projects', id)); updateProjects()
        }
    }

    const handleTitleChange = (e) => {
        e.preventDefault()
        project.title = ''
        setNewTitle(e.target.value)
    }

    return (
        <div>
            <div> <input type='text' value={project.title === '' ? newTitle : project.title} onChange={handleTitleChange}/> </div>
            <div>
                <button onClick={() => handleEdit(project, newTitle)}> Edit </button>
                <button onClick={() => handleDelete(project.id)}> Delete </button>
                <button onClick={() => todosRedirect(project)}> Show todos </button>
            </div>
        </div>
    )
}