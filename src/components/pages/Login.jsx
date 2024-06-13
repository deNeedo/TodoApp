import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginValidator } from '../../utils/loginValidator'

export default function Login() {
    const navigate = useNavigate(); const location = useLocation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const register = () => {navigate('/register', {state: {user: location.state.user}})}
    const home = () => {navigate('/home', {state: {user: location.state.user}})}
    const login = (user) => {navigate('/home', {state: {user: user}})}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== '' & password !== '') {
            let response = await loginValidator(username, password)
            if (response == 0) {
                console.log('Successfully logged in!')
                login(username)
            } else if (response == 1) {
                console.log('Wrong credentials!')
            }
            setUsername(''); setPassword('')
        }
        else {
            // handle locking button if not all fields contain data
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div> <input type='test' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)} required/> </div>
                <div> <input type='test' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)} required/> </div>
                <div> <button> SUBMIT </button> </div>
            </form>
            <div> <button onClick={register}> REGISTER </button> </div>
            <div> <button onClick={home}> HOME </button> </div>
        </div>
    )
}