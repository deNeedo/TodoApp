import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, addDoc } from 'firebase/firestore'
import { hashPassword } from '../../utils/hashGenerator.jsx'
import { registerValidator } from '../../utils/registerValidator.jsx'

export default function Register() {
    const navigate = useNavigate(); const location = useLocation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeated, setRepeated] = useState('')
    
    const login = () => {navigate('/login', {state: {user: location.state.user}})}
    const home = () => {navigate('/home', {state: {user: location.state.user}})}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== '' & password !== '' & repeated !== '') {
            let response = await registerValidator(username, password, repeated)
            if (response == 0) {
                let hash = await hashPassword(password)
                await addDoc(collection(db, 'users'), {username: username, password: hash})
                console.log('Successfully registered!')
                home()
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
                <div> <input type='test' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)} required/> </div>
                <div> <input type='test' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)} required/> </div>
                <div> <input type='test' placeholder='Repeat password...' value={repeated} onChange={(e) => setRepeated(e.target.value)} required/> </div>
                <div> <button> SUBMIT </button> </div>
            </form>
            <div> <button onClick={login}> LOGIN </button> </div>
            <div> <button onClick={home}> HOME  </button> </div>
        </div>
    )
}