import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import AddTodo from '../AddTodo.jsx';
import Todo from '../Todo.jsx';
import SearchBar from '../SearchBar.jsx';

import '../css/Todos.css';

export default function Todos() {
    const navigate = useNavigate();
    const location = useLocation();

    const [projects, setProjects] = useState(location.state.projects);
    const [todos, setTodos] = useState(location.state.todos);
    const [showAddTodo, setShowAddTodo] = useState(false);

    const [sort, setSort] = useState(true);
    const [sortType, setSortType] = useState(true);

    const home = () => { navigate('/home', { state: { user: location.state.user } }); };
    const logout = () => { navigate('/home', { state: { user: null } }); };

    useEffect(() => {
        if (sort === true) {
            setSort(false);
            sortTodos();
        }
    }, [sort]);

    const sortTodos = () => {
        let array = [...todos];
        let temp;
        for (let m = 1; m < array.length; m++) {
            for (let n = 0; n < m; n++) {
                if (sortType === 'title') {
                    let titleA = (array[m].title).toLowerCase();
                    let titleB = (array[n].title).toLowerCase();
                    if (titleA.localeCompare(titleB) === -1) {
                        temp = array[m];
                        array[m] = array[n];
                        array[n] = temp;
                    }
                } else if (sortType === 'description') {
                    let descA = (array[m].description).toLowerCase();
                    let descB = (array[n].description).toLowerCase();
                    if (descA === '') {
                        continue;
                    } else if (descA.localeCompare(descB) === -1 || (descA !== '' && descB === '')) {
                        temp = array[m];
                        array[m] = array[n];
                        array[n] = temp;
                    }
                } else if (sortType === 'date') {
                    if (array[m].date === '') {
                        continue;
                    } else if ((array[m].date).localeCompare(array[n].date) === -1 || (array[m].date !== '' && array[n].date === '')) {
                        temp = array[m];
                        array[m] = array[n];
                        array[n] = temp;
                    }
                } else if (sortType === 'priority') {
                    if (array[m].priority === 0) {
                        continue;
                    } else if (array[m].priority < array[n].priority || (array[m].priority !== 0 && array[n].priority === 0)) {
                        temp = array[m];
                        array[m] = array[n];
                        array[n] = temp;
                    }
                }
            }
        }
        setTodos(array);
    };

    const changeSort = (e) => {
        e.preventDefault();
        setSortType(e.target.value);
        fetchTodos();
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
        if (location.state.project === undefined) {
            const querySnapshot = await getDocs(collection(db, 'todos'));
            querySnapshot.forEach((doc) => {
                if (doc.data().user === location.state.user | location.state.user === 'admin') {
                    array.push({ id: doc.id, ...doc.data() });
                }
            });
        } else {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            querySnapshot.forEach((doc) => {
                if (doc.data().user === location.state.user | location.state.user === 'admin') {
                    for (let m = 0; m < (doc.data().todos).length; m++) {
                        let todo = doc.data().todos[m];
                        array.push({ id: todo.id, ...todo });
                    }
                }
            });
        }
        setTodos(array);
        setSort(true);
    };

    const searchResults = async (input, type) => {
        let array = [];
        if (location.state.project === undefined) {
            const querySnapshot = await getDocs(collection(db, 'todos'));
            querySnapshot.forEach((doc) => {
                if (doc.data().user === location.state.user | location.state.user === 'admin') {
                    if (type === 'title') {
                        if ((doc.data().title).includes(input)) {
                            array.push({ id: doc.id, ...doc.data() });
                        }
                    } else if (type === 'description') {
                        if ((doc.data().description).includes(input)) {
                            array.push({ id: doc.id, ...doc.data() });
                        }
                    } else if (type === 'label') {
                        if (input === '') {
                            array.push({ id: doc.id, ...doc.data() });
                        } else {
                            let labels = doc.data().labels;
                            for (let m = 0; m < labels.length; m++) {
                                if (labels[m].includes(input)) {
                                    array.push({ id: doc.id, ...doc.data() });
                                    break;
                                }
                            }
                        }
                    } else if (type === 'priority') {
                        let priority = doc.data().priority + "";
                        if (priority.includes(input)) {
                            array.push({ id: doc.id, ...doc.data() });
                        }
                    }
                }
            });
        } else {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            querySnapshot.forEach((doc) => {
                if (doc.data().user === location.state.user | location.state.user === 'admin') {
                    for (let m = 0; m < (doc.data().todos).length; m++) {
                        let todo = doc.data().todos[m];
                        if (type === 'title') {
                            if ((todo.title).includes(input)) {
                                array.push({ id: todo.id, ...todo });
                            }
                        } else if (type === 'description') {
                            if ((todo.description).includes(input)) {
                                array.push({ id: todo.id, ...todo });
                            }
                        } else if (type === 'label') {
                            if (input === '') {
                                array.push({ id: todo.id, ...todo });
                            } else {
                                for (let n = 0; n < (todo.labels).length; n++) {
                                    if (todo.labels[n].includes(input)) {
                                        array.push({ id: todo.id, ...todo });
                                        break;
                                    }
                                }
                            }
                        } else if (type === 'priority') {
                            let priority = todo.priority + "";
                            if (priority.includes(input)) {
                                array.push({ id: todo.id, ...todo });
                            }
                        }
                    }
                }
            });
        }
        setTodos(array);
    };

    return (
        <div className="todos-container">
            <div className="header">
                <button className="home-button" onClick={home}>
                    <span className="arrow">←</span> HOME
                </button>
                <div className="d-flex flex-grow-1 justify-content-center">
                    <SearchBar updateTodos={searchResults} />
                </div>
            </div>
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
                <div className="shape shape5"></div>
            </div>
            <div className="main-container">
                <div className="sort-container">
                    <label htmlFor="sortType">Sort by:</label>
                    <select id="sortType" value={sortType} onChange={changeSort}>
                        <option value=''>---</option>
                        <option value='title'>Title</option>
                        <option value='description'>Description</option>
                        <option value='date'>Date</option>
                        <option value='priority'>Priority</option>
                    </select>
                </div>
                <div className="todos-list-container">
                    {todos.map((todo) => (
                        <Todo
                            className={`todo ${todo.completed ? 'complete' : Date.parse(todo.date) - Date.now() < 0 ? 'overdue' : 'incomplete'}`}
                            key={todo.id}
                            projects={projects}
                            project={location.state.project}
                            todo={todo}
                            updateProjects={fetchProjects}
                            updateTodos={fetchTodos}
                        />
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={home}>BACK</button>
                    <button onClick={logout}>LOGOUT</button>
                </div>
                <button className="add-todo-fab" onClick={() => setShowAddTodo(true)}>+</button>
            </div>
            {showAddTodo && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddTodo(false)}>&times;</span>
                        <AddTodo
                            user={location.state.user}
                            project={location.state.project}
                            updateProjects={fetchProjects}
                            updateTodos={fetchTodos}
                            onClose={() => setShowAddTodo(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}