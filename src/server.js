import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import dotenv from "dotenv"
import usersRouter from "./services/users/index.js"
import { unauthorizedHandler, forbiddenHandler, catchAllHandler } from "./errorHandler.js"

dotenv.config()
const server = express()
const port = process.env.PORT || 3001

// ****************************** MIDDLEWARES ******************************

server.use(cors())
server.use(express.json())

// ****************************** ENDPOINTS ********************************

server.use("/users", usersRouter)

// ****************************** ERROR HANDLERS ***************************

server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.table(listEndpoints(server))

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected!")
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})