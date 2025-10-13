import { todoRepository, type TodoRepositoryGetOutput } from "@ui/repository/todo.ts";
import { v4 as uuid } from 'uuid';

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
interface TodoControllerCreateParams{
    content?: string;
    onError: () => void;
    onSuccess:(todo: any) => void;
}
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    // Fail Fast
    // (if no content)
    if(!content) {
        onError();
        return;
    }
    const todo = {
        id: uuid(),
        content, 
        date: new Date(),
        done: false,
    };
    
    onSuccess(todo);
}


export const todoController ={
    get, 
    filterTodosByContent,
    create, 
};
