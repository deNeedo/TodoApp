import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, query, onSnapshot } from 'firebase/firestore'
import Todo from './Todo.jsx'
import AddTodo from './AddTodo.jsx'
import { db } from '../firebase.js'
import './style/Home.css'

export default function Home() {
    const navigate = useNavigate(); const location = useLocation()
    const [todos, setTodos] = useState([])
    const [user, setUser] = useState(location.state.user);
    const loginRedirect = () => {user === null ? navigate('/login', {state: {user: user}}) : console.log("Already logged in!")}
    const registerRedirect = () => {user === null ? navigate('/register', {state: {user: user}}) : console.log("Already logged in!")}
    const logout = () => {setUser(null)}

    useEffect(() => {
        if (user !== null) {
            const q = query(collection(db, "todos"))
            const unsub = onSnapshot(q, (QuerySnapshot) => {
                let array = []
                QuerySnapshot.forEach((doc) => {
                    if (doc.data().user === location.state.user) {
                        array.push({id: doc.id, ...doc.data()})
                    }
                })
                setTodos(array)
            })
            return () => unsub()
        } else {
            setUser(null)
        }
    }, [])

    return (
        user === null ?
        <div>
            <div> <button onClick={registerRedirect}> REGISTER REDIRECT </button> </div>
            <div> <button onClick={loginRedirect}> LOGIN REDIRECT </button> </div>
        </div> :
        <div>
            <div> <AddTodo user={user}/> </div>
            <div> {todos.map((todo) => (<Todo key={todo.id} todo={todo} />))} </div>
            <div> <button onClick={registerRedirect}> REGISTER REDIRECT </button> </div>
            <div> <button onClick={loginRedirect}> LOGIN REDIRECT </button> </div>
            <div> <button onClick={logout}> LOGOUT </button> </div>
        </div>
    )
}
