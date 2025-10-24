/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";
import { z as schema} from "zod";
import { todoRepository } from "@server/repository/todo.ts";
import { error } from "console";
import { HttpNotFoundError } from "@server/infra/errors.ts";

async function get(
    req: Request, 
    // res: NextApiResponse
) { 
    const { searchParams } = new URL(req.url);
    const query = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
    };
    const page = Number(query.page);
    const limit = Number(query.limit);

    if(query.page && isNaN(page)) {
        return new Response(JSON.stringify({
            error: {
                message:"`page` must be a number"
             }
        })
    , {status: 400})
    }
     if(query.limit && isNaN(limit)) {
        return new Response(JSON.stringify({
             error: {
                message:"`limit` must be a number"
             }
        }), {
            status:400
        });
    }
    try { 
        const output = await todoRepository.get({
            page,
            limit,
        });
        return new Response(JSON.stringify({
            total: output.total,
            pages: output.pages,
            todos: output.todos
        }), {
            status: 200
        })
    } catch {
        return new Response (JSON.stringify({
            error: {
                message: "Failed to fetch TODOs"
            }
        }), {
            status: 400,
        });
    }
}

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
})
async function create(req: Request, 
    // res: NextApiResponse
    ) {
    // FFV
    const body = TodoCreateBodySchema.safeParse(await req.json());
    // Type Narrowing
    if(!body.success) {
     return new Response(JSON.stringify({
            error: {
                message: "You need to provide content to create a TODO.",
                description: body.error.issues,
            }
    }), {
        status: 400
    });
    }

    // Data should have come through by here
    
    try {
        const createdTodo = await todoRepository.createByContent(body.data.content);

    // res.status(201).json({
    //     todo: createdTodo,
    // });
    return new Response(JSON.stringify({
        todo: createdTodo
    }), {
        status: 201
    })

    }catch {
        return new Response(JSON.stringify({ 
            error: {
                message: "Failed to create TODO",
            },
        }), {
            status: 400
        })
    }
}

async function toggleDone (req: Request, id: string) {
    const todoId = id;

    // FFV
    if(!todoId || typeof todoId !== "string") {
        return new Response(JSON.stringify({  
            error: {
                message: "You must provide a string ID.",
            },}), {
            status: 400
        }); 
    }

    try {
        const updatedTodo = await todoRepository.toggleDone(todoId);

        return new Response(JSON.stringify({
            todo:updatedTodo,
        }), {
            status: 200
        })
    } catch (err) {
        if (err instanceof Error) {
        return new Response(JSON.stringify({
            error: {
                message: err.message,
            }
        }), {
            status: 404
        })
    }
    }

}

async function deleteById(req: Request, id: string) {
    const query = {
        id,
    };
    const QuerySchema = schema.object({
        id: schema.string().uuid().nonempty(),
    });
    // FFV
    const parsedQuery = QuerySchema.safeParse(query);
    if(!parsedQuery.success){
    return new Response(JSON.stringify({
         error:{
            message: `You must provide a valid ID.`,
        },
    }), {
        status: 400
    });
    }
    try {
     const todoId = parsedQuery.data.id;
     await todoRepository.deleteById(todoId);
     return new Response(null, {
        status: 204
    })
} catch(err) {
    if(err instanceof HttpNotFoundError) {
        return new Response(JSON.stringify({
                error: {
                message: err.message
            }}
        ), {
            status: err.status,
        })
    }

    return new Response(JSON.stringify({
        error: {
            message:`Internal server error`,
        }
    }), {
        status: 500,
    })
}

}

export const todoController = {
  get,  
  create,
  toggleDone,
  deleteById,
};
