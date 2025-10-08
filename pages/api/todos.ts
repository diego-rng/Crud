import type { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud-todo";
import { todoController } from "@server/controller/todo.ts";

export default function handler(
    request:NextApiRequest, 
    response:NextApiResponse
) {
    console.log(request.method);

    if(request.method === "GET"){
        todoController.get(request, response);
        return;
    }
    
    response.status(405).json({
        message: "Method not allowed.",
    });
};
