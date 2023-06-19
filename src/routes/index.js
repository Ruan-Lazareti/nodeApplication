const { Router } = require("express")
const routes = Router()

const userRoutes = require("./user.routes.js")
const movie_notesRoutes = require("./movie_notes.routes.js")
const movie_tagsRoutes = require("./movie_tags.routes.js")

routes.use("/users", userRoutes)
routes.use("/movies_notes", movie_notesRoutes)
routes.use("/movies_tags", movie_tagsRoutes)

module.exports = routes