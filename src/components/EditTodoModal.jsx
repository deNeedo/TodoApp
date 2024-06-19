import React, { useState } from 'react';
import '../components/css/EditTodoModal.css';

export default function EditTodoModal({ todo, handleEdit, onClose }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [date, setDate] = useState(todo.date);
    const [priority, setPriority] = useState(todo.priority);

    const onSubmit = (e) => {
        e.preventDefault();
        handleEdit(todo, title, description, date, priority);
        onClose(); // Close the modal after editing
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={onSubmit} className="edit-todo-form">
                    <div>
                        <label htmlFor="edit-title">Title</label>
                        <input
                            id="edit-title"
                            type="text"
                            placeholder="Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="edit-todo-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-description">Description</label>
                        <input
                            id="edit-description"
                            type="text"
                            placeholder="Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="edit-todo-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-date">Date</label>
                        <input
                            id="edit-date"
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="edit-todo-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-priority">Priority</label>
                        <input
                            id="edit-priority"
                            type="number"
                            min="0"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="edit-todo-input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="edit-todo-button">Edit Todo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
