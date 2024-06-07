import React from 'react'
import {useNavigate} from 'react-router-dom'
import './style/Login.css'

export default function Login() {
    const navigate = useNavigate()
    const registerRedirect = () => {navigate('/register')}
    return (
        <div>
            <div id="login_test">
                <button onClick={registerRedirect}> REGISTER REDIRECT </button>
            </div>
        </div>
    )
}