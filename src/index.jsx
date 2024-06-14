import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import Projects from './components/pages/Projects.jsx'
import Todos from './components/pages/Todos.jsx'
import Admin from './components/pages/Admin.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
