import { todoRepository, type TodoRepositoryGetOutput } from "@ui/repository/todo.ts";

interface TodoControllerGetParams { 
    page: number;
}
async function get(params: TodoControllerGetParams) {
    console.log(params);
    return todoRepository.get({
        page: params.page,
        limit:1,
    });
}

export const todoController ={
    get, 
};
