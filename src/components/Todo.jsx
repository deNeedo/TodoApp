import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase.js'
import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export default function Todo({ projects, project, todo, className, updateProjects, updateTodos }) {
    const location = useLocation()
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDescription, setNewDescription] = useState(todo.description)
    const [newDate, setNewDate] = useState(todo.date)
    const [newPriority, setNewPriority] = useState(todo.priority)
    const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0] : undefined)

    const convertInt = (priority) => {
        let temp = ''; let flag = true
        for (let m = 0; m < priority.length; m++) {
            if (priority[m] != 0) {
                flag = false
            }
            if (flag & priority[m] == 0) {
                continue
            } else {
                temp += priority[m]
            }
        }
        if (temp == '') {
            return 0
        } else {
            return temp
        }
    }

    const handleEdit = async (todo, title, description, date, priority) => {
        if (title !== '') {
            if (project === undefined) {
                await updateDoc(doc(db, "todos", todo.id), {title: title, description: description, date: date, priority: priority})
                updateTodos()
            } else {
                let index
                function findIndex(elem, idx) {
                    if (todo.id === elem.id) {
                        index = idx
                    }
                }
                project.todos.forEach(findIndex)
                let obj = project.todos[index]
                obj.title = title; obj.description = description; obj.date = date; obj.priority = priority
                project.todos[index] = obj
                await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
                updateProjects()
                updateTodos()
            }

        }
        else {
            console.log('You need to provide title for your todo!')
        }
    }

    const toggleComplete = async (todo) => {
        if (project === undefined) {
            await updateDoc(doc(db, "todos", todo.id), {completed: !todo.completed})
            updateTodos()
        } else {
            let index
            function findIndex(elem, idx) {
                if (todo.id === elem.id) {
                    index = idx
                }
            }
            project.todos.forEach(findIndex)
            let obj = project.todos[index]
            obj.completed = !obj.completed
            project.todos[index] = obj
            await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
            updateProjects()
            updateTodos()
        }

    }

    const manageProject = async (project, selectedProject, todo) => {
        let unique = true; let index
        function findIndex(elem, idx) {
            if (todo.id === elem.id) {
                unique = false; index = idx
            }
        }
        if (project === undefined) {
            if (selectedProject !== undefined) {
                selectedProject.todos.forEach(findIndex)
                if (unique) {
                    selectedProject.todos.push(todo)
                    await updateDoc(doc(db, "projects", selectedProject.id), {todos: selectedProject.todos})
                    updateProjects()
                    await deleteDoc(doc(db, "todos", todo.id))
                    updateTodos()
                } else {
                    console.log('Todo already added to this project!')
                }
            }
        } else {
            project.todos.forEach(findIndex)
            let todo = project.todos.splice(index, 1)[0]
            await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
            updateProjects()
            await addDoc(collection(db, 'todos'), {user: location.state.user, title: todo.title, description: todo.description, date: todo.date, completed: todo.completed, priority: todo.priority, labels: todo.labels})
            updateTodos()
        }
    }

    const selectProject = (e) => {
        e.preventDefault()
        setSelectedProject(e.target.value)
    }

    const addLabel = async (todo) => {
        let unique = true; let index
        function findIndex(elem) {
            if (response == elem) {
                unique = false
            }
        } function findTodo(elem, idx) {
            if (todo.id === elem.id) {
                index = idx
            }
        }
        let response = window.prompt("Enter new label: ")
        if (response !== null & response !== '') {
            todo.labels.forEach(findIndex)
            if (unique) {
                todo.labels.push(response)
                if (project === undefined) {
                    await updateDoc(doc(db, "todos", todo.id), {labels: todo.labels})
                    updateTodos()
                } else {
                    console.log(index)
                    project.todos.forEach(findTodo)
                    console.log(index)
                    let obj = project.todos[index]
                    obj.labels = todo.labels
                    project.todos[index] = obj
                    await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
                    updateProjects()
                    updateTodos()
                } 
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
        if (project === undefined) {
            await updateDoc(doc(db, "todos", todo.id), {labels: todo.labels})
            updateTodos()
        } else {
            project.todos.forEach(findIndex)
            let obj = project.todos[index]
            obj.labels = todo.labels
            project.todos[index] = obj
            await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
            updateProjects()
            updateTodos()
        }

    }

    const handleDelete = async (id) => {
        let response = window.confirm("Are you sure?")
        if (response) {
            if (project === undefined) {
                await deleteDoc(doc(db, "todos", id))
                updateTodos()
            } else {
                let index
                function findIndex(elem, idx) {
                    if (todo.id === elem.id) {
                        index = idx
                    }
                }
                project.todos.forEach(findIndex)
                project.todos.splice(index, 1)
                await updateDoc(doc(db, "projects", project.id), {todos: project.todos})
                updateProjects()
                updateTodos()
            }

        }
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
        setNewPriority(convertInt(e.target.value))
    }

    return (
        project === undefined ?
        <div className={className}>
            <div> <input type='text' value={todo.title === '' ? newTitle : todo.title} onChange={handleTitleChange}/> </div>
            <div> <input type='text' value={todo.description === '' ? newDescription : todo.description} onChange={handleDescriptionChange}/> </div>
            <div> <input type='datetime-local' value={todo.date === '' ? newDate : todo.date} onChange={handleDateChange}/> </div>
            <div> <input type='number' min='0' value={todo.priority === 0 ? newPriority : todo.priority} onChange={handlePriorityChange}/> </div>
            <div> {todo.labels.map((label) => (
                <button key={Math.random()} onClick={() => deleteLabel(todo, label)}> {label} </button>
            ))}
            </div>
            <div>
                <button onClick={() => toggleComplete(todo)}> Toggle state </button>
                <button onClick={() => handleEdit(todo, newTitle, newDescription, newDate, newPriority)}> Edit </button>
                <button onClick={() => addLabel(todo)}> Add label </button>
                <button onClick={() => manageProject(project, selectedProject, todo)}> {project === undefined ? 'Move to project' : 'Remove from project'} </button>
                <select value={selectedProject} onChange={selectProject}> {projects.map((project) => (
                    <option key={Math.random()} value={project}> {project.title} </option>
                ))}
                </select>
                <button onClick={() => handleDelete(todo.id)}> Delete </button>
            </div>
        </div>
        :
        <div className={className}>
            <div> <input type='text' value={todo.title === '' ? newTitle : todo.title} onChange={handleTitleChange}/> </div>
            <div> <input type='text' value={todo.description === '' ? newDescription : todo.description} onChange={handleDescriptionChange}/> </div>
            <div> <input type='datetime-local' value={todo.date === '' ? newDate : todo.date} onChange={handleDateChange}/> </div>
            <div> <input type='number' min='0' value={todo.priority === 0 ? newPriority : todo.priority} onChange={handlePriorityChange}/> </div>
            <div> {todo.labels.map((label) => (
                <button key={Math.random()} onClick={() => deleteLabel(todo, label)}> {label} </button>
            ))}
            </div>
            <div>
                <button onClick={() => toggleComplete(todo)}> Toggle state </button>
                <button onClick={() => handleEdit(todo, newTitle, newDescription, newDate, newPriority)}> Edit </button>
                <button onClick={() => addLabel(todo)}> Add label </button>
                <button onClick={() => manageProject(project, undefined, todo)}> {project === undefined ? 'Move to project' : 'Remove from project'} </button>
                {/* <select value={selectedProject} onChange={selectProject}> {projects.map((project) => (
                    <option key={Math.random()} value={project}> {project.title} </option>
                ))}
                </select> */}
                <button onClick={() => handleDelete(todo.id)}> Delete </button>
            </div>
        </div>
    )
}