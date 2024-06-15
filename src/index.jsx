import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './index.css';

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
            <AnimatedRoutes />
        </BrowserRouter>
    </StrictMode>
);

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="slide"
                timeout={500}
            >
                <Routes location={location}>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}
