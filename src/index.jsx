import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './index.css'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/password-reset" element={<PasswordReset/>} />
                <Route path="/terms" element={<Terms/>} />
                <Route path="/employee-login" element={<EmployeeLogin/>} />
                <Route path="/employee-register" element={<EmployeeRegister/>} />
                <Route path="/orders" element={<Orders/>} /> */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
