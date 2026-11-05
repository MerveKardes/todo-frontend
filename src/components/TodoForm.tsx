import { useState } from "react";

type TodoFormProps = {
    onAddTodo: (description: string) => Promise<boolean>;
};

export default function TodoForm(props: TodoFormProps) {

    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (description.trim() === "") {
            return;
        }

        props.onAddTodo(description).then(success => {
            if (success) {
                setDescription("");
            }
        });
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="new-todo-description" className="form-label">
                New task
            </label>
            <input
                id="new-todo-description"
                type="text"
                placeholder="Enter a new task..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <button type="submit">Add Todo</button>
        </form>
    );
}