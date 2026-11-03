import { useState } from "react";

type TodoFormProps = {
    onAddTodo: (description: string) => void;
};

export default function TodoForm(props: TodoFormProps) {

    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (description.trim() === "") {
            return;
        }

        props.onAddTodo(description);
        setDescription("");
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a new task..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <button type="submit">Add Todo</button>
        </form>
    );
}