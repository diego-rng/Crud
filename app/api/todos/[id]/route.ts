import { todoController } from "@server/controller/todo.ts";

export async function GET(
    request: Request, 
    { params }: { params: { id: string } }
) {
    const id = params.id; 
    return new Response (`I am the ID: ${id}`, {
        status: 200
    });
}

export async function DELETE(
    request: Request, 
    { params }: { params: { id: string } }
) {
    return todoController.deleteById(request, params.id)
}

// import { todoController } from "@server/controller/todo.ts";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//     request: NextApiRequest, 
//     response: NextApiResponse
// ) {
//     // TODO: Organize for only DELETE

//     // const todoId = req.query.id;
//     // res.end(`Post: ${todoId}`);
//     if(request.method === "DELETE") {
//             await todoController.deleteById(request, response);
//             return;
//         }
    
//         response.status(405).json({
//            error: {
//             message: "Method not allowed."
//            }, 
//         });
// }
