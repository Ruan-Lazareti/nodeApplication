const { Router } = require("express")
const userRoutes = Router()

const UserController = require("../controllers/UserController.js")
const userController = new UserController()

userRoutes.post("/", userController.create)
userRoutes.put("/:id", userController.update)
userRoutes.get("/", userController.index)
userRoutes.get("/:id", userController.view)

module.exports = userRoutes