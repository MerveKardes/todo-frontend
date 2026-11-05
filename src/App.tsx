
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        getTodos()
            .then(response => {
                setTodos(response.data);
                setErrorMessage(null);
            })
            .catch(() => {
                setErrorMessage("Todos could not be loaded. Please try again later.");
            });
    }, []);

    function handleAddTodo(description: string): Promise<boolean> {
        return addTodo(description)
            .then(response => {
                setTodos(currentTodos => [...currentTodos, response.data]);
                setErrorMessage(null);
                return true;
            })
            .catch(() => {
                setErrorMessage("The todo could not be added. Please try again.");
                return false;
            });
    }

    function handleDeleteTodo(id: string) {
        deleteTodo(id)
            .then(() => {
                setTodos(currentTodos =>
                    currentTodos.filter(todo => todo.id !== id)
                );
                setErrorMessage(null);
            })
            .catch(() => {
                setErrorMessage("The todo could not be deleted. Please try again.");
            });
    }

    function handleUpdateTodo(
        id: string,
        description: string,
        status: Todo["status"]
    ): Promise<boolean> {
        return updateTodo(id, description, status)
            .then(response => {
                setTodos(currentTodos =>
                    currentTodos.map(todo =>
                        todo.id === id ? response.data : todo
                    )
                );
                setErrorMessage(null);
                return true;
            })
            .catch(() => {
                setErrorMessage("The todo could not be updated. Please try again.");
                return false;
            });
    }

    return (
        <div className="app">
            <Header />
        <main>
            {errorMessage && (
                <div className="error-message" role="alert">
                    <span>{errorMessage}</span>
                    <button
                        type="button"
                        className="error-close-button"
                        onClick={() => setErrorMessage(null)}
                    >
                        Close
                    </button>
                </div>
            )}

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
