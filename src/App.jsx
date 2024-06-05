import React from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot } from 'firebase/firestore'
import Title from './components/Title'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import { db } from './firebase'
import './App.css'


export default function App() {
    const [todos, setTodos] = React.useState([])

    React.useEffect(() => {
        const q = query(collection(db, "todos"))
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
        await deleteDoc(doc(db, "todos", id))
    }


    return (
        <div>
            <div>
                <Title/>
            </div>
            <div>
                <AddTodo/>
            </div>
            <div>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} handleEdit={handleEdit} toggleComplete={toggleComplete} handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}
