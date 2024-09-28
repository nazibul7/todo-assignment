import express from "express"
import { saveUserController } from "../controllers/user.controller"
const router = express.Router()

router.post('/save-user', saveUserController)


export default router