import { todoController } from "@server/controller/todo.ts";

export async function GET(request: Request) {
    return await todoController.get(request,);
}

export async function POST(request: Request) {
    return await todoController.create(request,); 
}

/*
import type { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todo.ts";

export default async function handler(
    request:NextApiRequest, 
    response:NextApiResponse
) {
    // console.log(request.method);

    if(request.method === "GET"){
        await todoController.get(request, response);
        return;
    }

    if (request.method === "POST"){
        await todoController.create(request, response);
        return;
    }
    
    response.status(405).json({
        message: "Method not allowed.",
    });
};
*/
