import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export default function Home() {
    const navigate = useNavigate(); const location = useLocation()
    
    const [projects, setProjects] = useState([])
    const [todos, setTodos] = useState([])
    const [user, setUser] = useState(location.state !== null ? location.state.user : null);

    const loginRedirect = () => {user === null ? navigate('/login', {state: {user: user}}) : console.log("Already logged in!")}
    const registerRedirect = () => {user === null ? navigate('/register', {state: {user: user}}) : console.log("Already logged in!")}
    const projectsRedirect = () => {navigate('/projects', {state: {user: user, projects: projects, todos: todos}})}
    const todosRedirect = () => {navigate('/todos', {state: {user: user, projects: projects, todos: todos}})}
    const logout = () => {setUser(null)}

    useEffect(() => {
        if (user === null) {
            setUser(null)
        } else {
            fetchProjects()
            fetchTodos()
        }
    }, [user])

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
        setTodos(array)
    }}

    return (
        user !== null ?
        <div>
            <div> <button onClick={projectsRedirect}> PROJECTS </button> </div>
            <div> <button onClick={todosRedirect}> TODOS </button> </div>
            <div> <button onClick={logout}> LOGOUT </button> </div>
        </div>
        :
        <div>
            <div> <button onClick={loginRedirect}> LOGIN </button> </div>
            <div> <button onClick={registerRedirect}> REGISTER </button> </div>
        </div>
    )
}