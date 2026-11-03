
import TodoList, { type TodoListProps } from "../components/TodoList";

function TodoPage(props: TodoListProps) {
    return (
        <div>
            <h2>Todo Tasks</h2>
            <TodoList
                todos={props.todos}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
            />
        </div>
    );
}

export default TodoPage;
