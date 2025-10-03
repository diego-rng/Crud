import fs from "fs"; // ES6
const DB_FILE_PATH = "./core/db";
console.log("[CRUD]");


function create(content:string) {
    const todo = {
        content: content,
    };

    // attempt save system
    fs.writeFileSync(DB_FILE_PATH, content);
    return content; 
}

function read() {
    const db = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return db;
}

// [SIMULATION]
create ("Second TODO")
console.log(read());
