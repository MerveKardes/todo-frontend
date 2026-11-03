import axios from "axios";
import type {Todo} from "../types/Todo.ts";


export function getTodos () {
    return axios.get<Todo[]>("/api/todo");
}

export function addTodo (description : string) {
    return axios.post<Todo>("/api/todo", {
        description : description,
        status : "TODO"

    });
}

export function deleteTodo(id: string) {
    return axios.delete(`/api/todo/${id}`);
}

export function updateTodo(id: string, description: string, status: Todo["status"]) {
    return axios.put<Todo>(`/api/todo/${id}`, {
        description: description,
        status: status
    });
}