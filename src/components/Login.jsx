import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginValidator } from '../utils/loginValidator'
import './style/Login.css'

export default function Login() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate(); const location = useLocation()
    const registerRedirect = () => {navigate('/register', {state: {user: location.state.user}})}
    const homeRedirect = () => {navigate('/home', {state: {user: location.state.user}})}
    const homeRedirectAfterLogin = (user) => {console.log(user); navigate('/home', {state: {user: user}})}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== "" & password !== "") {
            let response = await loginValidator(username, password)
            if (response == 0) {
                console.log('Successfully logged in!')
                homeRedirectAfterLogin(username)
            } else if (response == 1) {
                console.log('Wrong credentials!')
            }
            setUsername(""); setPassword("")
        }
        else {
            // handle locking button if not all fields contain data
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div> <input type='test' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)}/> </div>
                <div> <input type='test' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)}/> </div>
                <div> <button> Login </button> </div>
            </form>
            <div> <button onClick={registerRedirect}> REGISTER REDIRECT </button> </div>
            <div> <button onClick={homeRedirect}> HOME REDIRECT </button> </div>
        </div>
    )
}