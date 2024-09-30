import { z } from "zod"

//create todo schema
export const createTodoSchema = z.object({
    todo: z.string().trim().min(1, "Todo must not be empty"),
    checked: z.boolean().optional()
})

export type Todo = z.infer<typeof createTodoSchema>

//update todo schema
export const updateTodoSchema = z.object({
    todo: z.string().trim().min(1, "Todo must not be empty").optional(),
    checked: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At lesat one field must provided to update the todo"
})

export type UpdateTodo = z.infer<typeof updateTodoSchema>