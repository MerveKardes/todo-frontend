import type { Todo } from "../types/Todo";
import { useState } from "react";

type TodoItemProps = {
    todo: Todo;
    onDelete: (id: string) => void;
    onUpdate: (id: string, description: string, status: Todo["status"]) => void;
};

export default function TodoItem(props: TodoItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(props.todo.description);
    const [status, setStatus] = useState<Todo["status"]>(props.todo.status);

    function handleUpdate() {
        props.onUpdate(props.todo.id, description, status);
        setIsEditing(false);
    }

    return (
        <div className="todo-card">
            {isEditing ? (
                <div>
                    <input className="edit-input"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <select className="edit-select"
                        value={status}
                        onChange={(event) => setStatus(event.target.value as Todo["status"])}
                    >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>

                    <button className="edit-button" onClick={handleUpdate}>Save</button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{props.todo.description}</h3>
                    <p>{props.todo.status}</p>

                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="delete-button" onClick={() => props.onDelete(props.todo.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}