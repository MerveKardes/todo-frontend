
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import type { Todo } from "./types/Todo";

import {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
} from "./services/todoApi";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import DoingPage from "./pages/DoingPage";
import DonePage from "./pages/DonePage";

import "./App.css";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        getTodos().then(response => {
            setTodos(response.data);
        });
    }, []);

    function handleAddTodo(description: string) {
        addTodo(description).then(response => {
            setTodos(currentTodos => [...currentTodos, response.data]);
        });
    }

    function handleDeleteTodo(id: string) {
        deleteTodo(id).then(() => {
            setTodos(currentTodos =>
                currentTodos.filter(todo => todo.id !== id)
            );
        });
    }

    function handleUpdateTodo(
        id: string,
        description: string,
        status: Todo["status"]
    ) {
        updateTodo(id, description, status).then(response => {
            setTodos(currentTodos =>
                currentTodos.map(todo =>
                    todo.id === id ? response.data : todo
                )
            );
        });
    }

    return (
        <div className="app">
            <Header />
        <main>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            todos={todos}
                            onAddTodo={handleAddTodo}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleUpdateTodo}
                        />
                    }
                />

                <Route
                    path="/todo"
                    element={
                        <TodoPage
                            todos={todos.filter(todo => todo.status === "TODO")}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleUpdateTodo}
                        />
                    }
                />

                <Route
                    path="/doing"
                    element={
                        <DoingPage
                            todos={todos.filter(todo => todo.status === "IN_PROGRESS")}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleUpdateTodo}
                        />
                    }
                />

                <Route
                    path="/done"
                    element={
                        <DonePage
                            todos={todos.filter(todo => todo.status === "DONE")}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleUpdateTodo}
                        />
                    }
                />
            </Routes>
        </main>
        </div>
    );
}

export default App;
