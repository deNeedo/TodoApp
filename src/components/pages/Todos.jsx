import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

import AddTodo from '../AddTodo.jsx'
import Todo from '../Todo.jsx'

import StyleTodo from '../style/Todo.module.css'

export default function Todos() {
    const navigate = useNavigate(); const location = useLocation()

    const [projects, setProjects] = useState(location.state.projects)
    const [todos, setTodos] = useState(location.state.todos)

    const [sort, setSort] = useState(true)
    const [sortType, setSortType] = useState(true)

    const home = () => {navigate('/home', {state: {user: location.state.user}})}
    const logout = () => {navigate('/home', {state: {user: null}})}

    useEffect(() => {
        if (sort === true) {
            setSort(false)
            sortTodos()
        }
    }, [sort])

    const sortTodos = () => {
        let array = [...todos]
        let temp
        for (let m = 1; m < array.length; m++) {
            for (let n = 0; n < m; n++) {
                if (sortType === 'title') {
                    let titleA = (array[m].title).toLowerCase()
                    let titleB = (array[n].title).toLowerCase()
                    if (titleA.localeCompare(titleB) == -1) {
                        temp = array[m]
                        array[m] = array[n]
                        array[n] = temp
                    }
                } else if (sortType === 'description') {
                    let descA = (array[m].description).toLowerCase()
                    let descB = (array[n].description).toLowerCase()
                    if (descA == '') {
                        continue
                    } else if (descA.localeCompare(descB) == -1 | (descA != '' & descB == '')) {
                        temp = array[m]
                        array[m] = array[n]
                        array[n] = temp
                    }
                } else if (sortType === 'date') {
                    if (array[m].date == '') {
                        continue
                    } else if ((array[m].date).localeCompare(array[n].date) == -1 | (array[m].date != '' & array[n].date == '')) {
                        temp = array[m]
                        array[m] = array[n]
                        array[n] = temp
                    }
                } else if (sortType === 'priority') {
                    if (array[m].priority == 0) {
                        continue
                    } else if (array[m].priority < array[n].priority | (array[m].priority != 0 & array[n].priority == 0)) {
                        temp = array[m]
                        array[m] = array[n]
                        array[n] = temp
                    }
                }
            }
        }
        setTodos(array)
    }

    const changeSort = (e) => {
        e.preventDefault()
        setSortType(e.target.value); fetchTodos()
    }

    const fetchProjects = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(db, 'projects'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === location.state.user) {
                array.push({id: doc.id, ...doc.data()})
            }
        })
        setProjects(array)
    }

    const fetchTodos = async () => {{
        let array = []
        const querySnapshot = await getDocs(collection(db, 'todos'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === location.state.user) {
                array.push({id: doc.id, ...doc.data()})
            }
        })
        setTodos(array); setSort(true)
    }}

    return (
        <div>
            <AddTodo user={location.state.user} project={location.state.project} updateTodos={fetchTodos}/>
            <select value={sortType} onChange={changeSort}>
                <option value=''> --- </option>
                <option value='title'> Title </option>
                <option value='description'> Description </option>
                <option value='date'> Date </option>
                <option value='priority'> Priority </option>
            </select>
            <div> {todos.map((todo) => (
                (todo.completed === true)
                ? <Todo className={StyleTodo['complete']} key={todo.id} projects={projects} project={location.state.project} todo={todo} updateProjects={fetchProjects} updateTodos={fetchTodos}/>
                : (Date.parse(todo.date) - Date.now() < 0)
                ? <Todo className={StyleTodo['overdue']} key={todo.id} projects={projects} project={location.state.project} todo={todo} updateProjects={fetchProjects} updateTodos={fetchTodos}/>
                : <Todo className={StyleTodo['incomplete']} key={todo.id} projects={projects} project={location.state.project} todo={todo} updateProjects={fetchProjects} updateTodos={fetchTodos}/>
            ))} </div>
            <div> <button onClick={home}> BACK </button> </div>
            <div> <button onClick={logout}> LOGOUT </button> </div>
        </div>
    )
}
