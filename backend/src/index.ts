import express from "express"
import cors from "cors"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { auth } from "express-oauth2-jwt-bearer"
import userRouter from "./routes/user.routes"
import todoRouter from './routes/todo.route'

const app = express()
const prisma = new PrismaClient()
// middlewares

const jwtCheck = auth({
    audience: 'todo-assignment',
    issuerBaseURL: 'https://dev-nazibul.us.auth0.com/',
    tokenSigningAlg: 'RS256'
})

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(jwtCheck)
app.use(express.json())

// Router
app.use('/api/v1/user', userRouter)
app.use('/api/v1', todoRouter)

const startServer = async () => {
    try {
        await prisma.$connect()
        console.log('PostgreSQL connected successfully.');

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is listening on PORT ${process.env.PORT}`);
        })

    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer()

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    console.log('Prisma disconnected gracefully');
    process.exit(0);
})
