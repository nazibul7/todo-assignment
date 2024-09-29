import { Request, Response } from "express"
import { Todo, UpdateTodo, createTodoSchema, updateTodoSchema } from "../validations/zod.validation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
// Creat todo controller
export const createTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        const { title, descriptions, checked }: Todo = createTodoSchema.parse(req.body)
        const todo = await prisma.todos.create({
            data: {
                title, descriptions, checked, userid: userId
            }
        })
        return res.status(201).json(todo)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// Get all todos controller
export const alltodos = async (req: Request, res: Response) => {
    try {
        const { userId } = req
        const todos = await prisma.todos.findMany({
            where: { userid: userId }
        })
        return res.status(200).json(todos)
    } catch (error) {
        return res.status(500).json("Unable to fetch todos")
    }
}

// Update todo controller
export const updateTodo = async (req: Request, res: Response) => {
    try {
        const todoId = parseInt(req.params.id)
        const prevTodo = await prisma.todos.findUnique({
            where: { id: todoId }
        })
        if (!prevTodo) {
            return res.status(403).json("Todo is not found")
        }
        const validatedData: UpdateTodo = updateTodoSchema.parse(req.body)
        const hasChanges = Object.keys(validatedData).some(keys => {
            return prevTodo[keys as keyof typeof validatedData] != validatedData[keys as keyof typeof validatedData]
        })
        if (!hasChanges) {
            return res.status(400).json("No changes detected.Update aborted")
        }

        const updateTodo = await prisma.todos.update({
            where: { id: todoId },
            data: {
                title: validatedData.title,
                descriptions: validatedData.descriptions,
                checked: validatedData.checked
            }
        })
        return res.status(200).json(updateTodo)
    } catch (error) {
        console.log(error);
        return res.status(401).json(error)
    }
}

//delete todo controller
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todoId = Number(req.params.id)
        const todo = await prisma.todos.findUnique({
            where: { id: todoId }
        })
        if (!todo) {
            return res.status(400).json("Todo not found")
        }
        const deleteTodo = await prisma.todos.delete({
            where: { id: todoId }
        })
        return res.status(200).json(deleteTodo)
    } catch (error) {
        return res.status(500).json("Something went wrong")
    }
}