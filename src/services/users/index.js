import express from "express"
import UserModel from "./schema.js"
// import { basicAuthMiddleware } from "../../auth/basic.js"
// import { adminOnlyMiddleware } from "../../auth/admin.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()
    res.send({ _id })
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/",  async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/me", async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/:id",  async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/me",  async (req, res, next) => {
  try {
    req.user.name = "John"
    await req.user.save()
    res.send()
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me", async (req, res, next) => {
  try {
    await req.user.deleteOne()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:id",  async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/login", async (req, res, next)=>{
  const [email, password] = req.body
  const user = await UserModel.checkCredentials(email, password)


})
export default usersRouter