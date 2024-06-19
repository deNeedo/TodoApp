import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase.js';
import { collection, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import EditTodoModal from './EditTodoModal.jsx';

export default function Todo({ projects, project, todo, className, updateProjects, updateTodos }) {
    const location = useLocation();
    const [showEditModal, setShowEditModal] = useState(false);
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
            console.log(index)
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
    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const selectProject = (e) => {
        e.preventDefault()
        setSelectedProject(e.target.value)
    }

    const handleDelete = async (id) => {
        const response = window.confirm("Are you sure?");
        if (response) {
            if (project === undefined) {
                await deleteDoc(doc(db, "todos", id));
                updateTodos();
            } else {
                const index = project.todos.findIndex(t => t.id === id);
                if (index !== -1) {
                    project.todos.splice(index, 1);
                    await updateDoc(doc(db, "projects", project.id), { todos: project.todos });
                    updateProjects();
                    updateTodos();
                }
            }
        }
    };

    return (
        <>
            <div className={className}>
                <div className="todo-header">
                    <span className="todo-title">{todo.title}</span>
                    <span className="todo-priority">Priority: {todo.priority}</span>
                </div>
                <span className="date">{todo.date}</span>
                <div className="description">
                    {todo.description}
                </div>
                <div className="actions">
                    <button className="edit" onClick={toggleEditModal}>Edit</button>
                    <button className="edit" onClick={() => toggleComplete(todo)}>Toggle state</button>
                    <button className="edit" onClick={() => manageProject(project, selectedProject, todo)}>{project === undefined ? 'Move to project' : 'Remove from project'}</button>
                    <select className="project-sort-container" value={selectedProject} onChange={selectProject}> {projects.map((project) => (
                        <option key={Math.random()} value={project}> {project.title} </option>
                            ))}
                    </select>
                    <button className="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            </div>
            {showEditModal && (
                <EditTodoModal
                    todo={todo}
                    handleEdit={handleEdit}
                    onClose={toggleEditModal}
                />
            )}
        </>
    );
}
