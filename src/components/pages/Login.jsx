import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginValidator } from '../../utils/loginValidator';
import '../css/Login.css';

export default function Login() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = () => {navigate('/register', {state: {user: location.state.user}});}
    const home = () => {navigate('/home', {state: {user: location.state.user}});}
    const login = (user) => {navigate('/home', {state: {user: user}});}
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            let response = await loginValidator(username, password);
            if (response === 0) {
                console.log('Successfully logged in!');
                login(username);
            } else if (response === 1) {
                console.log('Wrong credentials!');
                setError('Wrong credentials!');
            }
            setUsername(''); 
            setPassword('');
        } else {
            // handle locking button if not all fields contain data
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="main-container">
            <button className="home-button" onClick={home}>
                <span className="arrow">←</span> HOME
            </button>
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
                <div className="shape shape5"></div>
            </div>
            <div className="container form-container">
                <h1 className="title">
                    LOGIN
                    <span className="emoji">👇🏼</span>
                </h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <div>
                        <label>Username</label>
                        <input type='text' placeholder='Enter username...' value={username} onChange={(e) => setUsername(e.target.value)} required/> 
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)} required/> 
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="submit-container">
                        <button type="submit">SUBMIT</button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">or</span>
                </div>
                <div className="button-container">
                    <button className="button" onClick={register}>REGISTER</button>
                </div>
            </div>
        </div>
    );
}
