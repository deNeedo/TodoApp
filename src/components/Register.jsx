import React from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, query, onSnapshot, doc, updateDoc, deleteDoc, QuerySnapshot, addDoc} from 'firebase/firestore'
import {db} from '../firebase.js'
import './style/Register.css'


export default function Register() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()
    const registerRedirect = () => {navigate('/login')}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== "" & password !== "") {
            // await addDoc(collection(db, "users"), {username: username, password: password})
            setUsername("")
            setPassword("")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div> <input type='test' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)}/> </div>
                <div> <input type='test' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)}/> </div>
                <div> <button> Register </button> </div>
            </form>
            <div> <button onClick={registerRedirect}> LOGIN REDIRECT </button> </div>
        </div>
    )
}