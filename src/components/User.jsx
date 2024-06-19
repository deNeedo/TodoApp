import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase.js'
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export default function User({ user, updateUsers }) {
    const location = useLocation()
    const [newTitle, setNewTitle] = useState(user.username)

    const findProjects = async (user) => {
        let array = []
        const querySnapshot = await getDocs(collection(db, 'projects'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === user.username) {
                array.push(doc.id)
            }
        });
        for (let m = 0; m < array.length; m++) {
            await deleteDoc(doc(db, 'projects', array[m]))
        }
    }


    const findTodos = async (user, id) => {
        let array = []
        const querySnapshot = await getDocs(collection(db, 'todos'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === user.username) {
                array.push(doc.id)
            }
        });
        for (let m = 0; m < array.length; m++) {
            await deleteDoc(doc(db, 'todos', array[m]))
        }
    }

    const handleEdit = async (user, username) => {
        if (username !== '') {
            await updateDoc(doc(db, 'users', user.id), {username: username})
            updateUsers()
        }
        else {
            console.log('You need to provide title for your project!')
        }
    }

    const handleDelete = async (user, id) => {
        let response = window.confirm('Are you sure?')
        if (response) {
            findProjects(user); findTodos(user)
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
                <button onClick={() => handleDelete(user, user.id)}> Delete </button>
            </div>
        </div>
    )
}