import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, addDoc } from 'firebase/firestore'
import { hashPassword } from '../../utils/hashGenerator.jsx'
import { registerValidator } from '../../utils/registerValidator.jsx'
import '../css/Register.css';

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeated, setRepeated] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = () => { navigate('/login', { state: { user: location.state.user } }) };
    const home = () => { navigate('/home', { state: { user: location.state.user } }) };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password.length < 8) {
            setErrorMessage('Password does not have at least 8 characters.');
            return;
        }
        if (!/\d/.test(password)) {
            setErrorMessage('Password needs to have at least one digit.');
            return;
        }
        if (password !== repeated) {
            setErrorMessage('Provided passwords do not match.');
            return;
        }

        if (username !== '' && password !== '' && repeated !== '') {
            let response = await registerValidator(username, password, repeated);
            if (response === 0) {
                let hash = await hashPassword(password);
                await addDoc(collection(db, 'users'), { username: username, password: hash });
                console.log('Successfully registered!');
                home();
            } else if (response === 1) {
                setErrorMessage('Provided passwords don\'t match!');
            } else if (response === 2) {
                setErrorMessage('Password doesn\'t meet the requirements!');
            } else if (response === 3) {
                setErrorMessage('User already exists!');
            }
            setUsername('');
            setPassword('');
            setRepeated('');
        } else {
            setErrorMessage('Please fill out all fields.');
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
                <div className="title">
                    REGISTER
                    <span className="emoji">👇🏼</span>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" placeholder="Enter username..." value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Repeat Password</label>
                        <input type="password" placeholder="Repeat password..." value={repeated} onChange={(e) => setRepeated(e.target.value)} required />
                    </div>
                    <div className="submit-container">
                        <button type="submit">SUBMIT</button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">or</span>
                </div>
                <div className="button-container">
                    <button className="login-button" onClick={login}>LOGIN</button>
                </div>
            </div>
            <div className="footer">
                made by Jeremi Sadkowski, Jacek Kudrys & Stanisław Pilch
            </div>
        </div>
    );
}