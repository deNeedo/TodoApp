import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default function User({ user, updateUsers }) {
    const location = useLocation()
    const [newTitle, setNewTitle] = useState(user.username)

    const handleEdit = async (user, username) => {
        if (username !== '') {
            await updateDoc(doc(db, 'users', user.id), {username: username})
            updateUsers()
        }
        else {
            console.log('You need to provide title for your project!')
        }
    }

    const handleDelete = async (id) => {
        let response = window.confirm('Are you sure?')
        if (response) {
            await deleteDoc(doc(db, 'users', id)); updateUsers()
        }
    }

    const handleTitleChange = (e) => {
        e.preventDefault()
        user.username = ''
        setNewTitle(e.target.value)
    }

    return (
        <div>
            <div> <input type='text' value={user.username === '' ? newTitle : user.username} onChange={handleTitleChange}/> </div>
            <div>
                <button onClick={() => handleEdit(user, newTitle)}> Edit </button>
                <button onClick={() => handleDelete(user.id)}> Delete </button>
            </div>
        </div>
    )
}