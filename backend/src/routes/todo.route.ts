import express from "express"
import { alltodos, createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller"
import { verifyToken } from "../validations/verifyToken"
const router = express.Router()

router.use(verifyToken)
router.post('/todo/create', createTodo)
router.get('/todos', alltodos)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export default router