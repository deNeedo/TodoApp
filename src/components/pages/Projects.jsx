import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

import AddProject from '../AddProject.jsx'
import Project from '../Project.jsx'


export default function Projects() {
    const navigate = useNavigate(); const location = useLocation()

    const [projects, setProjects] = useState(location.state.projects)

    const [sort, setSort] = useState(true)
    const [sortType, setSortType] = useState(true)

    const home = () => {navigate('/home', {state: {user: location.state.user}})}
    const logout = () => {navigate('/home', {state: {user: null}})}

    const fetchProjects = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(db, 'projects'));
        querySnapshot.forEach((doc) => {
            if (doc.data().user === location.state.user | location.state.user === 'admin') {
                array.push({id: doc.id, ...doc.data()})
            }
        })
        setProjects(array)
    }

    return (
        <div>
            <div> <AddProject user={location.state.user} updateProjects={fetchProjects}/> </div>
            <div> {projects.map((project) => (
                <Project key={project.id} projects={projects} project={project} updateProjects={fetchProjects}/>
            ))} </div>
            <div> <button onClick={home}> BACK </button> </div>
            <div> <button onClick={logout}> LOGOUT </button> </div>
        </div>
    )
}