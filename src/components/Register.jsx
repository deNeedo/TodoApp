import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { hashPassword } from '../utils/hashGenerator.jsx'
import { registerValidator } from '../utils/registerValidator.jsx'
import './style/Register.css'

export default function Register() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [repeated, setRepeated] = React.useState("")
    const navigate = useNavigate(); const location = useLocation()
    const loginRedirect = () => {navigate('/login', {state: {user: location.state.user}})}
    const homeRedirect = () => {navigate('/home', {state: {user: location.state.user}})}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== "" & password !== "" & repeated !== "") {
            let response = await registerValidator(username, password, repeated)
            if (response == 0) {
                let hash = await hashPassword(password)
                await addDoc(collection(db, "users"), {username: username, password: hash})
                console.log('Successfully registered!')
                homeRedirect()
            } else if (response == 1) {
                console.log('Provided passwords don\'t match!')
            } else if (response == 2) {
                console.log('Password doesn\'t meet the requirements!')
            } else if (response == 3) {
                console.log('User already exist!')
            }
            setUsername(""); setPassword(""); setRepeated("")
        } else {
            // handle locking button if not all fields contain data
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div> <input type='test' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)}/> </div>
                <div> <input type='test' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)}/> </div>
                <div> <input type='test' placeholder='Repeat password...' value={repeated} onChange={(e) => setRepeated(e.target.value)}/> </div>
                <div> <button> Register </button> </div>
            </form>
            <div> <button onClick={loginRedirect}> LOGIN REDIRECT </button> </div>
            <div> <button onClick={homeRedirect}> HOME REDIRECT </button> </div>
        </div>
    )
}