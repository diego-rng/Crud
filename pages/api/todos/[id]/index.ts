import { todoController } from "@server/controller/todo.ts";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest, 
    response: NextApiResponse
) {
    // TODO: Organize for only DELETE

    // const todoId = req.query.id;
    // res.end(`Post: ${todoId}`);
    // if(request.method === "DELETE") {
            todoController.deleteById(request, response);
            return;
        // }
    
        response.status(405).json({
           error: {
            message: "Method not allowed."
           }, 
        });
}
