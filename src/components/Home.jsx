import React from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot } from 'firebase/firestore'
import Title from './Title.jsx'
import Todo from './Todo.jsx'
import AddTodo from './AddTodo.jsx'
import { db } from '../firebase.js'
import './style/Home.css'


export default function Home() {
    const [todos, setTodos] = React.useState([])
    const navigate = useNavigate()
    const loginRedirect = () => {navigate('/login')}
    const registerRedirect = () => {navigate('/register')}

    React.useEffect(() => {
        const q = query(collection(db, "todos")) // if you want to see users instead of todos change here to "users"
        const unsub = onSnapshot(q, (QuerySnapshot) => {
            let todosArray = []
            QuerySnapshot.forEach((doc) => {
                todosArray.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArray)
        })
        return () => unsub()
    }, [])

    const handleEdit = async (todo, title) => {
        await updateDoc(doc(db, "todos", todo.id), {title: title})
    }
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {completed: !todo.completed})
    }
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id)) // if you want to delete users instead of todos change here to "users"
    }


    return (
        <div>
            <div>
                <Title/>
            </div>
            <div>
                <AddTodo/>
            </div>
            <div> <button onClick={registerRedirect}> REGISTER REDIRECT </button> </div>
            <div> <button onClick={loginRedirect}> LOGIN REDIRECT </button> </div>
            <div>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} handleEdit={handleEdit} toggleComplete={toggleComplete} handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}
