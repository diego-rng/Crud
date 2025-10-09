import { todoRepository, type TodoRepositoryGetOutput } from "@ui/repository/todo.ts";

interface TodoControllerGetParams { 
    page?: number;
    limit?: number;
}
async function get({ page, limit, }: TodoControllerGetParams): Promise<TodoRepositoryGetOutput> {
    return todoRepository.get({
        page:page || 1,
        limit:10,
    });
}

export const todoController ={
    get, 
};
