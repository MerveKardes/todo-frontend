
import TodoList, { type TodoListProps } from "../components/TodoList";

function DoingPage(props: TodoListProps) {
    return (
        <div>
            <h2>In Progress Tasks</h2>
            <TodoList
                todos={props.todos}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
            />
        </div>
    );
}

export default DoingPage;
