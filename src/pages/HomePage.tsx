import type { Todo } from "../types/Todo";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

type HomePageProps = {
    todos: Todo[];
    onAddTodo: (description: string) => Promise<boolean>;
    onDelete: (id: string) => void;
    onUpdate: (
        id: string,
        description: string,
        status: Todo["status"]
    ) => Promise<boolean>;
};

function HomePage(props: HomePageProps) {
    return (
        <div>
            <h2>My Tasks</h2>

            <TodoForm onAddTodo={props.onAddTodo} />

            <div className="kanban-board">
                <section>
                    <h3>Todo</h3>
                    <TodoList
                        todos={props.todos.filter(todo => todo.status === "TODO")}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </section>

                <section>
                    <h3>Doing</h3>
                    <TodoList
                        todos={props.todos.filter(todo => todo.status === "IN_PROGRESS")}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </section>

                <section>
                    <h3>Done</h3>
                    <TodoList
                        todos={props.todos.filter(todo => todo.status === "DONE")}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </section>
            </div>
        </div>
    );
}

export default HomePage;
