const { Router } = require("express")
const movie_tagsRoutes = Router()

const movie_tagsController = require("../controllers/Movie_TagsController.js")
const movieTagsController = new movie_tagsController()

movie_tagsRoutes.get("/", movieTagsController.index)

module.exports = movie_tagsRoutes