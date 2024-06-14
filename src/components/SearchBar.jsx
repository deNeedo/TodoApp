import React, { useEffect, useState } from 'react'

export default function SearchBar({ updateTodos }) {

    const [searchInput, setSearchInput] = useState('')
    const [searchType, setSearchType] = useState('title')
    const [fetchData, setFetchData] = useState(false)

    useEffect(() => {
        if (fetchData === true) {
            updateTodos(searchInput, searchType)
            setFetchData(false)
        }
    }, [fetchData])

    const handleInputChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value); setFetchData(true)
    }

    const handleTypeChange = (e) => {
        e.preventDefault()
        setSearchType(e.target.value); setFetchData(true)
    }

    const clearSearch = () => {
        setSearchInput('')
    }

    return (
        <div>
            <input type='text' placeholder='Search...' value={searchInput} onChange={handleInputChange}/>
            <select value={searchType} onChange={handleTypeChange}>
                <option value='title'> Title </option>
                <option value='description'> Description </option>
                <option value='label'> Label </option>
                <option value='priority'> Priority </option>
            </select>
            <button onClick={() => clearSearch()}> Clear </button>
        </div>
    )
}