import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

declare global {
    namespace Express {
        interface Request{
            auth0Id: string,
            userId: number
        }
    }
}
const prisma = new PrismaClient()
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json("Unauthorized")
        }
        const decode = jwt.decode(token) as jwt.JwtPayload
        const auth0Id = decode.sub
        const user = await prisma.users.findUnique({
            where: { auth0Id }
        })
        req.auth0Id = user?.auth0Id as string
        req.userId = user?.id as number
        next()
    } catch (error) {
        return res.sendStatus(401)
    }
}
