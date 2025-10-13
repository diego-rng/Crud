import type { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud-todo";
import { z as schema} from "zod";
import { todoRepository } from "@server/repository/todo.ts";

async function get(
    req: NextApiRequest, 
    res: NextApiResponse
) { 
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);

    if(query.page && isNaN(page)) {
        res.status(400).json({
             error: {
                message:"`page` must be a number"
             }
        });
        return;
    }
     if(query.limit && isNaN(limit)) {
        res.status(400).json({
             error: {
                message:"`limit` must be a number"
             }
        });
        return;
    }

    const output = todoRepository.get({
        page,
        limit,
});

        res.status(200).json({
            total: output.total,
            pages: output.pages,
            todos: output.todos
        });
}

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
})
async function create(req: NextApiRequest, res: NextApiResponse) {
    // FFV
    const body = TodoCreateBodySchema.safeParse(req.body);

    if(!body.success) {
        res.status(400).json({
            error: {
                message: "You need to provide the content to create a TODO.",
                description: body.error.issues,
            }
    })
    return;
    }

    // Data should have come through by here
    const createdTodo = await todoRepository.createByContent(body.data.content);

    res.status(201).json({
        todo: createdTodo,
    });
}

export const todoController = {
  get,  
  create,
};
