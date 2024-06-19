import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';


export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(location.state !== null ? location.state.user : null);

    const loginRedirect = () => {
        user === null ? navigate('/login', { state: { user: user } }) : console.log("Already logged in!");
    };

    const registerRedirect = () => {
        user === null ? navigate('/register', { state: { user: user } }) : console.log("Already logged in!");
    };

    const usersRedirect = () => {
        navigate('/users', { state: { user: user, users: users } });
    };

    const projectsRedirect = () => {
        navigate('/projects', { state: { user: user, projects: projects, todos: todos } });
    };

    const todosRedirect = () => {
        navigate('/todos', { state: { user: user, projects: projects, todos: todos } });
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        if (user === null) {
            setUser(null);
        } else if (user === 'admin') {
            fetchUsers();
            fetchProjects();
            fetchTodos();
        } else {
            fetchProjects();
            fetchTodos();
        }
    }, [user]);

    const fetchUsers = async () => {
        let array = [];
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            if (location.state.user === 'admin') {
                if (doc.data().username !== 'admin') {
                    array.push({id: doc.id, ...doc.data()})
                }
            }
        });
        setUsers(array);
    };

    const fetchProjects = async () => {
        let array = [];
        const querySnapshot = await getDocs(collection(db, 'projects'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === location.state.user | location.state.user === 'admin') {
                array.push({ id: doc.id, ...doc.data() });
            }
        });
        setProjects(array);
    };

    const fetchTodos = async () => {
        let array = [];
        const querySnapshot = await getDocs(collection(db, 'todos'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === location.state.user | location.state.user === 'admin') {
                array.push({ id: doc.id, ...doc.data() });
            }
        });
        setTodos(array);
    };

    return (
        <div className="main-container d-flex justify-content-center align-items-center vh-100">
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
                <div className="shape shape5"></div>
            </div>
            <div className="container fade-in">
                <div className="title-main">
                    TODO APP
                    <span className="hand">👋🏼</span>
                </div>
                {user === 'admin' ? (
                    <>
                        <div className="button-container">
                            <button onClick={usersRedirect}>USERS</button>
                        </div>
                        <div className="button-container">
                            <button onClick={projectsRedirect}>PROJECTS</button>
                        </div>
                        <div className="button-container">
                            <button onClick={todosRedirect}>TODOS</button>
                        </div>
                        <div className="button-container">
                            <button onClick={logout}>LOGOUT</button>
                        </div>
                    </>
                ) : user !== null ? (
                    <>
                        <div className="button-container">
                            <button onClick={projectsRedirect}>PROJECTS</button>
                        </div>
                        <div className="button-container">
                            <button onClick={todosRedirect}>TODOS</button>
                        </div>
                        <div className="button-container">
                            <button onClick={logout}>LOGOUT</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="button-container">
                            <button onClick={loginRedirect}>LOGIN HERE</button>
                        </div>
                        <div className="divider">
                            <span className="divider-text">or</span>
                        </div>
                        <div className="button-container">
                            <button onClick={registerRedirect}>REGISTER</button>
                        </div>
                    </>
                )}
            </div>
            <footer className="footer">
                made by Jeremi Sadkowski, Jacek Kudrys & Stanisław Pilch
            </footer>
        </div>
    );
}
