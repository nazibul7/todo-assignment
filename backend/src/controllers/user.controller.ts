import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
const prisma = new PrismaClient()

export const saveUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { auth0Id, email } = req.body
        if (!auth0Id || !email) {
            return res.status(404).json("Input is missing!")
        }
        const user=await prisma.users.findUnique({
            where:{auth0Id}
        })
        if(user){
            return res.status(200).json(user)
        }
        await prisma.users.create({
            data: {
                auth0Id, email
            }
        })
        return res.status(201).json("User successfully created")
    } catch (error) {
        return res.status(500).json("Something went wrong")
    }
}