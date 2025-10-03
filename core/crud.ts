import * as fs from "fs"; // ES6

const DB_FILE_PATH = "./core/db";
console.log("[CRUD]");

interface Todo {
    id:string;
    date:string;
    content:string;
    done: boolean;
}
function create(content:string) {
    const todo: Todo = {
        id: "1",
        date: new Date().toISOString(),
        content: content,
        done: false,
    };

    const todos =[
        ...read(),
        todo,
    ];

    // save on system
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos, 
        dogs: [],
    }, null, 2));
    return content; 
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (db.todos){ // FFV - Fail Fast Validations  
        return db.todos;
    }
    return [];
}
function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}
// [SIMULATION]
CLEAR_DB();
create("First TODO");
create ("Second TODO");
console.log(read());
