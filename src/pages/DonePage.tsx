
import TodoList, { type TodoListProps } from "../components/TodoList";

function DonePage(props: TodoListProps) {
    return (
        <div>
            <h2>Completed Tasks</h2>
            <TodoList
                todos={props.todos}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
            />
        </div>
    );
}

export default DonePage;
