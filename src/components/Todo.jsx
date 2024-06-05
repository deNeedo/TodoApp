import React from 'react';
export default function Todo({
    todo, toggleComplete, handleDelete, handleEdit
}) {
    const [newTitle, setNewTitle] = React.useState(todo.title)

    const handleChange = (e) => {
        e.preventDefault()
        if (todo.complete === true) {
            setNewTitle(todo.title)
        } else {
            todo.title = ''
            setNewTitle(e.target.value)
        }
    }

    return (
        <div>
            <input type='text' value={todo.title === "" ? newTitle : todo.title} onChange={handleChange}/>
            <div>
                <button onClick={(e) => toggleComplete(todo)}> Toggle state </button>
                <button onClick={(e) => handleEdit(todo, newTitle)}> Edit </button>
                <button onClick={(e) => handleDelete(todo.id)}> Delete </button>
            </div>
        </div>
    )
}