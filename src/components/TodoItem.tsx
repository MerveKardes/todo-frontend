import type { Todo } from "../types/Todo";
import { useId, useState } from "react";

type TodoItemProps = {
    todo: Todo;
    onDelete: (id: string) => void;
    onUpdate: (id: string, description: string, status: Todo["status"]) => Promise<boolean>;
};

export default function TodoItem(props: TodoItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(props.todo.description);
    const [status, setStatus] = useState<Todo["status"]>(props.todo.status);
    const descriptionId = useId();
    const statusId = useId();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (description.trim() === "") {
            return;
        }

        props.onUpdate(props.todo.id, description, status).then(success => {
            if (success) {
                setIsEditing(false);
            }
        });
    }

    function handleEdit() {
        setDescription(props.todo.description);
        setStatus(props.todo.status);
        setIsEditing(true);
    }

    function handleCancel() {
        setDescription(props.todo.description);
        setStatus(props.todo.status);
        setIsEditing(false);
    }

    return (
        <div className="todo-card">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor={descriptionId} className="form-label">
                        Description
                    </label>
                    <input id={descriptionId}
                        className="edit-input"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <label htmlFor={statusId} className="form-label">
                        Status
                    </label>
                    <select id={statusId}
                        className="edit-select"
                        value={status}
                        onChange={(event) => setStatus(event.target.value as Todo["status"])}
                    >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>

                    <button type="submit" className="edit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <div>
                    <h3>{props.todo.description}</h3>
                    <p>{props.todo.status}</p>

                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="delete-button" onClick={() => props.onDelete(props.todo.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}