export type Todo = {
    id: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
}