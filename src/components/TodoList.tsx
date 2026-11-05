
import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

export type TodoListProps = {
    todos: Todo[];
    onDelete: (id: string) => void;
    onUpdate: (
        id: string,
        description: string,
        status: Todo["status"]
    ) => Promise<boolean>;
};

export default function TodoList(props: TodoListProps) {
    return (
        <div>
            {props.todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={props.onDelete}
                    onUpdate={props.onUpdate}
                />
            ))}
        </div>
    );
}
