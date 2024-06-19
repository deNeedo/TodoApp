import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

import User from '../User.jsx'


export default function Projects() {
    const navigate = useNavigate(); const location = useLocation()

    const [users, setUsers] = useState(location.state.users)

    const home = () => {navigate('/home', {state: {user: location.state.user}})}
    const logout = () => {navigate('/home', {state: {user: null}})}

    const fetchUsers = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            if (location.state.user === 'admin') {
                if (doc.data().username !== 'admin') {
                    array.push({id: doc.id, ...doc.data()})
                }
            }
        })
        setUsers(array)
    }

    return (
        <div>
            <div> {users.map((user) => (
                <User key={user.id} user={user} updateUsers={fetchUsers}/>
            ))} </div>
            <div> <button onClick={home}> BACK </button> </div>
            <div> <button onClick={logout}> LOGOUT </button> </div>
        </div>
    )
}