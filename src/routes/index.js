const { Router } = require("express")
const routes = Router()

const userRoutes = require("./user.routes.js")
const movie_notesRoutes = require("./movie_notes.routes.js")

routes.use("/users", userRoutes)
routes.use("/movies_notes", movie_notesRoutes)

module.exports = routes