import { TodoSchema, type Todo } from "@ui/schema/todo.ts";
import type { ServerResponse } from "http";
import type { ServerStreamResponseOptions } from "http2";
import { z as schema} from "zod";

export interface TodoRepositoryGetParams{
    page: number;
    limit: number;
}
export interface TodoRepositoryGetOutput{
    todos: Todo[];
    total: number; 
    pages: number;
}
function get({page, limit, }: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch (`/api/todos?page=${page}&limit=${limit}`).then(
        async (serverResponse) => {
                const todosString = await serverResponse.text();
                const responseParsed = parseTodosFromServer(JSON.parse(todosString));

                return {
                    total: responseParsed.total,
                    todos: responseParsed.todos,
                    pages: responseParsed.pages,
                };
                });
}

// const todo = {
    //     id: uuid(),
    //     content, 
    //     date: new Date().toISOString(),
    //     done: false,
    // };
    

export async function createByContent(content: string): Promise<Todo> {
    const response = await fetch("/api/todos", { 
    method: "POST",
    headers: {
        // MIME Type
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        content,
    }),
});

if (response.ok) {
    const serverResponse = await response.json();
    const ServerResponseSchema = schema.object({
        todo: TodoSchema,
    });
    const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse);
    if(!serverResponseParsed.success) {
        throw new Error("Failed to create Todo :(")
    }
    
    console.log("serverResponseParsed", serverResponseParsed);
    const todo = serverResponseParsed.data.todo;
    return todo;
}

throw new Error("failed to create Todo :(")
}

async function toggleDone(todoId: string): Promise<Todo> {
    const response = await fetch (`/api/todos/${todoId}/toggle-done`, {
        method: "PUT",
        }); 
    
    if (response.ok) {
        const serverResponse = await response.json(); 
        const ServerResponseSchema = schema.object({
            todo: TodoSchema,
        });
        const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse);
        if(!serverResponseParsed.success) {
            throw new Error(`Failed to update TODO with id ${todoId}`)
        }
        const updatedTodo = serverResponseParsed.data.todo;
        return updatedTodo;
    }

    throw new Error("Server Error");

}

export const todoRepository= {
    get, 
    createByContent,
    toggleDone,
};

// Model / Schema 
// interface Todo {
//     id: string;
//     content: string;
//     date: Date;
//     done: boolean;
// }

function parseTodosFromServer(responseBody: unknown): { total: number, pages: number, todos: Array<Todo>} {
    if(responseBody !== null && 
        typeof responseBody === "object" && 
        "todos" in responseBody &&
        "total" in responseBody &&
        "pages" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo == null && typeof todo !== "object") {
                    throw new Error("Invalid Todo from API");
                }

                const { id, content, done, date  } = todo as { 
                    id: string;
                    content: string;
                    date: string; 
                    done: string;
                };

                return {
                    id,
                    content,
                    done:  String(done).toLowerCase() === "true",
                    date: date,
                } 
            }), 
        }
    }
    
    return {
        pages: 1,   
        total: 0,
        todos: [],
    };
}
