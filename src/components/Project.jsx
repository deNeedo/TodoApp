import React, { useState } from 'react'
import { db } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

import Todo from './Todo.jsx'

import StyleTodo from './style/Todo.module.css'

export default function Project({ project, updateProjects, updateTodos, todos }) {
    const [newTitle, setNewTitle] = useState('')
    const [selectedTodo, setSelectedTodo] = useState(todos.length > 0 ? todos[0].title : '')

    const handleEdit = async (project, title) => {
        if (title !== '') {
            await updateDoc(doc(db, "projects", project.id), {title: title})
            updateProjects()
        }
        else {
            console.log('You need to provide title for your project!')
        }
    }
    const handleDelete = async (id) => {
        let response = window.confirm("Are you sure?")
        if (response) {
            await deleteDoc(doc(db, "projects", id)); updateProjects()
        }
    }
    const handleTitleChange = (e) => {
        e.preventDefault()
        project.title = ''
        setNewTitle(e.target.value)
    }
    const selectTodo = (e) => {
        e.preventDefault()
        setSelectedTodo(e.target.value)
    }
    const addTodo = async (project, todo) => {
        let toAdd; let unique = true
        function findIndex(elem) {
            if (toAdd.title === elem.title) {
                unique = false
            }
        }
        if (todo != '') {
            for (let m = 0; m < todos.length; m++) {
                if (todos[m].title == todo) {
                    toAdd = todos[m]; break
                }
            }
            project.todos.forEach(findIndex)
            if (unique) {
                project.todos.push(toAdd)
                await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
                updateProjects()
            } else {
                console.log('already added')
            }
        }
        console.log(project)
    }
    return (
        <div>
            <div> <input type='text' value={project.title === "" ? newTitle : project.title} onChange={handleTitleChange}/> </div>
            <div>
                <button onClick={() => handleEdit(project, newTitle)}> Edit </button>
                <button onClick={() => handleDelete(project.id)}> Delete </button>
                <button onClick={() => addTodo(project, selectedTodo)}> Add Todo </button>
                <select value={selectedTodo} onChange={selectTodo}> {todos.map((todo) => (
                    <option value={todo.title}> {todo.title} </option>
                ))}
                </select>
                <div> {project.todos.map((todo) => (
                    (todo.completed === true)
                    ? <Todo className={StyleTodo['complete']} key={todo.id} todo={todo} updateTodos={updateTodos}/>
                    : (Date.parse(todo.date) - Date.now() < 0)
                    ? <Todo className={StyleTodo['overdue']} key={todo.id} todo={todo} updateTodos={updateTodos}/>
                    : <Todo className={StyleTodo['incomplete']} key={todo.id} todo={todo} updateTodos={updateTodos}/>
                ))} </div>
            </div>
        </div>
    )
}