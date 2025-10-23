import { todoRepository, type TodoRepositoryGetOutput } from "@ui/repository/todo.ts";
import { v4 as uuid } from 'uuid';
import type { Todo } from "@ui/schema/todo.ts"
import { z as schema} from "zod";

interface TodoControllerGetParams { 
    page: number;
}
async function get(params: TodoControllerGetParams) {
    // console.log(params);
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
    onSuccess: (todo: Todo) => void;
} 
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    // Fail Fast
    // (if no content)
    const parsedParams = schema.string().nonempty().safeParse(content);
    if(!parsedParams.success) {
        onError();
        return;
    }

    todoRepository.createByContent(parsedParams.data)
    .then((newTodo) => {
        onSuccess(newTodo);
    })
    .catch(() => {
        onError();
    });
    
}

interface TodoControllerToggleDoneParams {
    id: string;
    updateTodoOnScreen: () => void;
    onError: () => void;
}

function toggleDone({ id, updateTodoOnScreen, onError }: TodoControllerToggleDoneParams) {
    // Optimistic Update
    // updateTodoOnScreen(); 
    todoRepository.toggleDone(id)
    .then(() => {
        // Real Update
        updateTodoOnScreen();
    })
    .catch(() => {
        onError();
    }); 
}

async function deleteById(id: string): Promise<void> {
    const todoId = id;
    todoRepository.deleteById(todoId);
} 

export const todoController ={
    get, 
    filterTodosByContent,
    create, 
    toggleDone,
    deleteById, 

};
