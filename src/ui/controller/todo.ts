import { todoRepository, type TodoRepositoryGetOutput } from "@ui/repository/todo.ts";

interface TodoControllerGetParams { 
    page: number;
}
async function get(params: TodoControllerGetParams) {
    console.log(params);
    return todoRepository.get({
        page: params.page,
        limit:2,
    });
}

function filterTodosByContent<Todo>(search: string, todos: Array<Todo & { content: string }>): Todo[] {
const homeTodos = todos.filter((todo)=> {
        const searchNormalized = search.toLowerCase();
        const contentNormalized = todo.content.toLowerCase();
        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos; 
}

export const todoController ={
    get, 
    filterTodosByContent, 
};
