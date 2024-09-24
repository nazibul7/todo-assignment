import express from "express"
import cors from "cors"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()
// middlewares

app.use(cors())
app.use(express.json())

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
